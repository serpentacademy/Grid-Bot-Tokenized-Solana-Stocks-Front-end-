import React, { useState } from 'react';
import { FaRobot, FaChartLine, FaDollarSign, FaLayerGroup, FaLock, FaExclamationTriangle } from 'react-icons/fa';
import "../components/css/addGridBot.css";

const AddGridBot: React.FC = () => {
  const [stock, setStock] = useState('NVDA');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [usdcAmount, setUsdcAmount] = useState('');
  const [numGrids, setNumGrids] = useState('');

  const stocks = ['NVDA', 'Alphabet', 'Apple'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      stock,
      minPrice: parseFloat(minPrice),
      maxPrice: parseFloat(maxPrice),
      usdcAmount: parseFloat(usdcAmount),
      numGrids: parseInt(numGrids, 10),
    });
    alert('Grid Bot added! Check console for details.');
  };

  return (
    <div className="grid-bot-wrapper">
      <div className="glass-panel">
        
        {/* Header */}
        <div className="panel-header">
          <div className="header-icon-glow">
            <FaRobot />
          </div>
          <div>
            <h2 className="panel-title">Initialize Grid Protocol</h2>
            <p className="panel-subtitle">Configure automated trading parameters</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="cyber-form">
          
          {/* Stock Selection */}
          <div className="form-group">
            <label htmlFor="stock" className="cyber-label">Target Asset</label>
            <div className="input-wrapper">
              <FaChartLine className="input-icon" />
              <select
                id="stock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="cyber-select"
              >
                {stocks.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <div className="select-arrow"></div>
            </div>
          </div>

          {/* Price Range Group */}
          <div className="form-row">
            <div className="form-group half">
              <label htmlFor="minPrice" className="cyber-label">Min Price</label>
              <div className="input-wrapper">
                <span className="currency-prefix">$</span>
                <input
                  id="minPrice"
                  type="number"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="cyber-input"
                  placeholder="0.00"
                  required
                  min="0"
                  step="0.01"
                />
              </div>
            </div>

            <div className="form-group half">
              <label htmlFor="maxPrice" className="cyber-label">Max Price</label>
              <div className="input-wrapper">
                <span className="currency-prefix">$</span>
                <input
                  id="maxPrice"
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="cyber-input"
                  placeholder="0.00"
                  required
                  min="0"
                  step="0.01"
                />
              </div>
            </div>
          </div>

          {/* USDC Amount */}
          <div className="form-group">
            <label htmlFor="usdcAmount" className="cyber-label">Liquidity Deployment (USDC)</label>
            <div className="input-wrapper">
              <FaDollarSign className="input-icon" />
              <input
                id="usdcAmount"
                type="number"
                value={usdcAmount}
                onChange={(e) => setUsdcAmount(e.target.value)}
                className="cyber-input"
                placeholder="1000.00"
                required
                min="0"
                step="0.01"
              />
            </div>
          </div>

          {/* Grid Count */}
          <div className="form-group">
            <label htmlFor="numGrids" className="cyber-label">Grid Levels</label>
            <div className="input-wrapper">
              <FaLayerGroup className="input-icon" />
              <input
                id="numGrids"
                type="number"
                value={numGrids}
                onChange={(e) => setNumGrids(e.target.value)}
                className="cyber-input"
                placeholder="10"
                required
                min="1"
                step="1"
              />
            </div>
          </div>

          {/* Disabled Button Area */}
          <div className="action-area">
            <button disabled={true} type="submit" className="cyber-button disabled">
              <FaLock className="btn-icon" />
              <span>EXECUTE STRATEGY</span>
            </button>
            
            <div className="status-message warning">
              <FaExclamationTriangle />
              <span>SYSTEM UPGRADE IN PROGRESS...</span>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddGridBot;