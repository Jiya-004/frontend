import React, { useState } from "react";
import { BsCart2 } from "react-icons/bs";
import "../css/Card.css";
import Modal from "./modal";
import axios from "axios";
import { useCart } from "../components/Cartcomponent";

export default function Card({ title, image, price, id }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { fetchCartFromDatabase } = useCart();

  const handleAdd = async () => {
    // Check if user is logged in
    const userStr = localStorage.getItem("user");
    
    if (!userStr) {
      setModalOpen(true);
      return;
    }

    const user = JSON.parse(userStr);

    // Validate that we have user.id and product id
    if (!user.id) {
      alert("User session invalid. Please log in again.");
      return;
    }

    if (!id) {
      console.error("Product ID is missing:", id);
      alert("Product ID is missing. Cannot add to cart.");
      return;
    }

    setIsLoading(true);

    try {
      console.log("Sending cart request with:", {
        product_id: id,
        product_name: title,
        product_image: image,
        product_price: price,
        user_id: user.id,
        quantity: 1
      });

      const response = await axios.post(
        "http://127.0.0.1:8080/api/cart/add",
        { 
          product_id: parseInt(id),
          product_name: title,
          product_image: image,
          product_price: parseFloat(price),
          user_id: parseInt(user.id),
          quantity: 1 
        },
        { 
          headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          } 
        }
      );

      console.log("Success! Cart response:", response.data);
      
      // Refresh cart count after adding
      if (fetchCartFromDatabase) {
        await fetchCartFromDatabase();
      }
      
      alert("✅ Product added to cart successfully!");

    } catch (err) {
      console.error("=== CART ERROR ===");
      console.error("Full error:", err);
      console.error("Error message:", err.message);
      console.error("Error response:", err.response?.data);
      console.error("Error status:", err.response?.status);
      
      if (err.response?.status === 500) {
        alert("Server error. Please check if the product and user exist in the database.");
      } else if (err.response?.status === 422) {
        const errors = err.response.data.errors;
        const errorMsg = errors 
          ? Object.values(errors).flat().join(', ') 
          : err.response.data.message;
        alert("Validation error: " + errorMsg);
      } else {
        alert("Failed to add to cart. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card">
      <img src={image} alt={title} className="card-image" />
      <div className="card-body">
        <h3 className="card-title">{title}</h3>
        <p className="card-price">Rs. {price}</p>
        <button 
          className="card-btn" 
          onClick={handleAdd}
          disabled={isLoading}
        >
          <BsCart2 size={18} style={{ marginRight: "6px" }} /> 
          {isLoading ? "Adding..." : "Add to Cart"}
        </button>
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Not Logged In"
        message="You are not logged in! Please login to add items to cart."
      />
    </div>
  );
}