import { Play, Trash2, Video } from "lucide-react";

function Playlist({ playlist, onVideoSelect, onDelete, currentVideoUrl }) {
  return (
    <div className="glass-card" style={{ 
      width: "100%", 
      padding: "24px",
      minHeight: "450px"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
        <Video size={20} color="var(--primary)" />
        <h3 style={{ fontSize: "1.1rem" }}>Up Next</h3>
      </div>

      <div className="scroll-thin" style={{ 
        maxHeight: "360px", 
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        gap: "10px"
      }}>
        {playlist.length === 0 && (
          <div style={{ 
            textAlign: "center", 
            padding: "40px 20px", 
            color: "rgba(255,255,255,0.2)",
            background: "rgba(255,255,255,0.02)",
            borderRadius: "12px"
          }}>
            Playlist is empty. Add a song!
          </div>
        )}

        {playlist.map((video, index) => {
          // Normalizing for comparison
          const normalizeUrl = (u) => u?.replace("youtu.be/", "youtube.com/watch?v=");
          const isActive = normalizeUrl(video.youtubeUrl) === normalizeUrl(currentVideoUrl) || 
                          video.youtubeUrl?.includes(currentVideoUrl?.split("/").pop());

          return (
            <div 
              key={index} 
              className="fade-in"
              style={{ 
                display: "flex", 
                alignItems: "center", 
                gap: "12px",
                padding: "12px 16px",
                borderRadius: "10px",
                background: isActive ? "linear-gradient(90deg, rgba(99, 102, 241, 0.2), transparent)" : "rgba(255,255,255,0.03)",
                border: isActive ? "1px solid rgba(99, 102, 241, 0.4)" : "1px solid transparent",
                transition: "all 0.2s ease"
              }}
            >
              <button
                onClick={() => onVideoSelect(video.youtubeUrl)}
                style={{
                  flex: 1,
                  background: "none",
                  border: "none",
                  color: "white",
                  textAlign: "left",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  fontSize: "0.95rem",
                  fontWeight: isActive ? "600" : "400"
                }}
              >
                <div style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "8px",
                  background: isActive ? "var(--primary)" : "rgba(255,255,255,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: isActive ? "0 0 12px rgba(99, 102, 241, 0.4)" : "none"
                }}>
                  <Play size={14} fill={isActive ? "white" : "none"} />
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ color: isActive ? "var(--primary)" : "white" }}>{video.title}</span>
                  <span style={{ fontSize: "0.75rem", opacity: 0.5 }}>Added by {video.addedBy}</span>
                </div>
              </button>

              <button
                onClick={() => onDelete(video.id)}
                className="premium-button secondary"
                style={{ 
                  background: "none", 
                  padding: "8px", 
                  borderRadius: "8px",
                  color: "rgba(255,255,255,0.3)"
                }}
                onMouseOver={(e) => e.target.style.color = "#f43f5e"}
                onMouseOut={(e) => e.target.style.color = "rgba(255,255,255,0.3)"}
              >
                <Trash2 size={16} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Playlist;
