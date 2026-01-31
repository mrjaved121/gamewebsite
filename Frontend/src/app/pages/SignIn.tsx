import { useState } from 'react';
import { Eye, EyeOff, X, AlertCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '../components/ui/button';
import { authAPI } from '../../lib/api/auth.api';

interface SignInProps {
  onClose: () => void;
  onSwitchToSignUp: () => void;
  onNavigate?: (page: string) => void;
}

export function SignIn({ onClose, onSwitchToSignUp, onNavigate }: SignInProps) {
  const { t } = useLanguage();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      // In the backend login expects 'email'. We use 'username' variable here which might contain email or username.
      // We'll pass it as 'email' to the API.
      const response = await authAPI.login(username, password);
      const data = response.data;

      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user || data));

        onClose();
        window.location.reload();
      } else {
        setError(t('auth.invalidCredentials') || 'Invalid credentials');
      }
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || t('auth.loginError') || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4 animate-fade-in">
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-scale-in">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-700 to-pink-600 p-4 sm:p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-3 sm:top-4 right-3 sm:right-4 text-white hover:bg-white/20 rounded-full p-1.5 sm:p-2 transition-all"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2 animate-fade-in-up">
              {t('auth.signIn')}
            </h2>
            <p className="text-sm sm:text-base text-purple-100 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              {t('auth.welcomeBack')}
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-3 sm:space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-3 sm:px-4 py-2 sm:py-3 rounded-lg flex items-center gap-2 animate-shake">
              <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span className="text-xs sm:text-sm">{error}</span>
            </div>
          )}

          {/* Username */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
              {t('auth.email') || 'Email'}
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              placeholder={t('auth.emailPlaceholder') || 'Enter your email'}
            />
          </div>

          {/* Password */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
              {t('auth.password')}
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 pr-12 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
              />
              <span className="text-sm text-gray-700">{t('auth.rememberMe')}</span>
            </label>
            <button
              type="button"
              className="text-sm text-purple-600 hover:text-purple-800 font-medium transition-colors"
            >
              {t('auth.forgotPassword')}
            </button>
          </div>

          {/* Submit Button */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-bold hover:from-purple-700 hover:to-pink-700 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? t('auth.signingIn') : t('auth.signIn')}
            </Button>
          </div>



          {/* Divider */}
          <div className="relative my-6 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">{t('auth.or')}</span>
            </div>
          </div>

          {/* Sign Up Link */}
          <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <p className="text-gray-600">
              {t('auth.noAccount')}{' '}
              <button
                type="button"
                onClick={onSwitchToSignUp}
                className="text-purple-600 hover:text-purple-800 font-bold transition-colors"
              >
                {t('auth.signUpNow')}
              </button>
            </p>
          </div>

          {/* Contact Support */}
          <div className="text-center pt-4 border-t border-gray-200 animate-fade-in" style={{ animationDelay: '0.7s' }}>
            <button
              type="button"
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors flex items-center gap-1 mx-auto"
            >
              <AlertCircle className="w-4 h-4" />
              {t('auth.contactSupport')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}