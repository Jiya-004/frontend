import React, { useState } from 'react';

export default function Home() {
  const user = JSON.parse(localStorage.getItem("user"));
  
  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <h1 style={styles.logo}>FLEUR</h1>
          <nav style={styles.nav}>
            <a href="#collections" style={styles.navLink}>COLLECTIONS</a>
            <a href="#about" style={styles.navLink}>ABOUT</a>
            <a href="#contact" style={styles.navLink}>CONTACT</a>
            <button style={styles.shopBtn}>SHOP</button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroOverlay}>
          <h2 style={styles.heroTitle}>Custom Dried Flower Bouquets</h2>
          <p style={styles.heroSubtitle}>Free delivery on orders over $75</p>
          <button style={styles.heroBtn}>SHOP</button>
          <div style={styles.userWelcome}>
            <p style={styles.welcomeText}>Welcome back, {user?.name} 👋</p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section style={styles.servicesSection}>
        <p style={styles.sectionLabel}>WHAT WE DO</p>
        <h3 style={styles.sectionTitle}>Our Services</h3>
        
        <div style={styles.servicesGrid}>
          <div style={styles.serviceCard}>
            <div style={styles.serviceImage}>🍽️</div>
            <h4 style={styles.serviceTitle}>Custom Bouquets</h4>
            <p style={styles.serviceDesc}>
              Let us help you create the perfect bouquet. Choose from our selection of dried flowers to create a custom piece that reflects your style and vision.
            </p>
            <button style={styles.learnMoreBtn}>LEARN MORE</button>
          </div>

          <div style={styles.serviceCard}>
            <div style={styles.serviceImage}>🌾</div>
            <h4 style={styles.serviceTitle}>Occasion Flowers</h4>
            <p style={styles.serviceDesc}>
              Premium flowers for your special day. Whether it's a wedding, birthday, or any occasion, we create memorable arrangements.
            </p>
            <button style={styles.learnMoreBtn}>LEARN MORE</button>
          </div>

          <div style={styles.serviceCard}>
            <div style={styles.serviceImage}>💐</div>
            <h4 style={styles.serviceTitle}>Premade Bouquets</h4>
            <p style={styles.serviceDesc}>
              Our premade collections offer beautiful arrangements ready to ship. Perfect for gifts or treating yourself.
            </p>
            <button style={styles.learnMoreBtn}>LEARN MORE</button>
          </div>
        </div>
      </section>

      {/* Gift Ideas Section */}
      <section style={styles.giftSection}>
        <div style={styles.giftContent}>
          <p style={styles.sectionLabel}>REPURPOSE YOUR DRIED FLOWERS</p>
          <h3 style={styles.giftTitle}>Gift Ideas That Last Longer</h3>
          <p style={styles.giftDesc}>
            Little reminders make someone's day brighter. Our carefully curated dried flower arrangements make perfect gifts that last for years. Beautifully preserved petals that bring joy long after traditional flowers would fade.
          </p>
          <button style={styles.giftBtn}>GIFTS →</button>
        </div>
        <div style={styles.giftImagePlaceholder}>🏺</div>
      </section>

      {/* Popular Products */}
      <section style={styles.popularSection}>
        <h3 style={styles.sectionTitle}>See What's Popular</h3>
        
        <div style={styles.productsGrid}>
          {[1, 2, 3, 4].map((item) => (
            <div key={item} style={styles.productCard}>
              <div style={styles.productImage}>🍽️</div>
              <div style={styles.productInfo}>
                <div style={styles.productMeta}>
                  <span>❤️ 147</span>
                  <span>💬 352</span>
                </div>
                <p style={styles.productPrice}>$54.00</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section style={styles.contactSection}>
        <div style={styles.contactCircle}>
          <h3 style={styles.contactTitle}>Talk To Our Staff</h3>
          <p style={styles.contactDesc}>
            Trouble choosing your bouquet? We are happy to customer service you with expert advice. We can arrange gift wrapping and include a card with your purchase.
          </p>
          <button style={styles.contactBtn}>LET'S TALK</button>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <div style={styles.footerLeft}>
            <h4 style={styles.footerLogo}>FLEUR</h4>
            <p style={styles.footerText}>Custom dried flower arrangements that last.</p>
            <input 
              type="email" 
              placeholder="Email Address" 
              style={styles.emailInput}
            />
            <button style={styles.subscribeBtn}>SUBSCRIBE</button>
          </div>
          
          <div style={styles.footerRight}>
            <div style={styles.footerColumn}>
              <p>+65 345 678 903</p>
              <p>hello@fleur.com</p>
              <p>123 Flower Street</p>
            </div>
            <div style={styles.footerColumn}>
              <p>CONTACT US</p>
              <p>SHIPPING & RETURNS</p>
              <p>STORE POLICY</p>
              <p>FAQ</p>
            </div>
            <div style={styles.footerColumn}>
              <p>ABOUT US</p>
              <p>WORK WITH US</p>
              <p>PRIVACY POLICY</p>
              <p>TERMS & CONDITIONS</p>
            </div>
          </div>
        </div>
        
        <button 
          onClick={() => {
            localStorage.clear();
            window.location.href = "/login";
          }}
          style={styles.logoutBtn}
        >
          Logout
        </button>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "'Cormorant Garamond', serif",
    backgroundColor: '#f5ebe0',
    minHeight: '100vh',
  },
  header: {
    backgroundColor: '#f5ebe0',
    padding: '20px 40px',
    borderBottom: '1px solid #d4c5b9',
  },
  headerContent: {
    maxWidth: '1400px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontSize: '28px',
    fontWeight: '400',
    letterSpacing: '3px',
    margin: 0,
  },
  nav: {
    display: 'flex',
    gap: '40px',
    alignItems: 'center',
  },
  navLink: {
    textDecoration: 'none',
    color: '#5a5a5a',
    fontSize: '13px',
    letterSpacing: '2px',
    fontWeight: '400',
  },
  shopBtn: {
    backgroundColor: '#d4c5b9',
    border: 'none',
    padding: '10px 30px',
    fontSize: '13px',
    letterSpacing: '2px',
    cursor: 'pointer',
    borderRadius: '2px',
  },
  hero: {
    height: '70vh',
    backgroundImage: 'linear-gradient(rgba(245, 235, 224, 0.3), rgba(245, 235, 224, 0.3)), url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'100\' height=\'100\'%3E%3Crect fill=\'%23d4c5b9\' width=\'100\' height=\'100\'/%3E%3C/svg%3E")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroOverlay: {
    textAlign: 'center',
    color: '#fff',
  },
  heroTitle: {
    fontSize: '56px',
    fontWeight: '300',
    margin: '0 0 20px 0',
    letterSpacing: '2px',
  },
  heroSubtitle: {
    fontSize: '18px',
    fontWeight: '300',
    marginBottom: '30px',
  },
  heroBtn: {
    backgroundColor: '#fff',
    color: '#5a5a5a',
    border: 'none',
    padding: '12px 40px',
    fontSize: '13px',
    letterSpacing: '2px',
    cursor: 'pointer',
    borderRadius: '2px',
  },
  userWelcome: {
    marginTop: '30px',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: '15px 30px',
    borderRadius: '50px',
    display: 'inline-block',
  },
  welcomeText: {
    color: '#5a5a5a',
    fontSize: '16px',
    margin: 0,
  },
  servicesSection: {
    padding: '80px 40px',
    textAlign: 'center',
    backgroundColor: '#f5ebe0',
  },
  sectionLabel: {
    fontSize: '12px',
    letterSpacing: '3px',
    color: '#8a8a8a',
    marginBottom: '10px',
  },
  sectionTitle: {
    fontSize: '42px',
    fontWeight: '300',
    marginBottom: '60px',
    letterSpacing: '1px',
  },
  servicesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '40px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  serviceCard: {
    backgroundColor: '#e8dfd2',
    borderRadius: '200px 200px 20px 20px',
    padding: '40px 30px',
    textAlign: 'center',
  },
  serviceImage: {
    fontSize: '80px',
    marginBottom: '30px',
  },
  serviceTitle: {
    fontSize: '24px',
    fontWeight: '400',
    marginBottom: '20px',
  },
  serviceDesc: {
    fontSize: '14px',
    lineHeight: '1.8',
    color: '#5a5a5a',
    marginBottom: '25px',
  },
  learnMoreBtn: {
    backgroundColor: 'transparent',
    border: '1px solid #5a5a5a',
    padding: '10px 30px',
    fontSize: '12px',
    letterSpacing: '2px',
    cursor: 'pointer',
    borderRadius: '2px',
  },
  giftSection: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '60px',
    padding: '80px 40px',
    maxWidth: '1400px',
    margin: '0 auto',
    alignItems: 'center',
  },
  giftContent: {
    textAlign: 'left',
  },
  giftTitle: {
    fontSize: '38px',
    fontWeight: '300',
    marginBottom: '25px',
  },
  giftDesc: {
    fontSize: '15px',
    lineHeight: '1.8',
    color: '#5a5a5a',
    marginBottom: '30px',
  },
  giftBtn: {
    backgroundColor: '#d4c5b9',
    border: 'none',
    padding: '12px 40px',
    fontSize: '13px',
    letterSpacing: '2px',
    cursor: 'pointer',
    borderRadius: '2px',
  },
  giftImagePlaceholder: {
    fontSize: '180px',
    textAlign: 'center',
  },
  popularSection: {
    padding: '80px 40px',
    textAlign: 'center',
    backgroundColor: '#f5ebe0',
  },
  productsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '30px',
    maxWidth: '1400px',
    margin: '0 auto',
  },
  productCard: {
    backgroundColor: '#e8dfd2',
    borderRadius: '10px',
    overflow: 'hidden',
  },
  productImage: {
    fontSize: '120px',
    padding: '40px',
    backgroundColor: '#f0e7da',
  },
  productInfo: {
    padding: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productMeta: {
    display: 'flex',
    gap: '15px',
    fontSize: '14px',
  },
  productPrice: {
    fontSize: '16px',
    fontWeight: '600',
  },
  contactSection: {
    padding: '100px 40px',
    display: 'flex',
    justifyContent: 'center',
  },
  contactCircle: {
    backgroundColor: '#e8dfd2',
    borderRadius: '50%',
    width: '500px',
    height: '500px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '60px',
    textAlign: 'center',
  },
  contactTitle: {
    fontSize: '36px',
    fontWeight: '300',
    marginBottom: '20px',
  },
  contactDesc: {
    fontSize: '14px',
    lineHeight: '1.8',
    color: '#5a5a5a',
    marginBottom: '30px',
  },
  contactBtn: {
    backgroundColor: 'transparent',
    border: '1px solid #5a5a5a',
    padding: '12px 40px',
    fontSize: '13px',
    letterSpacing: '2px',
    cursor: 'pointer',
    borderRadius: '2px',
  },
  footer: {
    backgroundColor: '#e8dfd2',
    padding: '60px 40px 40px',
  },
  footerContent: {
    maxWidth: '1400px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
    gap: '60px',
    marginBottom: '40px',
  },
  footerLeft: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  footerLogo: {
    fontSize: '24px',
    letterSpacing: '3px',
    margin: 0,
  },
  footerText: {
    fontSize: '14px',
    color: '#5a5a5a',
  },
  emailInput: {
    padding: '12px',
    border: '1px solid #d4c5b9',
    backgroundColor: 'transparent',
    fontSize: '13px',
    borderRadius: '2px',
  },
  subscribeBtn: {
    backgroundColor: '#d4c5b9',
    border: 'none',
    padding: '12px',
    fontSize: '13px',
    letterSpacing: '2px',
    cursor: 'pointer',
    borderRadius: '2px',
  },
  footerRight: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '40px',
  },
  footerColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    fontSize: '13px',
    color: '#5a5a5a',
  },
  logoutBtn: {
    backgroundColor: '#5a5a5a',
    color: '#fff',
    border: 'none',
    padding: '12px 40px',
    fontSize: '13px',
    letterSpacing: '2px',
    cursor: 'pointer',
    borderRadius: '2px',
    display: 'block',
    margin: '0 auto',
  },
};