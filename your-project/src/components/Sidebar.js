import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Sidebar.css"; // optional CSS

const Sidebar = () => {
  const [user, setUser] = useState({});
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
    if (storedUser?.profileImage) {
      setPreview(`data:image/jpeg;base64,${storedUser.profileImage}`);
    }
  }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    setImage(file);
    const formData = new FormData();
    formData.append("email", user.email);
    formData.append("image", file);

    try {
      const res = await axios.post("http://localhost:8080/api/users/upload-profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setPreview(`data:image/jpeg;base64,${res.data.profileImage}`);
      alert("Profile image updated!");
    } catch (error) {
      console.error("Upload failed", error);
    }
  };

  return (
    <div className="sidebar">
      <label htmlFor="profileUpload">
        <img
          src={preview || "/default-avatar.png"}
          alt="Profile"
          className="profile-img"
        />
      </label>
      <input
        id="profileUpload"
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        style={{ display: "none" }}
      />
      <h2>{user.userName || "Guest"}</h2>
      <p>@{user.email}</p>
      {/* Your existing sidebar links */}
    </div>
  );
};

export default Sidebar;
