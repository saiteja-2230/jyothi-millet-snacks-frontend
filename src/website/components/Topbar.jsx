import React, { useEffect, useState } from "react";
import axios from "axios";
// import "./Topbar.css";
import { API_ENDPOINTS } from "../../api/endpoints";

const Topbar = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get(API_ENDPOINTS.notifications);
        console.log(res)
        const filtered = res.data
          .filter((item) => item.active)
          .sort((a, b) => a.priority - b.priority);

        setMessages(filtered);
        
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div className="topbar">
      <div className="marquee-wrapper">
        <div className="marquee-track">
  {[...messages, ...messages, ...messages].map((item, index) => (
    <span className="marquee-item" key={`${item.id}-${index}`}>
      {item.message}
    </span>
  ))}
</div>
      </div>
    </div>
  );
};

export default Topbar;