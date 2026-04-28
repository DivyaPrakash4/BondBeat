import React, { useEffect, useRef } from "react";
import YouTube from "react-youtube";
import { extractYouTubeVideoId } from "../services/utils";

const YouTubePlayer = ({ videoUrl, onReady }) => {
  const playerRef = useRef(null);

  const videoId = extractYouTubeVideoId(videoUrl);

  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 0,
      controls: 1,
      enablejsapi: 1,
      modestbranding: 1,
      rel: 0,
    },
  };

  const handleReady = (event) => {
    playerRef.current = event.target;
    if (onReady) onReady(event);
  };

  return (
    <div className="glass-card" style={{ 
      position: "relative",
      padding: "20px",
      width: "100%",
      aspectRatio: "16/9",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden"
    }}>
      {videoId ? (
        <YouTube 
          videoId={videoId} 
          opts={opts} 
          onReady={handleReady} 
          style={{ width: "100%", height: "100%" }}
          className="youtube-iframe-container"
        />
      ) : (
        <div style={{ textAlign: "center", color: "rgba(255,255,255,0.4)" }}>
          <div style={{ fontSize: "3rem", marginBottom: "10px" }}>📺</div>
          <p>Select a video to start streaming together</p>
        </div>
      )}
    </div>
  );
};

export default YouTubePlayer;
