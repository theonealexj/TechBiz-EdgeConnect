import React from 'react';

export default function Dashboard({ stats, aiOutput, isOpen, onClose }) {
    const originalSizeMB = 8;
    let optimizedSizeMB = 8;
    let savingsPercent = 0;
    let network = "Detecting...";
    let videoQuality = "---";
    let imageQuality = "---";

    if (stats && aiOutput) {
        if (aiOutput.imageQuality === 50) optimizedSizeMB = 4;
        else if (aiOutput.imageQuality === 70) optimizedSizeMB = 5.6;
        else if (aiOutput.imageQuality === 80) optimizedSizeMB = 6.4;

        savingsPercent = (((originalSizeMB - optimizedSizeMB) / originalSizeMB) * 100).toFixed(0);
        network = stats.bandwidthKbps < 800 ? "Slow (3G)" : (stats.bandwidthKbps <= 2000 ? "Medium (4G)" : "Fast (5G)");
        videoQuality = aiOutput.videoResolution + "p";
        imageQuality = (100 - aiOutput.imageQuality) + "% Compression";
    }

    return (
        <div className={`dashboard-overlay ${isOpen ? "open" : ""}`}>
            <div className="dashboard-overlay-bg" onClick={onClose}></div>
            <div className="dashboard-content-wrapper">
                <div className="cyber-lines"></div>
                <button className="close-btn" onClick={onClose}>
                    <span className="close-x">×</span>
                </button>

                <div className="dashboard-header">
                    <h2>
                        Command <span className="text-gradient">Center</span>
                    </h2>
                    <p>Live analysis of Edge-AI traffic shaping and optimization protocols.</p>
                </div>

                <div className="dashboard-grid">
                    {/* Edge-AI Engine Section */}
                    <div className="glass-panel dashboard-card ai-card">
                        <div className="card-ambient-glow blue"></div>

                        <div className="card-header">
                            <div className="card-title-group">
                                <div className="icon-box blue">🧠</div>
                                <h2>Edge-AI Engine</h2>
                            </div>
                            <div className="status-badge">
                                <span className="pulse-indicator"></span>
                                {stats ? "ONLINE" : "WAITING"}
                            </div>
                        </div>

                        <div className="metric-cards">
                            <div className="small-card">
                                <span className="small-label">Protocol</span>
                                <span className={`small-value ${network.includes("Slow") ? "warning" : "good"}`}>
                                    {network}
                                </span>
                                <div className="card-scan-line"></div>
                            </div>

                            <div className="small-card">
                                <span className="small-label">Video</span>
                                <span className="small-value">{videoQuality}</span>
                                <div className="card-scan-line" style={{ animationDelay: "0.5s" }}></div>
                            </div>

                            <div className="small-card">
                                <span className="small-label">Images</span>
                                <span className="small-value">{imageQuality}</span>
                                <div className="card-scan-line" style={{ animationDelay: "1s" }}></div>
                            </div>
                        </div>
                    </div>

                    {/* Telemetry Section */}
                    <div className="glass-panel dashboard-card analytics-card">
                        <div className="card-ambient-glow green"></div>

                        <div className="card-header">
                            <div className="card-title-group">
                                <div className="icon-box green">📊</div>
                                <h2>Live Telemetry</h2>
                            </div>
                        </div>

                        <div className="analytics-content">
                            <div className="data-flow">
                                <div className="flow-item original">
                                    <span className="flow-label">Raw Load</span>
                                    <span className="flow-value">
                                        {originalSizeMB}
                                        <small>MB</small>
                                    </span>
                                </div>

                                <div className="dynamic-arrow">
                                    <div className="arrow-pulse"></div>
                                    <div className="arrow-pulse delay-1"></div>
                                    <div className="arrow-pulse delay-2"></div>
                                </div>

                                <div className="flow-item optimized">
                                    <div className="optimized-glow"></div>
                                    <span className="flow-label">Neural Load</span>
                                    <span className="flow-value highlight">
                                        {optimizedSizeMB}
                                        <small>MB</small>
                                    </span>
                                </div>
                            </div>

                            <div className="savings-circle-wrapper">
                                <div className="savings-circle">
                                    <div className="circle-core"></div>
                                    <svg viewBox="0 0 36 36" className="circular-chart">
                                        <defs>
                                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                                <stop offset="0%" stopColor="#10b981" />
                                                <stop offset="50%" stopColor="#3b82f6" />
                                                <stop offset="100%" stopColor="#8b5cf6" />
                                            </linearGradient>
                                        </defs>
                                        <path
                                            className="circle-bg"
                                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                        />
                                        <path
                                            className="circle"
                                            strokeDasharray={isOpen ? `${savingsPercent}, 100` : "0, 100"}
                                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                        />
                                    </svg>
                                    <div className="percentage-display">
                                        <span className="saved-amount">{savingsPercent}%</span>
                                        <span className="saved-text">SAVED</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
