import React, { useState } from "react";
import { Search } from "lucide-react";
import Card from "../components/card";
import "../css/Product.css";
import thali1 from "../assets/thali1.png";

export default function Products() {
  // Sample product list
  const products = [
    { id: 1, title: "Handmade Pot", image: thali1, price: 1200 },
    { id: 2, title: "Wooden Frame", image: thali1, price: 900 },
    { id: 3, title: "Artistic Vase", image: thali1, price: 1500 },
    { id: 4, title: "Thali", image: thali1, price: 1200 },
    { id: 5, title: "Puja plate", image: thali1, price: 1000 },
  ];

  // State for search input
  const [searchTerm, setSearchTerm] = useState("");

  // Filter products based on search term
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="products-page-wrapper"> {/* Renamed for clarity */}
      <h2 className="products-heading">Our Products</h2> {/* Renamed for clarity */}

      {/* 🔍 Search Bar Section */}
      <div className="search-bar-container"> {/* NEW: Container for centering */}
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
              title={product.title}
              image={product.image}
              price={product.price}
            />
          ))
        ) : (
          <p className="no-results">No products found 😢</p>
        )}
      </div>
    </div>
  );
}