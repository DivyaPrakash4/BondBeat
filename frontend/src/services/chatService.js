import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

export const connectChatSocket = (roomId, onMessageReceived) => {
  const socket = new SockJS(`http://${window.location.hostname}:8082/ws`);
  const client = new Client({
    webSocketFactory: () => socket,
    onConnect: () => {
      console.log("✅ Chat WebSocket connected");
      client.subscribe(`/topic/chat/${roomId}`, (message) => {
        const body = JSON.parse(message.body);
        console.log("📥 Chat message received:", body);
        onMessageReceived(body);
      });
    },
    onDisconnect: () => {
      console.log("❌ Chat WebSocket disconnected");
    }
  });
  client.activate();
  return client;
};
