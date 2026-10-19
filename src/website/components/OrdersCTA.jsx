import React from "react";
import { useNavigate } from "react-router-dom";
// import "./OrderCTA.css";

const OrderCTA = () => {

  const navigate = useNavigate()

  const Contact = ()=>{
    navigate("/contact-us/")
  }

  return (
  <div className="container">
  <section className="order-cta">
    <div className="order-cta-container">

      <div className="order-cta-left">
        <h2>We Undertake Orders</h2>
        <p>Place your custom and bulk orders with ease.</p>
      </div>

      <div className="order-cta-right">
        <button className="contact-btn" onClick={Contact}>
          Contact Us →
        </button>
      </div>

    </div>
  </section>
</div>
  );
};

export default OrderCTA;