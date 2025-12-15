import React, { useEffect, useState } from "react";
import { connectChatSocket, sendChatMessage } from "../services/chatService";

const ChatBox = ({ username, roomId }) => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    connectChatSocket(roomId, (msg) => {
      setMessages((prev) => [...prev, msg]);
    });
  }, [roomId]);

  const handleSend = () => {
    if (text.trim()) {
      const message = {
        sender: username,
        content: text,
      };
      sendChatMessage(roomId, message);
      setText("");
    }
  };

  return (
    <div style={styles.container}>
      <h3>💬 Chat</h3>
      <div style={styles.messages}>
        {messages.map((msg, idx) => (
          <div key={idx}><strong>{msg.sender}:</strong> {msg.content}</div>
        ))}
      </div>
      <div style={styles.inputArea}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type message..."
          style={styles.input}
        />
        <button onClick={handleSend} style={styles.button}>Send</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    margin:"20px",
    border: "1px solid #ccc",
    padding: "10px",
    borderRadius: "8px",
    background: "#fafafa",
    height: "300px",
    display: "flex",
    flexDirection: "column",
  },
  messages: {
    flex: 1,
    overflowY: "auto",
    marginBottom: "10px",
    textAlign: "left",
  },
  inputArea: {
    display: "flex",
    gap: "10px",
  },
  input: {
    flex: 1,
    padding: "6px",
  },
  button: {
    padding: "6px 12px",
  },
};

export default ChatBox;
