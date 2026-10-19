import React from "react";
import { Mail,
  Phone,
} from "lucide-react";
import master from "../../../public/products/master.png"
import rupay from "../../../public/products/rupay.png"
import safekey from "../../../public/products/safekey.png"
import visa from "../../../public/products/visa.png"
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
 
const Footer = () => {
  return (
    <footer className="footer">
 
      <div className="footer-container">
 
        {/* Column 1 */}
        <div className="footer-col">
          <img
            src="/jms_white_logo.png"
            alt="Jyothi Millet Snacks"
            className="footer-logo"
          />
 
          <p>
            Authentic homemade snacks prepared with
            traditional recipes and premium ingredients.
          </p>

           <div className="footer-social-icons">

    <a
      href="https://www.facebook.com/share/1BBwHArpoU/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Facebook"
      className="social-facebook"
    >
      <FaFacebookF />
    </a>

    <a
      href="https://www.instagram.com/jyothi_millet_snacks?igsh=MTE2NnFtZmozcmF1eQ=="
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Instagram"
      className="social-instagram"
    >
      <FaInstagram />
    </a>

    <a
      href="https://www.youtube.com/@Jyothimilletssnacks"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="YouTube"
      className="social-youtube"
    >
      <FaYoutube />
    </a>

  </div>
        </div>
 
        {/* Column 2 */}
        <div className="footer-col">
          <h3>Quick Links</h3>
 
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/products">Track Orders</a></li>
            <li><a href="/contact">Contact Us</a></li>
          </ul>
        </div>
 
        {/* Column 3 */}
        <div className="footer-col">
          <h3>Policies</h3>
 
          <ul>
            <li>
              <a href="/terms-and-conditions">
                Terms & Conditions
              </a>
            </li>
 
            <li>
              <a href="/privacy-policy">
                Privacy Policy
              </a>
            </li>
 
            <li>
              <a href="/returns-refunds">
                Refund Policy
              </a>
            </li>
 
            <li>
              <a href="/faq">
                FAQ's
              </a>
            </li>
          </ul>
        </div>
 
        {/* Column 4 */}
        <div className="footer-col">
          <h3>Contact Us</h3>
 
          <p>
            <Mail size={16} />
            <a href="mailto:support@jyothimilletsnacks.in" className="text-decoration-none text-white">support@jyothimilletsnacks.in</a>
          </p>
 
          <p>
            <Phone size={16} />
            <a href="tel:9052929239" className="text-decoration-none text-white">+91 9052929239</a>
          </p>
          <div className="payment-section">
 
        <h4>Accepted Payments</h4>
 
        <div className="payment-icons">
          <img src={master} alt="UPI" />
          <img src={rupay} alt="RuPay" />
          <img src={safekey} alt="Visa" />
          <img src={visa} alt="MasterCard" />
        </div>
 
      </div>
        </div>
 
      </div>
 
      {/* Payment Methods */}
     
 
      <hr />
 
      {/* Bottom */}
      <div className="footer-bottom">
 
        <p>
          © 2026 Jyothi Millet Snacks.
          All Rights Reserved.
        </p>
 
        <div className="social-icons">
 
          {/* <a
            href="https://facebook.com"
            target="_blank"
            rel="noreferrer"
          >
            <Facebook size={20} />
          </a> */}
 
          {/* <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
          >
            <Instagram size={20} />
          </a> */}
 
        </div>
 
      </div>
 
    </footer>
  );
};
 
export default Footer;