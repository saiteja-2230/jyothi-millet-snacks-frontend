
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ShoppingCart } from "lucide-react";
// import "./BestSeller.css";
import { API_ENDPOINTS } from "../../api/endpoints";
import ProductCard from "./ProductCard";
 
const BestSeller = () => {
  const [products, setProducts] = useState([]);
 
  useEffect(() => {
    axios
      .get(API_ENDPOINTS.bestseller)
      .then((res) => {
        setProducts(res.data); // ✅ direct data
      })
      .catch((err) => console.error(err));
  }, []);
 
 const addToCart = (item) => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
 
  const existingItem = cart.find(
    (i) =>
      i.id === item.id &&
      i.selectedVariant?.id === item.selectedVariant?.id
  );
 
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      ...item,
      quantity: 1,
    });
  }
 
  localStorage.setItem("cart", JSON.stringify(cart));
 
  // 🔥 THIS IS THE KEY
  window.dispatchEvent(new Event("cartUpdated"));
};
 
  return (
    <div className="best-container">
      <h2 className="title">Best Sellers</h2>
        <p className="text-center">
    Our most loved products by customers
  </p>
 
     <div className="specialities-grid">
     
               {products.slice(0, 12).map((item) => (
                 <ProductCard
                   key={item.id}
                   item={item}
                   addToCart={addToCart}
                 />
               ))}
     
             </div>
    </div>
  );
};
 
export default BestSeller;
 