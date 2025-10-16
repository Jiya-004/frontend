import React, { useState } from "react";
import Sidebar from "./Sidebar";
import "../css/AdminPanel.css";

export default function Dashboard() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={`admin-panel-container ${isCollapsed ? "sidebar-closed" : ""}`}>
      <Sidebar
        isCollapsed={isCollapsed}
        toggleSidebar={() => setIsCollapsed(!isCollapsed)}
      />

      <header className="admin-header">
        <h2>Admin Dashboard</h2>
      </header>

      <main className="dashboard-content">
        <h3>Welcome to your dashboard!</h3>
      </main>
    </div>
  );
}
