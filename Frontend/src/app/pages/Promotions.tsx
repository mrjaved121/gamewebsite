import { useState } from 'react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { PromotionCard } from '../components/promotions/PromotionCard';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Home, Search, Gift } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface PromotionsProps {
  onNavigate?: (page: string) => void;
  onShowSignIn?: () => void;
  onShowSignUp?: () => void;
  onShowDeposit?: () => void;
  onShowMessages?: () => void;
}

export default function Promotions({ onNavigate, onShowSignIn, onShowSignUp, onShowDeposit, onShowMessages }: PromotionsProps) {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'TÜM PROMOSYONLAR', icon: '🎁' },
    { id: 'sports', label: 'SPOR BAHİSLERİ', icon: '⚽' },
    { id: 'casino', label: 'CASINO', icon: '🎰' },
    { id: 'livecasino', label: 'CANLI CASINO', icon: '🎲' },
    { id: 'slots', label: 'SLOT OYUNLAR', icon: '🎮' },
    { id: 'welcome', label: 'HOŞGELDİN', icon: '👋' },
  ];

  const promotions = [
    {
      category: 'Casino',
      title: 'İLK YATIRIM BONUSU',
      bonus: '10%',
      description: 'İlk yatırımınıza özel',
      image: 'https://images.unsplash.com/photo-1721731851423-45ab9e39e631?w=400',
      bgGradient: 'bg-gradient-to-br from-purple-600 via-purple-700 to-purple-900',
      categoryColor: 'bg-purple-500'
    },
    {
      category: 'Casino',
      title: 'KAYIP BONUSU',
      bonus: '25%',
      description: 'Haftanın kayıplarına',
      image: 'https://images.unsplash.com/photo-1602030827466-01491852b928?w=400',
      bgGradient: 'bg-gradient-to-br from-cyan-500 via-blue-600 to-blue-800',
      categoryColor: 'bg-cyan-500'
    },
    {
      category: 'Canlı Casino',
      title: 'GÜNLÜK BONUSLAR',
      bonus: '5%',
      description: 'Her gün kazanın',
      image: 'https://images.unsplash.com/photo-1721731851423-45ab9e39e631?w=400',
      bgGradient: 'bg-gradient-to-br from-purple-700 via-pink-600 to-purple-900',
      categoryColor: 'bg-pink-500'
    },
    {
      category: 'Spor',
      title: 'KAYIP BONUSU',
      bonus: '30%',
      description: 'Spor bahislerinize',
      image: 'https://images.unsplash.com/photo-1764152083021-1ef6dcd7feb4?w=400',
      bgGradient: 'bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800',
      categoryColor: 'bg-blue-500'
    },
    {
      category: 'Spor',
      title: 'HOŞGELDIN BONUSU',
      bonus: '20%',
      description: 'Yeni üyelere özel',
      image: 'https://images.unsplash.com/photo-1651482123980-fa4625df46cf?w=400',
      bgGradient: 'bg-gradient-to-br from-purple-600 via-purple-800 to-indigo-900',
      categoryColor: 'bg-purple-500'
    },
    {
      category: 'Casino',
      title: 'MEGA BONUS',
      bonus: '50%',
      description: 'Büyük kazançlar',
      image: 'https://images.unsplash.com/photo-1602030827466-01491852b928?w=400',
      bgGradient: 'bg-gradient-to-br from-orange-500 via-red-600 to-pink-700',
      categoryColor: 'bg-orange-500'
    },
    {
      category: 'Spor',
      title: 'HAFTALIK BONUS',
      bonus: '15%',
      description: 'Her hafta kazanın',
      image: 'https://images.unsplash.com/photo-1764152083021-1ef6dcd7feb4?w=400',
      bgGradient: 'bg-gradient-to-br from-teal-600 via-cyan-700 to-blue-800',
      categoryColor: 'bg-teal-500'
    },
    {
      category: 'Spor',
      title: 'DENEME BONUSU',
      bonus: '25%',
      description: 'İlk bahsinize özel',
      image: 'https://images.unsplash.com/photo-1651482123980-fa4625df46cf?w=400',
      bgGradient: 'bg-gradient-to-br from-purple-500 via-pink-600 to-red-600',
      categoryColor: 'bg-purple-500'
    },
    {
      category: 'Spor',
      title: 'KAYIP BONUSU',
      bonus: '20%',
      description: 'Kayıplarınız geri',
      image: 'https://images.unsplash.com/photo-1764152083021-1ef6dcd7feb4?w=400',
      bgGradient: 'bg-gradient-to-br from-blue-700 via-indigo-800 to-purple-900',
      categoryColor: 'bg-blue-600'
    },
    {
      category: 'Spor',
      title: 'YATIRIM BONUSU',
      bonus: '20%',
      description: 'Anında kazanın',
      image: 'https://images.unsplash.com/photo-1651482123980-fa4625df46cf?w=400',
      bgGradient: 'bg-gradient-to-br from-cyan-600 via-blue-700 to-indigo-800',
      categoryColor: 'bg-cyan-500'
    },
    {
      category: 'Spor',
      title: 'KAYIP BONUSU',
      bonus: '100%',
      description: 'Maksimum geri ödeme',
      image: 'https://images.unsplash.com/photo-1764152083021-1ef6dcd7feb4?w=400',
      bgGradient: 'bg-gradient-to-br from-pink-600 via-purple-700 to-indigo-800',
      categoryColor: 'bg-pink-500'
    },
    {
      category: 'Spor',
      title: 'COMBO BONUS',
      bonus: '100%',
      description: 'Çoklu bahislere',
      image: 'https://images.unsplash.com/photo-1651482123980-fa4625df46cf?w=400',
      bgGradient: 'bg-gradient-to-br from-green-600 via-teal-700 to-cyan-800',
      categoryColor: 'bg-green-500'
    },
    {
      category: 'Casino',
      title: 'YATIRIM BONUSU',
      bonus: '25%',
      description: 'Casino oyunlarına',
      image: 'https://images.unsplash.com/photo-1721731851423-45ab9e39e631?w=400',
      bgGradient: 'bg-gradient-to-br from-purple-600 via-pink-600 to-red-600',
      categoryColor: 'bg-purple-500'
    },
    {
      category: 'Casino',
      title: 'SÜPER BONUS',
      bonus: '500₺',
      description: 'Sabit bonus',
      image: 'https://images.unsplash.com/photo-1602030827466-01491852b928?w=400',
      bgGradient: 'bg-gradient-to-br from-indigo-600 via-purple-700 to-pink-800',
      categoryColor: 'bg-indigo-500'
    },
    {
      category: 'Casino',
      title: 'KAYIP BONUSU',
      bonus: '100%',
      description: 'Tüm kayıplarınız',
      image: 'https://images.unsplash.com/photo-1721731851423-45ab9e39e631?w=400',
      bgGradient: 'bg-gradient-to-br from-red-600 via-pink-600 to-purple-700',
      categoryColor: 'bg-red-500'
    },
    {
      category: 'Hoşgeldin',
      title: 'İLK YATIRIM',
      bonus: '1.000.000₺',
      description: 'Dev hoşgeldin bonusu',
      image: 'https://images.unsplash.com/photo-1651482123980-fa4625df46cf?w=400',
      bgGradient: 'bg-gradient-to-br from-yellow-500 via-orange-600 to-red-700',
      categoryColor: 'bg-yellow-500'
    },
    {
      category: 'Casino',
      title: 'ŞANS BONUSU',
      bonus: '100₺',
      description: 'Ücretsiz bonus',
      image: 'https://images.unsplash.com/photo-1602030827466-01491852b928?w=400',
      bgGradient: 'bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800',
      categoryColor: 'bg-purple-500'
    },
    {
      category: 'Hoşgeldin',
      title: 'FREESPIN',
      bonus: '250',
      description: 'Bedava çevirme',
      image: 'https://images.unsplash.com/photo-1721731851423-45ab9e39e631?w=400',
      bgGradient: 'bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-700',
      categoryColor: 'bg-cyan-500'
    },
    {
      category: 'Casino',
      title: 'EXPRESS BONUS',
      bonus: 'HEMEN KAZANIN',
      description: 'Anında bonus',
      image: 'https://images.unsplash.com/photo-1602030827466-01491852b928?w=400',
      bgGradient: 'bg-gradient-to-br from-green-600 via-emerald-700 to-teal-800',
      categoryColor: 'bg-green-500'
    },
    {
      category: 'Spor',
      title: 'RAMAZAN ÖZEL',
      bonus: '250₺',
      description: 'Özel kampanya',
      image: 'https://images.unsplash.com/photo-1764152083021-1ef6dcd7feb4?w=400',
      bgGradient: 'bg-gradient-to-br from-purple-600 via-pink-600 to-red-600',
      categoryColor: 'bg-purple-500'
    },
    {
      category: 'Hoşgeldin',
      title: 'HIZLI KAYIT',
      bonus: '500₺',
      description: 'Hemen başla',
      image: 'https://images.unsplash.com/photo-1651482123980-fa4625df46cf?w=400',
      bgGradient: 'bg-gradient-to-br from-red-600 via-pink-600 to-purple-700',
      categoryColor: 'bg-red-500'
    },
    {
      category: 'Hoşgeldin',
      title: 'ÖZEL BONUS',
      bonus: '30-20',
      description: 'Yüksek kazanç',
      image: 'https://images.unsplash.com/photo-1602030827466-01491852b928?w=400',
      bgGradient: 'bg-gradient-to-br from-purple-700 via-indigo-700 to-blue-800',
      categoryColor: 'bg-purple-600'
    },
  ];

  const filteredPromotions = promotions.filter(promo => {
    const matchesCategory = activeCategory === 'all' || 
      promo.category.toLowerCase().includes(activeCategory) ||
      (activeCategory === 'welcome' && promo.category.toLowerCase().includes('hoşgeldin'));
    
    const matchesSearch = 
      promo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      promo.category.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation 
        onNavigate={onNavigate} 
        onShowSignIn={onShowSignIn} 
        onShowSignUp={onShowSignUp}
        onShowDeposit={onShowDeposit}
        onShowMessages={onShowMessages}
      />

      {/* Promotions Banner */}
      <div className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white py-8 sm:py-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center animate-fade-in-up">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4 animate-neon-pulse">🎁 {t('promotions.title')}</h1>
            <p className="text-sm sm:text-base md:text-lg text-white/90 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              {t('promotions.subtitle')}
            </p>
          </div>
        </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-10 left-10 text-2xl sm:text-3xl md:text-4xl animate-float-coin" style={{ animationDelay: '0s' }}>🎁</div>
          <div className="absolute top-20 right-20 text-xl sm:text-2xl md:text-3xl animate-float-coin" style={{ animationDelay: '1s' }}>💰</div>
          <div className="absolute bottom-10 left-1/4 text-xl sm:text-2xl md:text-3xl animate-float-coin" style={{ animationDelay: '2s' }}>🎉</div>
          <div className="absolute top-1/3 right-1/3 text-lg sm:text-xl md:text-2xl animate-float-coin" style={{ animationDelay: '1.5s' }}>💎</div>
        </div>

        {/* Pulsing orbs */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-24 h-24 sm:w-32 sm:h-32 bg-white rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 sm:w-40 sm:h-40 bg-yellow-300 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        </div>
      </div>

      {/* Back to Home & Categories */}
      <div className="bg-white border-b border-gray-200 sticky top-[120px] z-40">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back to Home */}
          <div className="py-2 sm:py-3 border-b border-gray-200">
            <button
              onClick={() => onNavigate?.('home')}
              className="flex items-center gap-2 text-purple-700 hover:text-purple-900 font-medium transition-colors text-xs sm:text-sm"
            >
              <Home className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>{t('slot.home')}</span>
            </button>
          </div>

          {/* Category Filters */}
          <div className="py-3 sm:py-4 overflow-x-auto">
            <div className="flex gap-1.5 sm:gap-2 min-w-max">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center gap-1 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full font-medium text-[10px] sm:text-xs md:text-sm transition-all whitespace-nowrap ${
                    activeCategory === category.id
                      ? 'bg-purple-700 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span className="text-sm sm:text-base">{category.icon}</span>
                  <span>{category.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        {/* Search Bar */}
        <div className="mb-6 sm:mb-8 animate-scale-in">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
            <input
              type="text"
              placeholder={t('promotions.search')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Promotions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6 animate-fade-in-up">
          {filteredPromotions.map((promo, index) => (
            <div key={index} className="animate-scale-in" style={{ animationDelay: `${index * 0.05}s` }}>
              <PromotionCard
                {...promo}
                onDetails={() => alert(`Details for: ${promo.title}`)}
              />
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}