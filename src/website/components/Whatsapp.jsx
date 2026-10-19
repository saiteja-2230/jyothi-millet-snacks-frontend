import React from "react";
import { MessageCircleMore } from "lucide-react";
// import "./whatsapp.css";

const WhatsAppButton = () => {
  const phoneNumber = "919912129079"; // Replace with your WhatsApp number
  const message = "Hello, I want to know more about your services";

  const handleClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <button className="whatsapp-container" onClick={handleClick}>
      <MessageCircleMore className="whatsapp-icon" strokeWidth={2.5} />
    </button>
  );
};

export default WhatsAppButton;