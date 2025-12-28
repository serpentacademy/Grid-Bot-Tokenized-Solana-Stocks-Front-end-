import React, { useState, useEffect, useRef } from 'react';
import './components/css/seeActiveBots.css'; // Ensure you have your CSS file

// --- 1. INTERFACES (Type Definitions) ---
interface BotData {
  id: number;
  tradingPair: string;
  createdAt: number | string; // Can be string in JSON, parsed to number
  takeProfit: number;
  stopLoss: number;
  balance: number;      // Stock balance
  usdcBalance: number;  // Cash balance
  investment: number;
  actualInvestment: number;
  numberOfTx: number;
  status: string;
  stockMint: string;
  xstockPool: string;
  usdcMint: string;
  minPrice: number;
  maxPrice: number;
  amountOfUSDC: number;
  numberOfGrids: number;
  percentageChange: number;
  startingPrice: number;
  lastPrice: number;
  updatedAt: string; // "2025-12-27-15:57:57"
}

interface ProfitMetrics {
  value: number;
  percent: string;
  isPositive: boolean;
}

const SeeActiveBots: React.FC = () => {
  const [bots, setBots] = useState<BotData[]>([]);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [lastPing, setLastPing] = useState<Date | null>(null);
  
  // Current time state to trigger the "60 seconds" check every second
  const [currentTime, setCurrentTime] = useState<number>(Date.now());

  const wsRef = useRef<WebSocket | null>(null);

  // --- 2. WEBSOCKET CONNECTION ---
  useEffect(() => {
    const WS_URL = 'ws://localhost:8080';

    const connect = () => {
      wsRef.current = new WebSocket(WS_URL);

      wsRef.current.onopen = () => {
        console.log('✅ Connected to Bot Monitor');
        setIsConnected(true);
      };

      wsRef.current.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          
          if (message.type === 'BOT_UPDATE' && message.data) {
            setLastPing(new Date());
            handleBotUpdate(message.data);
          }
        } catch (err) {
          console.error("WS Parse Error:", err);
        }
      };

      wsRef.current.onclose = () => {
        console.log('⚠️ Disconnected. Retrying...');
        setIsConnected(false);
        setTimeout(connect, 3000);
      };
    };

    connect();

    return () => {
      wsRef.current?.close();
    };
  }, []);

  // Update existing bot or add new one
  const handleBotUpdate = (newBot: BotData) => {
    setBots((prev) => {
      const index = prev.findIndex((b) => b.id === newBot.id);
      if (index !== -1) {
        const updated = [...prev];
        updated[index] = newBot;
        return updated;
      }
      return [...prev, newBot];
    });
  };

  // --- 3. LIVE TIMER (For "Inactive" Status) ---
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // --- 4. HELPER FUNCTIONS ---

  // Custom parser for: "2025-12-27-15:57:57"
  const parseBotDate = (dateStr: string): number => {
    if (!dateStr) return 0;
    
    // Split "2025-12-27-15:57:57" by '-'
    // Note: The time part 15:57:57 creates issues if we just split by '-'
    // It's safer to format it to ISO: "2025-12-27T15:57:57"
    
    // Strategy: Find the third hyphen and replace it with 'T'
    // Input: 2025-12-27-15:57:57
    // Indices:    ^  ^  ^
    
    const parts = dateStr.split('-');
    if (parts.length >= 4) {
      // Reconstruct: YYYY-MM-DD T HH:mm:ss
      const iso = `${parts[0]}-${parts[1]}-${parts[2]}T${parts[3]}`;
      return new Date(iso).getTime();
    }
    return 0;
  };

  const getBotStatus = (bot: BotData): string => {
    const lastUpdateTs = parseBotDate(bot.updatedAt);
    const diff = currentTime - lastUpdateTs;
    
    // If no update for 60 seconds (60000ms), mark inactive
    if (diff > 60000) return 'Inactive';
    return bot.status; // 'Active'
  };

  const calculateTotalValue = (bot: BotData): number => {
    return (bot.balance * bot.lastPrice) + bot.usdcBalance;
  };

  const getProfit = (initial: number, current: number): ProfitMetrics => {
    const diff = current - initial;
    // Prevent division by zero
    const percent = initial > 0 ? ((diff / initial) * 100).toFixed(2) : '0.00';
    return {
      value: diff,
      percent,
      isPositive: diff >= 0
    };
  };

  const formatCurrency = (val: number) => 
    val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  // --- RENDER ---
  return (
    <div className="active-bots-container">
      <div className="bots-header-section">
        <h2 className="active-bots-title">Active Strategies</h2>
        <div className="connection-info">
          <span style={{ color: isConnected ? '#4caf50' : '#f44336', fontWeight: 'bold' }}>
            {isConnected ? '● Connected' : '○ Disconnected'}
          </span>
          {lastPing && (
            <span style={{ fontSize: '0.8rem', marginLeft: '10px', color: '#888' }}>
              Ping: {lastPing.toLocaleTimeString()}
            </span>
          )}
        </div>
      </div>

      <div className="bots-grid">
        {bots.length === 0 ? (
           <div style={{ color: '#666', textAlign: 'center', width: '100%', padding: '20px' }}>
             Waiting for bot data...
           </div>
        ) : (
          bots.map((bot) => {
            const currentTotalValue = calculateTotalValue(bot);
            const profit = getProfit(bot.investment, currentTotalValue);
            
            // Determine Status
            const displayStatus = getBotStatus(bot);
            const isInactive = displayStatus === 'Inactive';
            const statusClass = isInactive ? 'badge-inactive' : 'badge-active pulse';
            const cardClass = `bot-card ${isInactive ? 'card-inactive' : ''}`;

            return (
              <div key={bot.id} className={cardClass}>
                
                {/* Header */}
                <div className="bot-card-header">
                  <div className="pair-info">
                    <div className="pair-icon">{bot.tradingPair.charAt(0)}</div>
                    <h3 className="bot-pair">{bot.tradingPair}</h3>
                  </div>
                  <div className={`bot-badge ${statusClass}`}>
                    <span className="dot"></span> {displayStatus}
                  </div>
                </div>

                {/* Main Stats */}
                <div className="bot-main-stats">
                  <div className="stat-group">
                    <span className="stat-label">Total Value</span>
                    <span className="stat-value primary">
                      ${formatCurrency(currentTotalValue)}
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

                <div className="card-divider"></div>

                {/* Details Grid */}
                <div className="bot-details-grid">
                  <div className="detail-item">
                    <span className="label">Range</span>
                    <span className="value">${bot.minPrice} - ${bot.maxPrice}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Grids</span>
                    <span className="value">{bot.numberOfGrids}</span>
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
                    <span className="label">Held Stock</span>
                    <span className="value">{bot.balance.toFixed(4)}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Held Cash</span>
                    <span className="value">${bot.usdcBalance.toFixed(2)}</span>
                  </div>
                </div>

                {/* Footer */}
                <div className="bot-footer">
                  <span className="created-date" style={{ color: isInactive ? '#ff4444' : '#888' }}>
                    Updated: {bot.updatedAt}
                  </span>
                  <button className="close-bot-btn" disabled={true}>
                    Terminate
                  </button>
                </div>

              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default SeeActiveBots;