import React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();

  const isLoggedIn = () => {
    const user = localStorage.getItem("user");
    return user !== null;
  };

 

  

  const handleGetStarted = () => {
    navigate(isLoggedIn() ? "/home" : "/login");
  };

  return (
    <>
      <div className="navbar">
        <img src="/knowTogetherLogo.png" alt="KnowTogether Logo" className="logo" />
        <div className="nav-buttons">
  <button onClick={() => navigate(localStorage.getItem("user") ? "/home" : "/login")}>Home</button>
  <button onClick={() => navigate("/login")}>Login</button>
  <button onClick={() => navigate("/register")}>Signup</button>
</div>
      </div>

      <div className="container">
        <h1 className="heading">Start Your Interview Prep Journey!</h1>
        <p className="subheading">
          DSA, Aptitude, Core Subjects – All in One Place
        </p>
        <button className="get-started-btn" onClick={handleGetStarted}>
          Get Started
        </button>

        <div className="cards">
          <div className="card">
            <h3>DSA Prep</h3>
            <p>Prepare for coding interviews with DSA questions</p>
          </div>
          <div className="card">
            <h3>Aptitude Practice</h3>
            <p>Enhance your problem-solving skills and speed</p>
          </div>
          <div className="card">
            <h3>Interview Guidance</h3>
            <p>Get tips & strategies for acing interviews</p>
          </div>
          <div className="card">
            <h3>Core Subjects Awareness</h3>
            <p>Understand key concepts in core subjects</p>
          </div>
        </div>
      </div>

      <div className="footer">
        <p>
          <a href="https://twitter.com"><b>X</b></a>
          <a href="https://linkedin.com">💼</a>
          <a href="mailto:contact@knowtogether.com">✉️</a>
        </p>
        <p>contact@knowtogether.com</p>
        <p>© 2025 Know Together, For college use only</p>
      </div>
    </>
  );
};

export default LandingPage;
