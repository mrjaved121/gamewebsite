import { Users, Star } from 'lucide-react';
import { useState } from 'react';

interface LiveCasinoGameCardProps {
  title: string;
  provider: string;
  image: string;
  minBet?: string;
  maxBet?: string;
  players?: number;
  isFeatured?: boolean;
  dealer?: string;
}

export function LiveCasinoGameCard({
  title,
  provider,
  image,
  minBet,
  maxBet,
  players,
  isFeatured = false,
  dealer
}: LiveCasinoGameCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105 hover-lift"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-[4/3] relative overflow-hidden bg-gradient-to-br from-purple-900 to-blue-900">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Live Badge */}
        <div className="absolute top-2 left-2 flex items-center gap-1 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded animate-pulse-glow">
          <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
          LIVE
        </div>

        {/* Featured Badge */}
        {isFeatured && (
          <div className="absolute top-2 right-2 bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded flex items-center gap-1 animate-wiggle">
            <Star className="w-3 h-3 fill-black" />
            HOT
          </div>
        )}

        {/* Players Count */}
        {players && (
          <div className="absolute top-10 right-2 flex items-center gap-1 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded">
            <Users className="w-3 h-3" />
            <span>{players}</span>
          </div>
        )}

        {/* Game Info Overlay - Always Visible */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/90 to-transparent p-3">
          <h3 className="font-bold text-white text-sm mb-1 line-clamp-1">{title}</h3>
          <div className="flex items-center justify-between text-xs">
            <span className="text-white/80">{provider}</span>
            {dealer && <span className="text-white/80">{dealer}</span>}
          </div>
          {(minBet || maxBet) && (
            <div className="flex items-center gap-2 mt-1 text-xs">
              {minBet && <span className="text-green-400">Min: {minBet}</span>}
              {maxBet && <span className="text-yellow-400">Max: {maxBet}</span>}
            </div>
          )}
        </div>

        {/* Hover Overlay */}
        <div
          className={`absolute inset-0 bg-purple-900/90 transition-opacity duration-300 flex items-center justify-center ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="text-center space-y-3">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto">
              <div className="w-0 h-0 border-l-[16px] border-l-purple-700 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent ml-1"></div>
            </div>
            <p className="text-white font-bold">PLAY NOW</p>
          </div>
        </div>
      </div>
    </div>
  );
}