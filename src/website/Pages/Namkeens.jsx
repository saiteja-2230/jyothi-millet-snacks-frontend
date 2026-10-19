import React, { useEffect, useState } from "react";
import axios from "axios";
import { ShoppingCart } from "lucide-react";
// import "./Namkeens.css";
import Topbar from "../components/Topbar";
import Navbar from "../components/navbar";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/Whatsapp";
import { API_ENDPOINTS } from "../../api/endpoints";
import { useNavigate } from "react-router-dom";

const Namkeens = () => {
  const [namkeens, setNamkeens] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()

  // const API_URL = "http://localhost:4000/productss"; 
  // replace with your correct local IP if needed

  useEffect(() => {
    axios
      .get(API_ENDPOINTS.productss)
      .then((res) => {
        const filtered = res.data.filter(
          (item) => item.category === "Namkeens"
        );
        setNamkeens(filtered);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error fetching namkeens:", err);
        setLoading(false);
      });
  }, []);



const handleAddToCart = (product) => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existing = cart.find((item) => item.id === product.id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  // ❌ remove navigation
  // navigate("/cart");

  // ✅ trigger update event (important for navbar count)
  window.dispatchEvent(new Event("cartUpdated"));
};

  return (
    <>
    <Topbar/>
    <Navbar/>
    <section className="namkeens-section">
      <div className="container">
        <div className="namkeens-header">
          <h2>Our Namkeens</h2>
          <p>
            Explore our crunchy, spicy, and handcrafted namkeen collection made
            with authentic flavors.
          </p>
        </div>

        {loading ? (
          <p className="loading-text">Loading Namkeens...</p>
        ) : namkeens.length === 0 ? (
          <p className="loading-text">No Namkeens found.</p>
        ) : (
          <div className="namkeens-grid">
            {namkeens.map((item) => (
              <div className="namkeen-card" key={item.id}>
                <div
  className="namkeen-image"
  onClick={() => navigate(`/product/${item.id}`)}
  style={{ cursor: "pointer" }}
>
  <img src={item.image} alt={item.name} />
</div>

                <div className="namkeen-content">
                  <h3 className="product-title">{item.name}</h3>
                  <p className="product-description">{item.description}</p>

                  <div className="namkeen-bottom">
                    <div className="price-box">
                      <span className="base-price">₹{item.base_price}</span>
                      <span className="discount-price">
                        ₹{item.discount_price}
                      </span>
                    </div>

                    <button
  className="cart-btn"
  onClick={() => handleAddToCart(item)}
>
  <ShoppingCart size={20} />
</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
    <Footer/>
    <WhatsAppButton/>
    </>
  );
};

export default Namkeens;