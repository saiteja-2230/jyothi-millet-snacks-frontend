import React, { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ item, addToCart, openVariantModal }) => {
  const navigate = useNavigate();

  const [activeVariantIndex, setActiveVariantIndex] = useState(0);
  const [showCartPopup, setShowCartPopup] = useState(false);

  const selectedVariant =
    item.variants?.[activeVariantIndex] || null;

  // Add to cart
  const handleAddToCart = () => {
    addToCart({
      ...item,
      selectedVariant,
      price: selectedVariant?.price,
    });

    // Show popup
    setShowCartPopup(true);

    // Hide popup after 2 seconds
    setTimeout(() => {
      setShowCartPopup(false);
    }, 2000);
  };

  // Buy Now
  const handleBuyNow = () => {
    addToCart({
      ...item,
      selectedVariant,
      price: selectedVariant?.price,
    });

    navigate("/cart");
  };

  return (
    <div className="premium-product-card">

      {/* =========================
          CART SUCCESS POPUP
      ========================= */}
      {showCartPopup && (
        <div className="product-cart-popup">

          <div className="product-popup-icon">
            ✓
          </div>

          <div className="product-popup-content">
            <strong>Item Added Successfully!</strong>

            <span>
              {item.name}
            </span>
          </div>

          <button
            type="button"
            className="product-popup-close"
            onClick={() => setShowCartPopup(false)}
          >
            ×
          </button>

        </div>
      )}

      {/* Product Image */}
      <div className="premium-image">
        <img
          src={
            item.main_image ||
            "https://via.placeholder.com/400x300?text=No+Image"
          }
          alt={item.name}
          onClick={() =>
            navigate(`/product/${item.id}`)
          }
        />
      </div>

      {/* Category + Stock */}
      <div className="catstock">

        <div className="premium-category">
          {item.category_name}
        </div>

        <div className="stock-status">
          {item.stock_status === "in_stock" ? (
            <span className="in-stock">
              ● In Stock
            </span>
          ) : (
            <span className="out-stock">
              ● Out Of Stock
            </span>
          )}
        </div>

      </div>

      {/* Product Name */}
      <h3 className="premium-title text-capitalize">
        {item.name}
      </h3>

      {/* Price */}
      <div className="premium-price-box">

        <span className="premium-price">
          ₹
          {selectedVariant?.price ||
            item.starting_price}
        </span>

        <span className="starting-text">
          Starting price
        </span>

      </div>

      {/* Variants */}
      {item.variants?.length > 0 && (
        <div className="variant-section">

          <p className="variant-label">
            Variants Available
          </p>

          <div className="variant-buttons">

            {item.variants.map(
              (variant, index) => (
                <button
                  type="button"
                  key={variant.id}
                  className={`variant-btn ${
                    activeVariantIndex === index
                      ? "active-variant"
                      : ""
                  }`}
                  onClick={() =>
                    setActiveVariantIndex(index)
                  }
                >
                  {variant.unit}
                </button>
              )
            )}

          </div>

        </div>
      )}

      {/* Buttons */}
      <div className="product-buttons">

        {/* Add To Cart */}
        <button
          type="button"
          className="premium-cart-btn"
          onClick={handleAddToCart}
        >
          <ShoppingCart size={18} />
          Add Cart
        </button>

        {/* Buy Now */}
        <button
          type="button"
          className="buy-now-btn"
          onClick={handleBuyNow}
        >
          Buy Now
        </button>

      </div>

    </div>
  );
};

export default React.memo(ProductCard);