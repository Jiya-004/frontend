import React from "react";
import "../css/AdminPanel.css";

export default function Dashboard() {
  return (
    <div className="admin-panel-container">
      <header className="admin-header">
        <h2>Admin Dashboard</h2>
      </header>

      <main className="dashboard-content">
        <h3>Welcome to your dashboard!</h3>
      </main>
    </div>
  );
}
