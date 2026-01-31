import { useState } from 'react';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';
import { Input } from './ui/input';
import { Checkbox } from './ui/checkbox';

interface SlotGamesSidebarProps {
  selectedCategory?: string;
  onCategoryChange?: (category: string) => void;
  selectedProvider?: string;
  onProviderChange?: (provider: string) => void;
}

export function SlotGamesSidebar({
  selectedCategory,
  onCategoryChange,
  selectedProvider,
  onProviderChange
}: SlotGamesSidebarProps) {
  const [providersExpanded, setProvidersExpanded] = useState(true);
  const [featuresExpanded, setFeaturesExpanded] = useState(true);

  const providers = [
    { name: 'Pragmatic Play', count: 248 },
    { name: 'NetEnt', count: 156 },
    { name: 'Play\'n GO', count: 132 },
    { name: 'Evolution', count: 98 },
    { name: 'Microgaming', count: 87 },
    { name: 'Red Tiger', count: 76 },
    { name: 'Yggdrasil', count: 64 },
    { name: 'Push Gaming', count: 52 },
    { name: 'Hacksaw Gaming', count: 48 },
    { name: 'Relax Gaming', count: 41 }
  ];

  const features = [
    { name: 'Bonus Buy', count: 156 },
    { name: 'Free Spins', count: 324 },
    { name: 'Jackpot', count: 89 },
    { name: 'Megaways', count: 112 },
    { name: 'Multiplier', count: 198 },
    { name: 'Wild', count: 276 },
    { name: 'Scatter', count: 245 },
    { name: 'Avalanche', count: 87 }
  ];

  return (
    <aside className="w-full lg:w-64 bg-white rounded-lg shadow-sm p-4 space-y-6 sticky top-20 h-fit">
      {/* Categories */}
      <div>
        <h3 className="font-black text-gray-900 mb-3 text-sm uppercase tracking-widest flex items-center gap-2">
          <div className="w-1 h-4 bg-purple-600 rounded-full"></div>
          Categories
        </h3>
        <div className="space-y-1">
          {['Tümü', 'Popüler', 'Yeni', 'Jackpot', 'Megaways', 'Bonus Buy', 'Canlı', 'Masalar', 'Klasik'].map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange?.(cat)}
              className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-all ${selectedCategory === cat ? 'bg-purple-600 text-white shadow-lg shadow-purple-200' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Providers */}
      <div>
        <button
          onClick={() => setProvidersExpanded(!providersExpanded)}
          className="flex items-center justify-between w-full font-black text-gray-900 mb-3 hover:text-purple-700 text-sm uppercase tracking-widest"
        >
          <div className="flex items-center gap-2">
            <div className="w-1 h-4 bg-purple-600 rounded-full"></div>
            Providers
          </div>
          {providersExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        {providersExpanded && (
          <div className="space-y-2 max-h-64 overflow-y-auto pr-2 scrollbar-hide">
            {providers.map((provider) => (
              <label key={provider.name} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded-xl transition-colors">
                <Checkbox
                  checked={selectedProvider === provider.name}
                  onCheckedChange={() => onProviderChange?.(provider.name)}
                />
                <span className={`text-[11px] font-bold flex-1 ${selectedProvider === provider.name ? 'text-purple-600' : 'text-gray-600'}`}>{provider.name}</span>
                <span className="text-[10px] font-medium text-gray-400">{provider.count}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Features */}
      <div>
        <button
          onClick={() => setFeaturesExpanded(!featuresExpanded)}
          className="flex items-center justify-between w-full font-black text-gray-900 mb-3 hover:text-purple-700 text-sm uppercase tracking-widest"
        >
          <div className="flex items-center gap-2">
            <div className="w-1 h-4 bg-purple-600 rounded-full"></div>
            Features
          </div>
          {featuresExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        {featuresExpanded && (
          <div className="space-y-2">
            {features.map((feature) => (
              <label key={feature.name} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded-xl transition-colors">
                <Checkbox />
                <span className="text-[11px] font-bold text-gray-600 flex-1">{feature.name}</span>
                <span className="text-[10px] font-medium text-gray-400">{feature.count}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}