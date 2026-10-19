import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";
  import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Cart = () => {

  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(data);
  }, []);

  // ✅ Increase quantity
  const handleIncrease = (id) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart = cart.map((item) =>
      item.id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );

    localStorage.setItem("cart", JSON.stringify(cart));

    setCartItems(cart); // ✅ FIXED

    window.dispatchEvent(new Event("cartUpdated"));
  };

  // ✅ Decrease quantity
  const handleDecrease = (id) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart = cart
      .map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0);

    localStorage.setItem("cart", JSON.stringify(cart));

    setCartItems(cart); // ✅ FIXED

    window.dispatchEvent(new Event("cartUpdated"));
  };

 


const removeItem = (id) => {

  Swal.fire({
    title: "Remove item?",
    text: "Do you want to remove this product from cart?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, remove",
    cancelButtonText: "No",
  }).then((result) => {

    if (result.isConfirmed) {

      const updatedCart = cartItems.filter((item) => item.id !== id);

      setCartItems(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));

      window.dispatchEvent(new Event("cartUpdated"));

      Swal.fire("Removed!", "Item removed from cart", "success");
    }

  });
};


const getTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const handleCheckout = () => {
  const user = localStorage.getItem("user");

  if (!user) {
    // Save intent
    localStorage.setItem("redirectAfterLogin", "/checkout");
    navigate("/login");
  } else {
    navigate("/checkout");
  }
};

  return (
    <>
    <Topbar/>
      <Navbar />

      <div className="cart-wrapper">

  {/* LEFT SIDE */}
  <div className="cart-items-section">
    <h2>Your Cart</h2>

    {cartItems.length === 0 ? (
      <p>Your cart is empty</p>
    ) : (
      cartItems.map((item) => (
        <div className="cart-item" key={item.id + (item.selectedVariant?.id || "")}>
          <img src={item.main_image} alt={item.name} />

           <div className="cart-details">
            <div>
              <h3>{item.name}</h3>
 
            {item.selectedVariant && (
              <p className="variant-text">
                {item.selectedVariant.unit}
              </p>
            )}
 
            <p>₹{item.price}</p>
            </div>
           
 
            <div className="increment">
              <div className="quantity-box">
              <button onClick={() => handleDecrease(item.id)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => handleIncrease(item.id)}>+</button>
            </div>
 
            <button
              className="remove-btn"
              onClick={() => removeItem(item.id)}
            >
              Remove
            </button>
            </div>
          </div>
        </div>
      ))
    )}
  </div>

  {/* RIGHT SIDE */}
<div className="cart-summary">

  <div className="summary-box">

    <h3>Order Summary</h3>

    <div className="summary-row">
      <span>Subtotal</span>
      <span>₹{getTotal()}</span>
    </div>

    <div className="summary-row total">
      <span>Total</span>
      <span>₹{getTotal()}</span>
    </div>

    {/* Trust Badge */}
    <div className="secure-note">
      🔒 100% Secure Checkout
    </div>

   <button className="checkout-btn" onClick={handleCheckout}>
  Proceed to Checkout →
</button>

  </div>

</div>

</div>

      <Footer />
    </>
  );
};

export default Cart;