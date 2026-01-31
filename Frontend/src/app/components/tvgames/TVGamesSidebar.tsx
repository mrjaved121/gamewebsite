import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '../ui/input';

interface Provider {
  id: string;
  name: string;
  logo?: string;
}

interface TVGamesSidebarProps {
  selectedProvider?: string;
  onProviderChange?: (provider: string) => void;
}

export function TVGamesSidebar({ selectedProvider: externalSelectedProvider, onProviderChange }: TVGamesSidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProvider, setSelectedProvider] = useState<string>('all');

  const providers: Provider[] = [
    { id: 'all', name: 'All Providers' },
    { id: 'tvbet', name: 'TVBET' },
    { id: 'vocategories', name: 'VO categories' },
    { id: 'lwn', name: 'LWN' },
    { id: 'betgames', name: 'BetGames.TV' },
  ];

  const filteredProviders = providers.filter(provider =>
    provider.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <aside className="w-full lg:w-48 bg-white rounded-lg shadow-sm h-fit sticky top-20">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h3 className="font-bold text-gray-900 text-sm mb-3">PROVIDERS</h3>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400" />
          <Input
            type="text"
            placeholder="Provider Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-7 text-xs h-8"
          />
        </div>
      </div>

      {/* Providers List */}
      <div className="p-2">
        {filteredProviders.map((provider) => (
          <button
            key={provider.id}
            onClick={() => {
              setSelectedProvider(provider.id);
              if (onProviderChange) {
                onProviderChange(provider.id);
              }
            }}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors mb-1 ${
              selectedProvider === provider.id
                ? 'bg-purple-100 text-purple-900'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            {provider.name}
          </button>
        ))}
      </div>
    </aside>
  );
}