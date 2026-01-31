import { Button } from './ui/button';
import { Users } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function LiveCasinoSection() {
  const { t } = useLanguage();

  const liveTables = [
    {
      title: 'Blackjack VIP',
      dealer: 'Emily',
      players: 6,
      minBet: '₺100',
      maxBet: '₺50,000',
      image: 'https://images.unsplash.com/photo-1618304925090-b68a8c744cbe?w=600',
      isVIP: true
    },
    {
      title: 'Roulette Turkish',
      dealer: 'Ayşe',
      players: 12,
      minBet: '₺50',
      maxBet: '₺25,000',
      image: 'https://images.unsplash.com/photo-1659382151328-30c3df37a69a?w=600',
      isVIP: false
    },
    {
      title: 'Baccarat Grand',
      dealer: 'Maria',
      players: 8,
      minBet: '₺200',
      maxBet: '₺100,000',
      image: 'https://images.unsplash.com/photo-1599579887642-9821ebe3c79a?w=600',
      isVIP: true
    },
    {
      title: 'Poker Live',
      dealer: 'Alex',
      players: 5,
      minBet: '₺75',
      maxBet: '₺30,000',
      image: 'https://images.unsplash.com/photo-1719228159232-48608b807a58?w=600',
      isVIP: false
    }
  ];

  return (
    <section className="py-20 bg-[#0b0b1a] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
          <div className="flex items-center gap-4">
            <div className="relative flex items-center justify-center">
              <div className="w-12 h-12 bg-red-600/10 rounded-2xl flex items-center justify-center border border-red-600/20">
                <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse shadow-[0_0_10px_rgba(220,38,38,0.8)]"></div>
              </div>
              <div className="w-12 h-12 bg-red-600/10 rounded-2xl animate-ping absolute top-0 left-0"></div>
            </div>
            <div>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase italic">{t('live.title')}</h2>
              <p className="text-white/40 text-xs font-bold uppercase tracking-[0.2em] mt-1">Real Dealers • Live Action</p>
            </div>
          </div>
          <Button variant="ghost" className="text-white/60 hover:text-white uppercase tracking-widest text-xs font-black border border-white/5 hover:bg-white/5 px-8 py-3 rounded-2xl transition-all">
            {t('live.allTables')}
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
          {liveTables.map((table, index) => (
            <div
              key={index}
              className="group relative rounded-[2.5rem] overflow-hidden bg-[#16162d] border border-white/5 hover:border-red-500/50 transition-all duration-500 cursor-pointer shadow-2xl transform hover:-translate-y-2"
            >
              <div className="aspect-[3/4] relative overflow-hidden">
                <img
                  src={table.image}
                  alt={table.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60"
                />

                {/* Status Badges */}
                <div className="absolute top-6 left-6 flex flex-col gap-2">
                  <div className="flex items-center gap-2 bg-red-600 text-white text-[10px] font-black px-3 py-1.5 rounded-xl uppercase tracking-wider shadow-lg">
                    <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                    {t('live.live')}
                  </div>
                  {table.isVIP && (
                    <div className="bg-yellow-500 text-black text-[10px] font-black px-3 py-1.5 rounded-xl uppercase tracking-wider shadow-lg text-center">
                      {t('live.vip')}
                    </div>
                  )}
                </div>

                <div className="absolute top-6 right-6 flex items-center gap-2 bg-black/40 backdrop-blur-md border border-white/10 text-white text-[10px] font-black px-3 py-1.5 rounded-xl uppercase tracking-widest">
                  <Users className="w-3 h-3 text-red-500" />
                  <span>{table.players} Online</span>
                </div>

                {/* Content */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b1a] via-transparent to-transparent opacity-90 group-hover:opacity-60 transition-opacity"></div>

                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 space-y-4">
                  <div className="space-y-1">
                    <h3 className="font-black text-white text-xl sm:text-2xl tracking-tight group-hover:text-red-400 transition-colors uppercase italic">{table.title}</h3>
                    <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em]">{t('live.dealer')}: <span className="text-white/80">{table.dealer}</span></p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-md">
                      <p className="text-[9px] font-bold text-white/30 uppercase tracking-[0.1em] mb-1">{t('live.minBet')}</p>
                      <p className="text-white font-black text-xs sm:text-sm">{table.minBet}</p>
                    </div>
                    <div className="p-3 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-md">
                      <p className="text-[9px] font-bold text-white/30 uppercase tracking-[0.1em] mb-1">{t('live.maxBet')}</p>
                      <p className="text-red-400 font-black text-xs sm:text-sm">{table.maxBet}</p>
                    </div>
                  </div>

                  <div className="w-full h-12 rounded-2xl bg-white/10 group-hover:bg-red-600 transition-all duration-500 flex items-center justify-center text-white font-black uppercase text-xs tracking-widest border border-white/10 group-hover:border-red-500 group-hover:shadow-[0_0_20px_rgba(220,38,38,0.4)]">
                    {t('live.joinTable')}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}