import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { API_ENDPOINTS } from "../../api/endpoints";
import Navbar from "../components/navbar";
import Topbar from "../components/Topbar";
import WhatsAppButton from "../components/Whatsapp";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
  import { ShoppingCart } from "lucide-react";



const CategoryPage = () => {
  const { slug } = useParams(); // 👈 gets "namkeens", "pickles"

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          API_ENDPOINTS.productsByCategory(slug)
        );

        setProducts(res.data.data);
        console.log("products",res.data.data)
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [slug]);

  if (loading) return <h2>Loading...</h2>;


const addToCart = (item) => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingItem = cart.find((i) => i.id === item.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  window.dispatchEvent(new Event("cartUpdated"));
};

  return (
    <>
    <Topbar/>
    <Navbar/>
    <div className="category-page">
      <div className="category-heading">
  <h1>{slug.replace("-", " ")}</h1>
  <p>
    Explore our premium {slug.replace("-", " ")}
    collection
  </p>
</div>

     <div className="category-products-grid">
  {products.length > 0 ? (
    products.map((item) => (
      <ProductCard
        key={item.id}
        item={{
          ...item,

          // category API compatibility
          main_image: item.main_image,
          category_name: slug,
          stock_status: item.stock_status
            ? "in_stock"
            : "out_of_stock",

          starting_price: item.starting_price,
        }}
        addToCart={addToCart}
      />
    ))
  ) : (
    <div className="no-products">
      No products found
    </div>
  )}
</div>
    </div>
    <WhatsAppButton/>
    <Footer/>
    </>
  );
};

export default CategoryPage;