import { useState } from 'react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { SportsSidebar } from '../components/sports/SportsSidebar';
import { MatchCard } from '../components/sports/MatchCard';
import { BetSlip } from '../components/sports/BetSlip';
import { Button } from '../components/ui/button';
import { Home, Calendar, Radio, FileCheck, ClipboardList, SlidersHorizontal } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Search } from 'lucide-react';

interface SportsProps {
  onNavigate?: (page: string) => void;
  onShowSignIn?: () => void;
  onShowSignUp?: () => void;
  onShowDeposit?: () => void;
  onShowMessages?: () => void;
}

export default function Sports({ onNavigate, onShowSignIn, onShowSignUp, onShowDeposit, onShowMessages }: SportsProps) {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('tournaments');
  const [activeFilter, setActiveFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [showBetSlip, setShowBetSlip] = useState(false);
  const [showOnlyFree, setShowOnlyFree] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = [
    { id: 'tournaments', label: 'SPOR TURNUVALAR', icon: ClipboardList },
    { id: 'event', label: 'Event View', icon: Calendar },
    { id: 'live-calendar', label: 'Live Calendar', icon: Radio },
    { id: 'questions', label: 'Maç Sonuçları', icon: FileCheck },
  ];

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'upcoming', label: 'Upcoming' },
    { id: 'live', label: 'Live' },
    { id: 'finished', label: 'Finished' },
    { id: 'registration', label: 'Registration Started' },
  ];

  const matches = [
    {
      homeTeam: 'Manchester United',
      awayTeam: 'Liverpool',
      league: 'Premier League',
      date: 'Jan 12',
      time: '20:00',
      odds: { home: '2.45', draw: '3.20', away: '2.85' },
      isFeatured: true,
      marketCount: 187
    },
    {
      homeTeam: 'Real Madrid',
      awayTeam: 'Barcelona',
      league: 'La Liga',
      date: 'Jan 12',
      time: '21:30',
      odds: { home: '2.10', draw: '3.40', away: '3.25' },
      isFeatured: true,
      marketCount: 245
    },
    {
      homeTeam: 'Bayern Munich',
      awayTeam: 'Borussia Dortmund',
      league: 'Bundesliga',
      date: 'Jan 13',
      time: '18:30',
      odds: { home: '1.85', draw: '3.60', away: '4.20' },
      isLive: true,
      marketCount: 198
    },
    {
      homeTeam: 'Juventus',
      awayTeam: 'AC Milan',
      league: 'Serie A',
      date: 'Jan 13',
      time: '19:45',
      odds: { home: '2.30', draw: '3.15', away: '3.10' },
      marketCount: 156
    },
    {
      homeTeam: 'PSG',
      awayTeam: 'Marseille',
      league: 'Ligue 1',
      date: 'Jan 14',
      time: '20:00',
      odds: { home: '1.55', draw: '4.20', away: '5.50' },
      marketCount: 167
    },
    {
      homeTeam: 'Fenerbahçe',
      awayTeam: 'Galatasaray',
      league: 'Süper Lig',
      date: 'Jan 14',
      time: '19:00',
      odds: { home: '2.65', draw: '3.10', away: '2.70' },
      isFeatured: true,
      isLive: true,
      marketCount: 234
    },
    {
      homeTeam: 'Chelsea',
      awayTeam: 'Arsenal',
      league: 'Premier League',
      date: 'Jan 15',
      time: '17:30',
      odds: { home: '2.80', draw: '3.25', away: '2.50' },
      marketCount: 189
    },
    {
      homeTeam: 'Inter Milan',
      awayTeam: 'Napoli',
      league: 'Serie A',
      date: 'Jan 15',
      time: '20:45',
      odds: { home: '2.40', draw: '3.30', away: '2.90' },
      marketCount: 172
    },
  ];

  const filteredMatches = matches.filter(match => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'upcoming') return new Date(match.date) > new Date();
    if (activeFilter === 'live') return match.isLive;
    if (activeFilter === 'finished') return new Date(match.date) < new Date();
    if (activeFilter === 'registration') return match.isFeatured;
    return true;
  });

  const tournaments = [
    { name: 'Champions League', icon: '🏆', matches: 32 },
    { name: 'La Liga', icon: '⚽', matches: 20 },
    { name: 'Premier League', icon: '🏆', matches: 20 },
    { name: 'Bundesliga', icon: '🏆', matches: 18 },
    { name: 'Serie A', icon: '🏆', matches: 20 },
    { name: 'Ligue 1', icon: '🏆', matches: 20 },
    { name: 'Süper Lig', icon: '🏆', matches: 18 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation 
        onNavigate={onNavigate} 
        onShowSignIn={onShowSignIn} 
        onShowSignUp={onShowSignUp}
        onShowDeposit={onShowDeposit}
        onShowMessages={onShowMessages}
      />

      {/* Sports Banner */}
      <div className="bg-gradient-to-r from-purple-900 via-purple-800 to-purple-900 text-white py-8 sm:py-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center animate-fade-in-up">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4 animate-neon-pulse">{t('sports.title')}</h1>
            <p className="text-sm sm:text-base md:text-lg text-purple-100 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              {t('sports.subtitle')}</p>
          </div>
        </div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-10 left-10 text-2xl sm:text-3xl md:text-4xl animate-float-coin" style={{ animationDelay: '0s' }}>⚽</div>
          <div className="absolute top-20 right-20 text-xl sm:text-2xl md:text-3xl animate-float-coin" style={{ animationDelay: '1s' }}>🏀</div>
          <div className="absolute bottom-10 left-1/4 text-xl sm:text-2xl md:text-3xl animate-float-coin" style={{ animationDelay: '2s' }}>🎾</div>
          <div className="absolute top-1/3 right-1/3 text-lg sm:text-xl md:text-2xl animate-float-coin" style={{ animationDelay: '1.5s' }}>🏈</div>
        </div>
        
        {/* Pulsing orbs */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-24 h-24 sm:w-32 sm:h-32 bg-white rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 sm:w-40 sm:h-40 bg-pink-500 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-6">
          {/* Sidebar */}
          <div className="hidden lg:block w-64 flex-shrink-0 animate-fade-in-right">
            <SportsSidebar />
          </div>

          {/* Main Content Area */}
          <div className="flex-1 animate-fade-in-up">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder={t('sports.search')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 mb-6">
              <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center justify-between gap-3 sm:gap-4">
                <div className="flex flex-wrap gap-1.5 sm:gap-2 w-full sm:w-auto">
                  {filters.map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => setActiveFilter(filter.id)}
                      className={`px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                        activeFilter === filter.id
                          ? 'bg-purple-700 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs sm:text-sm text-gray-600 whitespace-nowrap">Show only free</span>
                  <button
                    onClick={() => setShowOnlyFree(!showOnlyFree)}
                    className={`relative w-10 h-5 sm:w-12 sm:h-6 rounded-full transition-colors ${
                      showOnlyFree ? 'bg-purple-700' : 'bg-gray-300'
                    }`}
                  >
                    <div
                      className={`absolute top-0.5 left-0.5 w-4 h-4 sm:w-5 sm:h-5 bg-white rounded-full transition-transform ${
                        showOnlyFree ? 'translate-x-5 sm:translate-x-6' : 'translate-x-0'
                      }`}
                    ></div>
                  </button>
                </div>
              </div>
            </div>

            {/* Featured Tournaments */}
            <div className="mb-6 sm:mb-8 animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">{t('sports.featuredTournaments')}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
                {tournaments.map((tournament, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg p-3 sm:p-4 border border-gray-200 hover:border-purple-400 hover:shadow-md cursor-pointer transition-all hover-lift animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="text-2xl sm:text-3xl mb-1 sm:mb-2 animate-wiggle">{tournament.icon}</div>
                    <div className="text-xs sm:text-sm font-bold text-gray-900 line-clamp-1">{tournament.name}</div>
                    <div className="text-[10px] sm:text-xs text-gray-500 mt-0.5 sm:mt-1">{tournament.matches} {t('sports.matches')}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Matches Section */}
            <div className="mb-6 sm:mb-8 animate-scale-in">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-1.5 sm:gap-2">
                  <span className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full animate-pulse"></span>
                  {t('sports.liveMatches')}
                </h2>
                <button className="text-purple-700 hover:text-purple-900 font-medium text-xs sm:text-sm hover:scale-105 transition-transform whitespace-nowrap">
                  {t('sports.viewAll')} →
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                {filteredMatches.filter(m => m.isLive).map((match, index) => (
                  <div key={index} className="animate-fade-in stagger-1" style={{ animationDelay: `${index * 0.1}s` }}>
                    <MatchCard {...match} />
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Matches */}
            <div className="animate-scale-in" style={{ animationDelay: '0.4s' }}>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">{t('sports.upcomingMatches')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                {filteredMatches.filter(m => !m.isLive).map((match, index) => (
                  <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                    <MatchCard {...match} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bet Slip - Desktop */}
          <div className="hidden xl:block w-80 flex-shrink-0 animate-fade-in-right" style={{ animationDelay: '0.3s' }}>
            <div className="sticky top-24">
              <BetSlip />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bet Slip Button */}
      <button
        onClick={() => setShowBetSlip(!showBetSlip)}
        className="xl:hidden fixed bottom-6 right-6 bg-purple-700 hover:bg-purple-800 text-white px-6 py-4 rounded-full shadow-2xl font-bold z-50 flex items-center gap-2"
      >
        <span>🎯</span>
        <span>Bet Slip (1)</span>
      </button>

      {/* Mobile Bet Slip Modal */}
      {showBetSlip && (
        <div className="xl:hidden fixed inset-0 bg-black/50 z-50 flex items-end">
          <div className="w-full bg-white rounded-t-2xl max-h-[80vh] overflow-y-auto">
            <BetSlip onClose={() => setShowBetSlip(false)} />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}