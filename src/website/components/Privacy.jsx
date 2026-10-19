import React from "react";
// import "./Privacy.css";

const Privacy = () => {
  return (
    <div className="privacy-container">
      <div className="privacy-content">
        <h1>Privacy Policy</h1>

        <section>
          <h2>1. Introduction</h2>
          <p>
            At Jyothi Millet Snacks, we respect your privacy and are committed
            to protecting your personal information.
          </p>
        </section>

        <section>
          <h2>2. Information We Collect</h2>
          <p>We may collect the following information:</p>
          <ul>
            <li>Name</li>
            <li>Phone number</li>
            <li>Email address</li>
            <li>Shipping and billing address</li>
            <li>
              Payment details (processed securely via third-party providers)
            </li>
          </ul>
        </section>

        <section>
          <h2>3. How We Use Your Information</h2>
          <p>Your information is used to:</p>
          <ul>
            <li>Process and deliver orders</li>
            <li>Communicate order updates</li>
            <li>Improve our services</li>
            <li>Provide customer support</li>
          </ul>
        </section>

        <section>
          <h2>4. Payment Security</h2>
          <p>
            All payments are processed through secure online payment gateways.
            We do not store your sensitive payment details such as card numbers
            or CVV.
          </p>
        </section>

        <section>
          <h2>5. Data Protection</h2>
          <p>
            We implement appropriate security measures to protect your personal
            data from unauthorized access, misuse, or disclosure.
          </p>
        </section>

        <section>
          <h2>6. Sharing of Information</h2>
          <p>
            We do not sell or rent your personal information. However, we may
            share data with:
          </p>
          <ul>
            <li>Delivery partners for order fulfillment</li>
            <li>Payment providers for transaction processing</li>
          </ul>
        </section>

        <section>
          <h2>7. Cookies</h2>
          <p>
            Our website may use cookies to enhance user experience and improve
            website performance.
          </p>
        </section>

        <section>
          <h2>8. User Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access your personal data</li>
            <li>Request corrections</li>
            <li>Request deletion (subject to legal obligations)</li>
          </ul>
        </section>

        <section>
          <h2>9. Jurisdiction</h2>
          <p>
            This Privacy Policy is governed by the laws of India, with
            jurisdiction in Hyderabad, Telangana.
          </p>
        </section>

        <section>
          <h2>10. Contact Us</h2>
          <p>Mail: support@jyothimilletsnacks.in</p>
          <p>Phone: 9052929239</p>
        </section>
      </div>
    </div>
  );
};

export default Privacy;