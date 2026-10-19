import React from "react";
// import "./TermsConditions.css";

const TermsConditions = () => {
  return (
    <div className="terms-container">
      <div className="terms-content">
        <h1>Terms and Conditions</h1>

        <section>
          <h2>1. Introduction</h2>
          <p>
            Welcome to Jyothi Millet Snacks. By accessing or using our website,
            you agree to comply with and be bound by these Terms and Conditions.
            Please read them carefully before placing any order.
          </p>
        </section>

        <section>
          <h2>2. Products and Services</h2>
          <p>
            We offer a variety of food products including namkeens, sweets,
            papads, powders, and pickles. All products are prepared with a strong
            focus on quality and natural ingredients.
          </p>
          <ul>
            <li>Modify product availability</li>
            <li>Update pricing without prior notice</li>
            <li>Discontinue any product at any time</li>
          </ul>
        </section>

        <section>
          <h2>3. Orders and Acceptance</h2>
          <ul>
            <li>All orders placed through our website are subject to confirmation.</li>
            <li>We reserve the right to cancel or refuse any order due to:</li>
            <ul className="sub-list">
              <li>Product unavailability</li>
              <li>Incorrect pricing</li>
              <li>Suspicious or fraudulent transactions</li>
            </ul>
          </ul>
        </section>

        <section>
          <h2>4. Pricing and Payments</h2>
          <ul>
            <li>All prices listed are in INR (₹).</li>
            <li>
              Payments are accepted only through online payment methods (UPI,
              Debit/Credit Cards, Net Banking, etc.).
            </li>
            <li>Orders will be processed only after successful payment confirmation.</li>
          </ul>
        </section>

        <section>
          <h2>5. Shipping and Delivery</h2>
          <ul>
            <li>We deliver across India.</li>
            <li>Delivery timelines may vary depending on location.</li>
            <li>
              We are not responsible for delays caused by courier partners or
              unforeseen circumstances.
            </li>
          </ul>
        </section>

        <section>
          <h2>6. Return and Refund Policy</h2>
          <ul>
            <li>
              Returns are accepted only if the product is spoiled or the package
              is damaged at the time of delivery.
            </li>
            <li>
              Customers must report the issue within a reasonable time (preferably
              within 24 hours of delivery).
            </li>
            <li>
              Once the return is approved, the refund will be processed within 5
              working days.
            </li>
          </ul>
        </section>

        <section>
          <h2>7. Intellectual Property</h2>
          <p>
            All content on this website including text, images, logos, and
            designs are the property of Jyothi Millet Snacks and may not be used
            without permission.
          </p>
        </section>

        <section>
          <h2>8. Limitation of Liability</h2>
          <ul>
            <li>Any indirect or incidental damages</li>
            <li>Issues arising from misuse of products</li>
            <li>Delays beyond our control</li>
          </ul>
        </section>

        <section>
          <h2>9. Governing Law</h2>
          <p>
            These Terms and Conditions shall be governed by the laws of India.
            Any disputes shall fall under the jurisdiction of courts in
            Hyderabad, Telangana.
          </p>
        </section>

        <section>
          <h2>10. Contact Information</h2>
          <p>Mail: support@jyothimilletsnacks.in</p>
          <p>Phone: 9052929239</p>
        </section>
      </div>
    </div>
  );
};

export default TermsConditions;