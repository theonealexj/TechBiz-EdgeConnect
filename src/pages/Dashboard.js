import React, { useState, useRef } from "react";
import { createNetworkStats } from "../models/networkStats";
import { processPageLoad } from "../controllers/pipelineController";

export default function Dashboard({
  url,
  setUrl,
  isSimulating,
  setIsSimulating,
  currentUrl,
  setCurrentUrl,
  dataSaverOn,
  onComplete
}) {
  const [startTime, setStartTime] = useState(null);
  const iframeRef = useRef(null);

  const loadWebsite = (e) => {
    e.preventDefault();
    if (!url) return;

    setIsSimulating(true);
    setCurrentUrl(url);
    setStartTime(Date.now());
  };

  const handleIframeLoad = async () => {
    if (!startTime || !currentUrl) return;

    const endTime = Date.now();
    const loadTime = (endTime - startTime) / 1000;

    const bandwidthKbps = (8 * 8000) / loadTime;
    const stats = createNetworkStats(loadTime, bandwidthKbps, "page");

    if (dataSaverOn) {
      // Async fetch to Python AI model
      const aiOutput = await processPageLoad(stats);
      applyOptimization(aiOutput);
      onComplete({ stats, aiOutput });
    } else {
      // Bypassed Neural Engine
      const aiOutput = { quality: 100, resolution: 1080 };
      onComplete({ stats, aiOutput });
    }
  };

  const applyOptimization = (aiOutput) => {
    if (!currentUrl.includes("demo.html")) return;

    try {
      const iframeDoc = iframeRef.current.contentWindow.document;
      if (!iframeDoc) return;

      const images = iframeDoc.getElementsByTagName("img");
      for (let img of images) {
        // Run it through the local Image Optimization proxy!
        const targetSrc = img.src || img.getAttribute('src');
        if (targetSrc && !targetSrc.includes('localhost:5001/proxy')) {
          // resolve relative to absolute for proxy
          const absoluteSrc = new URL(targetSrc, iframeDoc.baseURI).href;
          img.src = `http://localhost:5001/proxy?url=${encodeURIComponent(absoluteSrc)}&quality=${aiOutput.quality}`;
        }
        img.style.width = `${aiOutput.quality}%`;
      }

      const videos = iframeDoc.getElementsByTagName("video");
      for (let video of videos) {
        const sources = video.getElementsByTagName("source");
        for (let source of sources) {
          const targetSrc = source.src || source.getAttribute("src");
          if (targetSrc && !targetSrc.includes('localhost:5001/proxy')) {
            const absoluteSrc = new URL(targetSrc, iframeDoc.baseURI).href;
            source.src = `http://localhost:5001/proxy?url=${encodeURIComponent(absoluteSrc)}&resolution=${aiOutput.resolution}`;
            video.load(); // reload video to apply new source
          }
        }
        // Strict contract: Media optimization proxy stream handles everything without playback interference
        video.autoplay = true;
        video.play().catch((e) => console.log("Autoplay blocked", e));
      }

      const badge = iframeDoc.createElement("div");
      badge.textContent = `⚡ Edge Optimized: ${aiOutput.resolution}p / ${aiOutput.quality}% Quality`;
      badge.style.position = "fixed";
      badge.style.top = "10px";
      badge.style.right = "10px";
      badge.style.background = "rgba(0, 0, 0, 0.8)";
      badge.style.color = "#fff";
      badge.style.padding = "8px 12px";
      badge.style.borderRadius = "6px";
      badge.style.fontFamily = "sans-serif";
      badge.style.zIndex = "9999";
      iframeDoc.body.appendChild(badge);
    } catch (error) {
      console.error("Frame access error on optimization:", error);
    }
  };

  return (
    <div className="page-container dashboard-page page-fade-in">
      <form className="browser-bar" onSubmit={loadWebsite}>
        <div className="input-group">
          <span className="search-icon">🔍</span>
          <input
            type="url"
            className="input"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter target URL for neural transmission..."
            required
          />
          {isSimulating && <div className="scanning-bar"></div>}
        </div>

        <button
          type="submit"
          className={`button ${isSimulating ? "loading" : ""}`}
          disabled={isSimulating}
        >
          <span className="button-glare"></span>
          {isSimulating ? (
            <span className="btn-text">
              <span className="spinner"></span> Aligning...
            </span>
          ) : (
            "Initialize"
          )}
        </button>
      </form>

      <div className="browser-view-container glass-panel mt-20">
        <div className="browser-chrome">
          <div className="window-controls">
            <span className="dot red"></span>
            <span className="dot yellow"></span>
            <span className="dot green"></span>
          </div>
          <div className="address-display">
            <span className="lock-icon">🔒</span>
            {currentUrl}
          </div>

          <div className="real-time-status">
            {isSimulating ? (
              <span className="status-optimizing">
                <span className="mini-spinner"></span> Intercepting
              </span>
            ) : (
              <span
                className={`status-badge ${dataSaverOn ? "active" : "inactive"}`}
              >
                {dataSaverOn ? "⚡ Shield Active" : "🛡️ Standard Mode"}
              </span>
            )}
          </div>
        </div>

        <div className="iframe-wrapper">
          {isSimulating && dataSaverOn && (
            <div className="scanning-overlay">
              <div className="cyber-grid"></div>
              <div className="scan-line"></div>
              <div className="scan-content">
                <div className="hex-loader">
                  <div className="hex"></div>
                </div>
                <p className="glitch-text" data-text="INTERCEPTING TRAFFIC...">
                  INTERCEPTING TRAFFIC...
                </p>
                <p className="sub-text">Applying Neural Compression Models</p>
              </div>
            </div>
          )}
          {isSimulating && !dataSaverOn && (
            <div className="scanning-overlay basic">
              <div className="spinner"></div>
              <p className="sub-text">Loading...</p>
            </div>
          )}
          <iframe
            ref={iframeRef}
            src={currentUrl}
            className={`browser ${isSimulating && dataSaverOn ? "blur" : ""}`}
            title="browser"
            onLoad={handleIframeLoad}
          />
        </div>
      </div>
    </div>
  );
}
