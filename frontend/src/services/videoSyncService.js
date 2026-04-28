import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

export const connectVideoSyncSocket = (roomId, onMessageReceived) => {
  const socket = new SockJS(`http://${window.location.hostname}:8082/ws`);
  const client = new Client({
    webSocketFactory: () => socket,
    onConnect: () => {
      console.log("✅ Video WebSocket connected");
      client.subscribe(`/topic/sync/${roomId}`, (message) => {
        const data = JSON.parse(message.body);
        console.log("📥 Sync message received:", data);
        onMessageReceived(data);
      });
    },
  });
  client.activate();
  return client;
};


