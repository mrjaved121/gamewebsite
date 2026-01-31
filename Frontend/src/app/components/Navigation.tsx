import { Search, User, Menu, Globe, ChevronDown, Tv, Trophy, Grid3x3, Flame, Zap, Ticket, MonitorPlay, Gift, MoreHorizontal, Bell, MessageSquare, Coins, Settings } from 'lucide-react';
import { Button } from './ui/button';
import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface NavigationProps {
  onNavigate?: (page: string) => void;
  onShowSignIn?: () => void;
  onShowSignUp?: () => void;
  onShowDeposit?: () => void;
  onShowMessages?: () => void;
  onShowAdmin?: () => void;
  onShowProfile?: () => void;
  onLogout?: () => void;
  hasNotification?: boolean;
}

export function Navigation({ onNavigate, onShowSignIn, onShowSignUp, onShowDeposit, onShowMessages, onShowAdmin, onShowProfile, onLogout, hasNotification }: NavigationProps = {}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  // Admin check
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const checkUser = () => {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      } else {
        setUser(null);
      }
    };

    checkUser();

    // Listen for custom "userUpdated" events (same tab)
    const handleUserUpdate = (e: any) => {
      const data = e.detail;
      if (data) {
        console.log('[NAV] Receiving user update event:', data);
        setUser((prev: any) => {
          // Handle various payload structures: { user: {...}, token: ... } vs { ...userFields }
          const incomingUser = data.user || data;

          // Merge safely
          const updated = {
            ...prev,
            ...incomingUser,
            // Ensure balance is taken from the top level if it exists there (often sent as { balance: 123 })
            balance: data.balance !== undefined ? data.balance : (incomingUser.balance ?? prev?.balance)
          };

          // Persist the CLEANED combined object
          localStorage.setItem('user', JSON.stringify(updated));
          return updated;
        });
      }
    };

    // Listen for storage changes (for other tabs)
    window.addEventListener('storage', checkUser);
    window.addEventListener('userUpdated', handleUserUpdate as any);

    return () => {
      window.removeEventListener('storage', checkUser);
      window.removeEventListener('userUpdated', handleUserUpdate as any);
    };
  }, []);

  const isAdmin = user?.role === 'admin' || user?.username === 'admin';

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    if (onLogout) onLogout();
    handleNavClick('home');
  };

  const handleNavClick = (page: string) => {
    if (onNavigate) {
      onNavigate(page);
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'tr' : 'en');
  };

  // Get current time
  const currentTime = new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-white/5 shadow-2xl">
      {/* Top Header Bar */}
      <div className="border-b border-white/5 bg-white/5 backdrop-blur-md">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12 sm:h-14">
            {/* Left Side - Logo & Special Buttons */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Logo */}
              <button
                onClick={() => handleNavClick('home')}
                className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 hover:scale-105 transition-all mr-4 drop-shadow-[0_0_10px_rgba(168,85,247,0.4)]"
              >
                GARBET
              </button>

              {/* Special Buttons */}
              <button className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-cyan-500 hover:bg-cyan-600 text-white rounded-md text-xs font-bold transition-colors">
                <Tv className="w-3.5 h-3.5" />
                <span>GARBET TV</span>
              </button>
              <button className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-cyan-500 hover:bg-cyan-600 text-white rounded-md text-xs font-bold transition-colors">
                <Trophy className="w-3.5 h-3.5" />
                <span>YONCA YILDIZ</span>
              </button>
            </div>

            {/* Right Side - Action Buttons */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* Deposit Button */}
              <button
                onClick={onShowDeposit}
                className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-4 py-1.5 sm:py-2 bg-green-500 hover:bg-green-600 text-white rounded-md text-[10px] sm:text-xs font-bold transition-colors"
              >
                <Coins className="w-3.5 h-3.5" />
                <span className="hidden md:inline">DEPOSIT</span>
                <span className="md:hidden">₺</span>
              </button>

              {/* Bonuses Button */}
              <button
                onClick={() => handleNavClick('promotions')}
                className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-4 py-1.5 sm:py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-md text-[10px] sm:text-xs font-bold transition-colors"
              >
                <Gift className="w-3.5 h-3.5" />
                <span className="hidden md:inline">BONUSES</span>
                <span className="md:hidden">🎁</span>
              </button>

              {/* Messages Button */}
              <button
                onClick={onShowMessages}
                className="hidden md:flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-md text-xs font-bold transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>MESSAGES</span>
              </button>

              {/* Auth Buttons / User Info */}
              {!user ? (
                <>
                  {/* Sign In Button */}
                  <Button
                    onClick={onShowSignIn}
                    className="hidden sm:flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-md text-xs font-bold h-auto"
                  >
                    <span>SIGN IN</span>
                  </Button>

                  {/* Register Button */}
                  <Button
                    onClick={onShowSignUp}
                    className="hidden sm:flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-md text-xs font-bold h-auto"
                  >
                    <span>REGISTER</span>
                  </Button>
                </>
              ) : (
                <div className="flex items-center gap-2">
                  <div className="hidden sm:flex flex-col items-end mr-1">
                    <span className="text-[10px] font-bold text-gray-400 uppercase leading-none">Balance</span>
                    <span className="text-sm font-black text-purple-700 leading-tight">₺ {user.balance?.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</span>
                  </div>

                  <button
                    onClick={() => handleNavClick('profile')}
                    className="p-1.5 bg-white/10 hover:bg-white/20 rounded-lg transition-all group border border-white/10"
                  >
                    <User className="w-5 h-5 text-white/70 group-hover:text-cyan-400" />
                  </button>

                  <button
                    onClick={handleLogout}
                    className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-red-500/20 text-white/70 hover:text-red-400 rounded-md text-xs font-bold transition-all border border-white/10 hover:border-red-500/30"
                  >
                    <span>LOGOUT</span>
                  </button>
                </div>
              )}

              {/* Admin Panel Button */}
              {isAdmin && (
                <Button
                  onClick={onShowAdmin}
                  className="hidden sm:flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-xs font-black italic tracking-wider h-auto shadow-lg shadow-red-600/30 border border-red-500"
                >
                  <Settings className="w-3.5 h-3.5" />
                  <span>ADMIN</span>
                </Button>
              )}

              {/* Language & Time */}
              <div className="hidden lg:flex items-center gap-2 ml-2">
                <button
                  onClick={toggleLanguage}
                  className="flex items-center gap-1 px-2 py-1 hover:bg-gray-100 rounded text-xs font-medium text-gray-700"
                >
                  <span className="text-xs">{language.toUpperCase()}</span>
                  <ChevronDown className="w-3 h-3" />
                </button>
                <span className="text-xs text-gray-600 font-medium">{currentTime}</span>
                <button className="relative p-1 hover:bg-gray-100 rounded" onClick={onShowDeposit}>
                  <Bell className="w-4 h-4 text-gray-600" />
                  {hasNotification && <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full animate-bounce"></span>}
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <Menu className="w-5 h-5 text-gray-700" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="bg-gradient-to-r from-[#0d0d21] via-[#1a1a3a] to-[#0d0d21] border-b border-white/5">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12">
            {/* Navigation Links */}
            <div className="hidden lg:flex items-center gap-1">
              <button
                onClick={() => handleNavClick('sports')}
                className="flex items-center gap-2 px-4 py-2 text-white hover:bg-white/10 rounded-md text-sm font-semibold transition-colors"
              >
                <Flame className="w-4 h-4" />
                <span>LIVE BET</span>
              </button>
              <button
                onClick={() => handleNavClick('sports')}
                className="flex items-center gap-2 px-4 py-2 text-white hover:bg-white/10 rounded-md text-sm font-semibold transition-colors"
              >
                <Trophy className="w-4 h-4" />
                <span>SPORTS</span>
              </button>
              <button
                onClick={() => handleNavClick('slots')}
                className="flex items-center gap-2 px-4 py-2 text-white hover:bg-white/10 rounded-md text-sm font-semibold transition-colors"
              >
                <Grid3x3 className="w-4 h-4" />
                <span>SLOT GAMES</span>
              </button>
              <button
                onClick={() => handleNavClick('livecasino')}
                className="flex items-center gap-2 px-4 py-2 text-white hover:bg-white/10 rounded-md text-sm font-semibold transition-colors"
              >
                <Flame className="w-4 h-4" />
                <span>LIVE CASINO</span>
              </button>
              <button
                onClick={() => handleNavClick('home')}
                className="flex items-center gap-2 px-4 py-2 text-white hover:bg-white/10 rounded-md text-sm font-semibold transition-colors"
              >
                <Zap className="w-4 h-4" />
                <span>AVI / ZEPPELIN</span>
              </button>
              <button
                onClick={() => handleNavClick('home')}
                className="flex items-center gap-2 px-4 py-2 text-white hover:bg-white/10 rounded-md text-sm font-semibold transition-colors"
              >
                <Ticket className="w-4 h-4" />
                <span>BILET ÇEKILIŞI</span>
              </button>
              <button
                onClick={() => handleNavClick('tvgames')}
                className="flex items-center gap-2 px-4 py-2 text-white hover:bg-white/10 rounded-md text-sm font-semibold transition-colors"
              >
                <MonitorPlay className="w-4 h-4" />
                <span>TV GAMES</span>
              </button>
              <button
                onClick={() => handleNavClick('promotions')}
                className="flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 rounded-md text-sm font-semibold transition-colors shadow-lg text-white"
              >
                <Gift className="w-4 h-4" />
                <span>PROMOTIONS</span>
              </button>
              <button
                onClick={() => handleNavClick('promotions')}
                className="flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 rounded-md text-sm font-semibold transition-colors shadow-lg text-white"
              >
                <Gift className="w-4 h-4" />
                <span>PROMOTIONS</span>
              </button>
            </div>

            {/* More Button */}
            <button className="hidden lg:flex items-center gap-2 px-4 py-2 text-white hover:bg-white/10 rounded-md text-sm font-semibold transition-colors ml-auto">
              <Grid3x3 className="w-4 h-4" />
              <span>More</span>
            </button>

            {/* Mobile View - Horizontal Scroll */}
            <div className="lg:hidden flex items-center gap-1 overflow-x-auto scrollbar-hide w-full py-1">
              <button
                onClick={() => handleNavClick('sports')}
                className="flex items-center gap-1.5 px-3 py-1.5 text-white hover:bg-white/10 rounded-md text-xs font-semibold whitespace-nowrap transition-colors"
              >
                <Flame className="w-3.5 h-3.5" />
                <span>LIVE</span>
              </button>
              <button
                onClick={() => handleNavClick('sports')}
                className="flex items-center gap-1.5 px-3 py-1.5 text-white hover:bg-white/10 rounded-md text-xs font-semibold whitespace-nowrap transition-colors"
              >
                <Trophy className="w-3.5 h-3.5" />
                <span>SPORTS</span>
              </button>
              <button
                onClick={() => handleNavClick('slots')}
                className="flex items-center gap-1.5 px-3 py-1.5 text-white hover:bg-white/10 rounded-md text-xs font-semibold whitespace-nowrap transition-colors"
              >
                <Grid3x3 className="w-3.5 h-3.5" />
                <span>SLOTS</span>
              </button>
              <button
                onClick={() => handleNavClick('livecasino')}
                className="flex items-center gap-1.5 px-3 py-1.5 text-white hover:bg-white/10 rounded-md text-xs font-semibold whitespace-nowrap transition-colors"
              >
                <Flame className="w-3.5 h-3.5" />
                <span>CASINO</span>
              </button>
              <button
                onClick={() => handleNavClick('tvgames')}
                className="flex items-center gap-1.5 px-3 py-1.5 text-white hover:bg-white/10 rounded-md text-xs font-semibold whitespace-nowrap transition-colors"
              >
                <MonitorPlay className="w-3.5 h-3.5" />
                <span>TV</span>
              </button>
              <button
                onClick={() => handleNavClick('promotions')}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-cyan-500 hover:bg-cyan-600 rounded-md text-xs font-semibold whitespace-nowrap transition-colors"
              >
                <Gift className="w-3.5 h-3.5" />
                <span>PROMOS</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {
        mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white shadow-lg">
            <div className="max-w-[1920px] mx-auto px-4 py-4 space-y-2">
              <button
                onClick={() => { handleNavClick('sports'); setMobileMenuOpen(false); }}
                className="flex items-center gap-3 w-full px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-700 rounded-lg font-medium transition-colors"
              >
                <Flame className="w-5 h-5" />
                <span>LIVE BET</span>
              </button>
              <button
                onClick={() => { handleNavClick('sports'); setMobileMenuOpen(false); }}
                className="flex items-center gap-3 w-full px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-700 rounded-lg font-medium transition-colors"
              >
                <Trophy className="w-5 h-5" />
                <span>{t('nav.sports')}</span>
              </button>
              <button
                onClick={() => { handleNavClick('slots'); setMobileMenuOpen(false); }}
                className="flex items-center gap-3 w-full px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-700 rounded-lg font-medium transition-colors"
              >
                <Grid3x3 className="w-5 h-5" />
                <span>SLOT GAMES</span>
              </button>
              <button
                onClick={() => { handleNavClick('livecasino'); setMobileMenuOpen(false); }}
                className="flex items-center gap-3 w-full px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-700 rounded-lg font-medium transition-colors"
              >
                <Flame className="w-5 h-5" />
                <span>LIVE CASINO</span>
              </button>
              <button
                onClick={() => { handleNavClick('tvgames'); setMobileMenuOpen(false); }}
                className="flex items-center gap-3 w-full px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-700 rounded-lg font-medium transition-colors"
              >
                <MonitorPlay className="w-5 h-5" />
                <span>TV GAMES</span>
              </button>
              <button
                onClick={() => { handleNavClick('promotions'); setMobileMenuOpen(false); }}
                className="flex items-center gap-3 w-full px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-700 rounded-lg font-medium transition-colors"
              >
                <Gift className="w-5 h-5" />
                <span>PROMOTIONS</span>
              </button>

              {/* Mobile Auth Buttons */}
              <div className="pt-4 space-y-2 border-t border-gray-200">
                {!user ? (
                  <>
                    <Button
                      onClick={onShowSignIn}
                      className="w-full bg-purple-700 hover:bg-purple-800 text-white font-bold"
                    >
                      <User className="w-4 h-4 mr-2" />
                      SIGN IN
                    </Button>
                    <Button
                      onClick={onShowSignUp}
                      className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold"
                    >
                      REGISTER
                    </Button>
                  </>
                ) : (
                  <>
                    {isAdmin && (
                      <Button
                        onClick={() => { onShowAdmin?.(); setMobileMenuOpen(false); }}
                        className="w-full bg-red-600 hover:bg-red-700 text-white font-black italic tracking-wider shadow-lg shadow-red-600/30 border border-red-500 mb-2"
                      >
                        <Settings className="w-4 h-4 mr-2" />
                        ADMIN PANEL
                      </Button>
                    )}
                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-xl border border-purple-100">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-black">
                          {user.username?.substring(0, 1).toUpperCase()}
                        </div>
                        <div>
                          <div className="text-xs font-black text-gray-800 uppercase">{user.username}</div>
                          <div className="text-[10px] font-bold text-purple-600">₺ {user.balance?.toLocaleString()}</div>
                        </div>
                      </div>
                    </div>
                    <Button
                      onClick={handleLogout}
                      className="w-full bg-red-100 hover:bg-red-200 text-red-600 font-bold border border-red-200"
                    >
                      LOGOUT
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )
      }
    </nav >
  );
}