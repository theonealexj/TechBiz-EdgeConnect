import React from "react";

export default function Insights({ network, videoQuality, imageQuality }) {
  return (
    <div className="page-container glass-panel page-fade-in">
      <div className="page-header">
        <h2>
          AI <span className="text-gradient">Insights</span>
        </h2>
        <p>Neural engine decision routing logic and payload mapping.</p>
      </div>

      <div className="insights-content">
        <div className="ai-explanation large">
          <h4>Decision Matrix</h4>
          <p>
            Edge⚡Connect analyzes network latency, device type, and payload
            weight in real-time. For the last transaction:
          </p>
          <ul className="insight-bullets">
            <li>
              Network speed classified as{" "}
              <strong className="highlight">{network || "Medium (4G)"}</strong>
            </li>
            <li>
              Video stream conditionally dialed to{" "}
              <strong className="highlight">{videoQuality || "480p"}</strong>
            </li>
            <li>
              Image assets intercepted and compressed by{" "}
              <strong className="highlight">{imageQuality || "75%"}</strong>
            </li>
          </ul>

          <div className="confidence-score large mt-20">
            Neural Confidence Match: <span>98.4%</span>
          </div>
        </div>

        <div className="ai-brain-graphic">
          {/* Abstract CSS AI Brain representation */}
          <div className="brain-core">
            <div className="brain-pulse"></div>
            <div className="brain-pulse d1"></div>
            <div className="brain-pulse d2"></div>
            <span className="brain-icon">🧠</span>
          </div>
          <div className="brain-connection p1"></div>
          <div className="brain-connection p2"></div>
          <div className="brain-connection p3"></div>
        </div>
      </div>
    </div>
  );
}
