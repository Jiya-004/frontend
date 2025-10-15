import React from "react";
import Card from "../components/card"; // Assuming the path is correct
import "../css/Product.css";
import thali1 from '../assets/thali1.png' 

export default function Products() {
  const products = [
    { id: 1, title: "Handmade Pot", image: thali1, price: 1200 },
    { id: 2, title: "Wooden Frame", image: thali1, price: 900 },
    { id: 3, title: "Artistic Vase", image: thali1, price: 1500 },
  ];

  return (
    <div className="products-container">
      <h2 className="heading">Our Products</h2>
      
      {/* 🛑 FIX: New Wrapper for the cards 🛑 */}
      <div className="card-list">
        {products.map((product) => (
          <Card
            key={product.id} 
            title={product.title}
            image={product.image}
            price={product.price}
          />
        ))}
      </div>
      
    </div>
  );
}