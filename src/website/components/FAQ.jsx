import React, { useEffect, useState } from "react";
import axios from "axios";
import { ChevronDown } from "lucide-react";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/Whatsapp";
import Topbar from "../components/Topbar";
import Navbar from "../components/navbar";
// import "./faq.css";
import { API_ENDPOINTS } from "../../api/endpoints";

const FAQ = () => {
  const [faqs, setFaqs] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(API_ENDPOINTS.faq)
      .then((response) => {
        console.log(response)
       setFaqs(response.data.slice(0, 4));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching FAQs:", err);
        setError("Failed to load FAQs.");
        setLoading(false);
      });
  }, []);

  const toggleFaq = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  if (loading) {
    return <p className="faq-status">Loading FAQs...</p>;
  }

  if (error) {
    return <p className="faq-status error">{error}</p>;
  }

  return (
    <>
    
    <section className="faq-section">
      <div className="faq-container">
        <div className="faq-header">
          <p className="faq-subtitle">Need Help?</p>
          <h2 className="faq-title">Frequently Asked Questions</h2>
          <p className="faq-description">
            Find answers to common questions about orders, refunds, damaged
            products, delivery, and returns.
          </p>
        </div>

        <div className="faq-list">
          {faqs.map((faq) => (
            <div
              className={`faq-item ${activeId === faq.id ? "active" : ""}`}
              key={faq.id}
            >
              <button
                className="faq-question"
                onClick={() => toggleFaq(faq.id)}
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`faq-icon ${activeId === faq.id ? "rotate" : ""}`}
                  size={22}
                />
              </button>

              <div
                className={`faq-answer-wrapper ${
                  activeId === faq.id ? "open" : ""
                }`}
              >
                <p className="faq-answer">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
   
    </>
  );
};

export default FAQ;