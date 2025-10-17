import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import Card from "../components/card";
import "../css/Product.css";
import axios from "axios";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch products from your Laravel API
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8080/api/products") // ✅ Replace with your actual API endpoint
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  // Filter products based on search term
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          filteredProducts.map((product, index) => (
            <Card
              key={index}
              title={product.name}
              price={product.price}
              // 👇 FIXED: Update image path based on your Laravel folder
              image={`http://127.0.0.1:8080/storage/${product.image}`} 
        
            />
          ))
        ) : (
          <p className="no-results">No products found 😢</p>
        )}
      </div>
    </div>
  );
}
