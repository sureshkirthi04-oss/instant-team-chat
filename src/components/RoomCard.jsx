import { Link } from "react-router-dom";

function RoomCard({ room }) {
  return (
    <div className="room-card">
      <h2>{room.name}</h2>

      {room.description && (
        <p>{room.description}</p>
      )}

      <Link
        to={`/rooms/${room.id}`}
        className="room-button"
      >
        Join Room
      </Link>
    </div>
  );
}

export default RoomCard;