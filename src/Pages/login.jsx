import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/Login.css";

export default function Login() {
  const navigate = useNavigate();
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
      const user = res.data.user; // Get user object from response
      setMessage(res.data.message);

      // Save user info for later
      localStorage.setItem("user", JSON.stringify(user));

      // ✅ Redirect based on role
      if (user.role === "admin") {
        navigate("/admin/dashboard"); // Admin dashboard route
      } else {
        navigate("/home"); // Normal user home
      }
    } catch (error) {
      setMessage("Invalid email or password");
    }
  };

  return (
    <div className="login-page-wrapper">
      <div className="login-card">
        <h2>Login</h2>
        {message && <p className="status-message">{message}</p>}

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
