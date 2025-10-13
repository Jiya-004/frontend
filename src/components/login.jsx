import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Don't forget to use this if you want to link to /signup
import "../css/Login.css"; // 👈 New separate CSS file

export default function Login() {
  const navigate = useNavigate(); // Initialize navigate
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/login", form);
      setMessage(res.data.message);
      console.log(res.data.user);
      // Optional: Redirect upon successful login
      // navigate("/dashboard"); 
    } catch (error) {
      setMessage("Invalid email or password");
    }
  };

  return (
    // Wrapper for centering the card
    <div className="login-page-wrapper"> 
      {/* The centered card */}
      <div className="login-card"> 
        <h2>Login</h2>
        {message && <p className="status-message">{message}</p>}
        
        <form onSubmit={handleSubmit}>
          {/* Email Input */}
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
          
          {/* Password Input */}
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
          
          {/* Optional: Forgot Password Link */}
          <a href="#" className="forgot-password">Forgot password?</a>

          {/* Optional: Link to Signup */}
          <button 
            type="button" 
            className="link-button" 
            onClick={() => navigate("/signup")}
          >
            Don't have an account? Sign up
          </button>
          
          <button type="submit" className="submit-button">Sign In</button>
        </form>
      </div>
    </div>
  );
}