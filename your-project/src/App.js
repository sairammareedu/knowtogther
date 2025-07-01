import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Intro from "./components/Intro";
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import CreatePost from "./components/CreatePost";
import DsaPage from "./components/dsapage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 3000); // Show intro for 3 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      {showIntro ? (
        <Intro />
      ) : (
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/dsa" element={<DsaPage />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
