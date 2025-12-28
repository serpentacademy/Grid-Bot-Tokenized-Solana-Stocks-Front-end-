import React from 'react';
import logo from "./logo.png";
import "./css/aboutSection.css";

const AboutSection = () => {
  return (
    <section className="about-section">
      <div className="about-card">
        
        {/* Header Area */}
        <div className="about-header">
          <div className="logo-container">
            <img src={logo} alt="xStocks Logo" className="about-logo" />
          </div>
          <h2 className="about-title">
            About <span className="highlight">xStocks</span> Grid Bot
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