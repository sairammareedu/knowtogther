import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Login.css"; // Reused styling

export default function Register() {
  const [name, setName] = useState(""); // added name input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

 const register = async () => {
  try {
    const res = await axios.post("http://localhost:8080/api/auth/register", {
      name,
      email,
      password,
      role: "student", // or dynamically chosen
      imageUrl: ""     // optional: you can skip or add an input for this
    });

    if (res.data === "User registered successfully" || res.data === "User already exists") {
      // ✅ Auto-login after successful registration
      const loginRes = await axios.post("http://localhost:8080/api/auth/login", {
        email,
        password
      });

      if (loginRes.data === "Login successful") {
        toast.success("Registered and logged in!");
        navigate("/home");
      } else {
        toast.error("Login failed after registration.");
      }
    } else {
      toast.error(res.data);
    }
  } catch (err) {
    toast.error("Registration or login error");
  }
};


  return (
    <div className="login-page">
      <div className="login-box">
        <div className="brand-header">
          <img src="/knowTogetherLogo.png" alt="KnowTogether Logo" className="logo" />
        </div>
        <h2>Register</h2>
        <p className="subtext">Create a new account</p>

        <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

        <button className="btn primary" onClick={register}>Register</button>
        <button className="btn outline" onClick={() => navigate("/")}>Back to Login</button>
      </div>
    </div>
  );
}
