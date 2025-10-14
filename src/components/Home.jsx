import React, { useState } from "react";

export default function Home() {
  const [user] = useState({ name: "John" });
  const [cartCount, setCartCount] = useState(0);

  const categories = [
    "Electronics",
    "Fashion",
    "Home & Garden",
    "Sports & Outdoors",
    "Beauty & Personal Care",
  ];

  const styles = {
    homeWrapper: {
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      backgroundColor: "#f5f5f5",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
    },
    homeHeader: {
      backgroundColor: "#003580",
      color: "#fff",
      padding: "40px 20px",
      textAlign: "center",
    },
    headerH1: {
      margin: 0,
      fontSize: "32px",
      marginBottom: "10px",
    },
    tagline: {
      margin: 0,
      fontSize: "16px",
      opacity: 0.95,
    },
    categoriesSection: {
      flex: 1,
      padding: "40px 20px",
    },
    sectionH2: {
      fontSize: "28px",
      color: "#003580",
      marginBottom: "30px",
      textAlign: "center",
    },
    categoryGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: "20px",
      maxWidth: "1200px",
      margin: "0 auto",
    },
    categoryCard: {
      backgroundColor: "#fff",
      border: "2px solid #ddd",
      borderRadius: "8px",
      padding: "20px",
      textAlign: "center",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      transition: "all 0.3s ease",
      cursor: "pointer",
    },
    categoryCardH3: {
      color: "#003580",
      fontSize: "18px",
      marginBottom: "15px",
      margin: 0,
    },
    addBtn: {
      backgroundColor: "#003580",
      color: "#fff",
      border: "none",
      padding: "10px 20px",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "600",
      transition: "background-color 0.3s ease",
    },
    addBtnHover: {
      backgroundColor: "#001f3f",
    },
    homeFooter: {
      backgroundColor: "#003580",
      color: "#fff",
      padding: "20px",
      textAlign: "center",
      borderTop: "1px solid #ddd",
    },
    footerP: {
      margin: "8px 0",
      fontSize: "14px",
    },
  };

  const [hoveredBtn, setHoveredBtn] = useState(null);

  return (
    <div style={styles.homeWrapper}>
      <header style={styles.homeHeader}>
        <h1 style={styles.headerH1}>Welcome, {user.name} 👋</h1>
        <p style={styles.tagline}>Shop amazing products on Daraz</p>
      </header>

      <section style={styles.categoriesSection}>
        <h2 style={styles.sectionH2}>Shop by Category</h2>
        <div style={styles.categoryGrid}>
          {categories.map((cat, index) => (
            <div key={index} style={styles.categoryCard}>
              <h3 style={styles.categoryCardH3}>{cat}</h3>
              <button
                onClick={() => setCartCount(cartCount + 1)}
                style={{
                  ...styles.addBtn,
                  ...(hoveredBtn === index ? styles.addBtnHover : {}),
                }}
                onMouseEnter={() => setHoveredBtn(index)}
                onMouseLeave={() => setHoveredBtn(null)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      <footer style={styles.homeFooter}>
        <p style={styles.footerP}>🛒 Cart: {cartCount}</p>
        <p style={styles.footerP}>© {new Date().getFullYear()} Daraz | Your Online Shopping Destination</p>
      </footer>
    </div>
  );
}
