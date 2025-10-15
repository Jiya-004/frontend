import React from 'react';
import "../css/Home.css"; // Import the dedicated CSS file

// Dummy user data for the welcome message.
const user = { name: "Aashish" }; 

// --- Component Start ---
export default function Home() {
  
  return (
    // Main Container
    <div className="shreemcraft-container">
      
      

      {/* Hero Section */}
      <section className="hero-section hero-bg-shreemcraft">
        <div className="hero-text-container">
          <h2 className="hero-subtitle">Curated Handmade Goods</h2>
          <h1 className="hero-title">Elegance in Craft</h1>
          <p className="hero-description">Find unique crafts that transform your space.</p>
          <button className="explore-button">
            EXPLORE COLLECTIONS
          </button>
          
          {/* User Welcome Message */}
          <div className="welcome-message-wrapper">
            <span className="welcome-message">
              Welcome back, {user.name} 👋
            </span>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section services-section">
        <h3 className="section-subtitle">WHAT WE OFFER</h3>
        <h2 className="section-title">Designed with Passion, Crafted with Care</h2>

        <div className="services-grid">
          {/* Service Card 1: Fast Global Shipping */}
          <div className="service-card">
            <div className="service-icon">🚚</div>
            <h4 className="service-title">Fast Global Shipping</h4>
            <p className="service-description">
              Get your handmade goods delivered quickly and reliably to any location worldwide.
            </p>
            <button className="service-button">DISCOVER</button>
          </div>

          {/* Service Card 2: Customized Gifting */}
          <div className="service-card">
            <div className="service-icon">🎁</div>
            <h4 className="service-title">Customized Gifting</h4>
            <p className="service-description">
              Personalize your products with custom engravings and luxurious gift wrapping options.
            </p>
            <button className="service-button">DISCOVER</button>
          </div>

          {/* Service Card 3: Local Pick-up Available */}
          <div className="service-card">
            <div className="service-icon">🛍️</div>
            <h4 className="service-title">Local Pick-up Available</h4>
            <p className="service-description">
              If you are near our main studio, you can arrange a complimentary local pick-up to save on shipping.
            </p>
            <button className="service-button">DISCOVER</button>
          </div>
        </div>
      </section>

      {/* Gift Banner */}
      <section className="gift-banner-wrapper">
          <div className="gift-banner-container">
              <div className="gift-text-content">
                  <h3 className="gift-subtitle">SPECIAL EDITION</h3>
                  <h2 className="gift-title">Gift Ideas That Last Longer</h2>
                  <p className="gift-description">
                      Little reminders make someone's day brighter. Our curated craft collection makes perfect gifts that bring joy long after traditional store-bought items would fade.
                  </p>
                  <button className="gift-button">
                      SHOP GIFTS →
                  </button>
              </div>
              <div className="gift-icon-container">
                  <div className="gift-icon">🏺</div>
              </div>
          </div>
      </section>

      {/* Popular Products */}
      <section className="section products-section">
        <h2 className="section-title product-section-title">See What's Popular</h2>

        <div className="products-grid">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="product-card">
              <div className="product-image-placeholder">✨</div>
              <div className="product-details">
                <h4 className="product-name">Resin Dish #{item}</h4>
                <p className="product-price">Rs. 1200</p>
                <button className="add-to-cart-button">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="section contact-section-wrapper">
        <div className="contact-circle">
          <h3 className="contact-title">Talk To Our Staff</h3>
          <p className="contact-description">
            Trouble choosing your product? We are happy to provide expert advice and customized options.
          </p>
          <button className="contact-button">
            LET'S TALK
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content-wrapper">
          <div className="footer-grid">
            
            {/* Logo & Newsletter */}
            <div className="footer-col footer-col-logo">
              <h4 className="footer-logo">Shreemcraft</h4>
              <p className="footer-tagline">
                Custom handmade goods that inspire.
              </p>
              <input 
                type="email" 
                placeholder="Email Address" 
                className="newsletter-input"
              />
              <button className="newsletter-button">
                SUBSCRIBE
              </button>
            </div>
            
            {/* Footer Links */}
            <div className="footer-links-grid">
              {/* Column 1 */}
              <div className="footer-col">
                <p className="footer-heading">CONTACT</p>
                <span className="footer-link-item">+(123) 456-7890</span>
                <span className="footer-link-item">hello@shreemcraft.com</span>
                <span className="footer-link-item">123 Artisan Alley</span>
              </div>
              {/* Column 2 */}
              <div className="footer-col">
                <p className="footer-heading">HELP</p>
                <span className="footer-link-item">SHIPPING & RETURNS</span>
                <span className="footer-link-item">STORE POLICY</span>
                <span className="footer-link-item">FAQ</span>
              </div>
              {/* Column 3 */}
              <div className="footer-col">
                <p className="footer-heading">COMPANY</p>
                <span className="footer-link-item">ABOUT US</span>
                <span className="footer-link-item">WORK WITH US</span>
                <span className="footer-link-item">PRIVACY POLICY</span>
                <span className="footer-link-item">TERMS & CONDITIONS</span>
              </div>
            </div>
          </div>
          
          {/* Logout Button */}
          <div className="logout-wrapper">
            <button 
              onClick={() => { console.log("User logging out."); }}
              className="logout-button-footer"
            >
              Logout
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}