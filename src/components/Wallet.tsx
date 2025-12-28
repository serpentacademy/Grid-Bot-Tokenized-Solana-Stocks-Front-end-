import React, { useEffect, useState } from 'react';
import "./css/wallet.css";

// Interface for type safety
interface Stock {
  name: string;
  ticker: string;
  quantity: number;
  stockPrice: number;
  usdcValue: number;
}

interface WalletData {
  totalUSDC: number;
  totalStocks: Stock[];
  TotalWalletValueUSDC: number;
}

const Wallet = () => {
  // 1. Initialize State
  const [wallet, setWallet] = useState<WalletData>({
    totalUSDC: 0, // Hardcoded "Available USDC" usdcBalance
    totalStocks: [
      // Note: Names must contain the asset tag sent by server (e.g., "NVDA", "TSLA")
      { name: 'NVDAx', quantity: 0, usdcValue: 0, stockPrice: 0, ticker: 'NVDA' },
      { name: 'TSLAx', quantity: 0, usdcValue: 0, stockPrice: 0, ticker: 'TSLA' },
    ],
    TotalWalletValueUSDC: 0,
  });

  const formatCurrency = (val: number) => 
    val.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  // 2. WebSocket Connection Hook
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8083');

    ws.onopen = () => {
      console.log('✅ Connected to Price Server');
    };

    ws.onmessage = (event) => {
      try {
        const response = JSON.parse(event.data);
        
        // Check if the message is a valid price update
        if (response.type === 'PRICE_UPDATE') {
          const assetTag = response.asset; // e.g., "NVDA" or "TSLA"
          
          // Handle different price field names depending on which file was read
          // (Your monitors save as 'price', 'NVDAPrice', or 'TSLAPrice')
          const newPrice = response.data.price || response.data.NVDAPrice || response.data.TSLAPrice;
          const newBalance = response.data.balance;
          const usdcBalance = response.data.usdcBalance;
          if (!newPrice) return;

          setWallet((prevWallet) => {
            // A. Update the specific stock
            const updatedStocks = prevWallet.totalStocks.map((stock) => {
              // Loose match: Does "NVDAx" include "NVDA"? Yes.
              if (stock.name.includes(assetTag)) {
                return {
                  ...stock,
                  stockPrice: newPrice,
                  quantity: newBalance,
                  usdcValue: newBalance * newPrice // Recalculate value
                };
              }
              return stock;
            });

            // B. Recalculate Total Portfolio Value
            const stocksValue = updatedStocks.reduce((acc, stock) => acc + stock.usdcValue, 0);
            const totalValue = prevWallet.totalUSDC + stocksValue;

            return {
              ...prevWallet,
              totalStocks: updatedStocks,
              totalUSDC:usdcBalance,
              TotalWalletValueUSDC: totalValue,
            };
          });
        }
      } catch (err) {
        console.error("Error parsing WS message", err);
      }
    };

    return () => {
      if (ws.readyState === 1 || ws.readyState === 0) {
        ws.close();
      }
    };
  }, []);

  return (
    <div className="wallet-wrapper">
      <div className="wallet-card">
        
        {/* Header Section */}
        <div className="wallet-header">
          <div className="icon-container">
            <img 
              src="https://cdn-icons-png.flaticon.com/512/12741/12741635.png" 
              alt="Wallet" 
              className="wallet-icon"
            />
          </div>
          <div className="header-text">
            <h2 className="wallet-title">Portfolio</h2>
            <span className="wallet-subtitle">Main Account</span>
          </div>
        </div>

        {/* Balance Summary Hero */}
        <div className="wallet-hero">
          <div className="hero-total">
            <span className="label">Total Net Worth</span>
            <h1 className="amount">${formatCurrency(wallet.TotalWalletValueUSDC)} <span className="currency">USDC</span></h1>
          </div>
          
          <div className="hero-divider"></div>
          
          <div className="hero-sub">
            <span className="label">Buying Power</span>
            <h3 className="amount-sub">${formatCurrency(wallet.totalUSDC)}</h3>
          </div>
        </div>

        {/* Holdings List */}
        <div className="holdings-section">
          <div className="section-header">
            <h3>Tokenized Assets</h3>
          </div>
          
          <div className="holdings-list">
            {wallet.totalStocks.map((stock, index) => (
              <div key={index} className="holding-item">
                <div className="holding-left">
                  <div className="stock-avatar">{stock.name.charAt(0)}</div>
                  <div className="stock-info">
                    <span className="stock-name">{stock.name}</span>
                    <span className="stock-qty">{stock.quantity} Shares</span>
                  </div>
                </div>
                
                <div className="holding-right">
                  <div className="stock-value">${formatCurrency(stock.usdcValue)}</div>
                  {/* Price Per Share Display */}
                  <div style={{fontSize: '0.8rem', color: '#888', textAlign: 'right', marginTop: '4px'}}>
                    {stock.stockPrice > 0 ? `@ $${formatCurrency(stock.stockPrice)}` : 'Waiting for data...'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Wallet;