import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import { supabase } from "../supabase/client";
import Message from "../components/Message";

function ChatRoom() {
  const { roomId } = useParams();

  const [room, setRoom] = useState(null);
  const [messages, setMessages] = useState([]);

  const [username, setUsername] = useState("");
  const [content, setContent] = useState("");

  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchRoom();
    fetchMessages();

    const channel = supabase
      .channel(`room-${roomId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `room_id=eq.${roomId}`,
        },
        (payload) => {
          setMessages((current) => [
            ...current,
            payload.new,
          ]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [roomId]);

  async function fetchRoom() {
    const { data, error } = await supabase
      .from("rooms")
      .select("*")
      .eq("id", roomId)
      .single();

    if (error) {
      console.error(error);
      setError(error.message);
    } else {
      setRoom(data);
    }
  }

  async function fetchMessages() {
    setLoading(true);

    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("room_id", roomId)
      .order("created_at", {
        ascending: true,
      });

    if (error) {
      console.error(error);
      setError(error.message);
    } else {
      setMessages(data || []);
    }

    setLoading(false);
  }

  async function handleSend(e) {
    e.preventDefault();

    if (!username.trim() || !content.trim()) {
      return;
    }

    setSending(true);

    const { error } = await supabase
      .from("messages")
      .insert([
        {
          room_id: roomId,
          username: username.trim(),
          content: content.trim(),
        },
      ]);

    if (error) {
      console.error(error);
      setError(error.message);
    } else {
      setContent("");
    }

    setSending(false);
  }

  if (loading) {
    return (
      <section className="chat-page">
        <p>Loading chat...</p>
      </section>
    );
  }

  return (
    <section className="chat-page">
      <div className="chat-header">
        <div>
          <Link to="/rooms">
            ← Back to Rooms
          </Link>

          <h1>
            {room?.name || "Chat Room"}
          </h1>

          {room?.description && (
            <p>{room.description}</p>
          )}
        </div>
      </div>

      {error && (
        <p className="error">
          {error}
        </p>
      )}

      <div className="messages-container">
        {messages.length === 0 ? (
          <p className="empty-message">
            No messages yet. Start the conversation!
          </p>
        ) : (
          messages.map((message) => (
            <Message
              key={message.id}
              message={message}
            />
          ))
        )}
      </div>

      <form
        className="message-form"
        onSubmit={handleSend}
      >
        <input
          type="text"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
          placeholder="Your name"
        />

        <input
          type="text"
          value={content}
          onChange={(e) =>
            setContent(e.target.value)
          }
          placeholder="Type a message..."
        />

        <button
          type="submit"
          disabled={sending}
        >
          {sending ? "Sending..." : "Send"}
        </button>
      </form>
    </section>
  );
}

export default ChatRoom;