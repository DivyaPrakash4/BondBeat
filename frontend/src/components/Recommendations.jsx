import React, { useEffect, useState } from "react";
import { fetchRecommendations } from "../services/api";
import { Sparkles, Play } from "lucide-react";

const Recommendations = ({ videoId, onVideoSelect }) => {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    if (videoId) {
      fetchRecommendations(videoId)
        .then(setRecommendations)
        .catch(err => console.error("Failed to fetch recommendations:", err));
    }
  }, [videoId]);

  if (recommendations.length === 0) return null;

  return (
    <div className="glass-card" style={{ padding: "20px", marginTop: "20px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "15px" }}>
        <Sparkles size={18} color="var(--primary)" />
        <h3 style={{ fontSize: "1.1rem", fontWeight: "600" }}>Recommended for You</h3>
      </div>
      <div style={{ display: "flex", gap: "15px", overflowX: "auto", paddingBottom: "10px" }} className="scroll-thin">
        {recommendations.map((video) => (
          <div 
            key={video.id} 
            onClick={() => onVideoSelect(video.youtubeUrl)}
            style={{ 
              minWidth: "200px", 
              cursor: "pointer", 
              background: "rgba(255,255,255,0.05)", 
              borderRadius: "12px",
              overflow: "hidden",
              transition: "transform 0.2s"
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.03)"}
            onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
          >
            <div style={{ height: "110px", background: "#333", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Play size={24} color="white" style={{ opacity: 0.5 }} />
              <img 
                src={`https://img.youtube.com/vi/${getYoutubeId(video.youtubeUrl)}/mqdefault.jpg`} 
                alt="thumbnail" 
                style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", top: 0, left: 0 }} 
              />
            </div>
            <div style={{ padding: "10px" }}>
              <div style={{ fontSize: "0.85rem", fontWeight: "600", color: "#fff", height: "2.4rem", overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
                {video.title}
              </div>
              <div style={{ fontSize: "0.7rem", opacity: 0.5, marginTop: "5px" }}>{video.category || "General"}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

function getYoutubeId(url) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

export default Recommendations;
