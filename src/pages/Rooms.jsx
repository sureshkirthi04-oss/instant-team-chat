import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { supabase } from "../supabase/client";
import RoomCard from "../components/RoomCard";

function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchRooms();
  }, []);

  async function fetchRooms() {
    setLoading(true);
    setError("");

    const { data, error } = await supabase
      .from("rooms")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      setError(error.message);
    } else {
      setRooms(data || []);
    }

    setLoading(false);
  }

  return (
    <section className="rooms-page">
      <div className="page-header">
        <div>
          <h1>Chat Rooms</h1>
          <p>Choose a room to start chatting.</p>
        </div>

        <Link
          to="/create-room"
          className="primary-button"
        >
          + Create Room
        </Link>
      </div>

      {loading && <p>Loading rooms...</p>}

      {error && (
        <p className="error">
          Error: {error}
        </p>
      )}

      {!loading && !error && rooms.length === 0 && (
        <p>No rooms found. Create the first room!</p>
      )}

      <div className="rooms-grid">
        {rooms.map((room) => (
          <RoomCard
            key={room.id}
            room={room}
          />
        ))}
      </div>
    </section>
  );
}

export default Rooms;