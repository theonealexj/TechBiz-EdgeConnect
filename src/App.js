import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";

import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import History from "./pages/History";
import Insights from "./pages/Insights";
import About from "./pages/About";

import "./App.css";

function AppContent() {
  const location = useLocation();
  const isLandingPage = location.pathname === "/";

  // Global State passed down to pages
  const [dataSaverOn, setDataSaverOn] = useState(true);
  const [url, setUrl] = useState(window.location.origin + "/demo.html");
  const [currentUrl, setCurrentUrl] = useState("");
  const [isSimulating, setIsSimulating] = useState(false);

  // Real-time optimization stats coming back from the Edge AI engine
  const [networkStats, setNetworkStats] = useState(null);
  const [aiOutput, setAiOutput] = useState(null);

  // Stats mirroring the UI expectations
  const originalData = 8; // MB simulated
  const [optimizedData, setOptimizedData] = useState(8);
  const [savedPercent, setSavedPercent] = useState(0);

  const [history, setHistory] = useState([
    { site: "youtube.com", saved: 62 },
    { site: "bbc.com", saved: 48 },
    { site: "instagram.com", saved: 55 },
  ]);

  // Generate particles for the background
  const particles = Array.from({ length: 40 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    animationDuration: `${Math.random() * 8 + 4}s`,
    animationDelay: `${Math.random() * 5}s`,
    size: `${Math.random() * 3 + 1}px`,
  }));

  const handleBrowserComplete = (results) => {
    setNetworkStats(results.stats);
    setAiOutput(results.aiOutput);
    setIsSimulating(false);

    let currentOptimized = originalData;
    let saved = 0;

    if (dataSaverOn) {
      if (results.aiOutput.quality === 50) currentOptimized = 4;
      else if (results.aiOutput.quality === 70) currentOptimized = 5.6;
      else if (results.aiOutput.quality === 80) currentOptimized = 6.4;

      saved = (((originalData - currentOptimized) / originalData) * 100).toFixed(0);
    }

    setOptimizedData(currentOptimized);
    setSavedPercent(saved);

    const domain = new URL(url.includes("http") ? url : `https://${url}`).hostname;
    if (domain !== 'localhost') {
      setHistory((prev) => [{ site: domain, saved }, ...prev].slice(0, 10)); // keep last 10
    }
  };

  const getNetworkLabel = () => {
    if (!networkStats) return "Scanning...";
    if (!dataSaverOn) return "Fast (5G)";
    return networkStats.networkSpeed < 800 ? "Slow (3G)" : (networkStats.networkSpeed <= 2000 ? "Medium (4G)" : "Fast (5G)");
  };

  const getVideoQuality = () => {
    if (!dataSaverOn) return "1080p";
    if (!aiOutput) return "---";
    return aiOutput.resolution + "p";
  };

  const getImageQuality = () => {
    if (!dataSaverOn) return "Uncompressed";
    if (!aiOutput) return "---";
    return (100 - aiOutput.quality) + "% Compression";
  };


  return (
    <div className="app-container">
      {/* --- HYPER-AESTHETIC BACKGROUND --- */}
      <div className="grid-bg"></div>
      <div className="particles-container">
        {particles.map((p) => (
          <div
            key={p.id}
            className="particle"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              animationDuration: p.animationDuration,
              animationDelay: p.animationDelay,
            }}
          />
        ))}
      </div>
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>
      <div className="orb orb-3"></div>
      {/* --------------------------------- */}

      {/* Conditionally hide sidebar/header on landing page */}
      {!isLandingPage && (
        <div className="global-header glass-panel">
          <div className="data-saver-toggle-wrapper">
            <span className="toggle-label">Neural Engine</span>
            <label className="cyber-switch">
              <input
                type="checkbox"
                checked={dataSaverOn}
                onChange={() => setDataSaverOn(!dataSaverOn)}
              />
              <span className="slider">
                <span className="slider-glow"></span>
              </span>
            </label>
            <span className={`toggle-status ${dataSaverOn ? "on" : "off"}`}>
              {dataSaverOn ? "ONLINE" : "BYPASSED"}
            </span>
          </div>
        </div>
      )}

      <div className={isLandingPage ? "landing-layout" : "main-layout"}>
        {!isLandingPage && <Sidebar />}

        <div className="content-area">
          <Routes>
            <Route path="/" element={<Landing />} />

            <Route
              path="/dashboard"
              element={
                <Dashboard
                  url={url}
                  setUrl={setUrl}
                  isSimulating={isSimulating}
                  setIsSimulating={setIsSimulating}
                  currentUrl={currentUrl}
                  setCurrentUrl={setCurrentUrl}
                  dataSaverOn={dataSaverOn}
                  onComplete={handleBrowserComplete}
                />
              }
            />

            <Route
              path="/analytics"
              element={
                <Analytics
                  dataSaverOn={dataSaverOn}
                  savedPercent={savedPercent}
                  originalData={originalData}
                  optimizedData={optimizedData}
                />
              }
            />

            <Route path="/history" element={<History history={history} />} />

            <Route
              path="/insights"
              element={
                <Insights
                  network={getNetworkLabel()}
                  videoQuality={getVideoQuality()}
                  imageQuality={getImageQuality()}
                />
              }
            />

            <Route path="/about" element={<About />} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
