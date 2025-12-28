import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaPlus, FaRobot, FaHistory, FaWallet, FaBars, FaTimes, FaAdjust, FaBookOpen, FaSun, FaMoon } from 'react-icons/fa';
import './components/css/menu.css';

const Menu: React.FC = () => {
  const [isResponsive, setIsResponsive] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const location = useLocation();

  const toggleResponsive = () => setIsResponsive(!isResponsive);
  const closeMenu = () => setIsResponsive(false);
  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <nav className={`sci-nav ${isResponsive ? 'expanded' : ''}`}>
      <div className="nav-blur-backdrop"></div>
      
      {/* 1. Brand & Terminal Status */}
      <div className="nav-brand-group">
        <div className="nav-brand">
          <div className="brand-logo">
            <FaRobot className="logo-icon" />
          </div>
          <span className="brand-text">Tokenized Stocks<span className="brand-version">OS</span></span>
        </div>
        
        {/* The "Terminal" Status Indicator requested */}
        <div className="system-status">
          <span className="status-dot"></span>
          <span className="status-text">SYSTEM READY</span>
        </div>
      </div>

      {/* 2. Navigation Center (Glass Pill) */}
      <div className="nav-links-wrapper">
        <Link to="/addGridBot" className={`nav-link ${location.pathname === '/addGridBot' ? 'active' : ''}`} onClick={closeMenu}>
          <span className="icon-box"><FaPlus /></span>
          <span className="link-text">New Grid</span>
        </Link>

        <Link to="/activeBots" className={`nav-link ${location.pathname === '/activeBots' ? 'active' : ''}`} onClick={closeMenu}>
          <span className="icon-box"><FaRobot /></span>
          <span className="link-text">Active</span>
        </Link>

        <Link to="/closedBots" className={`nav-link ${location.pathname === '/closedBots' ? 'active' : ''}`} onClick={closeMenu}>
          <span className="icon-box"><FaHistory /></span>
          <span className="link-text">History</span>
        </Link>

        <Link to="/Wallet" className={`nav-link ${location.pathname === '/Wallet' ? 'active' : ''}`} onClick={closeMenu}>
          <span className="icon-box"><FaWallet /></span>
          <span className="link-text">Wallet</span>
        </Link>
        
        <Link to="/settings" className={`nav-link ${location.pathname === '/settings' ? 'active' : ''}`} onClick={closeMenu}>
            <span className="icon-box"><FaAdjust /></span>
            <span className="link-text">Settings</span>
        </Link>

        <Link to="/about" className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`} onClick={closeMenu}>
          <span className="icon-box"><FaBookOpen /></span>
          <span className="link-text">About</span>
        </Link>
      </div>

      {/* 3. Right Controls (Theme + Mobile) */}
      <div className="nav-controls">
        <button 
          className="theme-toggle-btn" 
          onClick={toggleTheme}
          aria-label="Toggle Theme"
        >
           {darkMode ? <FaSun className="theme-icon" /> : <FaMoon className="theme-icon" />}
        </button>
        
        <button className="mobile-toggle" onClick={toggleResponsive}>
          {isResponsive ? <FaTimes /> : <FaBars />}
        </button>
      </div>
    </nav>
  );
};

export default Menu;