import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="home-page">
      <div className="hero">
        <h1>Instant Team Chat</h1>

        <p>
          A simple multi-room messaging application
          powered by Supabase Realtime.
        </p>

        <Link to="/rooms" className="primary-button">
          View Chat Rooms
        </Link>
      </div>
    </section>
  );
}

export default Home;