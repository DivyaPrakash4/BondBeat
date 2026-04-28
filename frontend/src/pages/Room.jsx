import React, { useEffect, useRef, useState } from "react";
import YouTubePlayer from "../components/YouTubePlayer";
import AddVideoForm from "../components/AddVideoForm";
import Playlist from "../components/Playlist";
import ChatBox from "../components/ChatBox";
import Recommendations from "../components/Recommendations";
import { fetchPlaylistFromBackend, deleteVideo } from "../services/api";
import { connectVideoSyncSocket } from "../services/videoSyncService";
import { extractYouTubeVideoId } from "../services/utils";
import { useParams, Link } from "react-router-dom";
import { Play, Pause, FastForward, SkipForward, Copy, Headphones, LogOut } from "lucide-react";

const Room = () => {
  const { roomId } = useParams();
  const [username, setUsername] = useState(localStorage.getItem("username") || "Guest");
  const [playlist, setPlaylist] = useState([]);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState(null);
  const playerRef = useRef(null);

  const videoClientRef = useRef(null);

  const refreshPlaylist = async () => {
    try {
      const videos = await fetchPlaylistFromBackend();
      setPlaylist(videos);
      if (videos.length > 0) {
        const firstId = extractYouTubeVideoId(videos[0].youtubeUrl);
        if (firstId) {
          setSelectedVideoUrl((prev) => prev ? prev : `https://youtu.be/${firstId}`);
        }
      }
    } catch (error) {
      console.error("Playlist fetch error:", error);
    }
  };

  // Connect to room-specific video sync WebSocket
  useEffect(() => {
    if (roomId) {
      videoClientRef.current = connectVideoSyncSocket(roomId, (data) => {
        if (data.action === "play" && playerRef.current) {
          playerRef.current.seekTo(data.timestamp, true);
          playerRef.current.playVideo();
        } 
        else if (data.action === "pause" && playerRef.current) {
          playerRef.current.pauseVideo();
        } 
        else if (data.action === "seek" && playerRef.current) {
          playerRef.current.seekTo(data.timestamp, true);
        } 
        else if (data.action === "change" && data.videoUrl) {
          const cleanId = extractYouTubeVideoId(data.videoUrl);
          if (cleanId) setSelectedVideoUrl(`https://youtu.be/${cleanId}`);
        }
        else if (data.action === "playlist_update") {
          refreshPlaylist();
        }
      });
    }
    return () => {
      if (videoClientRef.current) {
        videoClientRef.current.deactivate();
      }
    };
  }, [roomId]);

  const sendVideoSyncAction = (roomId, action, timestamp = 0, videoUrl = null) => {
    if (videoClientRef.current && videoClientRef.current.connected) {
      videoClientRef.current.publish({
        destination: `/app/sync/${roomId}`,
        body: JSON.stringify({ action, timestamp, videoUrl }),
      });
    }
  };

  useEffect(() => {
    refreshPlaylist();
  }, []);

  const handleVideoSelect = (url) => {
    const videoId = extractYouTubeVideoId(url);
    if (videoId) {
      const cleanUrl = `https://youtu.be/${videoId}`;
      sendVideoSyncAction(roomId, "change", 0, cleanUrl);
    }
  };

  const currentVideoId = playlist.find(v => 
    extractYouTubeVideoId(v.youtubeUrl) === extractYouTubeVideoId(selectedVideoUrl)
  )?.id;

  const handleSkip5Seconds = () => {
    if (!playerRef.current) return;
    const currentTime = playerRef.current.getCurrentTime();
    const newTime = currentTime + 5;
    sendVideoSyncAction(roomId, "seek", newTime);
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

  const handleDeleteVideo = async (id) => {
    try {
      const videoToDelete = playlist.find((v) => v.id === id);
      const isDeletingCurrent =
        videoToDelete &&
        selectedVideoUrl &&
        extractYouTubeVideoId(videoToDelete.youtubeUrl) ===
          extractYouTubeVideoId(selectedVideoUrl);

      await deleteVideo(id);
      setPlaylist((prev) => prev.filter((v) => v.id !== id));
      sendVideoSyncAction(roomId, "playlist_update");
      if (isDeletingCurrent) handleSkip();
    } catch (err) {
      console.error("❌ Delete failed:", err);
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

  const copyLink = () => {
    const text = window.location.href;
    navigator.clipboard.writeText(text).then(() => {
      alert("Room link copied!");
    });
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "20px" }}>
      {/* Header Area */}
      <div style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center", 
        marginBottom: "30px",
        gap: "20px"
      }}>
        <div style={{ textAlign: "left" }}>
          <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px", color: "var(--primary)", marginBottom: "8px" }}>
            <Headphones size={24} />
            <h2 style={{ fontSize: "1rem", fontWeight: "700" }}>BondBeat</h2>
          </Link>
          <h1 style={{ fontSize: "2.4rem", fontWeight: "800", color: "#fff" }}>
            #{roomId}
          </h1>
        </div>
        
        <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
          <div className="glass-card" style={{ padding: "8px 16px", display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ color: "#fff", fontSize: "0.9rem" }}>{username}</div>
            <button onClick={handleLogout} style={{ background: "transparent", border: "none", color: "#fb7185", cursor: "pointer" }}>
              <LogOut size={18} />
            </button>
          </div>
          <button onClick={copyLink} className="premium-button" style={{ padding: "10px 16px", borderRadius: "10px" }}>
            Invite friends
          </button>
        </div>
      </div>

      <div style={{ 
        display: "flex", 
        flexDirection: window.innerWidth < 1024 ? "column" : "row",
        gap: "30px"
      }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "24px", flex: 2 }}>
          <YouTubePlayer videoUrl={selectedVideoUrl} onReady={handleReady} />
          
          <div style={{ display: "grid", gridTemplateColumns: window.innerWidth < 1024 ? "1fr" : "1fr 1fr", gap: "24px" }}>
            <div className="glass-card" style={{ padding: "20px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <h3 style={{ marginBottom: "16px", color: "var(--primary)", fontSize: "1rem", fontWeight: "600" }}>
                Playback Controls
              </h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", width: "100%" }}>
                <button onClick={handlePause} className="premium-button secondary" style={{ height: "48px", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", width: "100%", padding: 0 }}>
                  <Pause size={18} fill="white" /> Pause
                </button>
                <button onClick={handlePlay} className="premium-button" style={{ height: "48px", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", width: "100%", padding: 0 }}>
                  <Play size={18} fill="white" /> Play
                </button>
                <button onClick={handleSkip5Seconds} className="premium-button secondary" style={{ height: "48px", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", width: "100%", padding: 0 }}>
                  <FastForward size={18} /> +5 Sec
                </button>
                <button onClick={handleSkip} className="premium-button secondary" style={{ height: "48px", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", width: "100%", padding: 0 }}>
                  <SkipForward size={18} /> Next
                </button>
              </div>
            </div>
            
            <AddVideoForm currentUsername={username} onVideoAdded={(newVideo) => {
              setPlaylist((prev) => [...prev, newVideo]);
              sendVideoSyncAction(roomId, "playlist_update");
            }} />
          </div>

          <Recommendations videoId={currentVideoId} onVideoSelect={handleVideoSelect} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "30px", flex: 1 }}>
          <Playlist
            playlist={playlist}
            onVideoSelect={handleVideoSelect}
            onDelete={handleDeleteVideo} 
            currentVideoUrl={selectedVideoUrl}
          />
          <ChatBox username={username} roomId={roomId} />
        </div>
      </div>
    </div>
  );
};

export default Room;
