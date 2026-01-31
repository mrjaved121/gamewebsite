import { useState } from 'react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { TVGamesSidebar } from '../components/tvgames/TVGamesSidebar';
import { TVGameCard } from '../components/tvgames/TVGameCard';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Home, Search, SlidersHorizontal, Grid, List } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface TVGamesProps {
  onNavigate?: (page: string) => void;
  onShowSignIn?: () => void;
  onShowSignUp?: () => void;
  onShowDeposit?: () => void;
  onShowMessages?: () => void;
}

export default function TVGames({ onNavigate, onShowSignIn, onShowSignUp, onShowDeposit, onShowMessages }: TVGamesProps) {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('games');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState('');

  const tabs = [
    { id: 'providers', label: 'PROVIDERS' },
    { id: 'games', label: 'GAMES' },
  ];

  const tvGames = [
    { title: 'KENO', provider: 'TVBET', image: 'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=400', isLive: true },
    { title: 'WHEEL BET', provider: 'TVBET', image: 'https://images.unsplash.com/photo-1626775238053-4315516eedc9?w=400', isLive: true },
    { title: 'CLASSIC WHEEL', provider: 'TVBET', image: 'https://images.unsplash.com/photo-1626775238053-4315516eedc9?w=400', isLive: true },
    { title: 'INSTANT ROULETTE', provider: 'VO categories', image: 'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=400', isLive: true },
    { title: 'FOOTBALL GRID', provider: 'VO categories', image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400', isLive: true },
    { title: 'FOOTBALL GRID', provider: 'TVBET', image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400', isLive: true },
    { title: 'WHEEL OF FORTUNE', provider: 'TVBET', image: 'https://images.unsplash.com/photo-1626775238053-4315516eedc9?w=400', isLive: true },
    { title: 'WAR OF BETS', provider: 'TVBET', image: 'https://images.unsplash.com/photo-1633629544357-14223c9837d2?w=400', isLive: true },
    { title: 'DICE DUEL', provider: 'TVBET', image: 'https://images.unsplash.com/photo-1551993005-75c4131b6bd8?w=400', isLive: true },
    { title: 'BILIARD POKER', provider: 'TVBET', image: 'https://images.unsplash.com/photo-1633629544357-14223c9837d2?w=400', isLive: true },
    { title: 'SEVEN BACCARAT', provider: 'TVBET', image: 'https://images.unsplash.com/photo-1611194122301-f946b5f2b6bb?w=400', isLive: true },
    { title: 'LUCKY 7', provider: 'VO categories', image: 'https://images.unsplash.com/photo-1633629544357-14223c9837d2?w=400', countdown: '1:23' },
    { title: 'LUCKY 6', provider: 'VO categories', image: 'https://images.unsplash.com/photo-1633629544357-14223c9837d2?w=400', isLive: true },
    { title: 'LUCKY 5', provider: 'TVBET', image: 'https://images.unsplash.com/photo-1633629544357-14223c9837d2?w=400', isLive: true },
    { title: 'KENO', provider: 'TVBET', image: 'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=400', isLive: true },
    { title: 'WAR OF ELEMENTS', provider: 'TVBET', image: 'https://images.unsplash.com/photo-1626775238053-4315516eedc9?w=400', isLive: true },
    { title: 'GOAL RUSH', provider: 'TVBET', image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400', isLive: true },
    { title: 'BET 2', provider: 'TVBET', image: 'https://images.unsplash.com/photo-1633629544357-14223c9837d2?w=400', isLive: true },
    { title: 'BET 1', provider: 'TVBET', image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400', isLive: true },
    { title: 'LUCKY 7', provider: 'TVBET', image: 'https://images.unsplash.com/photo-1633629544357-14223c9837d2?w=400', countdown: '0:45' },
    { title: 'BLACKJACK', provider: 'TVBET', image: 'https://images.unsplash.com/photo-1633629544357-14223c9837d2?w=400', isLive: true },
    { title: 'WIN', provider: 'LWN', image: 'https://images.unsplash.com/photo-1626775238053-4315516eedc9?w=400', countdown: '2:15' },
    { title: 'WIN', provider: 'LWN', image: 'https://images.unsplash.com/photo-1626775238053-4315516eedc9?w=400', countdown: '1:48' },
    { title: 'WIN', provider: 'LWN', image: 'https://images.unsplash.com/photo-1626775238053-4315516eedc9?w=400', countdown: '3:05' },
    { title: 'WIN', provider: 'LWN', image: 'https://images.unsplash.com/photo-1626775238053-4315516eedc9?w=400', countdown: '0:34' },
    { title: 'WIN', provider: 'LWN', image: 'https://images.unsplash.com/photo-1626775238053-4315516eedc9?w=400', countdown: '2:47' },
    { title: 'WIN', provider: 'LWN', image: 'https://images.unsplash.com/photo-1626775238053-4315516eedc9?w=400', countdown: '1:12' },
    { title: 'WIN', provider: 'LWN', image: 'https://images.unsplash.com/photo-1626775238053-4315516eedc9?w=400', countdown: '0:58' },
    { title: 'SPECIAL STUDIO', provider: 'LWN', image: 'https://images.unsplash.com/photo-1633629544357-14223c9837d2?w=400', countdown: '4:23' },
    { title: 'KENO', provider: 'LWN', image: 'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=400', countdown: '1:34' },
    { title: 'KENO', provider: 'LWN', image: 'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=400', countdown: '2:08' },
    { title: 'KENO', provider: 'LWN', image: 'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=400', countdown: '0:45' },
    { title: 'GITA', provider: 'TVBET', image: 'https://images.unsplash.com/photo-1633629544357-14223c9837d2?w=400', isLive: true },
    { title: 'KENO', provider: 'LWN', image: 'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=400', countdown: '3:17' },
    { title: 'LUCKY KICKS', provider: 'betgames', image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400', isLive: true },
    { title: 'WHEEL 6', provider: 'TVBET', image: 'https://images.unsplash.com/photo-1626775238053-4315516eedc9?w=400', isLive: true },
  ];

  const filteredGames = tvGames.filter(game =>
    game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    game.provider.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation 
        onNavigate={onNavigate} 
        onShowSignIn={onShowSignIn} 
        onShowSignUp={onShowSignUp}
        onShowDeposit={onShowDeposit}
        onShowMessages={onShowMessages}
      />

      {/* TV Games Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-purple-900 to-pink-900 text-white py-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center animate-fade-in-up">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4 animate-neon-pulse">📺 {t('tvGames.title')}</h1>
            <p className="text-sm sm:text-base md:text-lg text-purple-100 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              {t('tvGames.subtitle')}
            </p>
          </div>
        </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-10 left-10 text-2xl sm:text-3xl md:text-4xl animate-float-coin" style={{ animationDelay: '0s' }}>📺</div>
          <div className="absolute top-20 right-20 text-xl sm:text-2xl md:text-3xl animate-float-coin" style={{ animationDelay: '1s' }}>🎰</div>
          <div className="absolute bottom-10 left-1/4 text-xl sm:text-2xl md:text-3xl animate-float-coin" style={{ animationDelay: '2s' }}>🎲</div>
          <div className="absolute top-1/3 right-1/3 text-lg sm:text-xl md:text-2xl animate-float-coin" style={{ animationDelay: '1.5s' }}>💎</div>
        </div>

        {/* Pulsing orbs */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-24 h-24 sm:w-32 sm:h-32 bg-white rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 sm:w-40 sm:h-40 bg-pink-500 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex gap-4 sm:gap-6">
          {/* Sidebar */}
          <div className="hidden lg:block w-64 flex-shrink-0 animate-fade-in-right">
            <TVGamesSidebar
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
                  placeholder={t('tvGames.search')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Live Games */}
            <div className="mb-6 sm:mb-8 animate-scale-in">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-1.5 sm:gap-2">
                  <span className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full animate-pulse"></span>
                  {t('tvGames.liveGames')}
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                {filteredGames.map((game, index) => (
                  <div key={index} className="animate-fade-in stagger-1" style={{ animationDelay: `${index * 0.1}s` }}>
                    <TVGameCard {...game} />
                  </div>
                ))}
              </div>
            </div>

            {/* Load More */}
            {filteredGames.length > 0 && (
              <div className="text-center py-6 sm:py-8">
                <Button className="bg-purple-700 hover:bg-purple-800 px-6 sm:px-8 py-4 sm:py-6 text-sm sm:text-base md:text-lg">
                  {t('slot.loadMore')}
                </Button>
              </div>
            )}

            {/* No Results */}
            {filteredGames.length === 0 && (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  No games found
                </h3>
                <p className="text-gray-500">
                  Try adjusting your search to find more TV games
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}