import React from "react";

export default function About() {
  return (
    <div className="page-container glass-panel page-fade-in">
      <div className="page-header">
        <h2>
          About <span className="text-gradient">Edge⚡Connect</span>
        </h2>
        <p>Information regarding the hackathon project architecture.</p>
      </div>

      <div className="about-content">
        <div className="about-card mt-20">
          <h3 className="text-gradient">The Problem</h3>
          <p>
            Traditional browsers indiscriminately download heavy web assets
            regardless of network conditions, wasting bandwidth and causing
            severe latency on congested or slow connections.
          </p>
        </div>

        <div className="about-card mt-30">
          <h3 className="text-gradient">The Edge-AI Solution</h3>
          <p>
            Edge⚡Connect utilizes a lightweight neural routing engine directly at
            the network edge. By intercepting requests and analyzing current
            bandwidth telemetry, the AI dynamically compresses images, scales
            down video resolutions, and strips unnecessary payload
            <strong> before</strong> it hits the client device.
          </p>
        </div>

        <div className="about-card mt-30">
          <h3 className="text-gradient">Tech Stack</h3>
          <ul className="tech-stack-list">
            <li>
              <span className="tech-icon">⚛️</span> React.js Frontend
            </li>
            <li>
              <span className="tech-icon">🤖</span> Python Edge-AI Models
            </li>
            <li>
              <span className="tech-icon">📡</span> Real-time Network Telemetry
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
