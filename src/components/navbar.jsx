import React, { useState } from "react";
import { Menu, X, ShoppingCart, User } from "lucide-react";
import { Link } from "react-router-dom"; // ✅ Import Link
import "../css/Navbar.css";
import Products from "../Pages/product";

export default function Navbar({ onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo">
          <Link to="/">Shopify</Link>
        </div>

        {/* Desktop Menu */}
        <div className={`navbar-links ${isOpen ? "active" : ""}`}>
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/products" className="nav-link">Products</Link>
          <Link to="/About" className="nav-link">About</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
          <Link to="/login" className="logout-btn">Login</Link>
        </div>

        {/* Icons & Menu Toggle */}
        <div className="navbar-icons">
          <div className="icon-wrapper">
            <ShoppingCart size={22} />
          </div>

          <div className="icon-wrapper">
            <User size={22} />
          </div>

          <button className="menu-toggle" onClick={toggleMenu}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </nav>
  );
}
