import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

let stompClient;

export const connectChatSocket = (roomId, onMessageReceived) => {
  const socket = new SockJS(`${import.meta.env.VITE_BACKEND_URL}/ws`);
  stompClient = new Client({
    webSocketFactory: () => socket,
    onConnect: () => {
      console.log("✅ Chat WebSocket connected");
      stompClient.subscribe(`/topic/chat/${roomId}`, (message) => {
        const body = JSON.parse(message.body);
        console.log("📥 Chat message received:", body);
        onMessageReceived(body);
      });
    },
  });
  stompClient.activate();
};

export const sendChatMessage = (roomId, message) => {
  if (stompClient && stompClient.connected) {
    console.log("📤 Sending chat message:", message);
    stompClient.publish({
      destination: `/app/chat/${roomId}`,
      body: JSON.stringify(message),
    });
  }
};
