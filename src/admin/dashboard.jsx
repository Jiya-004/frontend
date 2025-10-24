import React, { useEffect, useState } from "react";
import "../css/AdminPanel.css";
import axios from "axios";
import { Users, DollarSign, MessageCircle } from "lucide-react";

export default function Dashboard() {
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [usersRes, salesRes, messagesRes] = await Promise.all([
          axios.get("http://127.0.0.1:8080/api/admin/totalcustomers"),
          axios.get("http://127.0.0.1:8080/api/admin/totalsales"),
          axios.get("http://127.0.0.1:8080/api/admin/messages"),
        ]);

        setTotalCustomers(usersRes.data.count || 0);
        setTotalSales(salesRes.data.total || 0);
        setMessages(messagesRes.data || []);
      } catch (error) {
        console.error("Failed to load dashboard data", error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="admin-panel-container">
      <header className="admin-header">
        <h2>Admin Dashboard</h2>
      </header>

      <main className="dashboard-content">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="icon-wrapper users">
              <Users size={32} />
            </div>
            <div>
              <h4>Total Customers</h4>
              <p>{totalCustomers}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="icon-wrapper sales">
              <DollarSign size={32} />
            </div>
            <div>
              <h4>Total Sales</h4>
              <p>Rs. {totalSales.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="messages-section">
          <h3>
            <MessageCircle size={20} /> User Messages
          </h3>
          {messages.length > 0 ? (
            <ul>
              {messages.map((msg, i) => (
                <li key={i}>
                  <strong>{msg.name || "Anonymous"}:</strong> {msg.message}
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-messages">No messages found.</p>
          )}
        </div>
      </main>
    </div>
  );
}
