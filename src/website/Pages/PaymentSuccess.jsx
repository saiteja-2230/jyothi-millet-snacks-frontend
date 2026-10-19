import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import axios from "axios";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();

  const orderId = searchParams.get("order_id");

  const [status, setStatus] = useState("checking");
  const [redirectSeconds, setRedirectSeconds] = useState(5);

  const [message, setMessage] = useState(
    "Verifying your payment..."
  );

  // ============================================================
  // VERIFY PAYMENT
  // ============================================================

  useEffect(() => {
    if (!orderId) {
      setStatus("failed");
      setMessage("Order ID is missing.");
      return;
    }

    verifyPayment();
  }, [orderId]);

  // ============================================================
  // AUTO REDIRECT AFTER PAYMENT SUCCESS
  // ============================================================

  useEffect(() => {
    if (status !== "paid") {
      return;
    }

    setRedirectSeconds(5);

    const interval = setInterval(() => {
      setRedirectSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          window.location.href = "/";
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [status]);

  // ============================================================
  // VERIFY PAYMENT API
  // ============================================================

  const verifyPayment = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/verify-payment`,
        {
          params: {
            order_id: orderId,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log(
        "Payment verification:",
        response.data
      );

      // ========================================================
      // PAYMENT SUCCESS
      // ========================================================

      if (response.data.status === "paid") {
        setStatus("paid");

        setMessage(
          "Your payment has been received successfully and your order has been placed."
        );

        // Clear cart ONLY after successful payment
        localStorage.removeItem("cart");

        // Notify cart components
        window.dispatchEvent(
          new Event("cartUpdated")
        );
      }

      // ========================================================
      // PAYMENT PENDING
      // ========================================================

      else if (response.data.status === "pending") {
        setStatus("pending");

        setMessage(
          "Your payment is still being processed. Please wait while we confirm your payment."
        );
      }

      // ========================================================
      // PAYMENT FAILED
      // ========================================================

      else {
        setStatus("failed");

        setMessage(
          "We could not confirm your payment."
        );
      }

    } catch (error) {

      console.error(
        "Payment verification error:",
        error
      );

      console.error(
        "Response:",
        error.response?.data
      );

      console.error(
        "Status:",
        error.response?.status
      );

      setStatus("failed");

      setMessage(
        "We were unable to verify your payment. Please contact our support team."
      );
    }
  };

  // ============================================================
  // CHECKING PAYMENT
  // ============================================================

  if (status === "checking") {
    return (
      <div className="payment-page">

        <div className="payment-card">

          <div className="payment-loader">
            <div className="loader-circle"></div>
          </div>

          <h1>
            Verifying Payment
          </h1>

          <p className="payment-description">
            Please wait while we securely verify
            your payment.
          </p>

          <div className="order-id-box">

            <span>Order ID</span>

            <strong>
              {orderId || "N/A"}
            </strong>

          </div>

        </div>

      </div>
    );
  }

  // ============================================================
  // PAYMENT SUCCESS
  // ============================================================

  if (status === "paid") {
    return (
      <div className="payment-page">

        <div className="payment-card success-card">

          {/* SUCCESS ICON */}

          <div className="success-icon-wrapper">

            <div className="success-icon">
              ✓
            </div>

          </div>

          {/* TITLE */}

          <h1>
            Payment Successful!
          </h1>

          <p className="payment-description">
            {message}
          </p>

          {/* ORDER ID */}

          <div className="order-id-box">

            <span>Order ID</span>

            <strong>
              {orderId}
            </strong>

          </div>

          {/* NEXT STEP */}

          <div className="order-next-step">

            <div className="next-step-icon">
              🚚
            </div>

            <div className="next-step-content">

              <h3>
                What happens next?
              </h3>

              <p>
                Your order is now being processed.
                We will update you once your order
                is shipped and courier tracking
                details are available.
              </p>

            </div>

          </div>

          {/* STATUS STEPS */}

          <div className="order-status-steps">

            <div className="status-step active">

              <div className="step-circle">
                ✓
              </div>

              <span>
                Order Placed
              </span>

            </div>

            <div className="step-line"></div>

            <div className="status-step">

              <div className="step-circle">
                2
              </div>

              <span>
                Processing
              </span>

            </div>

            <div className="step-line"></div>

            <div className="status-step">

              <div className="step-circle">
                3
              </div>

              <span>
                Shipped
              </span>

            </div>

            <div className="step-line"></div>

            <div className="status-step">

              <div className="step-circle">
                4
              </div>

              <span>
                Delivered
              </span>

            </div>

          </div>

          {/* ACTION */}

          <div className="payment-actions">

            <Link
              to="/"
              className="btn btn-primary"
            >
              Continue Shopping
            </Link>

          </div>

          {/* REDIRECT */}

          <p className="redirect-message">

            Redirecting to home in{" "}
            <strong>
              {redirectSeconds}
            </strong>{" "}
            seconds...

          </p>

        </div>

      </div>
    );
  }

  // ============================================================
  // PAYMENT PENDING
  // ============================================================

  if (status === "pending") {
    return (
      <div className="payment-page">

        <div className="payment-card">

          <div className="pending-icon-wrapper">

            <div className="pending-icon">
              !
            </div>

          </div>

          <h1>
            Payment Processing
          </h1>

          <p className="payment-description">
            {message}
          </p>

          <div className="order-id-box">

            <span>Order ID</span>

            <strong>
              {orderId}
            </strong>

          </div>

          <div className="order-next-step">

            <div className="next-step-icon">
              ⏳
            </div>

            <div className="next-step-content">

              <h3>
                Please don't worry
              </h3>

              <p>
                Your payment may take a few moments
                to be confirmed. Please do not make
                another payment for the same order.
              </p>

            </div>

          </div>

          <div className="payment-actions">

            <Link
              to="/"
              className="btn btn-primary"
            >
              Continue Shopping
            </Link>

          </div>

        </div>

      </div>
    );
  }

  // ============================================================
  // PAYMENT FAILED
  // ============================================================

  return (
    <div className="payment-page">

      <div className="payment-card">

        <div className="failed-icon-wrapper">

          <div className="failed-icon">
            ×
          </div>

        </div>

        <h1>
          Payment Failed
        </h1>

        <p className="payment-description">
          {message}
        </p>

        <div className="order-id-box">

          <span>Order ID</span>

          <strong>
            {orderId || "N/A"}
          </strong>

        </div>

        <div className="payment-actions">

          <Link
            to="/checkout"
            className="btn btn-primary"
          >
            Try Again
          </Link>

          <Link
            to="/"
            className="btn btn-secondary"
          >
            Continue Shopping
          </Link>

        </div>

      </div>

    </div>
  );
};

export default PaymentSuccess;