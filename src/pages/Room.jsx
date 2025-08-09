import React, { useEffect, useRef, useState } from "react";
import YouTubePlayer from "../components/YouTubePlayer";
import AddVideoForm from "../components/AddVideoForm";
import Playlist from "../components/Playlist";
import ChatBox from "../components/ChatBox";
import { fetchPlaylistFromBackend } from "../services/api";
import {
  connectVideoSyncSocket,
  sendVideoSyncAction,
} from "../services/videoSyncService";
import { extractYouTubeVideoId } from "../services/utils";
import { useParams } from "react-router-dom";

const Room = () => {
  const { roomId } = useParams();
  const [username, setUsername] = useState("");
  const [playlist, setPlaylist] = useState([]);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState(null);
  const playerRef = useRef(null);

  // Prompt for user nickname
  useEffect(() => {
    const name = prompt("Enter your nickname:");
    setUsername(name || `User-${Math.floor(Math.random() * 1000)}`);
  }, []);

  // Connect to room-specific video sync WebSocket
  useEffect(() => {
    if (roomId) {
      connectVideoSyncSocket(roomId, (data) => {
        if (data.action === "play" && playerRef.current) {
          playerRef.current.seekTo(data.timestamp, true);
          playerRef.current.playVideo();
        } else if (data.action === "pause" && playerRef.current) {
          playerRef.current.pauseVideo();
        } else if (data.action === "change" && data.videoUrl) {
          const cleanId = extractYouTubeVideoId(data.videoUrl);
          if (cleanId) setSelectedVideoUrl(`https://youtu.be/${cleanId}`);
        }
      });
    }
  }, [roomId]);

  // Fetch playlist from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const videos = await fetchPlaylistFromBackend();
        setPlaylist(videos);
        if (videos.length > 0) {
          const firstId = extractYouTubeVideoId(videos[0].youtubeUrl);
          if (firstId) {
            setSelectedVideoUrl(`https://youtu.be/${firstId}`);
          }
        }
      } catch (error) {
        console.error("Playlist fetch error:", error);
      }
    };
    fetchData();
  }, []);

  const handleVideoSelect = (url) => {
    const videoId = extractYouTubeVideoId(url);
    if (videoId) {
      const cleanUrl = `https://youtu.be/${videoId}`;
      sendVideoSyncAction(roomId, "change", 0, cleanUrl);
    }
  };

  const handleSkip = () => {
    const currentIndex = playlist.findIndex(
      (video) =>
        extractYouTubeVideoId(video.youtubeUrl) ===
        extractYouTubeVideoId(selectedVideoUrl)
    );
    const nextIndex = (currentIndex + 1) % playlist.length;
    const nextVideo = playlist[nextIndex];
    if (nextVideo) {
      const videoId = extractYouTubeVideoId(nextVideo.youtubeUrl);
      const cleanUrl = `https://youtu.be/${videoId}`;
      sendVideoSyncAction(roomId, "change", 0, cleanUrl);
    }
  };

  const handleReady = (event) => {
    playerRef.current = event.target;
  };

  const handlePlay = () => {
    if (playerRef.current) {
      const currentTime = playerRef.current.getCurrentTime();
      sendVideoSyncAction(roomId, "play", currentTime);
    }
  };

  const handlePause = () => {
    if (playerRef.current) {
      const currentTime = playerRef.current.getCurrentTime();
      sendVideoSyncAction(roomId, "pause", currentTime);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🎵 BondBeat Room</h1>
      <p>🔗 Room link: {window.location.href}</p>

      {selectedVideoUrl ? (
        <>
          <YouTubePlayer videoUrl={selectedVideoUrl} onReady={handleReady} />
          <div style={styles.controls}>
            <button onClick={handlePlay}>▶ Play</button>
            <button onClick={handlePause}>⏸ Pause</button>
            <button onClick={handleSkip}>⏭ Skip</button>
          </div>
        </>
      ) : (
        <p style={styles.noVideo}>No video selected</p>
      )}

      <div style={{ display: "flex", gap: "30px" }}>
        <div style={{ flex: 1 }}>
          <Playlist
            playlist={playlist}
            onVideoSelect={handleVideoSelect}
            currentVideoUrl={selectedVideoUrl}
          />
          <AddVideoForm
            onVideoAdded={(newVideo) => {
              setPlaylist((prev) => [...prev, newVideo]);
            }}
          />
        </div>
        <div style={{ flex: 1 }}>
          <ChatBox username={username} roomId={roomId} />
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
  },
  title: {
    fontSize: "2.5rem",
    marginBottom: "10px",
  },
  noVideo: {
    fontSize: "1.2rem",
    color: "#999",
    marginBottom: "20px",
  },
  controls: {
    marginTop: "10px",
    display: "flex",
    justifyContent: "center",
    gap: "10px",
  },
};
export default Room;
