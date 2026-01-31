import { Dice5, Flame, Trophy, Zap, DollarSign } from 'lucide-react';
import { Button } from './ui/button';
import { useLanguage } from '../contexts/LanguageContext';

export function CategoryCards() {
  const { t } = useLanguage();

  const categories = [
    {
      title: t('cat.casino'),
      subtitle: t('cat.casinoSub'),
      icon: Dice5,
      gradient: 'from-blue-600 to-purple-600',
      image: 'https://images.unsplash.com/photo-1618304925090-b68a8c744cbe?w=600'
    },
    {
      title: t('cat.slots'),
      subtitle: t('cat.slotsSub'),
      icon: Flame,
      gradient: 'from-orange-600 to-red-600',
      image: 'https://images.unsplash.com/photo-1655159428752-c700435e9983?w=600'
    },
    {
      title: t('cat.live'),
      subtitle: t('cat.liveSub'),
      icon: Trophy,
      gradient: 'from-green-600 to-teal-600',
      image: 'https://images.unsplash.com/photo-1633629544357-14223c9837d2?w=600'
    },
    {
      title: t('cat.sports'),
      subtitle: t('cat.sportsSub'),
      icon: Zap,
      gradient: 'from-yellow-600 to-orange-600',
      image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=600'
    },
    {
      title: t('cat.jackpot'),
      subtitle: t('cat.jackpotSub'),
      icon: DollarSign,
      gradient: 'from-pink-600 to-purple-600',
      image: 'https://images.unsplash.com/photo-1599579887642-9821ebe3c79a?w=600'
    },
  ];

  return (
    <section className="py-20 bg-[#0b0b1a] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase italic mb-4">
            Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Categories</span>
          </h2>
          <div className="h-1.5 w-24 bg-gradient-to-r from-purple-600 to-cyan-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div
                key={index}
                className="group relative rounded-[2rem] overflow-hidden bg-[#16162d] border border-white/5 hover:border-purple-500/50 transition-all duration-500 cursor-pointer shadow-2xl transform hover:-translate-y-3"
              >
                <div className="aspect-[3/4.5] relative overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-40 group-hover:opacity-60"
                  />

                  {/* Glass Content Overlay */}
                  <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between z-10">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-purple-500/20 group-hover:border-purple-500/40 transition-all duration-500 shadow-xl">
                      <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-white transition-all duration-500 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h3 className="font-black text-white text-xl sm:text-2xl mb-1 uppercase tracking-tight group-hover:text-purple-400 transition-colors uppercase">{category.title}</h3>
                        <p className="text-xs sm:text-sm text-white/40 font-bold uppercase tracking-widest">{category.subtitle}</p>
                      </div>

                      <div className="flex items-center gap-2 text-cyan-400 font-black text-xs uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                        <span>{t('cat.explore')}</span>
                        <span className="text-lg">→</span>
                      </div>
                    </div>
                  </div>

                  {/* Gradient to darken top/bottom */}
                  <div className="absolute inset-0 bg-gradient-to-b from-[#0b0b1a] via-transparent to-[#0b0b1a] opacity-80"></div>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/0 via-purple-500/5 to-purple-500/0 group-hover:opacity-100 transition-opacity duration-700"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}