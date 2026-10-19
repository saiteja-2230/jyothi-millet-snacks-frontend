import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/navbar";
import Topbar from "../components/Topbar";
import WhatsAppButton from "../components/Whatsapp";
import { ShoppingCart } from "lucide-react";
import axios from "axios";
import { API_ENDPOINTS } from "../../api/endpoints";


function Powders() {
    const [powders, setpowders] = useState([]);
          const [loading, setLoading] = useState(true);
        
          // const API_URL = "http://localhost:4000/productss"; 
          // replace with your correct local IP if needed
        
          useEffect(() => {
            axios
              .get(API_ENDPOINTS.productss)
              .then((res) => {
                const filtered = res.data.filter(
                  (item) => item.category === "Powders"
                );
                setpowders(filtered);
                setLoading(false);
              })
              .catch((err) => {
                console.log("Error fetching powders:", err);
                setLoading(false);
              });
          }, []);
        
             const addToCart = (item) => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingItem = cart.find((i) => i.id === item.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  // 🔥 Update cart count globally (important)
  window.dispatchEvent(new Event("cartUpdated"));
};
     
    return ( 
        <div>
            <Topbar/>
            <Navbar/>
             <section className="namkeens-section">
      <div className="container">
        <div className="namkeens-header">
          <h2>Our Powders</h2>
          <p>
            Explore our smooth, tasty, and handcrafted pappads collection made
            with authentic flavors.
          </p>
        </div>

        {loading ? (
          <p className="loading-text">Loading Powders...</p>
        ) : powders.length === 0 ? (
          <p className="loading-text">No Powders found.</p>
        ) : (
          <div className="namkeens-grid">
            {powders.map((item) => (
              <div className="namkeen-card" key={item.id}>
                <div className="namkeen-image">
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
  onClick={() => addToCart(item)}
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
        </div>
     );
}

export default Powders;