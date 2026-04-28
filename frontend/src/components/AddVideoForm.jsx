import { useState } from "react";
import { addVideo } from "../services/api";
import { Plus, Link as LinkIcon, Edit3, Tag, Hash } from "lucide-react";

function AddVideoForm({ onVideoAdded, currentUsername }) {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Music");
  const [keywords, setKeywords] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url || !title) return;
    const video = { 
      youtubeUrl: url, 
      title, 
      addedBy: currentUsername,
      category,
      keywords
    };
    try {
      const res = await addVideo(video);
      onVideoAdded(res);
      setUrl("");
      setTitle("");
      setKeywords("");
    } catch (err) {
      console.error("Add video failed", err);
    }
  };

  return (
    <div className="glass-card" style={{ padding: "20px", width: "100%" }}>
      <h3 style={{ marginBottom: "16px", color: "var(--primary)", display: "flex", alignItems: "center", gap: "8px", fontSize: "1rem" }}>
        <Plus size={18} /> Add Video
      </h3>
      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "12px" }}>
        <div style={{ position: "relative" }}>
          <Edit3 size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "white", opacity: 0.3 }} />
          <input
            placeholder="Video Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="input-field"
            style={{ width: "100%", paddingLeft: "42px" }}
          />
        </div>
        
        <div style={{ position: "relative" }}>
          <LinkIcon size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "white", opacity: 0.3 }} />
          <input
            placeholder="YouTube URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            className="input-field"
            style={{ width: "100%", paddingLeft: "42px" }}
          />
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <div style={{ position: "relative", flex: 1 }}>
            <Tag size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "white", opacity: 0.3 }} />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="input-field"
              style={{ width: "100%", paddingLeft: "42px", appearance: "none" }}
            >
              <option value="Music">Music</option>
              <option value="Gaming">Gaming</option>
              <option value="Education">Education</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div style={{ position: "relative", flex: 2 }}>
            <Hash size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "white", opacity: 0.3 }} />
            <input
              placeholder="Keywords (comma separated)"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              className="input-field"
              style={{ width: "100%", paddingLeft: "42px" }}
            />
          </div>
        </div>

        <button type="submit" className="premium-button" style={{ width: "100%", padding: "10px" }}>
          <Plus size={18} /> Add to Room
        </button>
      </form>
    </div>
  );
}

export default AddVideoForm;
