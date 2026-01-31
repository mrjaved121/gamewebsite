import { X, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useState } from 'react';

interface BetSlipProps {
  onClose?: () => void;
}

export function BetSlip({ onClose }: BetSlipProps) {
  const [betAmount, setBetAmount] = useState('');
  const [bets, setBets] = useState([
    {
      id: '1',
      match: 'Manchester United vs Liverpool',
      selection: 'Manchester United',
      odds: '2.45',
      market: '1X2'
    }
  ]);

  const removeBet = (id: string) => {
    setBets(bets.filter(bet => bet.id !== id));
  };

  const totalOdds = bets.reduce((acc, bet) => acc * parseFloat(bet.odds), 1).toFixed(2);
  const potentialWin = betAmount ? (parseFloat(betAmount) * parseFloat(totalOdds)).toFixed(2) : '0.00';

  return (
    <div className="w-full lg:w-80 bg-white rounded-lg shadow-lg sticky top-20 h-fit">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h3 className="font-bold text-gray-900">Bet Slip ({bets.length})</h3>
        {onClose && (
          <button onClick={onClose} className="lg:hidden">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Bets List */}
      <div className="max-h-96 overflow-y-auto">
        {bets.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <div className="text-4xl mb-2">🎯</div>
            <p className="text-sm">Your bet slip is empty</p>
            <p className="text-xs mt-1">Click on odds to add bets</p>
          </div>
        ) : (
          <div className="p-4 space-y-3">
            {bets.map((bet) => (
              <div key={bet.id} className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="text-xs text-gray-500 mb-1">{bet.market}</div>
                    <div className="text-sm font-medium text-gray-900 mb-1">{bet.match}</div>
                    <div className="text-sm text-purple-700 font-medium">{bet.selection}</div>
                  </div>
                  <button
                    onClick={() => removeBet(bet.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Odds</span>
                  <span className="font-bold text-purple-700">{bet.odds}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bet Amount */}
      {bets.length > 0 && (
        <div className="p-4 border-t border-gray-200 space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Bet Amount
            </label>
            <Input
              type="number"
              placeholder="0.00"
              value={betAmount}
              onChange={(e) => setBetAmount(e.target.value)}
              className="text-lg font-medium"
            />
            <div className="flex gap-2 mt-2">
              {['10', '50', '100', '500'].map((amount) => (
                <button
                  key={amount}
                  onClick={() => setBetAmount(amount)}
                  className="flex-1 text-xs bg-gray-100 hover:bg-gray-200 py-1 rounded"
                >
                  ₺{amount}
                </button>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Odds</span>
              <span className="font-bold text-purple-700">{totalOdds}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Stake</span>
              <span className="font-medium">₺{betAmount || '0.00'}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-gray-200">
              <span className="font-bold text-gray-900">Potential Win</span>
              <span className="font-bold text-green-600">₺{potentialWin}</span>
            </div>
          </div>

          {/* Place Bet Button */}
          <Button className="w-full bg-purple-700 hover:bg-purple-800 py-6 text-lg font-bold">
            PLACE BET
          </Button>
        </div>
      )}
    </div>
  );
}
