import React, { useState, useEffect } from "react";
import "./Home.css";
import { FaHeart, FaRegComment, FaPaperPlane, FaBookmark } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "Guest",
    email: "",
    profileImage: "",
  });

  const [posts, setPosts] = useState([]);

  const fetchUserProfile = async () => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (!userData?.email) return;
    try {
      const res = await axios.get(`http://localhost:8080/api/auth/user/${userData.email}`);
      setUser(res.data);
    } catch (err) {
      console.error("Error fetching profile", err);
    }
  };

  const fetchPosts = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/posts/all");
      setPosts(res.data.reverse()); // Show newest posts first
    } catch (err) {
      console.error("Error fetching posts", err);
    }
  };

  const handleProfileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = async () => {
      try {
        await axios.post("http://localhost:8080/api/auth/upload-profile", {
          email: user.email,
          image: reader.result,
        });
        fetchUserProfile();
      } catch (err) {
        console.error("Error uploading image", err);
      }
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    fetchUserProfile();
    fetchPosts();
  }, []);

  return (
    <div className="insta-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="profile-section">
          <img
            src={user.profileImage || "/default-profile.png"}
            alt="Profile"
            className="profile-pic"
            onClick={() => document.getElementById("fileInput").click()}
          />
          <input
            id="fileInput"
            type="file"
            style={{ display: "none" }}
            onChange={handleProfileUpload}
          />
          <h2>{user.name}</h2>
          <p>@{user.email?.split("@")[0]}</p>
        </div>
        <div className="sidebar-links">
          <a href="#">DSA</a>
          <a href="#">Aptitude</a>
          <a href="#">Interview experience</a>
          <a href="#">Logout</a>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="topbar">
          <input type="text" className="search-input" placeholder="Search..." />
          <button className="create-btn" onClick={() => navigate("/create-post")}>
            + Create a post
          </button>
        </div>

        <div className="feed-grid">
          {posts.map((post, index) => (
            <div className="post" key={post.id || index}>
              <div className="post-header">
                <img
                  src={"/default-profile.png"} // If you store user image in post model, replace here
                  alt="User"
                  className="post-user-img"
                />
                <div>
                  <strong>{post.userEmail?.split("@")[0] || "User"}</strong>
                  <p>{post.title || "Untitled Post"}</p>
                </div>
              </div>

              {post.image && (
                <img
                  src={`data:image/jpeg;base64,${post.image}`}
                  alt="Post"
                  className="post-img"
                />
              )}

              <div className="post-actions">
                <FaHeart /> <FaRegComment /> <FaPaperPlane />
                <span className="bookmark">
                  <FaBookmark />
                </span>
              </div>
              <p className="likes">Liked by many others</p>
              <p className="caption">{post.content || "No content available."}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
