import axios from "axios";

const AUTH_URL = `http://${window.location.hostname}:8081/api/auth`;
const ROOM_URL = `http://${window.location.hostname}:8082/api`;

// Axios instance with interceptor for JWT
const api = axios.create();

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const login = async (username, password) => {
  const res = await axios.post(`${AUTH_URL}/signin`, { username, password });
  if (res.data.token) {
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("username", res.data.username);
  }
  return res.data;
};

export const register = async (username, email, password) => {
  return await axios.post(`${AUTH_URL}/signup`, { username, email, password });
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
};

// Playlist API (Room Service)
export const fetchPlaylistFromBackend = async () => {
  const res = await api.get(`${ROOM_URL}/playlist/all`);
  return res.data;
};

export const addVideo = async (video) => {
  const res = await api.post(`${ROOM_URL}/playlist/add`, video);
  return res.data;
};

export const deleteVideo = async (id) => {
  await api.delete(`${ROOM_URL}/playlist/delete/${id}`);
  return true;
};

// Recommendation API (Room Service)
export const fetchRecommendations = async (videoId) => {
  const res = await api.get(`${ROOM_URL}/recommendations?videoId=${videoId}`);
  return res.data;
};
