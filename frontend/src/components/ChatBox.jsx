import React, { useEffect, useState, useRef } from "react";
import { connectChatSocket } from "../services/chatService";
import { Send, MessageCircle } from "lucide-react";

const ChatBox = ({ username, roomId }) => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const messagesEndRef = useRef(null);

  const clientRef = useRef(null);

  useEffect(() => {
    clientRef.current = connectChatSocket(roomId, (msg) => {
      setMessages((prev) => [...prev, { ...msg, timestamp: new Date() }]);
    });
    return () => {
      if (clientRef.current) {
        clientRef.current.deactivate();
      }
    };
  }, [roomId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (text.trim() && clientRef.current && clientRef.current.connected) {
      const message = {
        sender: username,
        content: text,
      };
      clientRef.current.publish({
        destination: `/app/chat/${roomId}`,
        body: JSON.stringify(message),
      });
      setText("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="glass-card" style={{ 
      display: "flex", 
      flexDirection: "column", 
      height: "450px",
      width: "100%",
      overflow: "hidden"
    }}>
      <div style={{ 
        padding: "16px", 
        borderBottom: "1px solid var(--border)", 
        display: "flex", 
        alignItems: "center", 
        gap: "10px",
        background: "rgba(99, 102, 241, 0.1)"
      }}>
        <MessageCircle size={20} color="var(--primary)" />
        <h3 style={{ fontSize: "1.1rem", fontWeight: "600" }}>Live Chat</h3>
      </div>

      <div className="scroll-thin" style={{ 
        flex: 1, 
        overflowY: "auto", 
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        gap: "12px"
      }}>
        {messages.length === 0 && (
          <div style={{ textAlign: "center", color: "rgba(255,255,255,0.2)", marginTop: "40px" }}>
            Start the conversation...
          </div>
        )}
        {messages.map((msg, idx) => (
          <div key={idx} style={{ 
            alignSelf: msg.sender === username ? "flex-end" : "flex-start",
            maxWidth: "85%"
          }}>
            <div style={{ 
              fontSize: "0.75rem", 
              marginBottom: "4px", 
              opacity: 0.6,
              textAlign: msg.sender === username ? "right" : "left"
            }}>
              {msg.sender === username ? "You" : msg.sender}
            </div>
            <div style={{ 
              padding: "10px 14px", 
              borderRadius: "14px",
              backgroundColor: msg.sender === username ? "var(--primary)" : "rgba(255,255,255,0.05)",
              color: "white",
              fontSize: "0.95rem",
              borderTopRightRadius: msg.sender === username ? "2px" : "14px",
              borderTopLeftRadius: msg.sender === username ? "14px" : "2px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.2)"
            }}>
              {msg.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div style={{ padding: "16px", background: "rgba(0,0,0,0.2)", display: "flex", gap: "10px" }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Say something nice..."
          className="input-field"
          style={{ flex: 1, padding: "10px 14px", border: "none" }}
        />
        <button 
          onClick={handleSend} 
          className="premium-button" 
          style={{ padding: "10px", borderRadius: "10px" }}
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
