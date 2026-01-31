import { Button } from './ui/button';
import { Trophy, TrendingUp } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function SportsSection() {
  const { t } = useLanguage();

  const matches = [
    {
      league: 'Premier League',
      homeTeam: 'Manchester United',
      awayTeam: 'Liverpool',
      homeOdds: '2.45',
      drawOdds: '3.20',
      awayOdds: '2.80',
      time: '20:00'
    },
    {
      league: 'La Liga',
      homeTeam: 'Real Madrid',
      awayTeam: 'Barcelona',
      homeOdds: '2.10',
      drawOdds: '3.40',
      awayOdds: '3.25',
      time: '21:00'
    },
    {
      league: 'Serie A',
      homeTeam: 'Juventus',
      awayTeam: 'AC Milan',
      homeOdds: '2.20',
      drawOdds: '3.10',
      awayOdds: '3.00',
      time: '19:45'
    },
    {
      league: 'Bundesliga',
      homeTeam: 'Bayern Munich',
      awayTeam: 'Borussia Dortmund',
      homeOdds: '1.85',
      drawOdds: '3.60',
      awayOdds: '4.20',
      time: '18:30'
    }
  ];

  return (
    <section className="py-20 bg-[#0b0b1a] relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-yellow-500/10 rounded-2xl flex items-center justify-center border border-yellow-500/20">
              <Trophy className="w-6 h-6 text-yellow-500" />
            </div>
            <div>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase italic">{t('sports.sectionTitle')}</h2>
              <p className="text-white/40 text-xs font-bold uppercase tracking-[0.2em] mt-1">Live Odds • Best Markets</p>
            </div>
          </div>
          <Button variant="ghost" className="text-white/60 hover:text-white uppercase tracking-widest text-xs font-black border border-white/5 hover:bg-white/5 px-8 py-3 rounded-2xl transition-all">
            {t('sports.allMatches')}
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {matches.map((match, index) => (
            <div
              key={index}
              className="bg-[#16162d] rounded-[2.5rem] p-6 sm:p-8 hover:bg-[#1a1a3a] transition-all duration-500 border border-white/5 hover:border-purple-500/50 shadow-2xl group"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">{match.league}</span>
                <div className="flex items-center gap-2 bg-red-600/10 text-red-500 text-[10px] font-black px-3 py-1 rounded-xl uppercase tracking-widest border border-red-600/20">
                  <div className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse"></div>
                  {t('live.live')}
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]"></div>
                      <span className="font-black text-white text-sm sm:text-base tracking-tight uppercase line-clamp-1">{match.homeTeam}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(34,211,238,0.8)]"></div>
                      <span className="font-black text-white text-sm sm:text-base tracking-tight uppercase line-clamp-1">{match.awayTeam}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: '1', odd: match.homeOdds },
                    { label: 'X', odd: match.drawOdds },
                    { label: '2', odd: match.awayOdds }
                  ].map((option, i) => (
                    <button key={i} className="flex flex-col items-center py-3 rounded-2xl bg-white/5 hover:bg-purple-600 border border-white/5 hover:border-purple-500 transition-all duration-300 group/btn">
                      <span className="text-[10px] font-black text-white/30 group-hover/btn:text-white/60 mb-1">{option.label}</span>
                      <span className="font-black text-white text-sm">{option.odd}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-white/5 text-center">
                <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">{t('sports.startTime')}: <span className="text-white/60">{match.time}</span></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}