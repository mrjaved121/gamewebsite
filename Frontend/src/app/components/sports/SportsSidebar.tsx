import { useState } from 'react';
import { ChevronRight, ChevronDown, Search } from 'lucide-react';
import { Input } from '../ui/input';
import { useLanguage } from '../../contexts/LanguageContext';

interface Sport {
  id: string;
  name: string;
  icon: string;
  count: number;
  leagues?: League[];
}

interface League {
  id: string;
  name: string;
  country: string;
  count: number;
}

export function SportsSidebar() {
  const { t } = useLanguage();
  const [expandedSports, setExpandedSports] = useState<string[]>(['football']);
  const [searchQuery, setSearchQuery] = useState('');

  const sports: Sport[] = [
    {
      id: 'football',
      name: 'Football',
      icon: '⚽',
      count: 1245,
      leagues: [
        { id: 'epl', name: 'Premier League', country: 'England', count: 38 },
        { id: 'laliga', name: 'La Liga', country: 'Spain', count: 42 },
        { id: 'bundesliga', name: 'Bundesliga', country: 'Germany', count: 34 },
        { id: 'seriea', name: 'Serie A', country: 'Italy', count: 40 },
        { id: 'ligue1', name: 'Ligue 1', country: 'France', count: 36 },
        { id: 'superlig', name: 'Süper Lig', country: 'Turkey', count: 45 },
        { id: 'ucl', name: 'Champions League', country: 'Europe', count: 28 },
        { id: 'uel', name: 'Europa League', country: 'Europe', count: 32 },
      ]
    },
    {
      id: 'basketball',
      name: 'Basketball',
      icon: '🏀',
      count: 432,
      leagues: [
        { id: 'nba', name: 'NBA', country: 'USA', count: 82 },
        { id: 'euroleague', name: 'EuroLeague', country: 'Europe', count: 34 },
        { id: 'bsl', name: 'BSL', country: 'Turkey', count: 30 },
      ]
    },
    {
      id: 'tennis',
      name: 'Tennis',
      icon: '🎾',
      count: 567,
      leagues: [
        { id: 'atp', name: 'ATP Tour', country: 'International', count: 124 },
        { id: 'wta', name: 'WTA Tour', country: 'International', count: 98 },
        { id: 'grandslam', name: 'Grand Slams', country: 'International', count: 16 },
      ]
    },
    {
      id: 'volleyball',
      name: 'Volleyball',
      icon: '🏐',
      count: 234,
      leagues: [
        { id: 'vleague', name: 'Voleybol Ligi', country: 'Turkey', count: 42 },
      ]
    },
    {
      id: 'icehockey',
      name: 'Ice Hockey',
      icon: '🏒',
      count: 198,
      leagues: [
        { id: 'nhl', name: 'NHL', country: 'USA', count: 82 },
        { id: 'khl', name: 'KHL', country: 'Russia', count: 56 },
      ]
    },
    {
      id: 'handball',
      name: 'Handball',
      icon: '🤾',
      count: 156
    },
    {
      id: 'esports',
      name: 'E-Sports',
      icon: '🎮',
      count: 324,
      leagues: [
        { id: 'lol', name: 'League of Legends', country: 'International', count: 45 },
        { id: 'csgo', name: 'CS:GO', country: 'International', count: 67 },
        { id: 'dota2', name: 'Dota 2', country: 'International', count: 52 },
      ]
    },
    {
      id: 'boxing',
      name: 'Boxing',
      icon: '🥊',
      count: 89
    },
    {
      id: 'mma',
      name: 'MMA',
      icon: '🥋',
      count: 76
    },
    {
      id: 'cricket',
      name: 'Cricket',
      icon: '🏏',
      count: 143
    },
    {
      id: 'table-tennis',
      name: 'Table Tennis',
      icon: '🏓',
      count: 267
    },
  ];

  const toggleSport = (sportId: string) => {
    if (expandedSports.includes(sportId)) {
      setExpandedSports(expandedSports.filter(id => id !== sportId));
    } else {
      setExpandedSports([...expandedSports, sportId]);
    }
  };

  const filteredSports = sports.filter(sport =>
    sport.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <aside className="w-full lg:w-64 bg-white rounded-lg shadow-sm h-fit sticky top-20">
      {/* Search */}
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search sports..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Sports List */}
      <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
        {filteredSports.map((sport) => (
          <div key={sport.id}>
            <button
              onClick={() => toggleSport(sport.id)}
              className="w-full flex items-center justify-between p-4 hover:bg-purple-50 transition-colors border-b border-gray-100"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{sport.icon}</span>
                <div className="text-left">
                  <div className="font-medium text-gray-900">{sport.name}</div>
                  <div className="text-xs text-gray-500">{sport.count} events</div>
                </div>
              </div>
              {sport.leagues && (
                expandedSports.includes(sport.id) ? (
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                )
              )}
            </button>

            {/* Leagues */}
            {sport.leagues && expandedSports.includes(sport.id) && (
              <div className="bg-gray-50">
                {sport.leagues.map((league) => (
                  <button
                    key={league.id}
                    className="w-full flex items-center justify-between px-6 py-3 hover:bg-purple-50 transition-colors border-b border-gray-100"
                  >
                    <div className="text-left">
                      <div className="text-sm font-medium text-gray-900">{league.name}</div>
                      <div className="text-xs text-gray-500">{league.country}</div>
                    </div>
                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                      {league.count}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
}
