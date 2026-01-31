import { useState } from 'react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { LiveCasinoBanner } from '../components/livecasino/LiveCasinoBanner';
import { LiveCasinoSidebar } from '../components/livecasino/LiveCasinoSidebar';
import { LiveCasinoGameCard } from '../components/livecasino/LiveCasinoGameCard';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Home, Search, SlidersHorizontal } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Star } from 'lucide-react';

interface LiveCasinoProps {
  onNavigate?: (page: string) => void;
  onShowSignIn?: () => void;
  onShowSignUp?: () => void;
  onShowDeposit?: () => void;
  onShowMessages?: () => void;
}

export default function LiveCasino({ onNavigate, onShowSignIn, onShowSignUp, onShowDeposit, onShowMessages }: LiveCasinoProps) {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState('all');

  const categories = [
    { id: 'all', label: 'All Games', icon: '🎰' },
    { id: 'roulette', label: 'Roulette', icon: '🎡' },
    { id: 'blackjack', label: 'Blackjack', icon: '🃏' },
    { id: 'baccarat', label: 'Baccarat', icon: '💎' },
    { id: 'poker', label: 'Poker', icon: '♠️' },
    { id: 'gameshows', label: 'Game Shows', icon: '🎪' },
  ];

  const liveGames = [
    { title: 'Lightning Roulette', provider: 'Evolution', image: 'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=400', minBet: '₺1', maxBet: '₺5000', players: 234, isFeatured: true, dealer: 'Maria' },
    { title: 'Speed Blackjack A', provider: 'Evolution', image: 'https://images.unsplash.com/photo-1633629544357-14223c9837d2?w=400', minBet: '₺5', maxBet: '₺10000', players: 156, dealer: 'Anna' },
    { title: 'Crazy Time', provider: 'Evolution', image: 'https://images.unsplash.com/photo-1626775238053-4315516eedc9?w=400', minBet: '₺1', maxBet: '₺2000', players: 892, isFeatured: true, dealer: 'Elena' },
    { title: 'Baccarat Live', provider: 'Pragmatic Play', image: 'https://images.unsplash.com/photo-1611194122301-f946b5f2b6bb?w=400', minBet: '₺10', maxBet: '₺50000', players: 67, dealer: 'Sophie' },
    { title: 'Turkish Roulette', provider: 'Evolution', image: 'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=400', minBet: '₺2', maxBet: '₺3000', players: 189, dealer: 'Ayşe' },
    { title: 'Mega Ball', provider: 'Evolution', image: 'https://images.unsplash.com/photo-1626775238053-4315516eedc9?w=400', minBet: '₺1', maxBet: '₺1000', players: 543, isFeatured: true, dealer: 'Laura' },
    { title: 'Speed Baccarat A', provider: 'Evolution', image: 'https://images.unsplash.com/photo-1611194122301-f946b5f2b6bb?w=400', minBet: '₺5', maxBet: '₺10000', players: 98, dealer: 'Isabella' },
    { title: 'Immersive Roulette', provider: 'Evolution', image: 'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=400', minBet: '₺2', maxBet: '₺5000', players: 276, dealer: 'Natalia' },
    { title: 'Infinite Blackjack', provider: 'Evolution', image: 'https://images.unsplash.com/photo-1633629544357-14223c9837d2?w=400', minBet: '₺1', maxBet: '₺5000', players: 423, dealer: 'Olivia' },
    { title: 'Monopoly Live', provider: 'Evolution', image: 'https://images.unsplash.com/photo-1626775238053-4315516eedc9?w=400', minBet: '₺1', maxBet: '₺2000', players: 678, isFeatured: true, dealer: 'Emma' },
    { title: 'Blackjack VIP A', provider: 'Evolution', image: 'https://images.unsplash.com/photo-1633629544357-14223c9837d2?w=400', minBet: '₺50', maxBet: '₺50000', players: 34, dealer: 'Victoria' },
    { title: 'American Roulette', provider: 'Evolution', image: 'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=400', minBet: '₺1', maxBet: '₺3000', players: 145, dealer: 'Sarah' },
    { title: 'Dream Catcher', provider: 'Evolution', image: 'https://images.unsplash.com/photo-1626775238053-4315516eedc9?w=400', minBet: '₺1', maxBet: '₺1000', players: 234, dealer: 'Mia' },
    { title: 'Baccarat Squeeze', provider: 'Evolution', image: 'https://images.unsplash.com/photo-1611194122301-f946b5f2b6bb?w=400', minBet: '₺10', maxBet: '₺20000', players: 87, dealer: 'Charlotte' },
    { title: 'Auto Roulette', provider: 'Evolution', image: 'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=400', minBet: '₺1', maxBet: '₺5000', players: 321, dealer: 'Auto' },
    { title: 'Deal or No Deal', provider: 'Evolution', image: 'https://images.unsplash.com/photo-1626775238053-4315516eedc9?w=400', minBet: '₺1', maxBet: '₺2000', players: 456, isFeatured: true, dealer: 'Julia' },
    { title: 'Casino Holdem', provider: 'Evolution', image: 'https://images.unsplash.com/photo-1633629544357-14223c9837d2?w=400', minBet: '₺5', maxBet: '₺5000', players: 76, dealer: 'Grace' },
    { title: 'XXXtreme Lightning Roulette', provider: 'Evolution', image: 'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=400', minBet: '₺1', maxBet: '₺5000', players: 567, isFeatured: true, dealer: 'Alice' },
    { title: 'Free Bet Blackjack', provider: 'Evolution', image: 'https://images.unsplash.com/photo-1633629544357-14223c9837d2?w=400', minBet: '₺1', maxBet: '₺5000', players: 189, dealer: 'Sophia' },
    { title: 'Lightning Baccarat', provider: 'Evolution', image: 'https://images.unsplash.com/photo-1611194122301-f946b5f2b6bb?w=400', minBet: '₺10', maxBet: '₺50000', players: 123, dealer: 'Amelia' },
    { title: 'Side Bet City', provider: 'Evolution', image: 'https://images.unsplash.com/photo-1633629544357-14223c9837d2?w=400', minBet: '₺1', maxBet: '₺1000', players: 98, dealer: 'Luna' },
    { title: 'Auto Roulette VIP', provider: 'Evolution', image: 'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=400', minBet: '₺5', maxBet: '₺10000', players: 234, dealer: 'Auto' },
    { title: 'Mega Roulette', provider: 'Pragmatic Play', image: 'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=400', minBet: '₺1', maxBet: '₺5000', players: 345, isFeatured: true, dealer: 'Eva' },
    { title: 'Speed Roulette', provider: 'Evolution', image: 'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=400', minBet: '₺2', maxBet: '₺3000', players: 267, dealer: 'Aria' },
    { title: 'Blackjack Party', provider: 'Evolution', image: 'https://images.unsplash.com/photo-1633629544357-14223c9837d2?w=400', minBet: '₺5', maxBet: '₺5000', players: 178, dealer: 'Chloe' },
    { title: 'Salon Privé Blackjack', provider: 'Evolution', image: 'https://images.unsplash.com/photo-1633629544357-14223c9837d2?w=400', minBet: '₺100', maxBet: '₺100000', players: 12, dealer: 'Elite' },
    { title: 'Double Ball Roulette', provider: 'Evolution', image: 'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=400', minBet: '₺1', maxBet: '₺3000', players: 198, dealer: 'Zara' },
    { title: 'Three Card Poker', provider: 'Evolution', image: 'https://images.unsplash.com/photo-1633629544357-14223c9837d2?w=400', minBet: '₺5', maxBet: '₺5000', players: 87, dealer: 'Ruby' },
    { title: 'Football Studio', provider: 'Evolution', image: 'https://images.unsplash.com/photo-1626775238053-4315516eedc9?w=400', minBet: '₺1', maxBet: '₺1000', players: 456, dealer: 'Bella' },
    { title: 'Dragon Tiger', provider: 'Evolution', image: 'https://images.unsplash.com/photo-1611194122301-f946b5f2b6bb?w=400', minBet: '₺1', maxBet: '₺3000', players: 234, dealer: 'Lily' },
    { title: 'Super Sic Bo', provider: 'Evolution', image: 'https://images.unsplash.com/photo-1626775238053-4315516eedc9?w=400', minBet: '₺1', maxBet: '₺2000', players: 167, dealer: 'Ivy' },
    { title: 'Roulette Live', provider: 'Pragmatic Play', image: 'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=400', minBet: '₺1', maxBet: '₺5000', players: 289, dealer: 'Maya' },
  ];

  const filteredGames = liveGames.filter(game =>
    game.title.toLowerCase().includes(searchQuery.toLowerCase())
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

      {/* Live Casino Banner */}
      <LiveCasinoBanner />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-6">
          {/* Sidebar */}
          <div className="hidden lg:block w-64 flex-shrink-0 animate-fade-in-right">
            <LiveCasinoSidebar
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
                  placeholder={t('liveCasino.search')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Featured Games */}
            <div className="mb-6 sm:mb-8 animate-scale-in">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-1.5 sm:gap-2">
                  <Star className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-yellow-500 fill-yellow-500 animate-wiggle" />
                  {t('liveCasino.featured')}
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                {filteredGames.filter(g => g.isFeatured).slice(0, 4).map((game, index) => (
                  <div key={index} className="animate-fade-in stagger-1" style={{ animationDelay: `${index * 0.1}s` }}>
                    <LiveCasinoGameCard {...game} />
                  </div>
                ))}
              </div>
            </div>

            {/* Live Blackjack */}
            <div className="mb-6 sm:mb-8 animate-scale-in" style={{ animationDelay: '0.4s' }}>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-1.5 sm:gap-2">
                🃏 {t('liveCasino.blackjack')}
                <span className="text-xs sm:text-sm font-normal text-red-500 animate-pulse-glow">● LIVE</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                {filteredGames.filter(g => g.title.includes('Blackjack')).map((game, index) => (
                  <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                    <LiveCasinoGameCard {...game} />
                  </div>
                ))}
              </div>
            </div>

            {/* Live Baccarat */}
            <div className="mb-6 sm:mb-8 animate-scale-in" style={{ animationDelay: '0.6s' }}>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-1.5 sm:gap-2">
                💎 {t('liveCasino.baccarat')}
                <span className="text-xs sm:text-sm font-normal text-red-500 animate-pulse-glow">● LIVE</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                {filteredGames.filter(g => g.title.includes('Baccarat')).map((game, index) => (
                  <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                    <LiveCasinoGameCard {...game} />
                  </div>
                ))}
              </div>
            </div>

            {/* Games Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2 sm:gap-3 md:gap-4">
              {filteredGames.map((game, index) => (
                <LiveCasinoGameCard key={index} {...game} />
              ))}
            </div>

            {/* Load More */}
            <div className="text-center py-6 sm:py-8">
              <Button className="bg-purple-700 hover:bg-purple-800 px-6 sm:px-8 py-4 sm:py-6 text-sm sm:text-base md:text-lg">
                {t('slot.loadMore')}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}