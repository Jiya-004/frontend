import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import React, { useState } from "react";
import Navbar from "./components/navbar";
import LandingPage from "./Pages/LandingPage";
import SignUp from "./Pages/signup";
import Login from "./Pages/login";
import Home from "./components/Home";
import Contact from "./Pages/contact";
import About from "./Pages/About";
import { CartProvider } from "./components/Cartcomponent";
import CartPage from "./Pages/CartPage";
import Products from "./Pages/product";
import Account from "./Pages/account";
import Admindashboard from "./admin/dashboard";
import Product from "./admin/product";
import Sidebar from "./admin/Sidebar";
import Inventory from "./admin/Inventory";
import "./axiosConfig";

function AppContent() {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false); // ✅ moved here

  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <div className="app-layout" style={{ display: "flex", minHeight: "100vh" }}>
      {/* --- Show Navbar only for non-admin pages --- */}
      {!isAdminPage && <Navbar />}

      {/* --- Show Sidebar only for admin pages --- */}
      {isAdminPage && (
        <Sidebar
          isCollapsed={isCollapsed}
          toggleSidebar={() => setIsCollapsed(!isCollapsed)}
        />
      )}

      {/* --- Main content area --- */}
      <div
        style={{
          flex: 1,
          padding: isAdminPage ? "20px" : "0",
          marginLeft: isAdminPage && !isCollapsed ? "250px" : "80px", // ✅ adjust for sidebar width
          transition: "margin-left 0.3s ease",
        }}
      >
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/account" element={<Account />} />
          <Route path="/admin/dashboard" element={<Admindashboard />} />
          <Route path="/admin/product" element={<Product />} />
          <Route path="/admin/inventory" element={<Inventory />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <Router>
        <AppContent />
      </Router>
    </CartProvider>
  );
}

export default App;
