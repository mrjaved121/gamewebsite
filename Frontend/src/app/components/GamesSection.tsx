import { Button } from './ui/button';
import { useLanguage } from '../contexts/LanguageContext';

interface GamesSectionProps {
  onNavigate?: (page: string) => void;
}

export function GamesSection({ onNavigate }: GamesSectionProps) {
  const { t } = useLanguage();

  const games = [
    {
      title: 'Sweet Bonanza 10000X',
      provider: 'Pragmatic Play',
      color: 'from-pink-500 to-purple-400',
      image: '/games/sweet-bonanza-classic/symbols/thumbnail.png',
      page: 'sweet-bonanza-classic'
    }
  ];

  return (
    <section className="py-12 sm:py-20 bg-[#0b0b1a] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8 sm:mb-12">
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight uppercase">Trending Now</h2>
            <div className="h-1 w-32 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"></div>
          </div>
          <Button variant="ghost" size="sm" className="text-white/60 hover:text-white uppercase tracking-widest text-xs font-black">
            {t('games.viewAll')}
          </Button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
          {games.map((game, index) => (
            <div
              key={index}
              onClick={() => game.page && onNavigate?.(game.page)}
              className="group relative rounded-2xl overflow-hidden cursor-pointer bg-[#16162d] border border-white/5 hover:border-cyan-500/50 transition-all duration-500 transform hover:-translate-y-2 shadow-xl"
            >
              <div className="aspect-[3/4] relative overflow-hidden">
                <img
                  src={game.image}
                  alt={game.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b1a] via-[#0b0b1a]/20 to-transparent opacity-80 group-hover:opacity-40 transition-opacity"></div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 transition-transform duration-500 group-hover:translate-y-1">
                  <h3 className="font-bold text-white text-[10px] sm:text-xs line-clamp-1 group-hover:text-cyan-400 transition-colors">
                    {game.title.includes('10000X') ? (
                      <>
                        {game.title.replace('10000X', '')}
                        <span style={{ fontFamily: 'MilkywayDEMO' }} className="text-yellow-400 ml-1">10000X</span>
                      </>
                    ) : game.title}
                  </h3>
                  <p className="text-[10px] text-white/40 font-bold uppercase tracking-tighter mt-0.5">{game.provider}</p>
                </div>

                {/* Hover Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-purple-600/20 opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-[2px]">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.5)] transform scale-50 group-hover:scale-100 transition-transform duration-500">
                    <div className="w-0 h-0 border-l-[12px] border-l-purple-600 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style dangerouslySetInnerHTML={{
        __html: `
        @font-face {
            font-family: 'MilkywayDEMO';
            src: url('/assets/Fonts/Milkyway.ttf') format('truetype');
        }
      `}} />
    </section>
  );
}