import React from 'react';
import logo from "./logo.png" ;
import "./css/aboutSection.css"
const AboutSection = () => {
  return (
    <section className="about-section">
      <div className="about-container">
        <img 
          src={logo} 
          alt="Grid Bot Logo" 
          className="about-logo"
        />
        <h2 className="about-title">About xStocks Grid Bot</h2>
        <p className="about-description">
          A Decentralized finance grid bot that lives on your computer, you have control of your assets in real time for the Solana Blockchain.
        </p>
        <div className="about-principles">
          <h3>Core Principles</h3>
          <ul>
            <li>Decentralized: Run locally on your machine for full control.</li>
            <li>Grid Trading: Automated buy/sell orders within defined price ranges for stocks.</li>
            <li>Real-Time Asset Management: Monitor and manage your tokenized stocks on Solana.</li>
            <li>Security: Keep your wallet keys private and trading decentralized.</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;