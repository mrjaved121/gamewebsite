import { Button } from './ui/button';
import { Star } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface FeaturedGamesCarouselProps {
  onNavigate?: (page: string) => void;
}

export function FeaturedGamesCarousel({ onNavigate }: FeaturedGamesCarouselProps) {
  const { t } = useLanguage();

  const featuredGames = [
    {
      title: 'Sweet Bonanza 10000X',
      provider: 'Pragmatic Play',
      jackpot: '₺120,450',
      tag: 'YENİ',
      tagColor: 'bg-green-500',
      image: '/games/sweet-bonanza-classic/symbols/thumbnail.png',
      gradient: 'from-pink-600 to-purple-600',
      page: 'sweet-bonanza-classic'
    }
  ];

  return (
    <section className="py-12 sm:py-16 bg-[#0b0b1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8 sm:mb-10">
          <div className="flex items-center gap-3 sm:gap-4 group">
            <div className="p-2 sm:p-3 bg-yellow-500/10 rounded-xl group-hover:bg-yellow-500/20 transition-colors">
              <Star className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-500 fill-yellow-500 animate-pulse" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">{t('games.featured')}</h2>
              <div className="h-1 w-20 bg-gradient-to-r from-yellow-500 to-transparent mt-1 rounded-full"></div>
            </div>
          </div>
          <button className="text-white/50 hover:text-white text-sm font-bold transition-colors uppercase tracking-widest">View All</button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {featuredGames.map((game, index) => (
            <div
              key={index}
              onClick={() => game.page && onNavigate?.(game.page)}
              className="group relative rounded-3xl overflow-hidden cursor-pointer bg-[#16162d] border border-white/5 hover:border-purple-500/50 transition-all duration-500 shadow-2xl"
            >
              <div className="aspect-[3/4] relative overflow-hidden">
                <img
                  src={game.image}
                  alt={game.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b1a] via-transparent to-transparent opacity-90"></div>

                {/* Tag */}
                <div className="absolute top-4 left-4">
                  <span className={`${game.tagColor} text-white text-[10px] font-black px-2.5 py-1 rounded-lg shadow-lg uppercase tracking-wider`}>
                    {game.tag}
                  </span>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="space-y-2 sm:space-y-3">
                    <h3 className="font-black text-white text-base sm:text-xl line-clamp-1 group-hover:text-purple-400 transition-colors">
                      {game.title.includes('10000X') ? (
                        <>
                          {game.title.replace('10000X', '')}
                          <span style={{ fontFamily: 'MilkywayDEMO' }} className="text-yellow-400 ml-1">10000X</span>
                        </>
                      ) : game.title}
                    </h3>

                    <div className="flex items-center justify-between items-end">
                      <div>
                        <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-0.5">Current Jackpot</p>
                        <p className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400 font-black text-lg sm:text-2xl">{game.jackpot}</p>
                      </div>
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 hover:bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/10 transition-all group-hover:scale-110">
                        <div className="w-0 h-0 border-l-[10px] sm:border-l-[12px] border-l-white border-t-[6px] sm:border-t-[8px] border-t-transparent border-b-[6px] sm:border-b-[8px] border-b-transparent ml-1"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Reflection effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}