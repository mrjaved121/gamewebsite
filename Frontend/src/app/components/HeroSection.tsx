import { Button } from './ui/button';
import { useLanguage } from '../contexts/LanguageContext';
import heroImage from 'figma:asset/fe199ed542e5735ac24eaebf320a67084dabb858.png';

export function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="relative bg-gradient-to-r from-purple-900 via-purple-800 to-purple-900 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 items-center py-8 sm:py-12 md:py-16">
          {/* Left Content */}
          <div className="space-y-4 sm:space-y-6 z-10 text-center md:text-left animate-fade-in-up">
            <div className="inline-block bg-red-600 text-white px-3 py-1 rounded text-xs sm:text-sm font-bold animate-pulse-glow">
              {t('hero.new')}
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight animate-slide-in-left">
              {t('hero.title')}<br />
              {t('hero.subtitle')}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-purple-100 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              {t('hero.description')}
            </p>
            <p className="text-sm sm:text-base text-purple-200 max-w-md mx-auto md:mx-0 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              {t('hero.legal')}
            </p>
            <Button className="bg-pink-600 hover:bg-pink-700 text-white px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg rounded-full animate-bounce-subtle hover:scale-110 transition-transform duration-300">
              {t('hero.details')}
            </Button>
          </div>

          {/* Right Image */}
          <div className="relative hidden md:block animate-fade-in-right">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl hover:shadow-purple-500/50 transition-all duration-500 hover:scale-105 animate-float">
              <img 
                src={heroImage} 
                alt="Casino Dealer with Cards" 
                className="w-full h-auto object-cover aspect-[4/5]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/40 via-transparent to-transparent"></div>
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shine"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements with Animation */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 w-24 h-24 sm:w-32 sm:h-32 bg-white rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 sm:w-40 sm:h-40 bg-pink-500 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-purple-400 rounded-full blur-2xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Floating coins animation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 text-4xl animate-float-coin" style={{ animationDelay: '0s' }}>💰</div>
        <div className="absolute top-40 right-20 text-3xl animate-float-coin" style={{ animationDelay: '1s' }}>🎰</div>
        <div className="absolute bottom-32 left-1/4 text-3xl animate-float-coin" style={{ animationDelay: '2s' }}>🎲</div>
        <div className="absolute top-1/3 right-1/3 text-2xl animate-float-coin" style={{ animationDelay: '1.5s' }}>💎</div>
      </div>
    </section>
  );
}