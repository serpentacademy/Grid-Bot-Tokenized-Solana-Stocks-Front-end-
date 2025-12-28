import React, { useMemo } from 'react';
import logo from "./logo.png";
import "./css/aboutSection.css";

// --- Matrix Rain Helper Component ---
const MatrixRain = () => {
  // Generate 50 streams with random properties
  const streams = useMemo(() => {
    return Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100, // Random horizontal position (0-100%)
      duration: Math.random() * 3 + 2, // Random speed between 2s and 5s
      delay: Math.random() * 5, // Random start delay
      opacity: Math.random() * 0.5 + 0.1, // Random opacity
      size: Math.random() * 10 + 10, // Random font size
      // Random string of characters for this stream
      chars: Array.from({ length: 15 }).map(() => 
        Math.random() > 0.5 ? '1' : '0'
      ).join(' ') 
    }));
  }, []);

  return (
    <div className="matrix-container">
      {streams.map((stream) => (
        <div
          key={stream.id}
          className="matrix-stream"
          style={{
            left: `${stream.left}%`,
            animationDuration: `${stream.duration}s`,
            animationDelay: `-${stream.delay}s`,
            opacity: stream.opacity,
            fontSize: `${stream.size}px`,
          }}
        >
          {stream.chars}
        </div>
      ))}
    </div>
  );
};

const AboutSection = () => {
  return (
    <section className="about-section">
      {/* Insert Matrix Background Here */}
      <MatrixRain />
      
      <div className="about-card">
        {/* Header Area */}
        <div className="about-header">
          <div className="logo-container">
            <img src={logo} alt="xStocks Logo" className="about-logo" />
          </div>
          <h2 className="about-title">
            About <span className="highlight">Tokenized Stocks</span> Grid Bot
          </h2>
          <p className="about-description">
            A self-custodial DeFi grid bot living on your machine. 
            Maintain absolute control of your assets on the <strong>Solana Blockchain</strong> in real-time.
          </p>
        </div>

        <hr className="divider" />

        {/* Principles List */}
        <div className="about-content">
          <h3>Core Architecture</h3>
          <ul className="principles-list">
            <li>
              <span className="bullet"></span>
              <strong>Decentralized:</strong> Run locally for maximum privacy.
            </li>
            <li>
              <span className="bullet"></span>
              <strong>Grid Strategy:</strong> Automated buy/sell execution.
            </li>
            <li>
              <span className="bullet"></span>
              <strong>Real-Time:</strong> Low-latency Solana asset monitoring.
            </li>
            <li>
              <span className="bullet"></span>
              <strong>Security:</strong> Your keys never leave your device.
            </li>
          </ul>

          {/* Terminal Style Disclaimer */}
          <div className="terminal-box">
            <p>⚠ NAFA: Not Financial Advice. Educational purposes only.</p>
            <p>🔎 DYOR: Do Your Own Research.</p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutSection;