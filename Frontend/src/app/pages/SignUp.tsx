import { useState } from 'react';
import { X, Calendar, ChevronDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '../components/ui/button';

interface SignUpProps {
  onClose: () => void;
  onSwitchToSignIn: () => void;
  onNavigate?: (page: string) => void;
}

export function SignUp({ onClose, onSwitchToSignIn, onNavigate }: SignUpProps) {
  const { t } = useLanguage();
  const [step, setStep] = useState(1); // 1: Account Credentials, 2: Personal Info

  // Step 1 fields (Account Credentials)
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Step 2 fields (Personal Information)
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [surname, setSurname] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [country, setCountry] = useState('');
  const [currency, setCurrency] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [passportId, setPassportId] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [countryCode, setCountryCode] = useState('+971');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Password validation (silent - no UI display)
  const passwordValidations = {
    hasNumber: /\d/.test(password),
    hasLength: password.length >= 8 && password.length <= 50,
    noSpaces: !/\s/.test(password),
    hasLowerUpper: /[a-z]/.test(password) && /[A-Z]/.test(password),
    onlyEnglish: /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/.test(password),
  };

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username || !password || !confirmPassword) {
      setError(t('auth.fillAllFields'));
      return;
    }

    if (password !== confirmPassword) {
      setError(t('auth.passwordMismatch'));
      return;
    }

    if (!Object.values(passwordValidations).every(Boolean)) {
      setError(t('auth.passwordRequirements'));
      return;
    }

    setStep(2);
  };

  const handleStep2Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!firstName || !surname || !birthDate || !country || !currency || !city || !address || !passportId || !email || !gender || !phoneNumber) {
      setError(t('auth.fillAllFields'));
      return;
    }

    if (!agreeTerms) {
      setError(t('auth.acceptTerms'));
      return;
    }

    setIsLoading(true);

    try {
      const userData = {
        username,
        firstName,
        lastName: surname,
        email: email.toLowerCase().trim(),
        phone: countryCode + phoneNumber,
        password,
        confirmPassword,
        is18Plus: true,
        termsAccepted: true,
        kvkkAccepted: true,
        birthDate
      };

      const { authAPI } = await import('../../lib/api/auth.api');
      const response = await authAPI.register(userData);
      const data = response.data;

      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user || data));
        alert(t('auth.registrationSuccess') || 'Registration successful! Welcome to Garbet.');
        onClose();
        window.location.reload();
      } else {
        setError('Registration failed: no token received');
      }
    } catch (err: any) {
      console.error('Registration error:', err);
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const countries = [
    { name: 'United Arab Emirates', flag: '🇦🇪', code: '+971' },
    { name: 'Turkey', flag: '🇹🇷', code: '+90' },
    { name: 'United States', flag: '🇺🇸', code: '+1' },
    { name: 'United Kingdom', flag: '🇬🇧', code: '+44' },
    { name: 'Germany', flag: '🇩🇪', code: '+49' },
    { name: 'France', flag: '🇫🇷', code: '+33' },
    { name: 'Spain', flag: '🇪🇸', code: '+34' },
    { name: 'Italy', flag: '🇮🇹', code: '+39' },
    { name: 'Netherlands', flag: '🇳🇱', code: '+31' },
    { name: 'Belgium', flag: '🇧🇪', code: '+32' }
  ];

  const currencies = ['TRY', 'USD', 'EUR', 'GBP', 'AED'];
  const genders = ['Male', 'Female', 'Other'];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-100 rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto relative">
        {/* Header */}
        <div className="bg-gray-100 p-6 pb-0 relative">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Logo placeholder - you can replace with actual logo */}
          <div className="mb-4">
            <h1 className="text-2xl font-bold text-purple-600">Garbet</h1>
          </div>

          <div className="flex justify-end mb-4">
            <button
              onClick={onSwitchToSignIn}
              className="text-sm font-semibold text-gray-700 underline hover:text-purple-600 transition-colors"
            >
              {t('auth.signIn').toUpperCase()}
            </button>
          </div>

          <div className="mb-6">
            <p className="text-gray-500 text-sm mb-1">{t('auth.newMember')}</p>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              {t('auth.registerEasy').toUpperCase()}
            </h2>
            <h3 className="text-base font-bold text-gray-900">
              {t('auth.registrationStep')} {step}
            </h3>
          </div>
        </div>

        {/* Step 1: Account Credentials */}
        {step === 1 && (
          <form onSubmit={handleStep1Submit} className="px-6 pb-6 space-y-4">
            {/* Username */}
            <div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-4 bg-gray-300 border-0 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-purple-500 transition-all"
                placeholder={`${t('auth.username')} *`}
                required
              />
            </div>

            {/* Password */}
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-4 bg-gray-300 border-0 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-purple-500 transition-all"
                placeholder={`${t('auth.password')} *`}
                required
              />
            </div>

            {/* Confirm Password */}
            <div>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-4 bg-gray-300 border-0 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-purple-500 transition-all"
                placeholder={`${t('auth.confirmPassword')} *`}
                required
              />
            </div>

            {error && (
              <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Next Button */}
            <div className="pt-8">
              <Button
                type="submit"
                className="w-full bg-purple-700 hover:bg-purple-800 text-white py-4 rounded-lg font-bold text-base transition-all"
              >
                {t('auth.next').toUpperCase()}
              </Button>
            </div>

            {/* Contact Support */}
            <div className="text-center pt-6 border-t border-gray-300 mt-6">
              <button
                type="button"
                className="text-sm text-gray-600 hover:text-gray-800 underline transition-colors"
              >
                {t('auth.contactSupport')}
              </button>
            </div>
          </form>
        )}

        {/* Step 2: Personal Information */}
        {step === 2 && (
          <form onSubmit={handleStep2Submit} className="px-6 pb-6 space-y-4">
            {/* First Name */}
            <div>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-4 py-4 bg-gray-300 border-0 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-purple-500 transition-all"
                placeholder={`${t('auth.firstName')} *`}
                required
              />
            </div>

            {/* Middle Name */}
            <div>
              <input
                type="text"
                value={middleName}
                onChange={(e) => setMiddleName(e.target.value)}
                className="w-full px-4 py-4 bg-gray-300 border-0 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-purple-500 transition-all"
                placeholder={t('auth.middleName')}
              />
            </div>

            {/* Surname */}
            <div>
              <input
                type="text"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                className="w-full px-4 py-4 bg-gray-300 border-0 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-purple-500 transition-all"
                placeholder={`${t('auth.surname')} *`}
                required
              />
            </div>

            {/* Birth Date */}
            <div className="relative">
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full px-4 py-4 bg-gray-300 border-0 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-purple-500 transition-all"
                placeholder={`${t('auth.birthDate')} *`}
                required
              />
              <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 pointer-events-none" />
            </div>

            {/* Country */}
            <div className="relative">
              <select
                value={country}
                onChange={(e) => {
                  setCountry(e.target.value);
                  const selectedCountry = countries.find(c => c.name === e.target.value);
                  if (selectedCountry) {
                    setCountryCode(selectedCountry.code);
                  }
                }}
                className="w-full px-4 py-4 bg-gray-300 border-0 rounded-lg text-gray-900 focus:ring-2 focus:ring-purple-500 transition-all appearance-none cursor-pointer"
                required
              >
                <option value="">{t('auth.country')}</option>
                {countries.map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.flag} {c.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 pointer-events-none" />
            </div>

            {/* Currency */}
            <div className="relative">
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full px-4 py-4 bg-gray-300 border-0 rounded-lg text-gray-900 focus:ring-2 focus:ring-purple-500 transition-all appearance-none cursor-pointer"
                required
              >
                <option value="">{`${t('auth.currency')} *`}</option>
                {currencies.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 pointer-events-none" />
            </div>

            {/* City */}
            <div>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-4 py-4 bg-gray-300 border-0 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-purple-500 transition-all"
                placeholder={`${t('auth.city')} *`}
                required
              />
            </div>

            {/* Address */}
            <div>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-4 py-4 bg-gray-300 border-0 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-purple-500 transition-all"
                placeholder={`${t('auth.address')} *`}
                required
              />
            </div>

            {/* Passport / ID */}
            <div>
              <input
                type="text"
                value={passportId}
                onChange={(e) => setPassportId(e.target.value)}
                className="w-full px-4 py-4 bg-gray-300 border-0 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-purple-500 transition-all"
                placeholder={`${t('auth.passportId')} *`}
                required
              />
            </div>

            {/* E-mail */}
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-4 bg-gray-300 border-0 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-purple-500 transition-all"
                placeholder={`${t('auth.email')} *`}
                required
              />
            </div>

            {/* Gender */}
            <div className="relative">
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full px-4 py-4 bg-gray-300 border-0 rounded-lg text-gray-900 focus:ring-2 focus:ring-purple-500 transition-all appearance-none cursor-pointer"
                required
              >
                <option value="">{`${t('auth.gender')} *`}</option>
                {genders.map((g) => (
                  <option key={g} value={g}>{t(`auth.gender${g}`)}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 pointer-events-none" />
            </div>

            {/* Phone Number with Country Code */}
            <div className="flex gap-2">
              <div className="relative w-32">
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="w-full px-3 py-4 bg-gray-300 border-0 rounded-lg text-gray-900 focus:ring-2 focus:ring-purple-500 transition-all appearance-none cursor-pointer text-sm"
                >
                  {countries.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.flag} {c.code}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 pointer-events-none" />
              </div>
              <div className="flex-1">
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full px-4 py-4 bg-gray-300 border-0 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-purple-500 transition-all"
                  placeholder={`${t('auth.phoneNumber')} *`}
                  required
                />
              </div>
            </div>

            {/* Promo Code */}
            <div>
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="w-full px-4 py-4 bg-gray-300 border-0 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-purple-500 transition-all"
                placeholder={t('auth.promoCode')}
              />
            </div>

            {/* Terms & Conditions */}
            <div className="bg-pink-100 border border-pink-200 rounded-lg p-4">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="w-5 h-5 mt-0.5 text-purple-600 border-gray-400 rounded focus:ring-purple-500 cursor-pointer flex-shrink-0"
                  required
                />
                <span className="text-sm text-gray-800 leading-snug">
                  {t('auth.over18Agreement')}{' '}
                  <a href="#" className="text-purple-600 hover:text-purple-800 font-medium underline">
                    {t('auth.privacyPolicy')}
                  </a>
                  {' '}{t('auth.andThe')}{' '}
                  <a href="#" className="text-purple-600 hover:text-purple-800 font-medium underline">
                    {t('auth.generalTerms')}
                  </a>
                </span>
              </label>
            </div>

            {error && (
              <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-3 pt-6">
              <Button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 bg-white hover:bg-gray-50 text-gray-900 py-4 rounded-lg font-bold text-base border border-gray-300 transition-all"
              >
                {t('auth.back').toUpperCase()}
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-purple-700 hover:bg-purple-800 text-white py-4 rounded-lg font-bold text-base transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? t('auth.registering').toUpperCase() : t('auth.register').toUpperCase()}
              </Button>
            </div>

            {/* Contact Support */}
            <div className="text-center pt-6 border-t border-gray-300 mt-6">
              <button
                type="button"
                className="text-sm text-gray-600 hover:text-gray-800 underline transition-colors"
              >
                {t('auth.contactSupport')}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
