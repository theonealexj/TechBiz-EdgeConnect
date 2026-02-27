import React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      {/* 1. HERO SECTION */}
      <section className="hero-section page-fade-in">
        <div className="hero-content">
          <h1 className="hero-title">
            Edge<span className="text-gradient">⚡Connect</span>
          </h1>

          <h2 className="hero-tagline">Intelligence at the Network Edge.</h2>

          <p className="hero-subtitle">
            EdgeConnect utilizes a lightweight neural routing engine to
            dynamically compress assets, slash latency, and reduce internet data
            payload by up to <strong>60%</strong> before it even reaches your
            device.
          </p>

          <div className="hero-actions">
            <button
              className="button massive"
              onClick={() => navigate("/dashboard")}
            >
              <span className="button-glare"></span>
              LAUNCH DASHBOARD
            </button>
            <button
              className="secondary-button"
              onClick={() => {
                document
                  .getElementById("features-target")
                  .scrollIntoView({ behavior: "smooth" });
              }}
            >
              Explore Architecture ↓
            </button>
          </div>
        </div>

        {/* Abstract 3D Hero Graphic */}
        <div className="hero-graphic">
          <div className="floating-browser glass-panel">
            <div className="browser-chrome">
              <div className="window-controls">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
              </div>
              <div className="address-display mini">
                🔒 Neural Connection Active
              </div>
            </div>
            <div className="browser-body">
              <div className="hero-savings-circle">
                <span className="text-gradient">60%</span>
                <small>SAVED</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURES SECTION */}
      <section id="features-target" className="features-section">
        <div className="section-header">
          <h2>
            Core <span className="text-gradient">Capabilities</span>
          </h2>
          <p>The routing engine operates autonomously.</p>
        </div>

        <div className="features-grid">
          <div className="feature-card glass-panel">
            <div className="feature-icon">🧠</div>
            <h3>Neural Interception</h3>
            <p>
              Analyzes network latency and device constraints in purely
              real-time without external API calls.
            </p>
          </div>
          <div className="feature-card glass-panel">
            <div className="feature-icon">⚡</div>
            <h3>Smart Compression</h3>
            <p>
              Dynamically alters image quality and video resolution streams
              based on the current available bandwidth.
            </p>
          </div>
          <div className="feature-card glass-panel">
            <div className="feature-icon">📊</div>
            <h3>Deep Telemetry</h3>
            <p>
              Beautiful, granular analytics tracking exact payload reductions
              and optimization decisions.
            </p>
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS */}
      <section className="how-it-works-section">
        <div className="section-header">
          <h2>
            The <span className="text-gradient">Architecture</span>
          </h2>
        </div>

        <div className="pipeline-container glass-panel">
          <div className="pipeline-step">
            <div className="step-icon">🌐</div>
            <h4>Raw Web Traffic</h4>
            <p>120 MB Payload</p>
          </div>

          <div className="pipeline-connector">
            <div className="scan-line horizontal"></div>
          </div>

          <div className="pipeline-step active">
            <div className="step-icon glow">🧠</div>
            <h4>Edge-AI Engine</h4>
            <p>Compressing Assets</p>
          </div>

          <div className="pipeline-connector">
            <div className="scan-line horizontal delay"></div>
          </div>

          <div className="pipeline-step success">
            <div className="step-icon glow-green">📱</div>
            <h4>Optimized Client</h4>
            <p>48 MB Payload</p>
          </div>
        </div>
      </section>

      <footer className="landing-footer">
        <div className="footer-links" style={{ margin: "0 auto" }}>
          <span onClick={() => navigate("/about")}>About</span>
          <span>•</span>
          <span onClick={() => navigate("/dashboard")}>Dashboard</span>
        </div>
      </footer>
    </div>
  );
}
