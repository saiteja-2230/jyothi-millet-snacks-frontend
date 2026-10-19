import React from "react";
// import "./Features.css";
import { Leaf, CookingPot, Truck } from "lucide-react";

const Features = () => {
  const featureData = [
    {
      id: 1,
      icon: <Leaf size={26} strokeWidth={2} />,
      title: "Pure Ingredients",
      description:
        "We use fresh, quality ingredients to bring you authentic homemade taste.",
    },
    {
      id: 2,
      icon: <CookingPot size={26} strokeWidth={2} />,
      title: "Traditional Flavours",
      description:
        "Prepared using time-tested recipes for rich and authentic taste.",
    },
    {
      id: 3,
      icon: <Truck size={26} strokeWidth={2} />,
      title: "Safe Delivery",
      description:
        "Packed hygienically and delivered quickly to your doorstep.",
    },
  ];

  return (
    <section className="features-section">
      <div className="container">
        <div className="features-grid">
          {featureData.map((item) => (
            <div className="feature-card" key={item.id}>
              
              {/* Left Icon */}
              <div className="icon-wrapper">
                {item.icon}
              </div>

              {/* Right Content */}
              <div className="feature-content">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;