import { useState } from 'react';
import { SlidersHorizontal, Grid3x3, List, Home } from 'lucide-react';
import { Search } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { TrendingUp } from 'lucide-react';
import { Flame } from 'lucide-react';
import { Sparkles } from 'lucide-react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { SlotGamesSidebar } from '../components/SlotGamesSidebar';
import { SlotGameCard } from '../components/SlotGameCard';
import { SlotBanner } from '../components/SlotBanner';
import { JackpotCounter } from '../components/JackpotCounter';
import { Button } from '../components/ui/button';

interface SlotGamesProps {
  onNavigate?: (page: string) => void;
  onShowSignIn?: () => void;
  onShowSignUp?: () => void;
  onShowDeposit?: () => void;
  onShowMessages?: () => void;
}

export default function SlotGames({ onNavigate, onShowSignIn, onShowSignUp, onShowDeposit, onShowMessages }: SlotGamesProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const slotGames = [
    { title: 'Sweet Bonanza 10000X', provider: 'Pragmatic Play', image: '/games/sweet-bonanza-classic/symbols/thumbnail.png', isHot: true, isJackpot: true, isNew: true, rtp: '96.6', page: 'sweet-bonanza-classic' }
  ];

  const categories = [
    'Tümü',
    'Popüler',
    'Yeni',
    'Jackpot',
    'Megaways',
    'Bonus Buy',
    'Canlı',
    'Masalar',
    'Klasik'
  ];

  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [selectedProvider, setSelectedProvider] = useState('Tümü');
  const [searchQuery, setSearchQuery] = useState('');

  const { t } = useLanguage();

  const handleNavigate = (page: string) => {
    onNavigate?.(page);
  };

  // Filtered games based on search, category, and provider
  const filteredGames = slotGames.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase());

    // Category mapping
    let matchesCategory = true;
    if (selectedCategory !== 'Tümü') {
      if (selectedCategory === 'Popüler') matchesCategory = !!game.isHot;
      else if (selectedCategory === 'Yeni') matchesCategory = !!game.isNew;
      else if (selectedCategory === 'Jackpot') matchesCategory = !!game.isJackpot;
      else if (selectedCategory === 'Megaways') matchesCategory = game.title.toLowerCase().includes('megaways');
    }

    const matchesProvider = selectedProvider === 'Tümü' || game.provider === selectedProvider;

    return matchesSearch && matchesCategory && matchesProvider;
  });

  // Jackpot games
  const jackpots = Array.from({ length: 5 }, (_, i) => i + 1);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation
        onNavigate={handleNavigate}
        onShowSignIn={onShowSignIn}
        onShowSignUp={onShowSignUp}
        onShowDeposit={onShowDeposit}
        onShowMessages={onShowMessages}
      />

      {/* Slot Games Banner */}
      <SlotBanner />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex gap-4 sm:gap-6">
          {/* Sidebar */}
          <div className="hidden lg:block w-64 flex-shrink-0 animate-fade-in-right">
            <SlotGamesSidebar
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              selectedProvider={selectedProvider}
              onProviderChange={setSelectedProvider}
            />
          </div>

          {/* Main Content Area */}
          <div className="flex-1 animate-fade-in-up">
            {/* Search Bar */}
            <div className="mb-4 sm:mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                <input
                  type="text"
                  placeholder={t('slotGames.search')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Jackpot Games */}
            <div className="mb-6 sm:mb-8 animate-scale-in">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-1.5 sm:gap-2">
                  <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-yellow-500 animate-wiggle" />
                  {t('slotGames.jackpot')}
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
                {jackpots.map((jackpot, index) => (
                  <div key={index} className="animate-fade-in stagger-1" style={{ animationDelay: `${index * 0.1}s` }}>
                    <JackpotCounter />
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 md:gap-4">
                {filteredGames.filter(g => g.isJackpot).slice(0, 10).map((game, index) => (
                  <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                    <SlotGameCard
                      {...game}
                      onClick={() => game.page ? onNavigate?.(game.page) : null}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Hot Games */}
            <div className="mb-6 sm:mb-8 animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-1.5 sm:gap-2">
                  <Flame className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-red-500 animate-wiggle" />
                  {t('slotGames.hot')}
                </h2>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 md:gap-4">
                {filteredGames.filter(g => g.isHot).map((game, index) => (
                  <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                    <SlotGameCard
                      {...game}
                      onClick={() => game.page ? onNavigate?.(game.page) : null}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* All Games */}
            <div className="animate-scale-in" style={{ animationDelay: '0.6s' }}>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">{t('slotGames.allGames')}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 md:gap-4">
                {filteredGames.map((game, index) => (
                  <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
                    <SlotGameCard
                      {...game}
                      onClick={() => game.page ? onNavigate?.(game.page) : null}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between bg-white rounded-lg p-3 sm:p-4 shadow-sm mt-6">
              <div className="text-gray-700 text-xs sm:text-sm md:text-base">
                <span className="font-semibold">{slotGames.length}</span> oyun bulundu
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className={`${viewMode === 'grid' ? 'bg-purple-700' : ''} px-2 sm:px-3`}
                >
                  <Grid3x3 className="w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className={`${viewMode === 'list' ? 'bg-purple-700' : ''} px-2 sm:px-3`}
                >
                  <List className="w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
              </div>
            </div>

            {/* Games Grid */}
            <div className={`grid gap-2 sm:gap-3 md:gap-4 mt-4 sm:mt-6 ${viewMode === 'grid'
              ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'
              : 'grid-cols-1'
              }`}>
              {slotGames.map((game, index) => (
                <SlotGameCard key={index} {...game} onClick={() => game.page ? onNavigate?.(game.page) : null} />
              ))}
            </div>

            {/* Load More */}
            <div className="text-center py-6 sm:py-8">
              <Button className="bg-purple-700 hover:bg-purple-800 px-6 sm:px-8 py-4 sm:py-6 text-sm sm:text-base md:text-lg">
                Daha Fazla Yükle
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}