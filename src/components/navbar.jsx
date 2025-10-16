import React, { useState } from "react";
import { Menu, X, ShoppingCart, User } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "../css/Navbar.css";
import { useCart } from "../components/Cartcomponent"; 
import { useAuth } from "../hooks/useAuth"; // ⬅️ NEW IMPORT

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const { cartItems } = useCart();

  // 🔑 GET AUTH STATE AND LOGOUT FUNCTION
  const { isLoggedIn, logout } = useAuth(); 
  const navigate = useNavigate();

  // Handler for the logout button
  const handleLogout = () => {
    logout(navigate); 
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/">Shopify</Link>
        </div>

        <div className={`navbar-links ${isOpen ? "active" : ""}`}>
          <NavLink to="/home" className="nav-link">Home</NavLink>
          <NavLink to="/products" className="nav-link">Products</NavLink>
          <NavLink to="/about" className="nav-link">About</NavLink>
          <NavLink to="/contact" className="nav-link">Contact</NavLink>
          
          {/* 🔑 CONDITIONAL RENDERING HERE: Login vs. Logout */}
          {isLoggedIn ? (
            // Show Logout Button if user is logged in
            <button 
              onClick={handleLogout} 
              className=" logout-btn" // Reuses your existing styling class
            >
              Logout
            </button>
          ) : (
            // Show Login Link if user is NOT logged in
            <NavLink to="/login" className="nav-link logout-btn">
              Login
            </NavLink>
          )}
          
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
            <Link to="/account" className="account-link" aria-label="My Account" >
            <User size={22} />
            </Link>
          </div>

          <button className="menu-toggle" onClick={toggleMenu}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </nav>
  );
}