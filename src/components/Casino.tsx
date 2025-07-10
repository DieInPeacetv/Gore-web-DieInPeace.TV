import React, { useState, useEffect } from 'react';
import { ArrowLeft, Coins, Dice6 } from 'lucide-react';

interface CasinoProps {
  currentUser: any;
  onBack: () => void;
}

const Casino: React.FC<CasinoProps> = ({ currentUser, onBack }) => {
  const [bet, setBet] = useState(1);
  const [spinning, setSpinning] = useState(false);
  const [reels, setReels] = useState(['🍒', '🍒', '🍒']);
  const [lastWin, setLastWin] = useState(0);
  const [coins, setCoins] = useState(currentUser?.coins || 100);
  const [lastFreeCoins, setLastFreeCoins] = useState(0);

  const symbols = ['🍒', '🍋', '🍊', '🍇', '💀', '⚡', '💎', '🔥'];

  useEffect(() => {
    if (currentUser) {
      setCoins(currentUser.coins || 100);
    }
  }, [currentUser]);

  const spin = () => {
    if (!currentUser || coins < bet || spinning) return;

    setSpinning(true);
    setLastWin(0);
    
    // Simulate spinning animation
    const spinInterval = setInterval(() => {
      setReels([
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)]
      ]);
    }, 100);

    setTimeout(() => {
      clearInterval(spinInterval);
      
      // Final result
      const finalReels = [
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)]
      ];
      
      setReels(finalReels);
      
      // Calculate winnings
      let winAmount = 0;
      if (finalReels[0] === finalReels[1] && finalReels[1] === finalReels[2]) {
        // Three of a kind
        if (finalReels[0] === '💎') winAmount = bet * 100;
        else if (finalReels[0] === '💀') winAmount = bet * 50;
        else if (finalReels[0] === '🔥') winAmount = bet * 25;
        else winAmount = bet * 10;
      } else if (finalReels[0] === finalReels[1] || finalReels[1] === finalReels[2] || finalReels[0] === finalReels[2]) {
        // Two of a kind
        winAmount = bet * 2;
      }
      
      setLastWin(winAmount);
      
      // Update coins
      const newCoins = coins - bet + winAmount;
      setCoins(newCoins);
      if (currentUser) {
        currentUser.coins = newCoins;
        // Update localStorage
        const savedUser = JSON.parse(localStorage.getItem('dieinpeace_user') || '{}');
        savedUser.coins = newCoins;
        localStorage.setItem('dieinpeace_user', JSON.stringify(savedUser));
      }
      
      setSpinning(false);
    }, 2000);
  };

  const addCoins = () => {
    const now = Date.now();
    const oneMinute = 60 * 1000;
    
    if (now - lastFreeCoins < oneMinute) {
      const remainingTime = Math.ceil((oneMinute - (now - lastFreeCoins)) / 1000);
      alert(`Please wait ${remainingTime} seconds before getting free coins again.`);
      return;
    }
    
    // Add 5 coins
    const newCoins = coins + 5;
    setCoins(newCoins);
    setLastFreeCoins(now);
    
    if (currentUser) {
      currentUser.coins = newCoins;
      // Update localStorage
      const savedUser = JSON.parse(localStorage.getItem('dieinpeace_user') || '{}');
      savedUser.coins = newCoins;
      localStorage.setItem('dieinpeace_user', JSON.stringify(savedUser));
    }
  };

  if (!currentUser) {
    return (
      <div className="text-center">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-red-400 hover:text-red-300 transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
        <p className="text-red-400 text-lg">Please login to access the casino</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-red-400 hover:text-red-300 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
        <h2 className="text-xl sm:text-2xl font-bold text-red-500">Casino</h2>
        <div className="flex items-center space-x-2">
          <Coins className="w-5 h-5 text-yellow-500" />
          <span className="text-yellow-500 font-bold">{coins} coins</span>
        </div>
      </div>

      <div className="max-w-md mx-auto px-2">
        <div className="bg-gray-900 border-2 border-red-600 rounded-lg p-4 sm:p-8 text-center">
          <h3 className="text-lg sm:text-xl font-bold text-red-500 mb-4 sm:mb-6">Slot Machine</h3>
          
          <div className="bg-black border-2 border-red-600 rounded-lg p-4 sm:p-6 mb-4 sm:mb-6">
            <div className="flex justify-center space-x-2 sm:space-x-4 text-3xl sm:text-4xl mb-4">
              {reels.map((symbol, index) => (
                <div key={index} className={`w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center border-2 border-red-600 rounded ${spinning ? 'animate-pulse' : ''}`}>
                  {symbol}
                </div>
              ))}
            </div>
            {lastWin > 0 && (
              <div className="text-green-400 font-bold text-sm sm:text-lg animate-bounce">
                You won {lastWin} coins! 🎉
              </div>
            )}
            {spinning && (
              <div className="text-yellow-400 font-bold text-sm sm:text-lg">
                Spinning... 🎰
              </div>
            )}
          </div>

          <div className="mb-4 sm:mb-6">
            <label className="block text-red-400 text-sm font-bold mb-2">
              Bet Amount (1-2000 coins)
            </label>
            <input
              type="number"
              min="1"
              max="2000"
              value={bet}
              onChange={(e) => setBet(Math.max(1, Math.min(2000, parseInt(e.target.value) || 1)))}
              className="w-full px-3 py-2 sm:py-3 bg-gray-800 border border-red-600 rounded-lg text-white text-center focus:outline-none focus:border-red-400"
              disabled={spinning}
            />
          </div>

          <button
            onClick={spin}
            disabled={spinning || coins < bet}
            className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white font-bold py-3 sm:py-4 px-6 rounded-lg transition-colors mb-4 flex items-center justify-center space-x-2 text-sm sm:text-base"
          >
            <Dice6 className={`w-5 h-5 ${spinning ? 'animate-spin' : ''}`} />
            <span>{spinning ? 'Spinning...' : 'SPIN'}</span>
          </button>

          <button
            onClick={addCoins}
            className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 sm:py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2 text-sm sm:text-base"
          >
            <Coins className="w-4 h-4" />
            <span>Get 5 Free Coins (1 min cooldown)</span>
          </button>

          <div className="mt-4 sm:mt-6 text-xs text-red-400">
            <p className="font-bold mb-2">Payouts:</p>
            <div className="text-xs sm:text-sm space-y-1">
              <p>💎💎💎 = 100x bet</p>
              <p>💀💀💀 = 50x bet</p>
              <p>🔥🔥🔥 = 25x bet</p>
              <p>Any 3 of a kind = 10x bet</p>
              <p>Any 2 of a kind = 2x bet</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Casino;