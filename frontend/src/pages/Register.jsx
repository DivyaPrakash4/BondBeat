import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../services/api";
import { UserPlus, Mail, Lock, User, Sparkles } from "lucide-react";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await register(username, email, password);
      navigate("/login");
    } catch (err) {
      setError("Registration failed. Try a different username/email.");
    }
  };

  return (
    <div style={{ 
      height: "100vh", 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center",
      background: "radial-gradient(circle at top right, #1e1b4b, #000)"
    }}>
      <div className="glass-card" style={{ padding: "40px", width: "400px", textAlign: "center" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
          <div style={{ padding: "12px", borderRadius: "50%", background: "var(--primary)", boxShadow: "0 0 20px var(--primary-glow)" }}>
            <Sparkles color="white" size={32} />
          </div>
        </div>
        <h1 style={{ fontSize: "2rem", fontWeight: "800", marginBottom: "8px" }}>Join BondBeat</h1>
        <p style={{ opacity: 0.6, marginBottom: "30px" }}>Create an account to start your journey</p>
        
        {error && <div style={{ color: "#fb7185", marginBottom: "20px", fontSize: "0.9rem" }}>{error}</div>}
        
        <form onSubmit={handleRegister} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ position: "relative" }}>
            <User size={18} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", opacity: 0.5 }} />
            <input
              type="text"
              placeholder="Username"
              className="input-field"
              style={{ paddingLeft: "40px" }}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div style={{ position: "relative" }}>
            <Mail size={18} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", opacity: 0.5 }} />
            <input
              type="email"
              placeholder="Email address"
              className="input-field"
              style={{ paddingLeft: "40px" }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div style={{ position: "relative" }}>
            <Lock size={18} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", opacity: 0.5 }} />
            <input
              type="password"
              placeholder="Password"
              className="input-field"
              style={{ paddingLeft: "40px" }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="premium-button" style={{ height: "48px", fontSize: "1rem" }}>
            <UserPlus size={20} style={{ marginRight: "8px" }} /> Register
          </button>
        </form>
        
        <p style={{ marginTop: "30px", fontSize: "0.9rem" }}>
          Already have an account? <Link to="/login" style={{ color: "var(--primary)", textDecoration: "none", fontWeight: "600" }}>Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
