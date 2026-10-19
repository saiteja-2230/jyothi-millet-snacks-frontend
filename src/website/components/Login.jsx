import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Topbar from "./Topbar";
import Navbar from "./navbar";
import WhatsAppButton from "./Whatsapp";
import Footer from "./Footer";
import axios from "axios";
import { API_ENDPOINTS } from "../../api/endpoints";
import { Eye, EyeOff } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [loginData, setLoginData] = useState({
    login: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  // ✅ Validation
 const validate = () => {
  let newErrors = {};

  if (!loginData.login.trim()) {
    newErrors.login = "Email or Phone is required";
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[6-9]\d{9}$/;

    if (!emailRegex.test(loginData.login) && !phoneRegex.test(loginData.login)) {
      newErrors.login = "Enter valid email or phone number";
    }
  }

  if (!loginData.password) {
    newErrors.password = "Password is required";
  }

  return newErrors;
};



  // ✅ Submit
const handleLogin = async (e) => {
  e.preventDefault();

  const validationErrors = validate();
  setErrors(validationErrors);

  if (Object.keys(validationErrors).length !== 0) return;

  setLoading(true);

  try {
    const payload = {
      login: loginData.login,
      password: loginData.password,
    };

const response = await axios.post(API_ENDPOINTS.login, payload);

console.log("FULL RESPONSE:", response.data);

const data = response.data;

// ❌ validate properly
if (!data.status || !data.token || !data.data) {
  console.error("Wrong API response", data);
  toast.error("Login API issue");
  return;
}

// ✅ Save token
localStorage.setItem("token", data.token);

// ✅ Save user
localStorage.setItem("user", JSON.stringify(data.data));

toast.success("Login successful 🎉");

// ✅ Redirect logic
const redirectPath = localStorage.getItem("redirectAfterLogin");

setTimeout(() => {
  if (redirectPath) {
    localStorage.removeItem("redirectAfterLogin");
    navigate(redirectPath);
  } else {
    navigate("/");
  }
}, 1000);

    toast.success("Login successful 🎉");



  } catch (error) {
    console.log("Error response:", error.response);

    if (error.response?.data?.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("Invalid credentials");
    }
  } finally {
    setLoading(false);
  }
};

  return (
    <>
      <Topbar />
      <Navbar />

      <div className="amazon-auth-container">
        <div className="amazon-box">
          <h2>Sign In</h2>

          <form onSubmit={handleLogin}>
            
            {/* Username */}
            <div>
              <label>Email / Phone</label>
              <input
                type="text"
                value={loginData.login}
                onChange={(e) =>
                  setLoginData({
                    ...loginData,
                    login: e.target.value,
                  })
                }
              />
              {errors.login && (
                <p className="error">{errors.login}</p>
              )}
            </div>

            {/* Password */}
          {/* Password */}
<div className="password-fieldd">
  <label>Password</label>

  <div className="password-input-wrapper">
    <input
      type={showPassword ? "text" : "password"}
      value={loginData.password}
      onChange={(e) =>
        setLoginData({
          ...loginData,
          password: e.target.value,
        })
      }
    />

    <button
      type="button"
      className="password-toggle"
      onClick={() => setShowPassword(!showPassword)}
      aria-label={showPassword ? "Hide password" : "Show password"}
    >
      {showPassword ? (
        <EyeOff size={20} />
      ) : (
        <Eye size={20} />
      )}
    </button>
  </div>

  {errors.password && (
    <p className="error">{errors.password}</p>
  )}
</div>

            {/* Button */}
            <button type="submit" disabled={loading} className="submit-btn">
              {loading ? "Signing in..." : "Login"}
            </button>
          </form>

          <p>
            Don’t have an account?{" "}
            <span onClick={() => navigate("/signup")} className="sign">
              Sign Up
            </span>
          </p>
        </div>
      </div>

      <ToastContainer />
      <WhatsAppButton />
      <Footer />
    </>
  );
};

export default Login;