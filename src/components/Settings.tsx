import React from 'react';
import "./css/settings.css"
import gears from "./css/gears-icon.svg"
const Settings = () => {
  // Example settings state (you can connect this to real state/context)
  const settings = {
    isFirebaseConnected: true,
    isUsingJito: false,
    isServerOn: true,
    isWalletConnected: true,
  };

  return (
    <div className="settings-container">
      <div className="settings-header">
        <img 
          src={gears} 
          alt="Settings" 
          className="settings-icon"
        />
        <h2 className="settings-title">Settings</h2>
      </div>
      <div className="settings-list">
        <div className="setting-item">
          <div className="setting-label">
            <span>Firebase Connected</span>
          </div>
          <div className={`toggle ${settings.isFirebaseConnected ? 'on' : 'off'}`}>
            <div className="toggle-switch"></div>
          </div>
        </div>
        <div className="setting-item">
          <div className="setting-label">
            <span>Using Jito Bundles</span>
          </div>
          <div className={`toggle ${settings.isUsingJito ? 'on' : 'off'}`}>
            <div className="toggle-switch"></div>
          </div>
        </div>
        <div className="setting-item">
          <div className="setting-label">
            <img 
              src="https://cdn.vectorstock.com/i/500p/71/05/minimalist-graphic-featuring-stacked-discs-vector-57477105.jpg" 
              alt="Server" 
              className="inline-icon"
            />
            <span>Local Server On</span>
          </div>
          <div className={`toggle ${settings.isServerOn ? 'on' : 'off'}`}>
            <div className="toggle-switch"></div>
          </div>
        </div>
        <div className="setting-item">
          <div className="setting-label">
          
            <span>Wallet Connected</span>
          </div>
          <div className={`toggle ${settings.isWalletConnected ? 'on' : 'off'}`}>
            <div className="toggle-switch"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;