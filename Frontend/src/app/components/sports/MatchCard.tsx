import { Clock, Star } from 'lucide-react';
import { Button } from '../ui/button';

interface MatchCardProps {
  homeTeam: string;
  awayTeam: string;
  league: string;
  date: string;
  time: string;
  odds: {
    home: string;
    draw?: string;
    away: string;
  };
  isLive?: boolean;
  isFeatured?: boolean;
  marketCount?: number;
}

export function MatchCard({
  homeTeam,
  awayTeam,
  league,
  date,
  time,
  odds,
  isLive = false,
  isFeatured = false,
  marketCount = 150
}: MatchCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 hover:border-purple-400 hover:shadow-md transition-all p-3 sm:p-4 hover-lift">
      {/* Header */}
      <div className="flex items-center justify-between mb-2 sm:mb-3">
        <div className="flex items-center gap-1 sm:gap-2">
          {isFeatured && (
            <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 fill-yellow-500 animate-wiggle" />
          )}
          <span className="text-[10px] sm:text-xs text-gray-500 line-clamp-1">{league}</span>
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          {isLive ? (
            <span className="flex items-center gap-1 bg-red-500 text-white text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full animate-pulse-glow">
              <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white rounded-full animate-pulse"></span>
              LIVE
            </span>
          ) : (
            <div className="flex items-center gap-0.5 sm:gap-1 text-[10px] sm:text-xs text-gray-500">
              <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              <span className="hidden xs:inline">{date}</span> {time}
            </div>
          )}
        </div>
      </div>

      {/* Teams */}
      <div className="mb-3 sm:mb-4">
        <div className="flex items-center justify-between mb-1.5 sm:mb-2">
          <span className="font-medium text-gray-900 text-xs sm:text-sm md:text-base line-clamp-1 flex-1 pr-2">{homeTeam}</span>
          {isLive && <span className="text-base sm:text-lg font-bold text-purple-700 flex-shrink-0">2</span>}
        </div>
        <div className="flex items-center justify-between">
          <span className="font-medium text-gray-900 text-xs sm:text-sm md:text-base line-clamp-1 flex-1 pr-2">{awayTeam}</span>
          {isLive && <span className="text-base sm:text-lg font-bold text-purple-700 flex-shrink-0">1</span>}
        </div>
      </div>

      {/* Odds */}
      <div className={`grid ${odds.draw ? 'grid-cols-3' : 'grid-cols-2'} gap-1.5 sm:gap-2`}>
        <Button
          variant="outline"
          className="flex flex-col items-center py-2 sm:py-3 px-1 sm:px-2 hover:bg-purple-50 hover:border-purple-400 transition-all hover:scale-105"
        >
          <span className="text-[10px] sm:text-xs text-gray-600 mb-0.5 sm:mb-1">1</span>
          <span className="font-bold text-purple-700 text-xs sm:text-sm md:text-base">{odds.home}</span>
        </Button>
        {odds.draw && (
          <Button
            variant="outline"
            className="flex flex-col items-center py-2 sm:py-3 px-1 sm:px-2 hover:bg-purple-50 hover:border-purple-400 transition-all hover:scale-105"
          >
            <span className="text-[10px] sm:text-xs text-gray-600 mb-0.5 sm:mb-1">X</span>
            <span className="font-bold text-purple-700 text-xs sm:text-sm md:text-base">{odds.draw}</span>
          </Button>
        )}
        <Button
          variant="outline"
          className="flex flex-col items-center py-2 sm:py-3 px-1 sm:px-2 hover:bg-purple-50 hover:border-purple-400 transition-all hover:scale-105"
        >
          <span className="text-[10px] sm:text-xs text-gray-600 mb-0.5 sm:mb-1">2</span>
          <span className="font-bold text-purple-700 text-xs sm:text-sm md:text-base">{odds.away}</span>
        </Button>
      </div>

      {/* Footer */}
      <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-gray-100 flex items-center justify-between">
        <span className="text-[10px] sm:text-xs text-gray-500">+{marketCount} markets</span>
        <button className="text-[10px] sm:text-xs text-purple-700 hover:text-purple-900 font-medium whitespace-nowrap">
          View All →
        </button>
      </div>
    </div>
  );
}