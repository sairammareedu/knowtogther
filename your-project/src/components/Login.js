import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth, provider } from "../firebase"; // ✅ your firebase config
import { signInWithPopup } from "firebase/auth";
import "./Login.css";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // ✅ Backend Login
  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:8080/api/auth/login", {
        email,
        password,
      });

      if (res.data === "Login successful") {
        toast.success("Login successful");
        navigate("/home");
      } else {
        toast.error(res.data);
      }
    } catch (err) {
      toast.error("Login failed");
    }
  };

  // ✅ Google Login with Firebase
 const googleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Send to backend to register/login
    const res = await axios.post("http://localhost:8080/api/auth/register", {
      name: user.displayName,
      email: user.email,
      password: user.uid // unique & secure enough for Google login
    });

    if (
      res.data === "User registered successfully" ||
      res.data === "User already exists"
    ) {
      toast.success("Google Login Successful");
      navigate("/home");
    } else {
      toast.error("Google login failed: " + res.data);
    }
  } catch (err) {
    toast.error("Google login error: " + err.message);
    console.error(err);
  }
};


  return (
    <div className="login-page">
      <div className="login-box">
        <div className="brand-header">
    <img src="/knowTogetherLogo.png" alt="KnowTogether Logo" className="logo" />
  </div>
        <h2>Welcome!</h2>
        <p className="subtext">𝓛𝓸𝓰 𝓲𝓷 𝓽𝓸 𝔂𝓸𝓾𝓻 𝓪𝓬𝓬𝓸𝓾𝓷𝓽</p>

        <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />

        <button className="btn primary" onClick={handleLogin}>Sign In</button>
        <button className="btn outline" onClick={() => navigate("/register")}>Create Account</button>
        <button className="btn google" onClick={googleLogin}>
          <img src="https://img.icons8.com/color/16/google-logo.png" alt="G" />
          Continue with Google
        </button>
      </div>
    </div>
  );
}
