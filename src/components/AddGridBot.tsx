import React, { useState } from 'react';
import "../components/css/addGridBot.css"; // Updated CSS for Apple-inspired dark mode aesthetics

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
    setMinPrice('');
    setMaxPrice('');
    setUsdcAmount('');
    setNumGrids('');
    // Optionally navigate back: use useNavigate() from react-router-dom if desired
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Add a Grid Bot</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="stock" className="form-label">Select Stock</label>
          <select
            id="stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="form-select"
          >
            {stocks.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="minPrice" className="form-label">Min Stock Price</label>
          <input
            id="minPrice"
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="form-input"
            placeholder="e.g., 100"
            required
            min="0"
            step="0.01"
          />
        </div>
        <div className="form-group">
          <label htmlFor="maxPrice" className="form-label">Max Stock Price</label>
          <input
            id="maxPrice"
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="form-input"
            placeholder="e.g., 200"
            required
            min="0"
            step="0.01"
          />
        </div>
        <div className="form-group">
          <label htmlFor="usdcAmount" className="form-label">Amount of USDC</label>
          <input
            id="usdcAmount"
            type="number"
            value={usdcAmount}
            onChange={(e) => setUsdcAmount(e.target.value)}
            className="form-input"
            placeholder="e.g., 1000"
            required
            min="0"
            step="0.01"
          />
        </div>
        <div className="form-group">
          <label htmlFor="numGrids" className="form-label">Number of Grids</label>
          <input
            id="numGrids"
            type="number"
            value={numGrids}
            onChange={(e) => setNumGrids(e.target.value)}
            className="form-input"
            placeholder="e.g., 10"
            required
            min="1"
            step="1"
          />
        </div>
        <button disabled={true} type="submit" className="form-button">Add a Grid Bot</button>
        <span className="form-label">coming soon...</span>
      </form>
    </div>
  );
};

export default AddGridBot;