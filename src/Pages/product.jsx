import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import Card from "../components/card";
import "../css/Product.css";
import axios from "axios";
// The imported image variable
import ocean from '../assets/Ocean.png'; 
import floral from '../assets/Floral.png';
import metallic from '../assets/Metallic.png';

import geode from '../assets/Geode.png'; 

// --- 📦 DUMMY PRODUCT DATA ---
const DUMMY_PRODUCTS = [
  // Correctly setting the 'image' property to the imported variable
  { id: 101, name: "Ocean Wave Resin Puja Thali", price: 1250.00, image: ocean }, 
  { id: 102, name: "Geode Crystal Resin Thali Set", price: 2100.00, image: geode },
  { id: 103, name: "Floral Gold Flake Resin Thali", price: 1599.00, image: floral },
  { id: 104, name: "Metallic Gold Leaf Thali", price: 1390.00, image: metallic },
  
  { id: 105, name: "Resin Kumkum/Haldi Katori (Set of 2)", price: 450.00, image: "dummy-bell-6.jpg" },
  { id: 106, name: "Mother of Pearl Resin Diya Base", price: 680.00, image: "dummy-box-7.jpg" },
  { id: 107, name: "Customized Photo Resin Frame", price: 950.00, image: "dummy-rangoli-9.jpg" },
  { id: 108, name: "Resin Incense Stick Holder (Lotus)", price: 399.00, image: "dummy-holder-17.jpg" },
  { id: 109, name: "Aura Purple Resin Thali", price: 1450.00, image: "dummy-frame-18.jpg" },
  { id: 110, name: "Mirror-Finish Resin Thali", price: 1899.00, image: "dummy-aasan-20.jpg" }, 
];
// -----------------------------

export default function Products() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // --- Core Logic: Fetch and Combine ---
  useEffect(() => {
    const fetchAndCombineProducts = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get("http://127.0.0.1:8080/api/products");
        
        const apiProducts = Array.isArray(res.data) 
            ? res.data.filter(p => p.name && p.price !== undefined) 
            : [];
        
        // SUCCESS: Combine API products and DUMMY products
        const combinedProducts = [...apiProducts, ...DUMMY_PRODUCTS];

        setProducts(combinedProducts);
        
      } catch (err) {
        // FAILURE: Fall back to ONLY the dummy products
        console.error("API Fetch Failed. Falling back to dummy products only:", err.message);
        setProducts(DUMMY_PRODUCTS); 
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndCombineProducts();
  }, []);
  
  // --- Helper Functions ---

  // Filter products based on search term
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // ✅ NEW/FIXED LOGIC FOR IMAGE URL RESOLUTION
  const getImageUrl = (product) => {
    // 1. Check if the image value is the imported asset variable itself.
    //    This is the most direct way to handle the 'ocean' image import.
    if (product.image === ocean||product.image== geode||product.image== floral||product.image==metallic) {
        return product.image;
    }
    
    // 2. If it's a string starting with 'dummy-', it points to the Public folder (or should be handled with / prefix).
    if (typeof product.image === 'string' && product.image.startsWith('dummy-')) {
      return `/${product.image}`;
    }
    
    // 3. Otherwise, it's a path for the live product from the Laravel storage.
    if (typeof product.image === 'string') {
        return `http://127.0.0.1:8080/storage/${product.image}`;
    }

    // Fallback
    return ''; 
  };

  // --- Rendering ---
  
  if (isLoading) {
      return (
          <div className="products-page-wrapper">
              <h2 className="products-heading">Loading Products...</h2>
              <p className="no-results">Please wait while we load the collection.</p>
          </div>
      );
  }


  return (
    <div className="products-page-wrapper">
      <h2 className="products-heading">Our Products</h2>

      {/* 🔍 Search Bar Section */}
      <div className="search-bar-container">
        <div className="search-bar">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* 🧺 Product Cards */}
      <div className="card-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Card
              key={product.id} 
              title={product.name}
              price={product.price}
              // This sends the correctly resolved path (URL) to the Card component
              image={getImageUrl(product)} 
            />
          ))
        ) : (
          <p className="no-results">No products found for "{searchTerm}" 😢</p>
        )}
      </div>
    </div>
  );
}