import React from "react";
// import "./Testimonials.css";

const testimonials = [
  {
  id: 1,
  text: `"The namkeens are incredibly fresh and crispy. Every bite reminds me of homemade snacks from my childhood. Highly recommended!"`,
  name: "Venkat",
  rating: 5,
},
{
  id: 2,
  text: `"The sweets are absolutely delicious and perfectly balanced in sweetness. My family loved every variety we ordered."`,
  name: "Sagar",
  rating: 5,
},
{
  id: 3,
  text: `"I ordered a mix of namkeens and sweets, and the quality exceeded my expectations. Fresh, tasty, and well-packed."`,
  name: "Renuka",
  rating: 5,
},
{
  id: 4,
  text: `"The murukulu and chekkalu were so crunchy and flavorful. It felt like enjoying authentic homemade snacks."`,
  name: "Priya",
  rating: 5,
},
{
  id: 5,
  text: `"Their traditional sweets are simply amazing. The texture, taste, and freshness make them stand out from other brands."`,
  name: "Ramesh",
  rating: 4,
},
{
  id: 6,
  text: `"The snacks arrived fresh and neatly packed. Every item tasted authentic and was loved by everyone at home."`,
  name: "Anusha",
  rating: 5,
},
{
  id: 7,
  text: `"I have tried many online snack stores, but these namkeens are by far the best in terms of quality and taste."`,
  name: "Karthik",
  rating: 5,
},
{
  id: 8,
  text: `"The sweets melted in the mouth and had the perfect traditional flavor. I will definitely order again."`,
  name: "Lavanya",
  rating: 5,
},
{
  id: 9,
  text: `"Excellent quality products with authentic taste. The combination of sweets and snacks made our festival celebrations special."`,
  name: "Harish",
  rating: 4,
},
{
  id: 10,
  text: `"Fresh ingredients, great taste, and timely delivery. The namkeens and sweets were a huge hit among our guests."`,
  name: "Deepika",
  rating: 5,
}
];

const Testimonials = () => {
  return (
    <section className="testimonials-section">
  <div className="testimonials-overlay">

    <h2 className="testimonials-heading">
      What Our Customers Say
    </h2>

    <div className="testimonials-slider">
      <div className="testimonials-track">
        {[...testimonials, ...testimonials].map((item, index) => (
          <div className="testimonial-card" key={index}>

            <div className="quote">“</div>

            <p className="testimonial-text">{item.text}</p>

            <div className="stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star}>
                  {star <= item.rating ? "★" : "☆"}
                </span>
              ))}
            </div>

            <h3 className="customer-name">{item.name}</h3>

          </div>
        ))}
      </div>
    </div>

  </div>
</section>
  );
};

export default Testimonials;