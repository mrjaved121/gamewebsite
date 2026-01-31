import { TrendingUp } from 'lucide-react';
import { useState, useEffect } from 'react';

export function JackpotCounter() {
  const [amount, setAmount] = useState(1234567.89);

  useEffect(() => {
    const interval = setInterval(() => {
      setAmount(prev => prev + Math.random() * 10);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-r from-yellow-500 via-yellow-600 to-orange-600 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg shadow-lg flex items-center justify-between animate-pulse-glow">
      <div className="flex items-center gap-1.5 sm:gap-2">
        <div className="bg-white/20 p-1.5 sm:p-2 rounded-full animate-wiggle">
          <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
        </div>
        <div>
          <div className="text-[10px] sm:text-xs font-medium opacity-90">JACKPOT</div>
          <div className="text-base sm:text-lg md:text-xl font-bold animate-neon-pulse">₺{amount.toFixed(2)}</div>
        </div>
      </div>
      <div className="text-xl sm:text-2xl md:text-3xl animate-bounce-subtle">💰</div>
    </div>
  );
}