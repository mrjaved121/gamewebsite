import { useLanguage } from '../contexts/LanguageContext';

export function SlotBanner() {
  const { t } = useLanguage();

  return (
    <div className="bg-gradient-to-r from-purple-900 via-pink-900 to-red-900 text-white py-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-neon-pulse">🎰 {t('slotGames.title')}</h1>
          <p className="text-lg text-purple-100 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            {t('slotGames.subtitle')}
          </p>
          <div className="mt-4 flex items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="bg-yellow-500 text-black px-4 py-2 rounded-lg font-bold animate-pulse-glow">
              💰 {t('slotGames.jackpotInfo')}
            </div>
          </div>
        </div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-10 text-4xl animate-float-coin" style={{ animationDelay: '0s' }}>🎰</div>
        <div className="absolute top-20 right-20 text-3xl animate-float-coin" style={{ animationDelay: '1s' }}>💎</div>
        <div className="absolute bottom-10 left-1/4 text-3xl animate-float-coin" style={{ animationDelay: '2s' }}>🍒</div>
        <div className="absolute top-1/3 right-1/3 text-2xl animate-float-coin" style={{ animationDelay: '1.5s' }}>⭐</div>
      </div>

      {/* Pulsing orbs */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-pink-500 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      </div>
    </div>
  );
}