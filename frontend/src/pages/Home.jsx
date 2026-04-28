import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Music, Radio, Users, ChevronRight, MessageCircle, LogIn } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();
  const [roomInput, setRoomInput] = useState("");

  const [username] = useState(localStorage.getItem("username"));

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  const createRoom = () => {
    const roomId = Math.random().toString(36).substring(2, 8);
    navigate(`/room/${roomId}`);
  };

  const handleJoinRoom = (e) => {
    e.preventDefault();
    if (!roomInput.trim()) return;

    let targetRoomId = roomInput.trim();
    if (targetRoomId.includes("/room/")) {
      targetRoomId = targetRoomId.split("/room/").pop().split("?")[0].split("/")[0];
    }

    if (targetRoomId) {
      navigate(`/room/${targetRoomId}`);
    }
  };

  return (
    <div style={{ 
      minHeight: "100vh", 
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center", 
      justifyContent: "center",
      padding: "30px 20px",
      textAlign: "center",
      background: "radial-gradient(circle at center, #1e1b4b 0%, #0f172a 100%)",
      position: "relative"
    }}>
      {/* Auth Status Top Bar */}
      <div style={{ position: "absolute", top: "30px", right: "30px" }}>
        {username ? (
          <div className="glass-card" style={{ padding: "8px 16px", display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ fontSize: "0.9rem" }}>{username}</span>
            <button onClick={handleLogout} style={{ background: "transparent", border: "none", color: "#fb7185", cursor: "pointer", fontSize: "0.8rem" }}>Logout</button>
          </div>
        ) : (
          <button onClick={() => navigate("/login")} className="premium-button" style={{ padding: "8px 20px", borderRadius: "10px", fontSize: "0.9rem" }}>Login</button>
        )}
      </div>
      <div className="fade-in" style={{ maxWidth: "800px", width: "100%" }}>
        <div style={{ 
          background: "linear-gradient(135deg, var(--primary), var(--secondary))", 
          padding: "16px",
          borderRadius: "20px",
          display: "inline-flex",
          marginBottom: "24px",
          boxShadow: "0 10px 40px rgba(99, 102, 241, 0.4)"
        }}>
          <Music color="white" size={window.innerWidth < 768 ? 32 : 48} />
        </div>
        
        <h1 style={{ 
          fontSize: window.innerWidth < 768 ? "3rem" : "5rem", 
          fontWeight: "800", 
          marginBottom: "16px",
          background: "linear-gradient(to bottom right, #fff, #94a3b8)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          lineHeight: "1.1"
        }}>
          BondBeat
        </h1>
        
        <p style={{ 
          fontSize: window.innerWidth < 768 ? "1.1rem" : "1.4rem", 
          color: "rgba(255,255,255,0.6)", 
          marginBottom: "40px",
          maxWidth: "600px",
          marginInline: "auto",
          lineHeight: "1.6"
        }}>
          Experience music and videos together. Sync playback, chat live, and build the perfect playlist with your friends.
        </p>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
          <button 
            onClick={createRoom} 
            className="premium-button" 
            style={{ 
              fontSize: "1.2rem", 
              padding: "16px 32px", 
              borderRadius: "14px",
              boxShadow: "0 20px 40px -10px rgba(99, 102, 241, 0.5)",
              width: "100%",
              maxWidth: "360px"
            }}
          >
            Launch Your Room <ChevronRight size={20} />
          </button>

          <div style={{ width: "100%", maxWidth: "360px", height: "1px", background: "rgba(255,255,255,0.1)", margin: "4px 0" }}></div>

          <form onSubmit={handleJoinRoom} style={{ width: "100%", maxWidth: "360px", display: "flex", gap: "10px" }}>
            <input 
              type="text" 
              placeholder="Paste link or Room ID"
              value={roomInput}
              onChange={(e) => setRoomInput(e.target.value)}
              className="input-field"
              style={{ flex: 1, padding: "12px 16px", fontSize: "0.9rem" }}
            />
            <button 
              type="submit" 
              className="premium-button secondary" 
              style={{ padding: "0 20px", borderRadius: "10px" }}
            >
              <LogIn size={18} />
            </button>
          </form>
        </div>

        <div style={{ 
          display: "grid", 
          gridTemplateColumns: window.innerWidth < 768 ? "1fr" : "repeat(3, 1fr)", 
          gap: "20px", 
          marginTop: "60px",
          maxWidth: "750px",
          marginInline: "auto"
        }}>
          {[
            { icon: <Radio size={24} />, title: "Precision Sync", text: "Zero-lag video synchronization for everyone." },
            { icon: <Users size={24} />, title: "Collaborative", text: "Anyone can add or suggest new tracks." },
            { icon: <MessageCircle size={24} />, title: "Live Chat", text: "React and vibe together in real-time." }
          ].map((feature, i) => (
            <div key={i} className="glass-card" style={{ padding: "20px", textAlign: "center" }}>
              <div style={{ color: "var(--primary)", marginBottom: "10px", display: "flex", justifyContent: "center" }}>{feature.icon}</div>
              <h4 style={{ color: "#fff", marginBottom: "6px", fontSize: "1rem" }}>{feature.title}</h4>
              <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.4)" }}>{feature.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
