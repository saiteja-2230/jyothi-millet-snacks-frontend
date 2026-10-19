import Footer from "../components/Footer";
import Navbar from "../components/navbar";
import Topbar from "../components/Topbar";

function About() {
    return (  
        <div>
            <Topbar/>
            <Navbar/>
             <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-overlay">
          <h1>About Us</h1>
          <p>
            Bringing the authentic taste of tradition, trust, and quality to
            every home across India.
          </p>
        </div>
      </section>

      {/* Intro Section */}
    <div className="about-two-sections">

  {/* Who We Are */}
  <section className="about-section who-we-are">
    <h2>Who We Are</h2>

    <p>
      At our core, we believe that food is not just about taste — it is
      about tradition, trust, and quality. Our journey began with a simple
      mission: to deliver authentic, high-quality Indian snacks and homemade
      essentials to every corner of the country without compromising on
      purity or taste.
    </p>

    <p>
      We specialize in a wide range of carefully crafted products including
      traditional sweets, crispy namkeens, handcrafted papads, aromatic
      powders, and flavorful pickles. Each product is prepared using
      time-tested recipes, ensuring that every bite reflects the richness of
      Indian culinary heritage.
    </p>
  </section>


  {/* Commitment Section */}
  <section className="about-section quality-section">
    <h2>Our Commitment to Quality</h2>

    <p>
      Quality is not just a promise — it is the foundation of everything
      we do.
    </p>

    <p>
      We use premium-grade ingredients, sourced responsibly, and focus on
      maintaining natural goodness in every product. No shortcuts, no
      compromises. Our preparation methods are designed to retain
      authentic flavors while ensuring hygiene and freshness.
    </p>

    <div className="about-grid">

      <div className="about-card">
        <span className="about-card-icon">✓</span>
        <span>No compromise on quality</span>
      </div>

      <div className="about-card">
        <span className="about-card-icon">✓</span>
        <span>Carefully selected natural ingredients</span>
      </div>

      <div className="about-card">
        <span className="about-card-icon">✓</span>
        <span>Hygienic preparation and packaging</span>
      </div>

      <div className="about-card">
        <span className="about-card-icon">✓</span>
        <span>Consistent taste and freshness</span>
      </div>

    </div>
  </section>

</div>

      {/* Natural Ingredients */}
     <section className="about-feature-section">

  {/* Authentic Ingredients */}
  <div className="about-feature-card ingredients-card">
    <div className="feature-icon">
      🌿
    </div>

    <h2>Authentic & Natural Ingredients</h2>

    <p>
      We strongly believe that the best taste comes from nature. That’s why
      our products are made using natural ingredients, traditional
      techniques, and minimal processing. We avoid unnecessary additives and
      focus on delivering products that are both delicious and trustworthy.
    </p>
  </div>


  {/* Serving India */}
  <div className="about-feature-card india-card">
    <div className="feature-icon">
      🇮🇳
    </div>

    <h2>Serving Across India</h2>

    <p>
      No matter where you are, we bring the taste of tradition to your
      doorstep. With a reliable delivery network, we ensure that your
      favorite snacks and essentials reach you fresh and on time, anywhere
      in India.
    </p>
  </div>

</section>

      {/* Custom Orders */}
      <section className="about-benefits-wrapper">

  {/* Customized & Special Orders */}
  <div className="about-benefit-card custom-orders-card">

    <div className="benefit-icon">
      🎁
    </div>

    <h2>Customized & Special Orders</h2>

    <p className="benefit-intro">
      We understand that every occasion is special — and so are your
      preferences.
    </p>

    <div className="benefit-grid">

      <div className="benefit-item">
        <span className="benefit-check">✓</span>
        <span>Festive Orders</span>
      </div>

      <div className="benefit-item">
        <span className="benefit-check">✓</span>
        <span>Bulk Requirements</span>
      </div>

      <div className="benefit-item">
        <span className="benefit-check">✓</span>
        <span>Customized Flavors</span>
      </div>

      <div className="benefit-item">
        <span className="benefit-check">✓</span>
        <span>Special Family Recipes</span>
      </div>

    </div>

    <p className="benefit-bottom">
      We are happy to accommodate special and bulk orders, ensuring you get
      exactly what you need.
    </p>

  </div>


  {/* Why Choose Us */}
  <div className="about-benefit-card why-choose-card">

    <div className="benefit-icon">
      ⭐
    </div>

    <h2>Why Choose Us?</h2>

    <div className="benefit-grid why-grid">

      <div className="benefit-item">
        <span className="benefit-check">✓</span>
        <span>Authentic homemade taste</span>
      </div>

      <div className="benefit-item">
        <span className="benefit-check">✓</span>
        <span>Premium quality ingredients</span>
      </div>

      <div className="benefit-item">
        <span className="benefit-check">✓</span>
        <span>Nationwide delivery</span>
      </div>

      <div className="benefit-item">
        <span className="benefit-check">✓</span>
        <span>Custom order flexibility</span>
      </div>

      <div className="benefit-item">
        <span className="benefit-check">✓</span>
        <span>Customer-first approach</span>
      </div>

    </div>

  </div>

</section>
      {/* Vision Mission */}
      <section className="about-section container">
        <div className="vision-mission">
          <div className="vm-card">
            <h2>Our Vision</h2>
            <p>
              To become a trusted household name across India by delivering
              authentic, high-quality traditional foods while preserving the
              essence of homemade taste.
            </p>
          </div>

          <div className="vm-card">
            <h2>Our Mission</h2>
            <p>
              To provide customers with safe, natural, and delicious food
              products while maintaining the highest standards of quality,
              hygiene, and customer satisfaction.
            </p>
          </div>
        </div>
      </section>
    </div>
            <Footer/>
        </div>
    );
}

export default About;