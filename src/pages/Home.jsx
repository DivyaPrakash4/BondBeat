import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const createRoom = () => {
    const roomId = Math.random().toString(36).substring(2, 8);
    navigate(`/room/${roomId}`);
  };

  return (
    <div style={{ textAlign: "center", paddingTop: "100px" }}>
      <h1>🎧 Welcome to BondBeat</h1>
      <button onClick={createRoom}>Create & Share Room</button>
    </div>
  );
};

export default Home;
