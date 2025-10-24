import React, { useState, useEffect } from "react";
import "../css/CheckoutModal.css";

// Ensure 'navigate' is included in the props
export default function CheckoutModal({ isOpen, onClose, onConfirm, totalAmount, navigate }) {
  const [shippingAddress, setShippingAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  // Reset all state when the modal closes
  useEffect(() => {
    if (!isOpen) {
      setShippingAddress("");
      setPhone("");
      setErrors({});
      setShowSuccess(false);
      setOrderNumber("");
    }
  }, [isOpen]);

  const validate = () => {
    const newErrors = {};

    if (!shippingAddress.trim()) {
      newErrors.shippingAddress = "Shipping address is required";
    }

    // Validation for 10-digit phone number
    if (!phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(phone.replace(/\D/g, ''))) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsProcessing(true);

    try {
      // Calls the parent's onConfirm function, which handles API submission and cart clearing.
      const result = await onConfirm({
        shipping_address: shippingAddress,
        phone: phone
      });

      // EXPECTS: { success: true, orderNumber: 'XYZ' } from the parent
      if (result && result.success) {
        setOrderNumber(result.orderNumber || 'N/A');
        setShowSuccess(true); // Switch to the success view
      } else {
        // Display the error returned by the parent (if any)
        alert(result?.error || "Failed to place order. Please try again.");
      }
    } catch (error) {
      console.error("Order submission error:", error);
      alert("Failed to place order. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleViewOrderHistory = () => {
    setShowSuccess(false);
    onClose();
    // Use the navigate prop passed from the parent
    navigate('/order-history'); 
  };

  const handleContinueShopping = () => {
    setShowSuccess(false);
    onClose();
    navigate('/products');
  };

  const handleCancel = () => {
    // Clear form and close modal
    setShippingAddress("");
    setPhone("");
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={!showSuccess ? handleCancel : null}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        
        {/* Conditional Rendering: Checkout Form */}
        {!showSuccess ? (
          <>
            <button
              className="close-icon"
              onClick={handleCancel}
              style={{
                position: 'absolute', top: '15px', right: '15px', background: 'none', border: 'none',
                fontSize: '24px', cursor: 'pointer', color: '#666', padding: '5px'
              }}
              disabled={isProcessing}
            >
              ×
            </button>

            <h2>Checkout</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Shipping Address *</label>
                <textarea
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  placeholder="Enter your complete shipping address"
                  rows="4"
                  className={errors.shippingAddress ? "error" : ""}
                  disabled={isProcessing}
                />
                {errors.shippingAddress && (
                  <span className="error-message">{errors.shippingAddress}</span>
                )}
              </div>

              <div className="form-group">
                <label>Phone Number *</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="9812345678"
                  className={errors.phone ? "error" : ""}
                  disabled={isProcessing}
                />
                {errors.phone && (
                  <span className="error-message">{errors.phone}</span>
                )}
              </div>

              <div className="order-summary">
                <h3>Order Summary</h3>
                <p className="total">Total Amount: Rs. {totalAmount.toFixed(2)}</p>
              </div>

              <div className="modal-buttons">
                <button
                  type="submit"
                  className="confirm-btn"
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Processing...' : 'Place Order'}
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={handleCancel}
                  disabled={isProcessing}
                >
                  Cancel
                </button>
              </div>
            </form>
          </>
        ) : (
          // Conditional Rendering: Success Message View
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <div style={{ fontSize: '64px', marginBottom: '20px', color: '#28a745' }}>✅</div>
            <h2 style={{ color: '#28a745', marginBottom: '15px' }}>Order Placed Successfully!</h2>
            <p style={{ fontSize: '16px', color: '#666', marginBottom: '10px' }}>
              Your order has been confirmed. Your cart has been cleared.
            </p>
            <p style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '30px' }}>
              Order Number: <span style={{ color: '#007bff' }}>{orderNumber}</span>
            </p>
            <p style={{ fontSize: '14px', color: '#666', marginBottom: '30px' }}>
                See your order history for details.
            </p>
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={handleViewOrderHistory}
                style={{ padding: '12px 24px', fontSize: '16px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '500' }}
              >
                View Order History
              </button>
              <button
                onClick={handleContinueShopping}
                style={{ padding: '12px 24px', fontSize: '16px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '500' }}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}