import React from "react";
import { useNavigate } from "react-router-dom";



const ShopByCategories = () => {
  const navigate = useNavigate();

  const categories = [
    {
      title: "Namkeens",
      image: "/shopnamkeens.jpeg",
      path: "/category/namkeens",
    },
    {
      title: "Sweets",
      image: "/shopsweets.jpg.jpeg",
      path: "/category/sweets",
    },
    {
      title: "Spices",
      image: "/shopspices.jpeg",
      path: "/category/spices",
    },
    {
      title: "Pickles",
      image: "/shoppickels.jpeg",
      path: "/category/pickles",
    },
  ];

  return (
    <section className="shop-category-section">
      <div className="container">
     <div class="section-header">

  <h2>Shop By Category</h2>


  <div class="heading-line">
    <span class="line"></span>

    <i data-lucide="cookie" class="heading-icon"></i>

    <span class="line"></span>
  </div>

  <p>Discover our authentic and delicious traditional products.</p>

</div>

        <div className="category-grid">
          {categories.map((category, index) => (
            <div
              key={index}
              className="category-card"
              style={{
                backgroundImage: `url(${category.image})`,
              }}
            >
              <div className="category-overlay">
                <h3><span>Shop for</span><br /> {category.title}</h3>

                <button
                  onClick={() => navigate(category.path)}
                >
                  Shop Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    
  );
};

export default ShopByCategories;