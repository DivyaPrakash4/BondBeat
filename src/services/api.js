import axios from "axios";

const BASE_URL = "http://localhost:8080/api/playlist";

export const fetchPlaylistFromBackend = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/all`);
    return res.data;
  } catch (err) {
    console.error("❌ Error fetching playlist:", err);
    throw err;
  }
};

export const addVideo = async (video) => {
  try {
    const res = await axios.post(`${BASE_URL}/add`, video);
    return res.data;
  } catch (err) {
    console.error("❌ Error adding video:", err);
    throw err;
  }
};

