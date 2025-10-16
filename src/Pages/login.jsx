import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setAuthToken } from "../axiosConfig"; 
import { useAuth } from "../hooks/useAuth"; // ⬅️ IMPORT THE HOOK
import "../css/Login.css";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth(); // ⬅️ GET THE LOGIN FUNCTION
  
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // Use state to handle error/success messages
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    
    try {
      const res = await axios.post("http://127.0.0.1:8080/api/login", form);
      const user = res.data.user; // Get user object from response
      setMessage(res.data.message);

      setMessage(message);

      // ✅ Redirect based on role
      if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/home");
      }
    } catch (error) {
      // Check for the specific 401 response error message from the backend
      const errorMessage = error.response?.data?.message || "An unexpected error occurred.";
      setMessage(errorMessage);
    }
  };

  return (
    <div className="login-page-wrapper">
      <div className="login-card">
        <h2>Login</h2>
        {/* Use a class to style the error message differently */}
        {message && <p className={`status-message ${message.includes('Invalid') ? 'error' : ''}`}>{message}</p>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          
          <a href="#" className="forgot-password">
            Forgot password?
          </a>

          <button
            type="button"
            className="link-button"
            onClick={() => navigate("/signup")}
          >
            Don't have an account? Sign up
          </button>

          <button type="submit" className="submit-button">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}