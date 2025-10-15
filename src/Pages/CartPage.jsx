import React from "react";
import { useCart } from "../components/Cartcomponent";
import "../css/CartPage.css";

export default function CartPage() {
  const { cartItems, removeFromCart } = useCart();

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty 🛒</p>
      ) : (
        <ul>
          {cartItems.map((item, index) => (
            <li key={index} className="cart-item">
              <img src={item.image} alt={item.title} width="60" />
              <div>
                <h4>{item.title}</h4>
                <p>Rs. {item.price}</p>
              </div>
              <button onClick={() => removeFromCart(item.title)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}