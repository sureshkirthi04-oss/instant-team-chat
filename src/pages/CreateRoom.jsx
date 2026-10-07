import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { supabase } from "../supabase/client";

function CreateRoom() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (!name.trim()) {
      setError("Room name is required.");
      return;
    }

    setLoading(true);
    setError("");

    const { data, error } = await supabase
      .from("rooms")
      .insert([
        {
          name: name.trim(),
          description: description.trim(),
        },
      ])
      .select()
      .single();

    if (error) {
      console.error(error);
      setError(error.message);
      setLoading(false);
      return;
    }

    navigate(`/rooms/${data.id}`);
  }

  return (
    <section className="form-page">
      <h1>Create Chat Room</h1>

      <form
        className="chat-form"
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">
          Room Name
        </label>

        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Development Team"
        />

        <label htmlFor="description">
          Description
        </label>

        <textarea
          id="description"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
          placeholder="Enter a short description"
          rows="4"
        />

        {error && (
          <p className="error">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="primary-button"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Room"}
        </button>
      </form>
    </section>
  );
}

export default CreateRoom;