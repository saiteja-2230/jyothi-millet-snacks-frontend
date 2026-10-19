import React, { useEffect, useState } from "react";
import {
  Menu,
  Search,
  ShoppingCart,
  User,
  Truck,
  ChevronDown,
} from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_ENDPOINTS } from "../../api/endpoints";

const Navbar = () => {
  const [categories, setCategories] = useState([]);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [cartCount, setCartCount] = useState(0);
const [showSearch, setShowSearch] = useState(false);
const [keyword, setKeyword] = useState("");
const [suggestions, setSuggestions] = useState([]);
const [loading, setLoading] = useState(false);
const [searched, setSearched] = useState(false);

const [user, setUser] = useState(null);

useEffect(() => {
  const storedUser = localStorage.getItem("user");

  if (storedUser && storedUser !== "undefined") {
    setUser(JSON.parse(storedUser));
  }
}, []);
  // Fetch Categories from Products API
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(API_ENDPOINTS.products);

      const data = res.data?.data || [];

      // Create Unique Categories
      const uniqueCategories = [];

      data.forEach((item) => {
        const slug = item.category_name
          ?.toLowerCase()
          .replace(/\s+/g, "-");

        const exists = uniqueCategories.find(
          (cat) => cat.slug === slug
        );

        if (!exists) {
          uniqueCategories.push({
            name: item.category_name,
            slug,
          });
        }
      });

      setCategories(uniqueCategories);
    } catch (error) {
      console.log(error);
    }
  };

useEffect(() => {
  const updateCart = () => {
    const cart =
      JSON.parse(localStorage.getItem("cart")) || [];

    const totalQty = cart.reduce(
      (sum, item) => sum + (item.quantity || 1),
      0
    );

    setCartCount(totalQty);
  };

  // Initial load
  updateCart();

  // Listen to updates
  window.addEventListener("cartUpdated", updateCart);

  return () =>
    window.removeEventListener("cartUpdated", updateCart);
}, []);

useEffect(() => {
  const timer = setTimeout(async () => {
    if (keyword.trim().length < 2) {
      setSuggestions([]);
      setSearched(false);
      return;
    }

    try {
      setLoading(true);

      const res = await axios.get(
        `https://api.jyothimilletsnacks.in/api/v1/products/search?keyword=${keyword}`
      );

      const products = res.data?.data || [];

      setSuggestions(products);
      setSearched(true);

    } catch (error) {
      console.log(error);
      setSuggestions([]);
      setSearched(true);
    } finally {
      setLoading(false);
    }
  }, 400);

  return () => clearTimeout(timer);
}, [keyword]);

  //const user = JSON.parse(localStorage.getItem("user"));


  return (
    <header className="modern-navbar">

      {/* Desktop Navbar */}
      <div className="navbar-container">

        {/* Logo */}
        <Link to="/" className="logo-section">
          <img
            src="/jms_white_logo.png"
            alt="Logo"
            className="logo"
          />
        </Link>

        {/* Categories */}
  

        {/* Search */}
        {/* Desktop Search */}
<div
  className="search-bar desktop-search"
  style={{ position: "relative" }}
>
  <div className="search-inner">

    <input
      type="text"
      placeholder="Search for healthy millet snacks..."
      value={keyword}
      onChange={(e) => setKeyword(e.target.value)}
    />

    <select>
      <option>All Categories</option>

      {categories.map((cat, index) => (
        <option key={index}>
          {cat.name}
        </option>
      ))}
    </select>

    <button className="search-btn">
      <Search size={22} />
    </button>

  </div>

  {keyword.trim().length >= 2 && (
  <div className="search-dropdown">

    {loading ? (
      <div className="search-empty">
        Searching...
      </div>
    ) : suggestions.length > 0 ? (

      suggestions.map((item) => (
        <Link
          key={item.id}
          to={`/product/${item.id}`}
          className="search-item"
          onClick={() => {
            setKeyword("");
            setSuggestions([]);
          }}
        >
          <img
            src={item.main_image}
            alt={item.name}
          />

          <div className="search-content">
            <h5>{item.name}</h5>
            <p>₹{item.starting_price}</p>
          </div>
        </Link>
      ))

    ) : (
      <div className="search-empty">
        No products found
      </div>
    )}

  </div>
)}
</div>

        {/* Right Icons */}
        <div className="nav-icons">

          {/* <Link to="/track-order" className="nav-icon-item text-light">
            <Truck size={22} />
            <span className="text-light">Track Order</span>
          </Link> */}

        <Link to={user ? "/" : "/login"} className="nav-icon-item">
  <User size={22} />
  <span>
    {user ? user.full_name : "Sign In"}
  </span>
</Link>
          <Link to="/cart" className="nav-icon-item cart-item">
            <ShoppingCart size={24} />

            {cartCount > 0 && (
  <span className="cart-badge">
    {cartCount}
  </span>
)}
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="mobile-icons">

  {/* Search */}
  
    {/* <Link to="/" className="logo-section">
    <img
      src="/logo.png"
      alt="Logo"
      className="logo"
    />
  </Link> */}

  <div className="mobile-icons">

    <button
      className="mobile-icon-btn"
      onClick={() => setShowSearch(!showSearch)}
    >
      <Search size={22} />
    </button>

    <Link
      to="/cart"
      className="mobile-cart-icon"
    >
      <ShoppingCart size={22} />

      {cartCount > 0 && (
        <span className="cart-badge">
          {cartCount}
        </span>
      )}
    </Link>

    <button
      className="mobile-icon-btn"
      onClick={() => setMobileMenu(!mobileMenu)}
    >
      <Menu size={30} />
    </button>

  </div>

</div>
      </div>

      {showSearch && (
  <div className="mobile-search">

    <input
  type="text"
  placeholder="Search products..."
  value={keyword}
  onChange={(e) => setKeyword(e.target.value)}
/>

{suggestions.length > 0 && (
  <div className="search-dropdown">
    {suggestions.map((item) => (
      <Link
        key={item.id}
        to={`/product/${item.id}`}
        className="search-item"
        onClick={() => {
          setKeyword("");
          setSuggestions([]);
          setShowSearch(false);
        }}
      >
        <img
          src={item.main_image}
          alt={item.name}
        />

        <div className="search-content">
          <h5>{item.name}</h5>
          <p>₹{item.starting_price}</p>
        </div>
      </Link>
    ))}
  </div>
)}

    <button>
      <Search size={20} />
    </button>

  </div>
)}

      {/* Mobile Menu */}
      {mobileMenu && (
        <div className="mobile-menu">

          {/* {categories.map((cat, index) => (
            <Link
              key={index}
              to={`/category/${cat.slug}`}
            >
              {cat.name}
            </Link>
          ))} */}

          <Link to="/track-order">
            Track Order
          </Link>

          <Link to="/login">
            Sign In
          </Link>

          
        </div>
      )}
    </header>
  );
};

export default Navbar;