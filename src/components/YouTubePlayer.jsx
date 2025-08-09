import React, { useEffect, useRef } from "react";
import YouTube from "react-youtube";
import { extractYouTubeVideoId } from "../services/utils";

const YouTubePlayer = ({ videoUrl, onReady }) => {
  const playerRef = useRef(null);

  const videoId = extractYouTubeVideoId(videoUrl); // Always extract clean ID

  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 0,
      controls: 1,
      enablejsapi: 1,
      origin: window.location.origin,
    },
  };

  const handleReady = (event) => {
    playerRef.current = event.target;
    if (onReady) onReady(event);
  };

  return videoId ? (
    <YouTube videoId={videoId} opts={opts} onReady={handleReady} />
  ) : (
    <p>No video selected or invalid URL</p>
  );
};

export default YouTubePlayer;
