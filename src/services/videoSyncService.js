import SockJS from "sockjs-client";
import Stomp from "stompjs";

let stompClient = null;

export const connectVideoSyncSocket = (roomId, onMessageReceived) => {
  const socket = new SockJS("http://localhost:8080/ws"); // Update port if needed
  stompClient = Stomp.over(socket);
  stompClient.debug = null; // Disable console spam

  stompClient.connect({}, () => {
    console.log("✅ Video WebSocket connected");

    // Subscribe to room-specific topic
    stompClient.subscribe(`/topic/sync/${roomId}`, (message) => {
      const data = JSON.parse(message.body);
      console.log("📥 Sync message received:", data);
      onMessageReceived(data);
    });
  }, (error) => {
    console.error("❌ Video WebSocket error:", error);
  });
};

export const sendVideoSyncAction = (roomId, action, timestamp = 0, videoUrl = null) => {
  if (!stompClient || !stompClient.connected) {
    console.warn("⚠️ STOMP client not connected");
    return;
  }

  const message = {
    action,
    timestamp,
    videoUrl,
  };

  console.log("📤 Sending video sync action:", message);
  stompClient.send(`/app/sync/${roomId}`, {}, JSON.stringify(message));
};
