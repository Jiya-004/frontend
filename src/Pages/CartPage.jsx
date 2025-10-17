import React from "react";
import { useCart } from "../components/Cartcomponent";
import "../css/CartPage.css";

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-page">
      <h2 className="cart-title">🛒 Your Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <p className="empty-cart">Your cart is empty 😢</p>
      ) : (
        <>
          <ul className="cart-list">
            {cartItems.map((item, index) => (
              <li key={index} className="cart-item">
                <img src={item.image} alt={item.title} className="cart-image" />

                <div className="cart-details">
                  <h4>{item.title}</h4>
                  <p className="price">Rs. {item.price}</p>
                  <div className="quantity-controls">
                    <button onClick={() => updateQuantity(item.title, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.title, item.quantity + 1)}>+</button>
                  </div>
                </div>

                <div className="cart-actions">
                  <p className="subtotal">Subtotal: Rs. {item.price * item.quantity}</p>
                  <button className="remove-btn" onClick={() => removeFromCart(item.title)}>
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="cart-summary">
            <h3>Cart Summary</h3>
            <p>Total Items: {cartItems.length}</p>
            <p className="cart-total">Total: Rs. {total}</p>
            <div className="cart-buttons">
              <button className="checkout-btn">Proceed to Checkout</button>
              <button className="buy-now-btn">Buy Now</button>
              <button className="clear-btn" onClick={clearCart}>
                Clear Cart
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}