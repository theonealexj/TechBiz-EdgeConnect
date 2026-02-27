import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {
  return (
    <div className="sidebar glass-panel">
      <div className="sidebar-header">
        <div className="logo-wrapper small">
          <div className="logo-glow"></div>
          <span className="logo-icon small"></span>
        </div>
        <h2>
          Edge<span className="text-gradient">⚡Connect</span>
        </h2>
      </div>

      <nav className="nav-menu">
        <NavLink
          to="/"
          className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          end
        >
          <span className="nav-icon">🌐</span>
          Dashboard
        </NavLink>

        <NavLink
          to="/analytics"
          className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
        >
          <span className="nav-icon">📊</span>
          Analytics
        </NavLink>

        <NavLink
          to="/history"
          className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
        >
          <span className="nav-icon">⏱️</span>
          History
        </NavLink>

        <NavLink
          to="/insights"
          className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
        >
          <span className="nav-icon">🧠</span>
          AI Insights
        </NavLink>

        <NavLink
          to="/about"
          className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
        >
          <span className="nav-icon">ℹ️</span>
          About
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <div className="status-badge active small">
          <span className="pulse-indicator"></span>
          SYSTEM ONLINE
        </div>
      </div>
    </div>
  );
}
