import React, { useState } from "react";
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  Settings,
  ChevronRight,
  Package,
  FileText,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import "../css/AdminPanel.css"; // ✅ Make sure your CSS file name matches

export default function Sidebar({ isCollapsed, toggleSidebar }) {
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState({});

  // Handle submenu toggles (e.g. products, orders, customers)
  const toggleMenu = (menu) => {
    setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  const isActive = (path) => location.pathname === path;

  return (
    <aside className={`admin-sidebar ${isCollapsed ? "collapsed" : ""}`}>
      {/* Sidebar Header */}
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <span className="logo-admin">Admin</span>{" "}
          <span className="logo-panel">Panel</span>
        </div>
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          ☰
        </button>
      </div>

      {/* Sidebar Navigation */}
      <nav className="sidebar-nav">
        {/* Dashboard */}
        <Link
          to="/admin/dashboard"
          className={`nav-item ${isActive("/admin/dashboard") ? "nav-item-active" : ""}`}
        >
          <LayoutDashboard className="nav-item-icon" />
          <span>Dashboard</span>
        </Link>

        {/* Products */}
        <div className="nav-group">
          <div
            className="nav-item has-submenu"
            onClick={() => toggleMenu("products")}
          >
            <div className="flex items-center">
              <ShoppingBag className="nav-item-icon" />
              <span>Products</span>
            </div>
            <ChevronRight
              className={`submenu-arrow ${openMenus.products ? "expanded" : ""}`}
            />
          </div>

          {openMenus.products && (
            <div className="submenu">
              <Link
                to="/admin/product"
                className={`nav-sub-item ${isActive("/admin/product") ? "nav-item-active" : ""}`}
              >
                <Package className="nav-sub-item-icon" />
                <span>Add New Product</span>
              </Link>
              <Link
                to="/admin/Inventory"
                className={`nav-sub-item ${isActive("/admin/Inventory") ? "nav-item-active" : ""}`}
              >
                <FileText className="nav-sub-item-icon" />
                <span>Inventory</span>
              </Link>
            </div>
          )}
        </div>

        {/* Orders */}
        <div className="nav-group">
          <div
            className="nav-item has-submenu"
            onClick={() => toggleMenu("orders")}
          >
            <div className="flex items-center">
              <FileText className="nav-item-icon" />
              <span>Orders</span>
            </div>
            <ChevronRight
              className={`submenu-arrow ${openMenus.orders ? "expanded" : ""}`}
            />
          </div>

          {openMenus.orders && (
            <div className="submenu">
              <Link
                to="/admin/orders/new"
                className={`nav-sub-item ${isActive("/admin/orders/new") ? "nav-item-active" : ""}`}
              >
                <span>New Orders</span>
              </Link>
              <Link
                to="/admin/orders/history"
                className={`nav-sub-item ${isActive("/admin/orders/history") ? "nav-item-active" : ""}`}
              >
                <span>Order History</span>
              </Link>
            </div>
          )}
        </div>

        {/* Customers */}
        <div className="nav-group">
          <div
            className="nav-item has-submenu"
            onClick={() => toggleMenu("customers")}
          >
            <div className="flex items-center">
              <Users className="nav-item-icon" />
              <span>Customers</span>
            </div>
            <ChevronRight
              className={`submenu-arrow ${openMenus.customers ? "expanded" : ""}`}
            />
          </div>

          {openMenus.customers && (
            <div className="submenu">
              <Link
                to="/admin/customers/segments"
                className={`nav-sub-item ${isActive("/admin/customers/segments") ? "nav-item-active" : ""}`}
              >
                <span>Segments</span>
              </Link>
            </div>
          )}
        </div>

        {/* Settings */}
        <Link
          to="/admin/settings"
          className={`nav-item ${isActive("/admin/settings") ? "nav-item-active" : ""}`}
        >
          <Settings className="nav-item-icon" />
          <span>Settings</span>
        </Link>
      </nav>
    </aside>
  );
}
