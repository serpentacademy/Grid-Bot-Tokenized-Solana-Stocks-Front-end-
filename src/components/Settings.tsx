import React, { useState } from 'react';
import { FaDatabase, FaBolt, FaServer, FaWallet, FaCog, FaMicrochip } from 'react-icons/fa';
import "./css/settings.css";

// 1. Define the shape of your settings state
interface SettingsConfig {
  firebase: boolean;
  jito: boolean;
  server: boolean;
  wallet: boolean;
}

const Settings: React.FC = () => {
  // 2. Initialize state with the interface
  const [config, setConfig] = useState<SettingsConfig>({
    firebase: false,
    jito: true, // Jito is usually premium/fast, defaulted to off
    server: true,
    wallet: true,
  });

  // 3. Type-safe toggle function
  // Accepts only valid keys from SettingsConfig ('firebase' | 'jito' | etc.)
  const toggleSetting = (key: keyof SettingsConfig) => {
    setConfig((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="settings-wrapper">
      <div className="settings-card">
        
        {/* Header Section */}
        <div className="settings-header">
          <div className="header-icon-box">
            <FaCog className="spin-icon" />
          </div>
          <div className="header-info">
            <h2 className="settings-title">System Configuration</h2>
            <p className="settings-subtitle">
              ID: <span className="mono-text">XS-9092-ALPHA</span> • <span className="status-live">ONLINE</span>
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="glass-divider"></div>

        {/* Settings List */}
        <div className="settings-list">
          
          {/* Item 1: Firebase */}
          <div className="setting-row">
            <div className="setting-icon-container">
              <FaDatabase />
            </div>
            <div className="setting-details">
              <h3>Firestore connected</h3>
              <p>Firebase Realtime Connection</p>
            </div>
            <button 
              className={`sci-toggle ${config.firebase ? 'active' : ''}`} 
              onClick={() => toggleSetting('firebase')}
              aria-label="Toggle Firebase"
            >
              <div className="toggle-handle"></div>
            </button>
          </div>

          {/* Item 2: Jito Bundles */}
          <div className="setting-row">
            <div className="setting-icon-container warning">
              <FaBolt />
            </div>
            <div className="setting-details">
              <h3>Jito Bundles</h3>
              <p>High-Frequency MEV Mode</p>
            </div>
            <button 
              className={`sci-toggle ${config.jito ? 'active' : ''}`} 
              onClick={() => toggleSetting('jito')}
              aria-label="Toggle Jito Bundles"
            >
              <div className="toggle-handle"></div>
            </button>
          </div>

          {/* Item 3: Local Server */}
          <div className="setting-row">
            <div className="setting-icon-container">
              <FaServer />
            </div>
            <div className="setting-details">
              <h3>Local Host</h3>
              <p>127.0.0.1 Server Instance</p>
            </div>
            <button 
              className={`sci-toggle ${config.server ? 'active' : ''}`} 
              onClick={() => toggleSetting('server')}
              aria-label="Toggle Local Server"
            >
              <div className="toggle-handle"></div>
            </button>
          </div>

          {/* Item 4: Wallet */}
          <div className="setting-row">
            <div className="setting-icon-container success">
              <FaWallet />
            </div>
            <div className="setting-details">
              <h3>Wallet Authorization</h3>
              <p>Saved Private Key on Local server</p>
            </div>
            <button 
              className={`sci-toggle ${config.wallet ? 'active' : ''}`} 
              onClick={() => toggleSetting('wallet')}
              aria-label="Toggle Wallet Connection"
            >
              <div className="toggle-handle"></div>
            </button>
          </div>

        </div>

        {/* Footer / CPU Stats (Decoration) */}
        <div className="settings-footer">
            <FaMicrochip className="footer-icon" />
            <span>CORE TEMP: 33° Decentracelsius // MEMORY: 12%</span>
        </div>

      </div>
    </div>
  );
};

export default Settings;