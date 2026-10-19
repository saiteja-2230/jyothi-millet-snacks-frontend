import axios from "axios";
import Footer from "../components/Footer";
import Navbar from "../components/navbar";
import Topbar from "../components/Topbar";
import WhatsAppButton from "../components/Whatsapp";
import { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { API_ENDPOINTS } from "../../api/endpoints";

function Rosted() {

     const [rosted, setrosted] = useState([]);
              const [loading, setLoading] = useState(true);
            
              // const API_URL = "http://localhost:4000/productss"; 
              // replace with your correct local IP if needed
            
              useEffect(() => {
                axios
                  .get(API_ENDPOINTS.productss)
                  .then((res) => {
                    const filtered = res.data.filter(
                      (item) => item.category === "Rosted"
                    );
                    setrosted(filtered);
                    setLoading(false);
                  })
                  .catch((err) => {
                    console.log("Error fetching rosted:", err);
                    setLoading(false);
                  });
              }, []);
            
              const phoneNumber = "919052929239";
            
              const handleClick = (productName) => {
                const message = `Hello, I want to know more about ${productName}`;
                const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
                window.open(url, "_blank");
              };

    return ( 
        <div>
            <Topbar/>
            <Navbar/>
 <section className="namkeens-section">
      <div className="container">
        <div className="namkeens-header">
          <h2>Our rosted</h2>
          <p>
            Explore our  tasty, and handcrafted rosted collection made
            with authentic flavors.
          </p>
        </div>

        {loading ? (
          <p className="loading-text">Loading rosted...</p>
        ) : rosted.length === 0 ? (
          <p className="loading-text">No rosted found.</p>
        ) : (
          <div className="namkeens-grid">
            {rosted.map((item) => (
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
                      onClick={() => handleClick(item.name)}
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

export default Rosted;