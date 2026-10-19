import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { API_ENDPOINTS } from "../../api/endpoints";
import Topbar from "../components/Topbar";
import Navbar from "../components/navbar";
import WhatsAppButton from "../components/Whatsapp";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";

import {
  FolderOpen,
  FileText,
  Leaf
} from "lucide-react";
import {
 
  Dumbbell,
  ShieldCheck,
  Heart,
} from "lucide-react";
const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [showCartPopup, setShowCartPopup] = useState(false);
  const navigate = useNavigate()

const images = product?.images?.length
  ? product.images
  : product?.image
  ? [product.image]
  : [];

useEffect(() => {
  const fetchProduct = async () => {
    try {
      const res = await axios.get(`${API_ENDPOINTS.products}/${id}`);

      const data = res.data?.data || res.data; // ✅ FIX

      setProduct(data);
      console.log("details",data)

      // ✅ Always select FIRST variant (250g)
      if (data?.variants?.length > 0) {
        setSelectedVariant(data.variants[0]);
      }

    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  fetchProduct();
}, [id]);

useEffect(() => {
  if (!product?.category?.slug) return;

  const fetchRelatedProducts = async () => {
    try {
      const res = await axios.get(
        API_ENDPOINTS.productsByCategory(
          product.category.slug
        )
      );

      const data = Array.isArray(res.data)
        ? res.data
        : res.data?.data || [];

      const filteredProducts = data.filter(
        (item) => item.id !== product.id
      );

      setRelatedProducts(filteredProducts);
    } catch (error) {
      console.log(error);
    }
  };

  fetchRelatedProducts();
}, [product]);

  if (!product) return <p className="loading">Loading...</p>;

const addToCart = () => {
  if (!selectedVariant) {
    return;
  }

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingItem = cart.find(
    (i) =>
      i.id === product.id &&
      i.variant?.id === selectedVariant.id
  );

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      ...product,
      variant: selectedVariant,
      price: selectedVariant.price,
      quantity: 1,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  // Update navbar cart count
  window.dispatchEvent(new Event("cartUpdated"));

  // Show popup
  setShowCartPopup(true);

  // Automatically hide popup after 2 seconds
  setTimeout(() => {
    setShowCartPopup(false);
  }, 2000);
};

  return (
    <>
    {showCartPopup && (
      <div className="cart-success-popup">
        <div className="cart-success-icon">
          ✓
        </div>

        <div className="cart-success-content">
          <strong>Item Added Successfully!</strong>
          <span>
            {product?.name}
          </span>
        </div>

        <button
          className="popup-close"
          onClick={() => setShowCartPopup(false)}
        >
          ×
        </button>
      </div>
    )}
    <Topbar/>
    <Navbar/>
    <div className="pd-container">
  <div className="pd-wrapper">

    {/* LEFT - IMAGE */}
   <div className="pd-left">
  <div className="pd-image-box">
    <img
      src={product.main_image}
      alt={product.name}
      className="main-image"
    />
    {/* <button
  className="nav-btn left"
  onClick={() =>
    setActiveImage((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    )
  }
>
  ‹
</button> */}

{/* <button
  className="nav-btn right"
  onClick={() =>
    setActiveImage((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    )
  }
>
  ›
</button> */}
  </div>

  {/* Thumbnails */}
  <div className="thumbnail-row">
    {images.map((img, index) => (
      <img
        key={index}
        src={img}
        alt="thumb"
        className={`thumb ${activeImage === index ? "active" : ""}`}
        onClick={() => setActiveImage(index)}
      />
    ))}
  </div>
</div>


    {/* RIGHT - DETAILS */}
   <div className="pd-right">

  <span className="product-badge">
    {product.category?.name}
  </span>

  <h1 className="pd-title text-capitalize">
    {product.name}
  </h1>

 <div className="info-list">

  <div className="info-item">
    <div className="info-icon">
      <FolderOpen size={18} />
    </div>

    <strong>Category:</strong>

    <span>{product.category?.name}</span>
  </div>

  <div className="info-item">
    <div className="info-icon">
      <FileText size={18} />
    </div>

    <strong>Description:</strong>

    <span>{product.description}</span>
  </div>

  <div className="info-item">
    <div className="info-icon">
      <Leaf size={18} />
    </div>

    <strong>Ingredients:</strong>

    <span>{product.ingredients}</span>
  </div>

</div>

  <hr />

  <div className="variant-sections">

    <div className="pd-price-section">

    <span className="pd-discount">
      ₹{selectedVariant?.price}
    </span>

    {/* <span className="tax-badge">
      Inclusive of all taxes
    </span> */}

  </div>

    <h4>Select Quantity</h4>

    <div className="variant-boxes">
      {product?.variants?.map((variant) => (
        <div
          key={variant.id}
          className={`variant-box ${
            selectedVariant?.id === variant.id
              ? "active"
              : ""
          }`}
          onClick={() =>
            setSelectedVariant(variant)
          }
        >
          {variant.unit}
        </div>
      ))}
    </div>

  </div>

  <div className="pd-buttons">

   <button
  className="btn-cart"
  onClick={addToCart}
>
  🛒 Add To Cart
</button>

    <button
      className="btn-buy"
      onClick={() => navigate("/cart")}
    >
      ⚡ Buy Now
    </button>

  </div>

 <div className="feature-grid">

  <div className="feature-items">
    <div className="feature-icons">
      <Leaf size={20} />
    </div>
    <span>100% Natural</span>
  </div>

  {/* <div className="feature-item">
    <div className="feature-icon">
      <Dumbbell size={20} />
    </div>
    <span>High in Protein</span>
  </div> */}

  {/* <div className="feature-item">
    <div className="feature-icon">
      <ShieldCheck size={20} />
    </div>
    <span>No Added Preservatives</span>
  </div> */}

  <div className="feature-items">
    <div className="feature-icons">
      <Heart size={20} />
    </div>
    <span>Healthy & Tasty</span>
  </div>

</div>

  

</div>

  </div>
</div>
<section className="related-products-section">

  <div className="related-header">

  <div>
    <h2>Related Products</h2>
    <p>You may also like these products</p>
  </div>

  <button
    className="view-all-btn"
    onClick={() =>
      navigate(
        `/category/${product.category.slug}`
      )
    }
  >
    View All
  </button>

</div>

  <div className="related-products-grid">

    {relatedProducts.slice(0, 8).map((item) => (
      <ProductCard
        key={item.id}
        item={{
          ...item,
          main_image: item.image || item.main_image,
          category_name:
            product.category?.name,
          stock_status: item.stock_status
            ? "in_stock"
            : "out_of_stock",
          starting_price: item.starting_price,
        }}
        addToCart={(item) => {
          let cart =
            JSON.parse(
              localStorage.getItem("cart")
            ) || [];

          const existingItem = cart.find(
            (i) => i.id === item.id
          );

          if (existingItem) {
            existingItem.quantity += 1;
          } else {
            cart.push({
              ...item,
              quantity: 1,
            });
          }

          localStorage.setItem(
            "cart",
            JSON.stringify(cart)
          );

          window.dispatchEvent(
            new Event("cartUpdated")
          );
        }}
      />
    ))}

  </div>

</section>
    <WhatsAppButton/>
    <Footer/>
    </>
  );
};

export default ProductDetails;