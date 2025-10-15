import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import LandingPage from "./Pages/LandingPage";
import SignUp from "./Pages/signup";
import Login from "./Pages/login";
import Home from "./components/Home";
import Contact from "./Pages/contact";
import About from "./Pages/About";

import Products from "./Pages/product";  

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/about" element={<About/>}/>
          {/* ✅ Added */}
      </Routes>
    </Router>
  );
}

export default App;
