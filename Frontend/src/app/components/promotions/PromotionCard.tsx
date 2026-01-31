import { Button } from '../ui/button';
import { useState } from 'react';

interface PromotionCardProps {
  category: string;
  title: string;
  bonus: string;
  description?: string;
  image: string;
  bgGradient: string;
  categoryColor: string;
  onDetails?: () => void;
}

export function PromotionCard({
  category,
  title,
  bonus,
  description,
  image,
  bgGradient,
  categoryColor,
  onDetails
}: PromotionCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover-lift ${
        isHovered ? 'scale-105' : 'scale-100'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Gradient */}
      <div className={`absolute inset-0 ${bgGradient}`}></div>

      {/* Shimmer effect */}
      <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-opacity duration-300 ${isHovered ? 'animate-shimmer' : 'opacity-0'}`}></div>

      {/* Content */}
      <div className="relative p-3 sm:p-4 md:p-5 h-[180px] sm:h-[200px] md:h-[240px] flex flex-col">
        {/* Category Badge */}
        <div className="mb-2 sm:mb-3">
          <span className={`inline-block px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold ${categoryColor} text-white animate-pulse-glow`}>
            {category}
          </span>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex items-center justify-between gap-2 sm:gap-3 md:gap-4">
          {/* Left Side - Text */}
          <div className="flex-1 text-white space-y-1 sm:space-y-2 min-w-0">
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-none animate-neon-pulse break-words">
              {bonus}
            </div>
            <div className="text-[10px] sm:text-xs md:text-sm lg:text-base font-bold uppercase leading-tight line-clamp-2">
              {title}
            </div>
            {description && (
              <div className="text-[9px] sm:text-[10px] md:text-xs opacity-90 line-clamp-1">
                {description}
              </div>
            )}
          </div>

          {/* Right Side - Image */}
          <div className="w-20 sm:w-24 md:w-32 lg:w-40 h-full flex items-end flex-shrink-0">
            <img
              src={image}
              alt={title}
              className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-110 animate-float"
            />
          </div>
        </div>

        {/* Details Button */}
        <div className="mt-2 sm:mt-3">
          <Button
            onClick={onDetails}
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border border-white/30 font-bold text-[9px] sm:text-[10px] md:text-xs px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-full transition-all hover:scale-105"
          >
            📋 DETAYLAR
          </Button>
        </div>
      </div>
    </div>
  );
}