import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";

import Home from "./pages/Home.jsx";
import Rooms from "./pages/Rooms.jsx";
import ChatRoom from "./pages/ChatRoom.jsx";
import CreateRoom from "./pages/CreateRoom.jsx";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/rooms/:roomId" element={<ChatRoom />} />
          <Route path="/create-room" element={<CreateRoom />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;