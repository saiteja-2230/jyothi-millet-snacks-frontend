import React, { useEffect, useState } from "react";
import axios from "axios";
import { ShoppingCart } from "lucide-react";
import { API_ENDPOINTS } from "../../api/endpoints";
import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";
const Specialities = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // Fetch all products initially
  useEffect(() => {
    fetchProducts();
  }, []);

  // Fetch all products
const fetchProducts = async () => {
  try {
    setLoading(true);

    const res = await axios.get(API_ENDPOINTS.products);

    const data = res.data?.data || [];

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

    // Active first category automatically
    if (uniqueCategories.length > 0) {
      fetchCategoryProducts(
        uniqueCategories[0].slug
      );
    }

    setLoading(false);
  } catch (error) {
    console.log(error);
    setLoading(false);
  }
};

  // Fetch products by category
const fetchCategoryProducts = async (slug) => {
  try {
    setLoading(true);

    setActiveCategory(slug);

    const res = await axios.get(
      API_ENDPOINTS.productsByCategory(slug)
    );

    const data = Array.isArray(res.data)
      ? res.data
      : res.data?.data || [];

    setProducts(data);

    setLoading(false);
  } catch (err) {
    console.log(err);
    setLoading(false);
  }
};

// Add To Cart
const addToCart = (item) => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  /*
   * selectedVariant coming from ProductCard currently contains:
   * {
   *   unit,
   *   price,
   *   stock_status
   * }
   *
   * So find the COMPLETE variant from item.variants.
   */
  let selectedVariant = item.selectedVariant;

  if (!selectedVariant) {
    console.error("No selected variant found:", item);
    return;
  }

  // Find complete variant using unit
  const fullVariant = item.variants?.find(
    (variant) =>
      String(variant.unit).trim().toLowerCase() ===
      String(selectedVariant.unit).trim().toLowerCase()
  );

  if (!fullVariant) {
    console.error(
      "Could not find selected variant in product variants:",
      {
        selectedVariant,
        variants: item.variants,
      }
    );

    return;
  }

  console.log("===== FULL SELECTED VARIANT =====");
  console.log(fullVariant);

  /*
   * Create a clean cart item.
   */
  const cartItem = {
    id: item.id,
    name: item.name,
    slug: item.slug,
    main_image: item.main_image,
    thumbnail: item.thumbnail,

    // Variant information
    variant_id: Number(fullVariant.id),
    variant: fullVariant.unit,
    variant_weight: Number(fullVariant.weight),

    // Price from selected variant
    price: Number(fullVariant.price),

    quantity: 1,
  };

  /*
   * Same product + same variant
   * = increase quantity
   */
  const existingItem = cart.find(
    (i) =>
      String(i.id) === String(cartItem.id) &&
      Number(i.variant_id) === Number(cartItem.variant_id)
  );

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push(cartItem);
  }

  /*
   * Save cart
   */
  localStorage.setItem(
    "cart",
    JSON.stringify(cart)
  );

  /*
   * Notify other components
   */
  window.dispatchEvent(
    new Event("cartUpdated")
  );

  /*
   * Debug
   */
  console.log(
    "===== CART ITEM ADDED ====="
  );

  console.log(
    JSON.stringify(cartItem, null, 2)
  );

  console.log(
    "===== FULL CART ====="
  );

  console.log(
    JSON.stringify(cart, null, 2)
  );
};
  return (
    <section className="specialities-section">
      <div className="container">

        {/* Heading */}
        <div className="section-header">
          <h2>Our Specialities</h2>
        </div>

        {/* Category Pills */}
        <div className="category-pills">

          {/* All Button */}
          {/* <button
            className={`pill ${
              activeCategory === null ? "active-pill" : ""
            }`}
            onClick={fetchProducts}
          >
            All
          </button> */}

          {categories.map((cat, index) => (
            <button
              key={index}
              className={`pill ${
                activeCategory === cat.slug
                  ? "active-pill"
                  : ""
              }`}
              onClick={() =>
                fetchCategoryProducts(cat.slug)
              }
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Products */}
         {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="specialities-grid">

          {products.slice(0, 8).map((item) => (
            <ProductCard
              key={item.id}
              item={item}
              addToCart={addToCart}
            />
          ))}

        </div>

        
        
        
      )}
      </div>
      <div className="view-all-wrapper">
  <button
    className="view-all-btn"
    onClick={() =>
      navigate(`/category/${activeCategory}`)
    }
  >
    View All Products
  </button>
</div>
    </section>
  );
};

export default Specialities;