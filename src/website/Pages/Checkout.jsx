import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
const Checkout = () => {

  const [cart, setCart] = useState([]);


  const [address, setAddress] = useState({
    name: "",
    phone: "",
    house: "",
    apartment: "",
    street: "",
    landmark: "",
    city: "",
    state: "",
    pincode: "",
    type: "Home",
});

const [errors, setErrors] = useState({});

  const [loading, setLoading] = useState(false);



  useEffect(() => {

    const cartData =
        JSON.parse(localStorage.getItem("cart")) || [];

    setCart(cartData);

    const user =
        JSON.parse(localStorage.getItem("user"));

    if(user){

       setAddress(prev => ({
    ...prev,
    name: user.full_name || "",
    phone: user.phone || "",
    city: user.city || "",
}));

    }

}, []);

  // 💰 Total
const getTotal = () => {
  return cart.reduce(
    (sum, item) =>
      sum + Number(item.price) * Number(item.quantity),
    0
  );
};

const validateForm = () => {
    let newErrors = {};

    // Full Name
    if (!address.name.trim()) {
        newErrors.name = "Full name is required";
    } else if (address.name.trim().length < 3) {
        newErrors.name = "Minimum 3 characters required";
    }

    // Phone
    if (!address.phone.trim()) {
        newErrors.phone = "Mobile number is required";
    } else if (!/^[6-9]\d{9}$/.test(address.phone)) {
        newErrors.phone = "Enter a valid 10 digit mobile number";
    }

    // House
   if (!address.house?.trim()) {
    newErrors.house = "House / Flat No. is required";
}

    // Street
    if (!address.street.trim()) {
        newErrors.street = "Street / Area is required";
    }

    // City
    if (!address.city.trim()) {
        newErrors.city = "City is required";
    }

    // State
    if (!address.state) {
        newErrors.state = "Please select a state";
    }

    // Pincode
    if (!address.pincode.trim()) {
        newErrors.pincode = "Pincode is required";
    } else if (!/^[1-9][0-9]{5}$/.test(address.pincode)) {
        newErrors.pincode = "Enter a valid 6 digit pincode";
    }

    // Address Type
    if (!address.type) {
        newErrors.type = "Please select address type";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
};


  // 🚀 PLACE ORDER
const handlePlaceOrder = async () => {

  // 1. Validate checkout form
  if (!validateForm()) {
    return;
  }

  // 2. Check login
  const token = localStorage.getItem("token");

  if (!token) {
    localStorage.setItem("redirectAfterLogin", "/checkout");
    window.location.href = "/login";
    return;
  }

  // 3. Check cart
  if (!cart || cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  setLoading(true);

  try {

  

const orderItems = cart.map((item) => {

    const variant = item.selectedVariant || {};

    return {
        id: item.id,
        name: item.name,
        slug: item.slug,
        main_image: item.main_image,
        thumbnail: item.thumbnail,

        // Variant information
        variant_id: Number(
            item.variant_id || variant.id
        ),

        variant: (
            item.variant ||
            variant.unit ||
            ""
        ),

        variant_weight: Number(
            item.variant_weight || variant.weight || 0
        ),

        // Price
        price: Number(
            item.price || variant.price || 0
        ),

        quantity: Number(item.quantity || 1),
    };
});

const payload = {
    items: orderItems,
    address: address,
    total: Number(getTotal()),
};

console.log(
    "===== FINAL ORDER PAYLOAD ====="
);

console.log(
    JSON.stringify(payload, null, 2)
);

      console.log("===== ORDER PAYLOAD =====");
console.log(JSON.stringify(payload, null, 2));

console.log("===== CART =====");
console.log(cart);

console.log("===== ADDRESS =====");
console.log(address);

console.log("===== TOTAL =====");
console.log(getTotal());

    console.log("Creating order...", payload);

    // 5. Create order in our backend
const response = await axios.post(
  `${import.meta.env.VITE_API_BASE_URL}/create-order`,
  payload,
  {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }
);

    console.log("Create Order Response:", response.data);

    // 6. Check backend response
    if (
      response.data.status !== "success" ||
      !response.data.data?.payment_session_id
    ) {
      throw new Error(
        response.data.message ||
        "Unable to create payment session"
      );
    }

    // 7. Get Cashfree payment session
    const paymentSessionId =
      response.data.data.payment_session_id;

    const orderId =
      response.data.data.order_id;

    console.log("Order ID:", orderId);
    console.log(
      "Cashfree Payment Session:",
      paymentSessionId
    );

    // 8. Make sure Cashfree SDK is loaded
    if (typeof window.Cashfree !== "function") {
      throw new Error(
        "Cashfree SDK is not loaded. Please check your Cashfree script."
      );
    }

    // 9. Initialize Cashfree
    const cashfree = window.Cashfree({
      mode: "sandbox",
    });

    // 10. Open Cashfree Checkout
    await cashfree.checkout({
      paymentSessionId: paymentSessionId,
      redirectTarget: "_self",
    });

  } catch (err) {

    console.error("Checkout Error:", err);

    let message = "Unable to proceed with payment.";

    if (err.response?.data?.message) {
      message = err.response.data.message;
    } else if (err.message) {
      message = err.message;
    }

    alert(message);

  } finally {

    setLoading(false);

  }
};

  return (
    <>

    <Navbar />
    
<div className="checkout-container">

    {/* LEFT */}

    <div className="checkout-left">

        <div className="checkout-card">

    <h2>Delivery Address</h2>

    {/* Full Name */}
  <input
    value={address.name}
    placeholder="Full Name"
    onChange={(e) =>
        setAddress({
            ...address,
            name: e.target.value.replace(/[^A-Za-z ]/g, "")
        })
    }
/>

{errors.name && (
    <p className="input-error">{errors.name}</p>
)}

    {/* Mobile */}
  <input
    value={address.phone}
    placeholder="Mobile Number"
    maxLength={10}
    onChange={(e) =>
        setAddress({
            ...address,
            phone: e.target.value.replace(/\D/g, "")
        })
    }
/>

{errors.phone && (
    <p className="input-error">{errors.phone}</p>
)}

    {/* House */}
   <input
    value={address.house}
    placeholder="House / Flat No."
    onChange={(e)=>
        setAddress({
            ...address,
            house:e.target.value
        })
    }
/>

{errors.house && (
    <p className="input-error">{errors.house}</p>
)}

    {/* Apartment */}
    <input
        value={address.apartment}
        placeholder="Apartment / Building Name (Optional)"
        onChange={(e) =>
            setAddress({
                ...address,
                apartment: e.target.value,
            })
        }
    />

    {/* Street */}
<textarea
    rows={3}
    value={address.street}
    placeholder="Street / Area / Locality"
    onChange={(e)=>
        setAddress({
            ...address,
            street:e.target.value
        })
    }
/>

{errors.street && (
    <p className="input-error">{errors.street}</p>
)}

    {/* Landmark */}
    <input
        value={address.landmark}
        placeholder="Nearby Landmark"
        onChange={(e) =>
            setAddress({
                ...address,
                landmark: e.target.value,
            })
        }
    />

    {/* City + State */}
    <div className="checkout-row">

      <input
    value={address.city}
    placeholder="City"
    onChange={(e)=>
        setAddress({
            ...address,
            city:e.target.value
        })
    }
/>

{errors.city && (
    <p className="input-error">{errors.city}</p>
)}

       <select
    value={address.state}
    onChange={(e)=>
        setAddress({
            ...address,
            state:e.target.value
        })
    }
>
    <option value="">Select State</option>
    <option>Andhra Pradesh</option>
    <option>Telangana</option>
    <option>Karnataka</option>
    <option>Tamil Nadu</option>
    <option>Kerala</option>
    <option>Maharashtra</option>
    <option>Delhi</option>
    <option>Gujarat</option>
    <option>Odisha</option>
    <option>West Bengal</option>
</select>

{errors.state && (
    <p className="input-error">{errors.state}</p>
)}

    </div>

    {/* Pincode + Address Type */}
    <div className="checkout-row">

        <input
    value={address.pincode}
    placeholder="Pincode"
    maxLength={6}
    onChange={(e)=>
        setAddress({
            ...address,
            pincode:e.target.value.replace(/\D/g,"")
        })
    }
/>

{errors.pincode && (
    <p className="input-error">{errors.pincode}</p>
)}

       <select
    value={address.type}
    onChange={(e)=>
        setAddress({
            ...address,
            type:e.target.value
        })
    }
>
    <option value="">Select Address Type</option>
    <option value="Home">Home</option>
    <option value="Office">Office</option>
    <option value="Other">Other</option>
</select>

{errors.type && (
    <p className="input-error">{errors.type}</p>
)}

    </div>

</div>

        <div className="checkout-card mt-4">

            <h2>Order Items</h2>

            {cart.map((item) => (

                <div
                    className="checkout-item"
                    key={`${item.id}-${item.selectedVariant?.unit}`}
                >

                    <img
                        src={item.main_image}
                        alt={item.name}
                    />

                    <div className="checkout-item-info">

                        <h5>{item.name}</h5>

                        <small>
                            Variant :
                            {" "}
                            {item.selectedVariant?.unit}
                        </small>

                        <p>
                            ₹{item.price}
                            {" × "}
                            {item.quantity}
                        </p>

                    </div>

                    <div className="checkout-item-price">

                        ₹
                        {(
                            Number(item.price) *
                            Number(item.quantity)
                        ).toFixed(2)}

                    </div>

                </div>

            ))}

        </div>

    </div>

    {/* RIGHT */}

    <div className="checkout-right">

        <div className="price-card">

            <h3>Coupon</h3>

            <div className="coupon-row">

                <input
                    type="text"
                    placeholder="Coupon Code"
                />

                <button>
                    Apply
                </button>

            </div>

            <hr />

            <h3>Price Details</h3>

            <div className="price-row">

                <span>Subtotal</span>

                <span>
                    ₹{getTotal().toFixed(2)}
                </span>

            </div>

            <div className="price-row">

                <span>Shipping</span>

                <span className="free">
                    FREE
                </span>

            </div>

            <div className="price-row">

                <span>Discount</span>

                <span className="discount">
                    - ₹0
                </span>

            </div>

            <hr />

            <div className="price-row total">

                <strong>Grand Total</strong>

                <strong>
                    ₹{getTotal().toFixed(2)}
                </strong>

            </div>

            <button
                className="checkout-btn"
                onClick={handlePlaceOrder}
                disabled={loading}
            >
                {loading
                    ? "Processing..."
                    : "Proceed To Payment"}
            </button>

        </div>

    </div>

</div>

    <Footer />
    </>
  );
};

export default Checkout;