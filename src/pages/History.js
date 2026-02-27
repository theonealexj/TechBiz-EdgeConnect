import React from "react";

export default function History({ history }) {
  return (
    <div className="page-container glass-panel history-page page-fade-in">
      <div className="page-header">
        <h2>
          Optimization <span className="text-gradient">History</span>
        </h2>
        <p>Log of neural networking interventions & payload reductions.</p>
      </div>

      <div className="history-list-container">
        {history && history.length > 0 ? (
          <ul className="history-list large">
            {history.map((item, idx) => (
              <li key={idx} className="history-item large">
                <div className="history-site-info">
                  <span className="history-icon">🌐</span>
                  <span className="history-site">{item.site}</span>
                </div>
                <div className="history-score">
                  <span className="history-saved-label">Payload Reduced:</span>
                  <span className="history-saved text-gradient">
                    {item.saved}%
                  </span>
                </div>
              </li>
            ))}
            {/* Mock Historical Data */}
            <li className="history-item large">
              <div className="history-site-info">
                <span className="history-icon">🌐</span>
                <span className="history-site">netflix.com</span>
              </div>
              <div className="history-score">
                <span className="history-saved-label">Payload Reduced:</span>
                <span className="history-saved text-gradient">74%</span>
              </div>
            </li>
            <li className="history-item large">
              <div className="history-site-info">
                <span className="history-icon">🌐</span>
                <span className="history-site">cnn.com</span>
              </div>
              <div className="history-score">
                <span className="history-saved-label">Payload Reduced:</span>
                <span className="history-saved text-gradient">41%</span>
              </div>
            </li>
          </ul>
        ) : (
          <div className="empty-state">
            <span className="empty-icon">📂</span>
            <p>
              No optimization history yet. Initialize a URL to begin logging.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
