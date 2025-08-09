import { useState } from "react";
import { addVideo } from "../services/api";

function AddVideoForm({ onVideoAdded }) {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [addedBy, setAddedBy] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const video = { youtubeUrl: url, title, addedBy };
    const res = await addVideo(video);
    onVideoAdded(res);
    setUrl("");
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        placeholder="Nickname"
        value={addedBy}
        onChange={(e) => setAddedBy(e.target.value)}
        required
        style={styles.input}
      />
      <input
        placeholder="YouTube URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required
        style={styles.input}
      />
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        style={styles.input}
      />
      <button type="submit" style={styles.button}>Add Video</button>
    </form>
  );
}

const styles = {
  form: {
    marginTop: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    maxWidth: "500px",
    marginInline: "auto",
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "1rem",
  },
  button: {
    padding: "10px",
    fontSize: "1rem",
    backgroundColor: "#4caf50",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default AddVideoForm;
