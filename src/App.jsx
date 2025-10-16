import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
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
import Dashboard from "./admin/dashboard";

// Separate wrapper so we can use useLocation
function AppContent() {
  const location = useLocation();

  // ✅ Hide Navbar on admin routes
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Navbar />}

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
        <Route path="/admin/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <CartProvider>
      <Router>
        <AppContent />
      </Router>
    </CartProvider>
  );
}
