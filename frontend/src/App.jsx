import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Room from "./pages/Room";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/room/:roomId" element={
          <PrivateRoute>
            <Room />
          </PrivateRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
