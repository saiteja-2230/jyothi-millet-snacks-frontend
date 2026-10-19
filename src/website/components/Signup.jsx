import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_ENDPOINTS } from "../../api/endpoints";
import Topbar from "./Topbar";
import Navbar from "./navbar";
import WhatsAppButton from "./Whatsapp";
import Footer from "./Footer";
import { Eye, EyeOff } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [signupData, setSignupData] = useState({
    full_name: "",
    phone: "",
    email: "",
    city: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  // ✅ Validation
  const validate = () => {
    let newErrors = {};

    if (!signupData.full_name.trim()) {
      newErrors.full_name = "Full name is required";
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(signupData.phone)) {
      newErrors.phone = "Phone must start with 6-9 and be 10 digits";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(signupData.email)) {
      newErrors.email = "Enter valid email";
    }

    if (!signupData.city.trim()) {
      newErrors.city = "City is required";
    }

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/;

    if (!passwordRegex.test(signupData.password)) {
      newErrors.password =
        "Must include uppercase, number, special character";
    }

    if (signupData.password !== signupData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    return newErrors;
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length !== 0) return;

    setLoading(true);

    try {
      await axios.post(API_ENDPOINTS.register, signupData);

      toast.success("Account created successfully 🎉");

      setTimeout(() => {
        navigate("/login");
      }, 5500);

    } catch (error) {
      if (error.response?.data?.message) {
        const msg = error.response.data.message;

        setErrors({
          email: msg.email,
          phone: msg.phone,
        });
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Topbar />
      <Navbar />

      <div className="signup-container">
  <div className="signup-box">
    
    <h2>Create Account</h2>
    <p className="signup-subtext">Join us to explore authentic homemade products</p>

    <form onSubmit={handleSignup}>

      {/* Row 1 */}
      <div className="signup-row">
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
            onChange={(e) =>
              setSignupData({ ...signupData, full_name: e.target.value })
            }
          />
          {errors.full_name && <p className="error">{errors.full_name}</p>}
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            onChange={(e) =>
              setSignupData({ ...signupData, email: e.target.value })
            }
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
      </div>

      {/* Row 2 */}
      <div className="signup-row">
        <div className="form-group">
          <label>Phone</label>
          <input
            type="text"
            placeholder="Enter phone number"
            onChange={(e) =>
              setSignupData({ ...signupData, phone: e.target.value })
            }
          />
          {errors.phone && <p className="error">{errors.phone}</p>}
        </div>

        <div className="form-group">
          <label>City</label>
          <input
            type="text"
            placeholder="Enter your city"
            onChange={(e) =>
              setSignupData({ ...signupData, city: e.target.value })
            }
          />
          {errors.city && <p className="error">{errors.city}</p>}
        </div>
      </div>

      {/* Row 3 - Password */}
      <div className="signup-row">
        <div className="form-group password-field">
          <label>Password</label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Create password"
            onChange={(e) =>
              setSignupData({ ...signupData, password: e.target.value })
            }
          />
          <span onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </span>
          {errors.password && <p className="error">{errors.password}</p>}
        </div>

        <div className="form-group password-field">
          <label>Confirm Password</label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm password"
            onChange={(e) =>
              setSignupData({
                ...signupData,
                confirmPassword: e.target.value,
              })
            }
          />
          <span onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </span>
          {errors.confirmPassword && (
            <p className="error">{errors.confirmPassword}</p>
          )}
        </div>
      </div>

      {/* Button */}
      <button type="submit" disabled={loading} className="signup-btn">
        {loading ? "Creating Account..." : "Create Account"}
      </button>

    </form>

    <p className="login-link">
      Already have an account?{" "}
      <span onClick={() => navigate("/login")}>Sign In</span>
    </p>

  </div>
</div>
      <ToastContainer />
      <WhatsAppButton />
      <Footer />
    </>
  );
};

export default Signup;