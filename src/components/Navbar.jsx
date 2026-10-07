import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        Instant Team Chat
      </Link>

      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/rooms">Rooms</Link>
        <Link to="/create-room">Create Room</Link>
      </div>
    </nav>
  );
}

export default Navbar;