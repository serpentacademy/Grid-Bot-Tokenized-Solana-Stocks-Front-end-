import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Menu from './Menu';
import AddGridBot from './components/AddGridBot';
import SeeActiveBots from './SeeActiveBots';
import AboutSection from './components/AboutSection';
import ClosedBots from './components/ClosedBots';
import Settings from './components/Settings';
import Wallet from './components/Wallet';
// Placeholder components for other routes (create these files or inline as needed)
const AddWallet = () => <div>Add Wallet Page (Placeholder)</div>;
const Home = () => <div>Welcome to xStocks Grid Bot</div>;

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(true);  // Default to dark mode

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Router>
      <div className={`app-container ${darkMode ? 'dark' : 'light'}`}>
        <header className="app-header">

        </header>
        <Menu />
        <div id="content">
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/addGridBot" element={<AddGridBot />} />
            <Route path="/activeBots" element={<SeeActiveBots />} />
            <Route path="/closedBots" element={<ClosedBots />} />
            <Route path="/addWallet" element={<AddWallet />} />
            <Route path='/about' element={<AboutSection />} />
             <Route path='/settings' element={<Settings />} />
             <Route path='/wallet' element={<Wallet />} />

          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;