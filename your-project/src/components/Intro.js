import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Intro.css";

export default function Intro() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/"); // After 3 seconds go to Login
    }, 500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="intro-container">
      <img src="/knowTogetherLogo.png" alt="KnowTogether Logo" className="logo" />
      <div className="loading-text">Loading KnowTogether...</div>
      <div className="dots">
        <span>.</span><span>.</span><span>.</span>
      </div>
    </div>
  );
}
