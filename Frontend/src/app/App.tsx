import { useState, useEffect } from 'react';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { paymentAPI } from '../lib/api/payment.api';
import { Navigation } from './components/Navigation';
import { HeroSlider } from './components/HeroSlider';
import { PartnersSection } from './components/PartnersSection';
import { GamesSection } from './components/GamesSection';
import { SportsSection } from './components/SportsSection';
import { CategoryCards } from './components/CategoryCards';
import { PromoBanners } from './components/PromoBanners';
import { Footer } from './components/Footer';
import { FeaturedGamesCarousel } from './components/FeaturedGamesCarousel';
import { LiveCasinoSection } from './components/LiveCasinoSection';
import SlotGames from './pages/SlotGames';
import Sports from './pages/Sports';
import LiveCasino from './pages/LiveCasino';
import TVGames from './pages/TVGames';
import Promotions from './pages/Promotions';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import { MyProfilePage } from './pages/MyProfilePage';
import SweetBonanzaClassic from './pages/SweetBonanzaClassic';
import { AdminPanel } from './pages/AdminPanel';

function AppContent() {
  const [currentPage, setCurrentPage] = useState<'home' | 'slots' | 'sports' | 'livecasino' | 'tvgames' | 'promotions' | 'sweet-bonanza-classic'>('home');
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [profileTab, setProfileTab] = useState('personal-details');
  const [showAdmin, setShowAdmin] = useState(false);
  const [hasNotification, setHasNotification] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const checkNotifications = async () => {
      try {
        const savedUser = localStorage.getItem('user');
        const user = savedUser ? JSON.parse(savedUser) : null;
        if (!user) return;

        const isAdmin = user?.role === 'admin' || user?.username === 'admin';

        const response = isAdmin
          ? await paymentAPI.getAllRequests()
          : await paymentAPI.getDepositRequests();

        const data = response.data?.depositRequests || response.data?.deposits || response.data || [];

        let needsAction = false;
        if (isAdmin) {
          needsAction = data.some((r: any) =>
            r.status.toUpperCase() === 'PAYMENT_SUBMITTED' ||
            r.status.toUpperCase() === 'PENDING'
          );
        } else {
          needsAction = data.some((r: any) => r.status.toUpperCase() === 'WAITING_FOR_PAYMENT');
        }

        setHasNotification(!!needsAction);
      } catch (e) { }
    };
    checkNotifications();
    const interval = setInterval(checkNotifications, 15000);
    return () => clearInterval(interval);
  }, []);

  const handleNavigation = (page: string) => {
    if (page === 'profile') {
      setShowProfile(true);
      setProfileTab('personal-details');
      return;
    }
    setCurrentPage(page as any);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShowSignIn = () => setShowSignIn(true);
  const handleShowSignUp = () => setShowSignUp(true);

  const handleShowDeposit = () => {
    setProfileTab('deposit');
    setShowProfile(true);
  };
  const handleShowWithdraw = () => {
    setProfileTab('withdraw');
    setShowProfile(true);
  };
  const handleShowTransactionHistory = () => {
    setProfileTab('transaction-history');
    setShowProfile(true);
  };

  const handleShowMessages = () => {
    alert('Messages feature coming soon!');
  };

  const renderModals = () => (
    <>
      {showSignIn && (
        <SignIn
          onClose={() => setShowSignIn(false)}
          onSwitchToSignUp={() => {
            setShowSignIn(false);
            setShowSignUp(true);
          }}
          onNavigate={handleNavigation}
        />
      )}
      {showSignUp && (
        <SignUp
          onClose={() => setShowSignUp(false)}
          onSwitchToSignIn={() => {
            setShowSignUp(false);
            setShowSignIn(true);
          }}
          onNavigate={handleNavigation}
        />
      )}
      {showProfile && (
        <MyProfilePage
          onClose={() => setShowProfile(false)}
          initialTab={profileTab}
        />
      )}
    </>
  );

  // Promotions Page
  if (currentPage === 'promotions') {
    return (
      <>
        <Promotions
          onNavigate={handleNavigation}
          onShowSignIn={handleShowSignIn}
          onShowSignUp={handleShowSignUp}
          onShowDeposit={handleShowDeposit}
          onShowMessages={handleShowMessages}
        />
        {renderModals()}
      </>
    );
  }

  // TV Games Page
  if (currentPage === 'tvgames') {
    return (
      <>
        <TVGames
          onNavigate={handleNavigation}
          onShowSignIn={handleShowSignIn}
          onShowSignUp={handleShowSignUp}
          onShowDeposit={handleShowDeposit}
          onShowMessages={handleShowMessages}
        />
        {renderModals()}
      </>
    );
  }

  // Live Casino Page
  if (currentPage === 'livecasino') {
    return (
      <>
        <LiveCasino
          onNavigate={handleNavigation}
          onShowSignIn={handleShowSignIn}
          onShowSignUp={handleShowSignUp}
          onShowDeposit={handleShowDeposit}
          onShowMessages={handleShowMessages}
        />
        {renderModals()}
      </>
    );
  }

  // Sports Page
  if (currentPage === 'sports') {
    return (
      <>
        <Sports
          onNavigate={handleNavigation}
          onShowSignIn={handleShowSignIn}
          onShowSignUp={handleShowSignUp}
          onShowDeposit={handleShowDeposit}
          onShowMessages={handleShowMessages}
        />
        {renderModals()}
      </>
    );
  }

  // Slot Games Page
  if (currentPage === 'slots') {
    return (
      <>
        <SlotGames
          onNavigate={handleNavigation}
          onShowSignIn={handleShowSignIn}
          onShowSignUp={handleShowSignUp}
          onShowDeposit={handleShowDeposit}
          onShowMessages={handleShowMessages}
        />
        {renderModals()}
      </>
    );
  }



  // Sweet Bonanza Classic Game Page
  if (currentPage === 'sweet-bonanza-classic') {
    return (
      <>
        <SweetBonanzaClassic onNavigate={handleNavigation} onShowSignIn={handleShowSignIn} />
        {renderModals()}
      </>
    );
  }
  // Home Page
  return (
    <>
      <div className="min-h-screen bg-background text-foreground transition-colors duration-500">
        <Navigation
          onNavigate={handleNavigation}
          onShowSignIn={handleShowSignIn}
          onShowSignUp={handleShowSignUp}
          onShowDeposit={handleShowDeposit}
          onShowMessages={handleShowMessages}
          onShowAdmin={() => setShowAdmin(true)}
          hasNotification={hasNotification}
        />
        {showAdmin && <AdminPanel onClose={() => setShowAdmin(false)} />}
        <HeroSlider />
        <PartnersSection />
        <FeaturedGamesCarousel onNavigate={handleNavigation} />
        <GamesSection onNavigate={handleNavigation} />
        <CategoryCards />
        <LiveCasinoSection />
        <SportsSection />
        <PromoBanners />
        <Footer />
      </div>
      {renderModals()}
    </>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}