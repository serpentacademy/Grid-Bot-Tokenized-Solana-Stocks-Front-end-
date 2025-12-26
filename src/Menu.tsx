import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import { FaPlus, FaRobot, FaHistory, FaWallet, FaBars, FaAdjust, FaBookOpen } from 'react-icons/fa';  // Icons from react-icons

interface MenuProps {
  // Removed onAddBotClick since we're using routing now
}

const Menu: React.FC<MenuProps> = () => {
  const [isResponsive, setIsResponsive] = useState(false);

  const toggleResponsive = () => {
    setIsResponsive(!isResponsive);
  };

  const closeMenu = () => {
    setIsResponsive(false);
  };
    const [darkMode, setDarkMode] = useState(true);  // Default to dark mode
  
    const toggleTheme = () => {
      setDarkMode(!darkMode);
    };
  

  return (
    <nav className={`topnav ${isResponsive ? 'responsive' : ''}`}>
      <Link to="/addGridBot" className="nav-link" onClick={closeMenu}>
        <FaPlus className="menu-icon" />
        Add a Grid Bot
      </Link>
      <Link to="/activeBots" className="nav-link" onClick={closeMenu}>
        <FaRobot className="menu-icon" />
        See Active Bots
      </Link>
      <Link to="/closedBots" className="nav-link" onClick={closeMenu}>
        <FaHistory className="menu-icon" />
        See Closed Bots' History
      </Link>
      <Link to="/Wallet" className="nav-link" onClick={closeMenu}>
        <FaWallet className="menu-icon" />
        Wallet   
      </Link>

      <Link to="/settings" className="nav-link" onClick={closeMenu}>
        <FaAdjust className="menu-icon" />
        Settings
      </Link>
        <Link to="/about" className="nav-link" onClick={closeMenu}>
        <FaBookOpen className="menu-icon" />
        About   
      </Link>
      <button className="icon" onClick={toggleResponsive}>
        <FaBars />
      </button>
                <button onClick={toggleTheme} className="theme-toggle" aria-label={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
            {darkMode ? (
              // Sun icon for switching to light mode
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                <path d="M12 3a9 9 0 100 18 9 9 0 000-18zm0 16a7 7 0 110-14 7 7 0 010 14zM12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
            ) : (
              // Moon icon for switching to dark mode
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
              </svg>
            )}
          </button>
    </nav>
  );
};

export default Menu;