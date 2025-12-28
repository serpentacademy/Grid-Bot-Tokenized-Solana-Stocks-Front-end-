import React from 'react';
import "./css/closedBots.css";

const ClosedBots = () => {
  // Mock data matching your structure
  const closedBots = [
    {
      tradingPair: 'NVDA/USDC',
      investment: 1000,
      totalInvestmentAtClose: 1250,
      priceMin: 100,
      priceMax: 200,
      gridsNumber: 10,
      createdAt: new Date('2025-11-01').getTime(),
      closedAt: new Date('2025-12-15').getTime(),
      numberOfTx: 48,
      pnl: 250,
    },
    {
      tradingPair: 'AAPL/USDC',
      investment: 1500,
      totalInvestmentAtClose: 1320,
      priceMin: 150,
      priceMax: 250,
      gridsNumber: 15,
      createdAt: new Date('2025-10-20').getTime(),
      closedAt: new Date('2025-12-10').getTime(),
      numberOfTx: 35,
      pnl: -180,
    },
  ];

  // Helper to format currency
  const formatMoney = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="closed-bots-container">
      <div className="header-section">
        <h2 className="closed-bots-title">Bot History</h2>
        <span className="badge-count">{closedBots.length} Closed</span>
      </div>
      
      <div className="bots-list">
        {closedBots.map((bot, index) => {
          const isProfit = bot.pnl >= 0;
          const pnlPercentage = ((bot.pnl / bot.investment) * 100).toFixed(2);

          return (
            <div key={index} className="bot-card">
              {/* Card Header: Pair & PnL */}
              <div className="bot-header">
                <div className="pair-info">
                  <h3 className="bot-trading-pair">{bot.tradingPair}</h3>
                  <span className="bot-date">{new Date(bot.closedAt).toLocaleDateString()}</span>
                </div>
                <div className={`pnl-badge ${isProfit ? 'profit' : 'loss'}`}>
                  {isProfit ? '+' : ''}{pnlPercentage}%
                </div>
              </div>

              {/* Divider */}
              <div className="card-divider"></div>

              {/* Data Grid */}
              <div className="bot-metrics">
                <div className="metric-item">
                  <span className="label">Investment</span>
                  <span className="value mono">{formatMoney(bot.investment)}</span>
                </div>
                <div className="metric-item">
                  <span className="label">Return</span>
                  <span className="value mono">{formatMoney(bot.totalInvestmentAtClose)}</span>
                </div>
                <div className="metric-item">
                  <span className="label">P&L</span>
                  <span className={`value mono ${isProfit ? 'text-profit' : 'text-loss'}`}>
                    {isProfit ? '+' : ''}{formatMoney(bot.pnl)}
                  </span>
                </div>
                <div className="metric-item">
                  <span className="label">Range</span>
                  <span className="value mono">${bot.priceMin} - ${bot.priceMax}</span>
                </div>
                <div className="metric-item">
                  <span className="label">Grids</span>
                  <span className="value">{bot.gridsNumber}</span>
                </div>
                <div className="metric-item">
                  <span className="label">Txns</span>
                  <span className="value">{bot.numberOfTx}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ClosedBots;