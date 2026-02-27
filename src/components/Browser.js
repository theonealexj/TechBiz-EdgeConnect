import React, { useState, useRef } from 'react';
import { createNetworkStats } from '../models/networkStats';
import { processPageLoad } from '../controllers/pipelineController';

export default function Browser({ onLoadStart, onComplete, isSimulating }) {
    const [url, setUrl] = useState('http://localhost:3000/demo.html');
    const [currentUrl, setCurrentUrl] = useState('');
    const [startTime, setStartTime] = useState(null);
    const iframeRef = useRef(null);

    const handleLoad = (e) => {
        e.preventDefault();
        if (!url) return;

        onLoadStart();
        setStartTime(Date.now());
        setCurrentUrl(url);
    };

    const handleIframeLoad = () => {
        if (!startTime || !currentUrl) return;

        const endTime = Date.now();
        const loadTime = (endTime - startTime) / 1000;

        // Bandwidth estimation formula
        const bandwidthKbps = (8 * 8000) / loadTime;

        const stats = createNetworkStats(loadTime, bandwidthKbps);
        const aiOutput = processPageLoad(stats);

        applyOptimization(aiOutput);

        onComplete({ stats, aiOutput });
    };

    const applyOptimization = (aiOutput) => {
        if (!currentUrl.includes('demo.html')) return;

        try {
            const iframeDoc = iframeRef.current.contentWindow.document;
            if (!iframeDoc) return;

            const images = iframeDoc.getElementsByTagName('img');
            for (let img of images) {
                img.style.width = `${aiOutput.imageQuality}%`;
            }

            const videos = iframeDoc.getElementsByTagName('video');
            for (let video of videos) {
                if (!aiOutput.autoplay) {
                    video.pause();
                    video.autoplay = false;
                } else {
                    video.autoplay = true;
                    video.play().catch(e => console.log('Autoplay blocked by browser policy', e));
                }
            }

            const badge = iframeDoc.createElement('div');
            badge.textContent = `⚡ Edge Optimized: ${aiOutput.videoResolution}p / ${aiOutput.imageQuality}% Image Quality`;
            badge.style.position = 'fixed';
            badge.style.top = '10px';
            badge.style.right = '10px';
            badge.style.background = 'rgba(0, 0, 0, 0.8)';
            badge.style.color = '#fff';
            badge.style.padding = '8px 12px';
            badge.style.borderRadius = '6px';
            badge.style.fontFamily = 'sans-serif';
            badge.style.zIndex = '9999';
            iframeDoc.body.appendChild(badge);

        } catch (error) {
            console.error("Cross-origin restriction or manipulation error:", error);
        }
    };

    return (
        <>
            <form className="browser-bar" onSubmit={handleLoad}>
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

            <div className="browser-view-container glass-panel">
                <div className="browser-chrome">
                    <div className="window-controls">
                        <span className="dot red"></span>
                        <span className="dot yellow"></span>
                        <span className="dot green"></span>
                    </div>
                    <div className="address-display">
                        <span className="lock-icon">🔒</span>
                        {currentUrl || "System Ready - Awaiting Input"}
                    </div>
                </div>
                <div className="iframe-wrapper">
                    {isSimulating && (
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
                    {currentUrl && (
                        <iframe
                            ref={iframeRef}
                            src={currentUrl}
                            className={`browser ${isSimulating ? "blur" : ""}`}
                            title="browser"
                            onLoad={handleIframeLoad}
                        />
                    )}
                </div>
            </div>
        </>
    );
}
