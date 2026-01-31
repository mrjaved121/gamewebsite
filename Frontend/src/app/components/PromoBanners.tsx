import { ImageWithFallback } from './figma/ImageWithFallback';
import { Gift, Percent, Star, Zap } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function PromoBanners() {
  const { t } = useLanguage();

  const promos = [
    {
      title: t('promo.welcome'),
      description: t('promo.welcomeDesc'),
      amount: '10,000 TRY',
      icon: Gift,
      gradient: 'from-purple-600 to-pink-600',
      image: 'https://images.unsplash.com/photo-1655159428752-c700435e9983?w=600'
    },
    {
      title: t('promo.cashback'),
      description: t('promo.cashbackDesc'),
      amount: '5,000 TRY',
      icon: Percent,
      gradient: 'from-blue-600 to-cyan-600',
      image: 'https://images.unsplash.com/photo-1599579887642-9821ebe3c79a?w=600'
    },
    {
      title: t('promo.vip'),
      description: t('promo.vipDesc'),
      amount: '50,000 TRY',
      icon: Star,
      gradient: 'from-yellow-600 to-orange-600',
      image: 'https://images.unsplash.com/photo-1566563255308-753861417000?w=600'
    },
    {
      title: t('promo.daily'),
      description: t('promo.dailyDesc'),
      amount: '100,000 TRY',
      icon: Zap,
      gradient: 'from-green-600 to-emerald-600',
      image: 'https://images.unsplash.com/photo-1732998340351-b44984f30508?w=600'
    }
  ];

  return (
    <section className="py-20 bg-[#0b0b1a] relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
          <div className="space-y-1">
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase italic">{t('promo.title')}</h2>
            <div className="h-1.5 w-32 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-full"></div>
          </div>
          <button className="text-white/40 hover:text-white uppercase tracking-widest text-xs font-black transition-colors">
            {t('promo.viewAll')}
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {promos.map((promo, index) => {
            const Icon = promo.icon;
            return (
              <div
                key={index}
                className="group relative rounded-[2.5rem] overflow-hidden bg-[#16162d] border border-white/5 hover:border-purple-500/50 transition-all duration-500 cursor-pointer shadow-2xl transform hover:-translate-y-2"
              >
                <div className="aspect-[4/5] relative overflow-hidden">
                  <img
                    src={promo.image}
                    alt={promo.title}
                    className="w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${promo.gradient} mix-blend-multiply opacity-60`}></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b1a] via-[#0b0b1a]/40 to-transparent opacity-90"></div>

                  {/* Content */}
                  <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between z-10">
                    <div className="flex justify-between items-start">
                      <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-xl">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h3 className="font-black text-white text-xl sm:text-2xl tracking-tight mb-2 uppercase italic">{promo.title}</h3>
                        <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest line-clamp-2 leading-relaxed">{promo.description}</p>
                      </div>
                      <div className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40 tracking-tighter italic">
                        {promo.amount.split(' ')[0]}<span className="text-sm ml-1 text-white/40 uppercase tracking-widest italic">{promo.amount.split(' ')[1]}</span>
                      </div>

                      <div className="w-full h-12 rounded-2xl bg-white/5 group-hover:bg-white text-white group-hover:text-black font-black uppercase text-[10px] tracking-widest border border-white/10 group-hover:border-white transition-all duration-500 flex items-center justify-center">
                        {t('promo.seeDetails')}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Reflection effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}