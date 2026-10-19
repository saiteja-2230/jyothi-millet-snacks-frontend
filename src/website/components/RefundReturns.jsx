import React from "react";
// import "./RefundReturns.css";

const RefundReturns = () => {
  return (
    <div className="refund-container">
      <div className="refund-content">
        <h1>Refund and Return Policy</h1>

        <section>
          <h2>1. Overview</h2>
          <p>
            We strive to deliver the highest quality products. However, due to
            the perishable nature of our items, returns are limited.
          </p>
        </section>

        <section>
          <h2>2. Eligible Returns</h2>
          <p>Returns are accepted only in the following cases:</p>
          <ul>
            <li>Product is spoiled</li>
            <li>Package is damaged during delivery</li>
          </ul>
        </section>

        <section>
          <h2>3. Return Conditions</h2>
          <ul>
            <li>Issue must be reported within 24 hours of delivery</li>
            <li>Proof (images/videos) must be provided</li>
            <li>Product should not be consumed significantly</li>
          </ul>
        </section>

        <section>
          <h2>4. Non-Returnable Items</h2>
          <p>We do not accept returns for:</p>
          <ul>
            <li>Change of mind</li>
            <li>Taste preferences</li>
            <li>Incorrect orders placed by the customer</li>
          </ul>
        </section>

        <section>
          <h2>5. Refund Process</h2>
          <ul>
            <li>Once the return is approved, refund will be initiated</li>
            <li>Refund will be completed within 5 working days</li>
            <li>Refund will be credited to the original payment method</li>
          </ul>
        </section>

        <section>
          <h2>6. Cancellation Policy</h2>
          <ul>
            <li>Orders cannot be canceled once they are processed or shipped</li>
          </ul>
        </section>

        <section>
          <h2>7. Contact for Returns</h2>
          <p>Mail: support@jyothimilletsnacks.in</p>
          <p>Phone: 9052929239</p>
        </section>
      </div>
    </div>
  );
};

export default RefundReturns;