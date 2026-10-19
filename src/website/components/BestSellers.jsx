import React, { useEffect, useState } from "react";
import axios from "axios";
// import { ShoppingCart } from "lucide-react";
import {  MessageCircleMore } from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { API_ENDPOINTS } from "../../api/endpoints";

import "swiper/css";
// import "./BestSellers.css";

const BestSellers = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(API_ENDPOINTS.bestsellers)
      .then((res) => {
        const best = res.data.filter((item) => item.bestseller);
        setProducts(best);
        console.log(best)
      })
      .catch((err) => console.log(err));
  }, []);

  const phoneNumber = "919052929239"; // Replace with your WhatsApp number
  const message = "Hello, I want to know more about your services";

  const handleClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <section className="best-section">
      <div className="container">
        <div className="section-header">
          <h2>Best Sellers</h2>
          <p>Most loved products by our customers</p>
        </div>

        <Swiper
          modules={[Autoplay]}
          slidesPerView={4}
          spaceBetween={20}
          loop={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            1200: { slidesPerView: 4 },
            992: { slidesPerView: 3 },
            768: { slidesPerView: 2 },
            0: { slidesPerView: 1 },
          }}
        >
          {products.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="best-card">
                <div className="best-image">
                  <img src={item.image} alt={item.name} />
                </div>

                <div className="best-content">
                  <h3>{item.name}</h3>

                  <div className="best-bottom">
                    <div className="price-box">
                      <span className="base-price">₹{item.base_price}</span>
                      <span className="discount-price">₹{item.discount_price}</span>
                    </div>

                    <button className="cart-btn" onClick={handleClick}>
                      <MessageCircleMore size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default BestSellers;