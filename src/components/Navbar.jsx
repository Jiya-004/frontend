import React, { useState } from "react";
import { Menu, X, ShoppingCart, User } from "lucide-react";
import "../css/Navbar.css"; // ✅ Import the CSS file here

export default function Navbar({ onLogout }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo">MyShop</div>

        {/* Desktop Menu */}
        <div className={`navbar-links ${isOpen ? "active" : ""}`}>
          <a href="#" className="nav-link">Home</a>
          <a href="#" className="nav-link">Products</a>
          <a href="#" className="nav-link">About</a>
          <a href="#" className="nav-link">Contact</a>
          <button onClick={onLogout} className="logout-btn">Logout</button>
        </div>

        {/* Icons & Menu Toggle */}
        <div className="navbar-icons">
          <div className="icon-wrapper">
            <ShoppingCart size={22} />
            <span className="cart-badge"></span>
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
