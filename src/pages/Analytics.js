import React, { useState, useEffect } from "react";

export default function Analytics({
  dataSaverOn,
  savedPercent,
  originalData,
  optimizedData,
}) {
  const [displayPercent, setDisplayPercent] = useState(0);
  const [svgPercent, setSvgPercent] = useState(0);

  useEffect(() => {
    if (!dataSaverOn) {
      setDisplayPercent(savedPercent);
      setSvgPercent(savedPercent);
      return;
    }

    // Trigger CSS transition for the SVG stroke
    setSvgPercent(0);
    const timeout = setTimeout(() => {
      setSvgPercent(savedPercent);
    }, 50);

    // Request animation frame for smooth number count up
    let startTime;
    let animationFrame;
    const duration = 1500; // 1.5 seconds

    const animateNumber = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing out cubic matching the CSS curve
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setDisplayPercent(Math.floor(easeProgress * savedPercent));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animateNumber);
      }
    };

    animationFrame = requestAnimationFrame(animateNumber);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(animationFrame);
    };
  }, [savedPercent, dataSaverOn]);

  return (
    <div className="page-container glass-panel page-fade-in">
      <div className="page-header">
        <h2>
          Live <span className="text-gradient">Telemetry</span>
        </h2>
        <p>Real-time analytics of bandwidth optimization</p>
      </div>

      <div className="analytics-content full-page">
        <div className="data-flow vertical-flow">
          <div className="flow-item original">
            <span className="flow-label">Raw Load</span>
            <span className="flow-value">
              {originalData}
              <small>MB</small>
            </span>
          </div>

          <div className="dynamic-arrow">
            <div className="arrow-pulse"></div>
            <div className="arrow-pulse delay-1"></div>
            <div className="arrow-pulse delay-2"></div>
          </div>

          <div
            className={`flow-item optimized ${!dataSaverOn ? "unoptimized" : ""}`}
          >
            {dataSaverOn && <div className="optimized-glow"></div>}
            <span className="flow-label">
              {dataSaverOn ? "Neural Load" : "Standard Load"}
            </span>
            <span className={`flow-value ${dataSaverOn ? "highlight" : ""}`}>
              {optimizedData}
              <small>MB</small>
            </span>
          </div>
        </div>

        <div className="savings-circle-wrapper large-circle">
          <div className="savings-circle">
            <div
              className={`circle-core ${!dataSaverOn ? "offline" : ""}`}
            ></div>
            <svg viewBox="0 0 36 36" className="circular-chart">
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#0ea5e9" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
                <linearGradient
                  id="gradientOffline"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#475569" />
                  <stop offset="100%" stopColor="#1e293b" />
                </linearGradient>
              </defs>
              <path
                className="circle-bg"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="circle"
                stroke={
                  dataSaverOn ? "url(#gradient)" : "url(#gradientOffline)"
                }
                strokeDasharray={`${svgPercent}, 100`}
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="percentage-display">
              <span className={`saved-amount ${!dataSaverOn ? "offline" : ""}`}>
                {displayPercent}%
              </span>
              <span className="saved-text">SAVED</span>
            </div>
          </div>
        </div>
      </div>

      {/* Aggregate Stats */}
      <div className="aggregate-stats mt-40">
        <div className="stat-card">
          <h4>Today Saved</h4>
          <span className="stat-val highlight text-gradient">450 MB</span>
        </div>
        <div className="stat-card">
          <h4>Total Saved</h4>
          <span className="stat-val">2.4 GB</span>
        </div>
        <div className="stat-card">
          <h4>Avg. Efficiency</h4>
          <span className="stat-val">58%</span>
        </div>
      </div>
    </div>
  );
}
