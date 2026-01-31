import { useState } from 'react';
import { Check } from 'lucide-react';

interface Provider {
  id: string;
  name: string;
  logo?: string;
  count: number;
}

interface LiveCasinoSidebarProps {
  selectedProvider?: string;
  onProviderChange?: (provider: string) => void;
}

export function LiveCasinoSidebar({ selectedProvider, onProviderChange }: LiveCasinoSidebarProps) {
  const [selectedProviders, setSelectedProviders] = useState<string[]>([]);

  const providers: Provider[] = [
    { id: 'evolution', name: 'Evolution', count: 127 },
    { id: 'pragmatic', name: 'Pragmatic Play Live', count: 84 },
    { id: 'ezugi', name: 'Ezugi', count: 56 },
    { id: 'playtech', name: 'Playtech', count: 43 },
    { id: 'authentic', name: 'Authentic Gaming', count: 38 },
    { id: 'netent', name: 'NetEnt Live', count: 29 },
    { id: 'vivo', name: 'Vivo Gaming', count: 31 },
    { id: 'xpg', name: 'XPG', count: 24 },
    { id: 'tvbet', name: 'TVBet', count: 19 },
    { id: 'superspade', name: 'Super Spade Games', count: 27 },
    { id: 'betgames', name: 'BetGames.TV', count: 15 },
    { id: 'lucky', name: 'LuckyStreak', count: 22 },
    { id: 'atmosphere', name: 'Atmosphere', count: 18 },
    { id: 'kagaming', name: 'KA Gaming', count: 16 },
    { id: 'onetouch', name: 'OneTouch', count: 12 },
  ];

  const toggleProvider = (providerId: string) => {
    if (selectedProviders.includes(providerId)) {
      setSelectedProviders(selectedProviders.filter(id => id !== providerId));
    } else {
      setSelectedProviders([...selectedProviders, providerId]);
    }
  };

  const clearAll = () => {
    setSelectedProviders([]);
  };

  return (
    <aside className="w-full lg:w-48 bg-white rounded-lg shadow-sm p-4 h-fit sticky top-20">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-gray-900 text-sm">Providers</h3>
        {selectedProviders.length > 0 && (
          <button
            onClick={clearAll}
            className="text-xs text-purple-700 hover:text-purple-900 font-medium"
          >
            Clear
          </button>
        )}
      </div>

      <div className="space-y-1 max-h-[calc(100vh-200px)] overflow-y-auto">
        {providers.map((provider) => (
          <button
            key={provider.id}
            onClick={() => toggleProvider(provider.id)}
            className={`w-full flex items-center justify-between p-2 rounded-lg transition-colors ${
              selectedProviders.includes(provider.id)
                ? 'bg-purple-50 border border-purple-200'
                : 'hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center gap-2 flex-1">
              <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                selectedProviders.includes(provider.id)
                  ? 'bg-purple-700 border-purple-700'
                  : 'border-gray-300'
              }`}>
                {selectedProviders.includes(provider.id) && (
                  <Check className="w-3 h-3 text-white" />
                )}
              </div>
              <div className="text-left">
                <div className="text-xs font-medium text-gray-900 line-clamp-1">
                  {provider.name}
                </div>
              </div>
            </div>
            <span className="text-xs text-gray-500">({provider.count})</span>
          </button>
        ))}
      </div>
    </aside>
  );
}