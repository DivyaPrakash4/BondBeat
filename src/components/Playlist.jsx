function Playlist({ playlist, onVideoSelect, currentVideoUrl }) {
  return (
    <ul style={styles.list}>
      {playlist.map((video, index) => {
        const isActive = video.youtubeUrl === currentVideoUrl;
        return (
          <li key={index} style={styles.item}>
            <button
              onClick={() => onVideoSelect(video.youtubeUrl)}
              style={{
                ...styles.button,
                ...(isActive ? styles.active : {}),
              }}
            >
              ▶ {video.title}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

const styles = {
  list: {
    listStyleType: "none",
    padding: 0,
    marginTop: "20px",
    maxWidth: "600px",
    marginInline: "auto",
  },
  item: {
    marginBottom: "8px",
  },
  button: {
    width: "100%",
    padding: "10px 15px",
    fontSize: "1rem",
    textAlign: "left",
    border: "1px solid #ccc",
    borderRadius: "6px",
    backgroundColor: "#f9f9f9",
    cursor: "pointer",
  },
  active: {
    backgroundColor: "#dfffd8",
    borderColor: "#4caf50",
    fontWeight: "bold",
  },
};

export default Playlist;
