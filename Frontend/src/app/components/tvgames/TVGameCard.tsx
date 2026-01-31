import { Clock, Users } from 'lucide-react';
import { useState } from 'react';

interface TVGameCardProps {
  title: string;
  provider: string;
  image: string;
  currentRound?: string;
  nextDraw?: string;
  minBet?: string;
  maxBet?: string;
}

export function TVGameCard({
  title,
  provider,
  image,
  currentRound,
  nextDraw,
  minBet,
  maxBet
}: TVGameCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="bg-white rounded-lg shadow-md hover:shadow-2xl transition-all overflow-hidden hover-lift transform hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Game Image */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Shimmer effect on hover */}
        <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-opacity duration-300 ${isHovered ? 'animate-shimmer' : 'opacity-0'}`}></div>

        {/* Live Badge */}
        <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1 animate-pulse-glow">
          <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
          LIVE
        </div>

        {/* Provider Logo */}
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold">
          {provider}
        </div>

        {/* Game Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/90 to-transparent p-3">
          <h3 className="font-bold text-white text-sm uppercase tracking-wide">{title}</h3>
        </div>

        {/* Next Draw Timer */}
        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded backdrop-blur-sm animate-bounce-subtle">
          ⏱️ {nextDraw}
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
            <p className="text-white font-bold text-sm">PLAY NOW</p>
          </div>
        </div>
      </div>
    </div>
  );
}