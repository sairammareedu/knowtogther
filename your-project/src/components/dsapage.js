import React, { useEffect, useState } from "react";
import "./DsaPage.css";

function DsaPage() {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/dsa/topics")
      .then((response) => response.json())
      .then((data) => setTopics(data))
      .catch((error) => console.error("Error fetching DSA topics:", error));
  }, []);

  return (
    <div className="dsa-page">
      <h2>DSA Topics</h2>
      <div className="dsa-topic-list">
        {topics.map((topic, index) => (
          <div key={index} className="dsa-card">
            <h3>{topic.name}</h3>
            <p>{topic.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DsaPage;