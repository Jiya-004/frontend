import React from "react";
import { BsCart2 } from "react-icons/bs";
import "../css/Card.css"; // ✅ Create this file for styling

export default function Card({ title, image, price }) {
  return (
    <div className="card">
      <img src={image} alt={title} className="card-image" />
      <div className="card-body">
        <h3 className="card-title">{title}</h3>
        <p className="card-price">Rs. {price}</p>
        <button className="card-btn">
          <BsCart2 size={18} style={{ marginRight: "6px" }} /> Add to Cart
        </button>
      </div>
    </div>
  );
}
