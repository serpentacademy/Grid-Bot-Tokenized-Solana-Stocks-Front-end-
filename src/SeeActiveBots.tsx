import React from 'react';
import "./components/css/seeActiveBots.css";

const exampleBots = [
  {
    id: 1,
    tradingPair: 'NVDA/USDC',
    priceMin: 100,
    priceMax: 200,
    gridsNumber: 10,
    createdAt: new Date('2025-10-01').getTime(),
    takeProfit: 199,
    stopLoss: 101,
    investment: 1000,
    actualInvestment: 1085.50, // Changed for demo profit
    numberOfTx: 25,
    status: 'Active',
  },
  {
    id: 2,
    tradingPair: 'AAPL/USDC',
    priceMin: 150,
    priceMax: 250,
    gridsNumber: 15,
    createdAt: new Date('2025-11-15').getTime(),
    takeProfit: 249,
    stopLoss: 151,
    investment: 1500,
    actualInvestment: 1460.20, // Changed for demo loss
    numberOfTx: 42,
    status: 'Active',
  },
];

const SeeActiveBots = () => {
  const handleCloseBot = (bot) => {
    alert(`Closing bot for ${bot.tradingPair}`);
  };

  const formatCurrency = (val) => 
    val.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const getProfitData = (initial, current) => {
    const diff = current - initial;
    const percent = ((diff / initial) * 100).toFixed(2);
    return {
      value: diff,
      percent: percent,
      isPositive: diff >= 0
    };
  };

  return (
    <div className="active-bots-container">
      <div className="bots-header-section">
        <h2 className="active-bots-title">Active Strategies</h2>
        <span className="active-count">{exampleBots.length} Running</span>
      </div>

      <div className="bots-grid">
        {exampleBots.map((bot) => {
          const profit = getProfitData(bot.investment, bot.actualInvestment);
          
          return (
            <div key={bot.id} className="bot-card">
              
              {/* Card Header: Pair & Status */}
              <div className="bot-card-header">
                <div className="pair-info">
                  <div className="pair-icon">{bot.tradingPair.charAt(0)}</div>
                  <h3 className="bot-pair">{bot.tradingPair}</h3>
                </div>
                <div className="bot-badge pulse">
                  <span className="dot"></span> {bot.status}
                </div>
              </div>

              {/* Primary Stats: Investment & Profit */}
              <div className="bot-main-stats">
                <div className="stat-group">
                  <span className="stat-label">Total Value</span>
                  <span className="stat-value primary">
                    ${formatCurrency(bot.actualInvestment)}
                  </span>
                </div>
                <div className="stat-group right-align">
                  <span className="stat-label">Total Profit</span>
                  <span className={`stat-value ${profit.isPositive ? 'positive' : 'negative'}`}>
                    {profit.isPositive ? '+' : ''}${formatCurrency(profit.value)} 
                    <span className="stat-percent">({profit.percent}%)</span>
                  </span>
                </div>
              </div>

              {/* Divider */}
              <div className="card-divider"></div>

              {/* Grid Configuration Details */}
              <div className="bot-details-grid">
                <div className="detail-item">
                  <span className="label">Range</span>
                  <span className="value">${bot.priceMin} - ${bot.priceMax}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Grids</span>
                  <span className="value">{bot.gridsNumber}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Transactions</span>
                  <span className="value">{bot.numberOfTx}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Initial Inv.</span>
                  <span className="value">${formatCurrency(bot.investment)}</span>
                </div>
                <div className="detail-item">
                  <span className="label">TP Target</span>
                  <span className="value">${bot.takeProfit}</span>
                </div>
                <div className="detail-item">
                  <span className="label">SL Trigger</span>
                  <span className="value">${bot.stopLoss}</span>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="bot-footer">
                <span className="created-date">Started: {new Date(bot.createdAt).toLocaleDateString()}</span>
                <button 
                  className="close-bot-btn"
                  onClick={() => handleCloseBot(bot)}
                >
                  Terminate
                </button>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SeeActiveBots;