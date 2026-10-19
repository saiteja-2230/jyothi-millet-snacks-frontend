import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import "./HeroBanner.css";
// import bannerData from "./bannerData";

const HeroBanner = () => {

const bannerData = [
  {
    id: 1,
    title: "Authentic Andhra Pickles",
    subtitle: "Homemade Taste with Traditional Flavours",
    buttonText: "Shop Now",
    desktopImage: "./pickelsbanner.jpeg",
    mobileImage: "./pickelsmobilebanner.jpeg",
  },
  {
    id: 2,
    title: "Fresh Traditional Sweets",
    subtitle: "Delicious Treats for Every Celebration",
    buttonText: "Order Now",
    desktopImage: "./sweetsbanner.jpeg",
    mobileImage: "./sweetsmobilebanner.jpeg",
  },
  {
    id: 3,
    title: "Crispy Namkeens & Snacks",
    subtitle: "Perfect Crunch for Your Tea-Time Cravings",
    buttonText: "Buy Now",
    desktopImage: "./namkeensbanner.jpeg",
    mobileImage: "./namkeensmobilebanner.jpeg",
  },
];



  return (
    <section className="hero-banner-wrapper">
      <Swiper
        modules={[Autoplay, Pagination]}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        speed={1000}
        pagination={{ clickable: true }}
        navigation={true}
        className="hero-swiper"
      >
        {bannerData.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="hero-slide">
              {/* Desktop Banner */}
              <img
                src={item.desktopImage}
                alt={item.title}
                className="hero-image desktop-banner"
              />

              {/* Mobile Banner */}
              <img
                src={item.mobileImage}
                alt={item.title}
                className="hero-image mobile-banner"
              />

              {/* Text Content */}
              {/* <div className="hero-content">
                <p className="hero-subtitle">{item.subtitle}</p>
                <h1 className="hero-title">{item.title}</h1>
                <button className="hero-btn">{item.buttonText}</button>
              </div> */}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HeroBanner;