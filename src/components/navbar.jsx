import React, { useState } from "react";
import { Menu, X, ShoppingCart, User } from "lucide-react";
import { Link } from "react-router-dom";
import "../css/Navbar.css";
import { useCart } from "../components/Cartcomponent"; // 👈 import

export default function Navbar({ onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const { cartItems } = useCart(); // 👈 use context

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/">Shopify</Link>
        </div>

        <div className={`navbar-links ${isOpen ? "active" : ""}`}>
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/products" className="nav-link">Products</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
          <Link to="/login" className="logout-btn">Login</Link>
        </div>

        <div className="navbar-icons">
          <div className="icon-wrapper">
            <Link to="/cart" className="cart-link">
              <ShoppingCart size={22} />
              {cartItems.length > 0 && (
                <span className="cart-count">{cartItems.length}</span>
              )}
            </Link>
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
