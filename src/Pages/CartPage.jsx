import React, { useEffect, useState } from "react";
import { useCart } from "../components/Cartcomponent";
import { useNavigate } from "react-router-dom";
import CheckoutModal from "../components/CheckoutModal";
import axios from "axios";
import "../css/CartPage.css";

export default function CartPage() {
  // Assuming useCart provides necessary functions and state
  const { cartItems, removeFromCart, updateQuantity, clearCart, isLoading, fetchCartFromDatabase } = useCart();
  const [user, setUser] = useState(null);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      const parsedUser = JSON.parse(userStr);
      setUser(parsedUser);
      fetchCartFromDatabase();
    } else {
      setUser(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const totalItems = cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  const handleBuyNow = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    setCheckoutModalOpen(true);
  };

  // CORRECTED: This function now returns a structured object to the CheckoutModal
  const handleConfirmOrder = async (checkoutData) => {
    setIsPlacingOrder(true);

    try {
      // 1. Send order details to the backend
      const response = await axios.post('http://127.0.0.1:8080/api/orders', {
        user_id: user.id,
        shipping_address: checkoutData.shipping_address,
        phone: checkoutData.phone,
        // Optional: you might need to send cart items here too, 
        // but backend might fetch them using user_id
      });

      // Ensure your backend returns response.data.success = true on success
      if (response.data.success) {
        
        // 2. Clear the cart state/database items after successful order placement
        await clearCart(); 
        
        // 3. Return the success object expected by CheckoutModal
        return { 
          success: true, 
          orderNumber: response.data.order.order_number 
        };
        
      } else {
        // 4. Return the failure object
        return { 
          success: false, 
          error: response.data.message || "Server error: Order not confirmed." 
        };
      }
    } catch (error) {
      console.error('Order creation failed:', error);
      
      // 5. Return an error for network/unhandled issues
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to connect to order service.' 
      };
    } finally {
      setIsPlacingOrder(false);
    }
  };

  // --- Rendering Logic ---

  if (!user) {
    // ... (Login Required block remains the same)
    return (
        <div className="cart-page">
          <div className="login-prompt" style={{ textAlign: 'center', padding: '40px' }}>
            <h2>🔒 Login Required</h2>
            <p>Please log in to view your shopping cart.</p>
            <button 
              className="login-btn" 
              onClick={() => navigate('/login')}
              style={{ padding: '12px 24px', fontSize: '16px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', marginTop: '20px' }}
            >
              Go to Login
            </button>
          </div>
        </div>
      );
  }

  if (isLoading) {
    return (
      <div className="cart-page">
        <p style={{ textAlign: 'center', padding: '40px' }}>Loading your cart...</p>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h2 className="cart-title">🛒 Your Shopping Cart</h2>
      <p style={{ fontSize: '14px', color: '#666', marginBottom: '20px', textAlign: 'center' }}>
        Logged in as: <strong>{user.name || user.email}</strong>
      </p>

      {cartItems.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <p className="empty-cart">Your cart is empty 😢</p>
          <button 
            onClick={() => navigate('/products')}
            style={{ padding: '12px 24px', fontSize: '16px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', marginTop: '20px' }}
          >
            Browse Products
          </button>
        </div>
      ) : (
        <>
          <ul className="cart-list">
            {/* ... (Cart items map remains the same) ... */}
            {cartItems.map((item) => (
               <li key={item.id} className="cart-item">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="cart-image"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/150?text=No+Image';
                  }}
                />

                <div className="cart-details">
                  <h4>{item.title}</h4>
                  <p className="price">Rs. {item.price}</p>
                  <div className="quantity-controls">
                    <button 
                      onClick={() => updateQuantity(item.title, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.title, item.quantity + 1)}>
                      +
                    </button>
                  </div>
                </div>

                <div className="cart-actions">
                  <p className="subtotal">Subtotal: Rs. {(item.price * item.quantity).toFixed(2)}</p>
                  <button className="remove-btn" onClick={() => removeFromCart(item.title)}>
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="cart-summary">
            <h3>Cart Summary</h3>
            <p>Total Items: {totalItems}</p>
            <p className="cart-total">Total: Rs. {total.toFixed(2)}</p>
            <div className="cart-buttons">
              <button 
                className="buy-now-btn" 
                onClick={handleBuyNow}
                disabled={isPlacingOrder}
              >
                {isPlacingOrder ? 'Processing...' : 'Buy Now'}
              </button>
              <button 
                className="clear-btn" 
                onClick={() => {
                  if (window.confirm('Are you sure you want to clear your cart?')) {
                    clearCart();
                  }
                }}
              >
                Clear Cart
              </button>
            </div>
          </div>
        </>
      )}

      {/* Pass navigate prop to CheckoutModal */}
      <CheckoutModal
        isOpen={checkoutModalOpen}
        onClose={() => setCheckoutModalOpen(false)}
        onConfirm={handleConfirmOrder}
        totalAmount={total}
        navigate={navigate} 
      />
    </div>
  );
}