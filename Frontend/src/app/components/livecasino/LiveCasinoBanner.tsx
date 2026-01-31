import { useLanguage } from '../../contexts/LanguageContext';

export function LiveCasinoBanner() {
  const { t } = useLanguage();

  return (
    <div className="bg-gradient-to-r from-red-900 via-purple-900 to-blue-900 text-white py-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-neon-pulse">{t('liveCasino.title')}</h1>
          <p className="text-lg text-purple-100 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            {t('liveCasino.subtitle')}
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 animate-pulse-glow">
            <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
            <span className="font-bold text-red-400">{t('liveCasino.liveDealers')}</span>
          </div>
        </div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-10 text-4xl animate-float-coin" style={{ animationDelay: '0s' }}>🎰</div>
        <div className="absolute top-20 right-20 text-3xl animate-float-coin" style={{ animationDelay: '1s' }}>🃏</div>
        <div className="absolute bottom-10 left-1/4 text-3xl animate-float-coin" style={{ animationDelay: '2s' }}>🎲</div>
        <div className="absolute top-1/3 right-1/3 text-2xl animate-float-coin" style={{ animationDelay: '1.5s' }}>💎</div>
      </div>

      {/* Pulsing orbs */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-pink-500 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      </div>
    </div>
  );
}