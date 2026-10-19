import React, { useState } from "react";
// import "./ContactUs.css";
import Topbar from "../components/Topbar";
import Navbar from "../components/navbar";
import Footer from "../components/Footer";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    description: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // remove error while typing
    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  // Validation
  const validateForm = () => {
    let newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.trim().length < 10) {
      newErrors.description = "Description must be at least 10 characters";
    }

    return newErrors;
  };

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSuccessMessage("");
      return;
    }

    // success handling
    console.log("Form Submitted:", formData);

    setSuccessMessage("Your message has been submitted successfully!");
    setErrors({});

    // reset form
    setFormData({
      name: "",
      email: "",
      description: "",
    });
  };

  return (
    <>
    <Topbar/>
    <Navbar/>
    <div className="contact-page">
      <div className="contact-container">
        <div className="contact-box">
          <h1>Contact Us</h1>
          <p>
            We'd love to hear from you. Fill out the form below and we’ll get
            back to you as soon as possible.
          </p>

          {successMessage && (
            <div className="success-message">{successMessage}</div>
          )}

          <form className="contact-form" onSubmit={handleSubmit}>
  {/* Name + Email Row */}
  <div className="form-row">
    {/* Name */}
    <div className="form-group">
      <label>Name</label>
      <input
        type="text"
        name="name"
        placeholder="Enter your name"
        value={formData.name}
        onChange={handleChange}
      />
      {errors.name && <span className="error-text">{errors.name}</span>}
    </div>

    {/* Email */}
    <div className="form-group">
      <label>Email</label>
      <input
        type="email"
        name="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={handleChange}
      />
      {errors.email && <span className="error-text">{errors.email}</span>}
    </div>
  </div>

  {/* Description */}
  <div className="form-group">
    <label>Description</label>
    <textarea
      rows="5"
      name="description"
      placeholder="Write your message here..."
      value={formData.description}
      onChange={handleChange}
    ></textarea>
    {errors.description && (
      <span className="error-text">{errors.description}</span>
    )}
  </div>

  <button type="submit" className="submit-btn">
    Submit
  </button>
</form>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default ContactUs;