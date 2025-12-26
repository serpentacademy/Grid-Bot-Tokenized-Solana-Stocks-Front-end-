import React from 'react';
import "./css/closedBots.css"
const ClosedBots = () => {
  const closedBots = [
    {
      tradingPair: 'NVDA/USDC',
      investment: 1000,
      totalInvestmentAtClose: 1250, // Profit
      priceMin: 100,
      priceMax: 200,
      gridsNumber: 10,
      createdAt: new Date('2025-11-01').getTime(),
      closedAt: new Date('2025-12-15').getTime(),
      numberOfTx: 48,
      pnl: 250, // +25%
    },
    {
      tradingPair: 'AAPL/USDC',
      investment: 1500,
      totalInvestmentAtClose: 1320, // Loss
      priceMin: 150,
      priceMax: 250,
      gridsNumber: 15,
      createdAt: new Date('2025-10-20').getTime(),
      closedAt: new Date('2025-12-10').getTime(),
      numberOfTx: 35,
      pnl: -180, // -12%
    },
  ];

  return (
    <div className="closed-bots-container">
      <h2 className="closed-bots-title">Closed Bots History</h2>
      <div className="bots-list">
        {closedBots.map((bot, index) => {
          const isProfit = bot.pnl > 0;
          const pnlPercentage = ((bot.pnl / bot.investment) * 100).toFixed(2);

          return (
            <div key={index} className="bot-card">
              <div className="bot-header">
                <h3 className="bot-trading-pair">{bot.tradingPair}</h3>
                <div className={`pnl-indicator ${isProfit ? 'profit' : 'loss'}`}>
                  {isProfit ? '+' : ''}{pnlPercentage}%
                </div>
              </div>
              <div className="bot-details-grid">
                <p className="bot-detail"><span>Initial Investment:</span> ${bot.investment} USDC</p>
                <p className="bot-detail"><span>Closed Value:</span> ${bot.totalInvestmentAtClose} USDC</p>
                <p className="bot-detail"><span>P&L:</span> <span className={isProfit ? 'profit' : 'loss'}>{isProfit ? '+' : ''}${Math.abs(bot.pnl)}</span></p>
                <p className="bot-detail"><span>Price Range:</span> ${bot.priceMin} – ${bot.priceMax}</p>
                <p className="bot-detail"><span>Grids:</span> {bot.gridsNumber}</p>
                <p className="bot-detail"><span>Transactions:</span> {bot.numberOfTx}</p>
                <p className="bot-detail"><span>Closed On:</span> {new Date(bot.closedAt).toLocaleDateString()}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ClosedBots;