import { X, Eye, Gift, User, Settings, History, ChevronDown, Loader2, Upload, CheckCircle, Clock, Banknote, Search, Download } from 'lucide-react';
import { useEffect, useState } from 'react';
import { authAPI, betRoundAPI, paymentAPI } from '../../lib/api';

interface MyProfilePageProps {
  onClose: () => void;
  initialTab?: string;
}

export function MyProfilePage({ onClose, initialTab = 'personal-details' }: MyProfilePageProps) {
  const [myProfileOpen, setMyProfileOpen] = useState(true);
  const [balanceManagementOpen, setBalanceManagementOpen] = useState(true);
  const [betHistoryOpen, setBetHistoryOpen] = useState(initialTab === 'bet-history');
  const [bonusesOpen, setBonusesOpen] = useState(initialTab === 'bonuses');
  const [selectedSubmenu, setSelectedSubmenu] = useState(initialTab);

  // Data states
  const [user, setUser] = useState<any>(null);
  const [betHistory, setBetHistory] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isHistoryLoading, setIsHistoryLoading] = useState(false);

  // Deposit States
  const [depositAmount, setDepositAmount] = useState('');
  const [activeDepositRequest, setActiveDepositRequest] = useState<any>(null);
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Withdraw States
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawIban, setWithdrawIban] = useState('');
  const [selectedWithdrawMethod, setSelectedWithdrawMethod] = useState<any>(null);
  const [withdrawActiveTab, setWithdrawActiveTab] = useState('all');

  // IBAN States
  const [ibanInfo, setIbanInfo] = useState<any>(null);

  // Password States
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  // Transactions States
  const [transactions, setTransactions] = useState<any[]>([]);
  const [transSearchTerm, setTransSearchTerm] = useState('');
  const [transFilterType, setTransFilterType] = useState('all');
  const [isTransLoading, setIsTransLoading] = useState(false);

  // Withdrawal History
  const [withdrawalRequests, setWithdrawalRequests] = useState<any[]>([]);
  const [isWithdrawLoading, setIsWithdrawLoading] = useState(false);

  // Bonus History
  const [bonuses, setBonuses] = useState<any[]>([]);
  const [isBonusesLoading, setIsBonusesLoading] = useState(false);

  useEffect(() => { const fetchData = async () => { try { const res = await authAPI.me(); setUser(res.data || res); } catch(e){} finally { setIsLoading(false); } }; fetchData(); const h = (e) => { if (e.detail) { const u = e.detail.user || e.detail.data || (e.detail.balance !== undefined ? e.detail : null); if (u) setUser(p => ({ ...p, ...u })); } }; window.addEventListener('userUpdated', h); return () => window.removeEventListener('userUpdated', h); }, []);
// Fetch IBAN Info
useEffect(() => {
  const fetchIban = async () => {
    try {
      const response = await paymentAPI.getIbanInfo();
      setIbanInfo(response.data.ibanInfo);
    } catch (err) { console.error('Failed to fetch IBAN info'); }
  };
  if (selectedSubmenu === 'deposit') fetchIban();
}, [selectedSubmenu]);

const fetchBetHistory = async () => {
  setIsHistoryLoading(true);
  try {
    const response = await betRoundAPI.getBetRoundHistory({ limit: 20 });
    setBetHistory(response.data?.data || response.data || []);
  } catch (err) {
    console.error('Failed to fetch bet history', err);
  } finally {
    setIsHistoryLoading(false);
  }
};

useEffect(() => {
  if (betHistoryOpen) {
    fetchBetHistory();
  }
}, [betHistoryOpen]);

// Form states (synced with user data)
const [email, setEmail] = useState('');
const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');
const [phoneNumber, setPhoneNumber] = useState('');
const [dateOfBirth, setDateOfBirth] = useState('');
const [address, setAddress] = useState('');

useEffect(() => {
  if (user) {
    setEmail(user.email || '');
    setFirstName(user.username || '');
    setLastName('');
    setPhoneNumber(user.phone || '');
  }
}, [user]);

// Deposit Logic
const fetchActiveDeposit = async () => {
  try {
    const response = await paymentAPI.getDepositRequests();
    const requests = response.data?.depositRequests || response.data || [];
    const active = requests.find((r: any) => r.status.toLowerCase() !== 'approved' && r.status.toLowerCase() !== 'cancelled');
    setActiveDepositRequest(active);
  } catch (err) { console.error('Failed to fetch deposit requests'); }
};

useEffect(() => {
  if (selectedSubmenu === 'deposit') fetchActiveDeposit();
}, [selectedSubmenu]);

const handleApplyDeposit = async () => {
  if (!depositAmount || parseFloat(depositAmount) < 100) return alert('Min 100 ₺ required');
  setIsProcessing(true);
  try {
    await paymentAPI.requestDeposit(depositAmount);
    fetchActiveDeposit();
  } catch (err: any) { alert(err.response?.data?.message || 'Request failed'); }
  finally { setIsProcessing(false); }
};

const handleDepositFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width, height = img.height;
        if (width > 1200) { height *= 1200 / width; width = 1200; }
        canvas.width = width; canvas.height = height;
        canvas.getContext('2d')?.drawImage(img, 0, 0, width, height);
        setScreenshot(canvas.toDataURL('image/jpeg', 0.7));
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  }
};

const handleSubmitProof = async () => {
  if (!screenshot) return alert('Please upload screenshot');
  setIsProcessing(true);
  try {
    await paymentAPI.submitPaymentProof(activeDepositRequest._id, screenshot);
    fetchActiveDeposit();
  } catch (err: any) { alert(err.response?.data?.message || 'Submission failed'); }
  finally { setIsProcessing(false); }
};

// Withdraw Logic
const paymentMethods = [
  { id: '1', name: 'Havale/EFT', icon: '🏦', category: ['all', 'virtual'] },
  { id: '2', name: 'Papara', icon: '💳', category: ['all', 'payfixpapara'] },
  { id: '3', name: 'Bitcoin/Crypto', icon: '₿', category: ['all', 'virtual'] },
];

const handleWithdraw = async () => {
  if (!selectedWithdrawMethod || !withdrawIban || !withdrawAmount) return alert('Fill all fields');
  setIsProcessing(true);
  try {
    await paymentAPI.createWithdrawalRequest({
      amount: withdrawAmount,
      iban: withdrawIban,
      description: `Withdrawal via ${selectedWithdrawMethod.name}`
    });
    alert('Withdrawal request submitted successfully');
    setWithdrawAmount('');
    setWithdrawIban('');
  } catch (err: any) { alert(err.response?.data?.message || 'Withdrawal failed'); }
  finally { setIsProcessing(false); }
};

// Profile Update Logic
const handleUpdateProfile = async () => {
  setIsProcessing(true);
  try {
    await paymentAPI.updateUserProfile({
      email,
      firstName,
      lastName,
      phone: phoneNumber,
    });
    alert('Profile updated successfully');
  } catch (err: any) { alert(err.response?.data?.message || 'Update failed'); }
  finally { setIsProcessing(false); }
};

// Password Change Logic
const handleChangePassword = async () => {
  if (newPassword !== confirmNewPassword) return alert('Passwords do not match');
  setIsProcessing(true);
  try {
    await authAPI.changePassword({
      currentPassword,
      newPassword,
      confirmNewPassword
    });
    alert('Password changed successfully');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
  } catch (err: any) { alert(err.response?.data?.message || 'Password change failed'); }
  finally { setIsProcessing(false); }
};

// Transactions Logic
const fetchTransactions = async () => {
  setIsTransLoading(true);
  try {
    const response = await paymentAPI.getTransactions({ limit: 50 });
    setTransactions(response.data?.transactions || response.data || []);
  } catch (err) { console.error('Failed to fetch transactions'); }
  finally { setIsTransLoading(false); }
};

useEffect(() => {
  if (selectedSubmenu === 'transaction-history') fetchTransactions();
  if (selectedSubmenu === 'withdraw-status') fetchWithdrawalRequests();
  if (selectedSubmenu === 'bonuses') fetchBonuses();
}, [selectedSubmenu]);

const fetchWithdrawalRequests = async () => {
  setIsWithdrawLoading(true);
  try {
    const response = await paymentAPI.getWithdrawalRequests();
    setWithdrawalRequests(response.data?.withdrawalRequests || response.data || []);
  } catch (err) { console.error('Failed to fetch withdrawal requests'); }
  finally { setIsWithdrawLoading(false); }
};

const fetchBonuses = async () => {
  setIsBonusesLoading(true);
  try {
    const response = await paymentAPI.getBonuses();
    setBonuses(response.data?.bonuses || response.data || []);
  } catch (err) { console.error('Failed to fetch bonuses'); }
  finally { setIsBonusesLoading(false); }
};

return (
  <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-8">
    <div className="w-[80%] h-[90vh] bg-white rounded-lg shadow-2xl flex overflow-hidden">
      {/* Left Sidebar */}
      <div className="w-60 bg-[#e8e8e8] border-r border-gray-300 flex flex-col">
        {/* User Profile */}
        <div className="p-4 bg-white border-b border-gray-300">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-sm">
              {user?.username?.substring(0, 2).toUpperCase() || 'U'}
            </div>
            <div>
              <div className="font-semibold text-sm text-gray-800">{user?.username || 'Loading...'}</div>
              <div className="text-xs text-gray-500">{user?.id || user?._id || ''}</div>
            </div>
          </div>
          <div className="flex items-center gap-1 text-[10px] font-black uppercase text-green-600 bg-green-50 p-2 rounded-lg border border-green-100">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Verified Account</span>
          </div>
        </div>

        {/* Main Balance */}
        <div className="p-4 bg-gradient-to-br from-green-500 to-green-600 text-white">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium">Main Balance</span>
            <Eye className="w-4 h-4" />
          </div>
          <div className="text-2xl font-bold mb-3">
            {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : `${user?.balance?.toLocaleString() || '0.00'} ₺`}
          </div>
          <div className="flex gap-2">
            <button className="flex-1 py-2 bg-white/20 hover:bg-white/30 rounded text-xs font-bold flex items-center justify-center gap-1" onClick={() => setSelectedSubmenu('deposit')}>
              <span className="text-lg">💰</span> DEPOSIT
            </button>
            <button className="flex-1 py-2 bg-white/20 hover:bg-white/30 rounded text-xs font-bold flex items-center justify-center gap-1" onClick={() => setSelectedSubmenu('withdraw')}>
              <span className="text-lg">💸</span> WITHDRAW
            </button>
          </div>
        </div>

        {/* Bonus Balance */}
        <div className="p-4 bg-gradient-to-br from-yellow-600 to-yellow-700 text-white border-b-2 border-yellow-800">
          <div className="text-xs font-medium mb-1">Total Bonus Balance</div>
          <div className="text-2xl font-bold">0.00 ₺</div>
        </div>

        {/* Bonus Balance Detail */}
        <div className="px-4 py-2 bg-gradient-to-br from-yellow-600 to-yellow-700 text-white flex justify-between text-xs border-b border-gray-300">
          <span>Bonus Balance</span>
          <span>0.00 ₺</span>
        </div>

        {/* Loyalty Points */}
        <button className="mx-4 my-3 py-3 bg-gradient-to-r from-yellow-600 to-yellow-700 text-white rounded flex items-center justify-center gap-2 text-sm font-semibold">
          <div className="w-6 h-6 bg-yellow-800 rounded-full flex items-center justify-center text-xs font-bold">
            P
          </div>
          Loyalty Points
        </button>

        {/* Menu Items */}
        <div className="flex-1 overflow-y-auto">
          {/* My Profile */}
          <div className="border-b border-gray-300">
            <button
              onClick={() => setMyProfileOpen(!myProfileOpen)}
              className="w-full px-4 py-3 bg-white hover:bg-gray-50 flex items-center justify-between text-sm font-medium text-gray-800"
            >
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>MY PROFILE</span>
              </div>
              <ChevronDown className={`w-4 h-4 transition-transform ${myProfileOpen ? 'rotate-180' : ''}`} />
            </button>
            {myProfileOpen && (
              <div className="bg-[#d8d8d8]">
                <button
                  onClick={() => setSelectedSubmenu('personal-details')}
                  className={`w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-300 ${selectedSubmenu === 'personal-details' ? 'bg-[#c8c8c8]' : ''}`}
                >
                  Personal Details
                </button>
                <button
                  onClick={() => setSelectedSubmenu('change-password')}
                  className={`w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-300 ${selectedSubmenu === 'change-password' ? 'bg-[#c8c8c8]' : ''}`}
                >
                  Change Password
                </button>
                <button
                  onClick={() => setSelectedSubmenu('two-step')}
                  className={`w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-300 ${selectedSubmenu === 'two-step' ? 'bg-[#c8c8c8]' : ''}`}
                >
                  Two-Step Authentication
                </button>
                <button
                  onClick={() => setSelectedSubmenu('confirmation-settings')}
                  className={`w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-300 ${selectedSubmenu === 'confirmation-settings' ? 'bg-[#c8c8c8]' : ''}`}
                >
                  Communication Settings
                </button>
              </div>
            )}
          </div>

          {/* Balance Management */}
          <div className="border-b border-gray-300">
            <button
              onClick={() => setBalanceManagementOpen(!balanceManagementOpen)}
              className="w-full px-4 py-3 bg-white hover:bg-gray-50 flex items-center justify-between text-sm font-medium text-gray-800"
            >
              <div className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                <span>BALANCE MANAGEMENT</span>
              </div>
              <ChevronDown className={`w-4 h-4 transition-transform ${balanceManagementOpen ? 'rotate-180' : ''}`} />
            </button>
            {balanceManagementOpen && (
              <div className="bg-[#d8d8d8]">
                <button
                  onClick={() => setSelectedSubmenu('deposit')}
                  className={`w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-300 ${selectedSubmenu === 'deposit' ? 'bg-[#c8c8c8]' : ''}`}
                >
                  Deposit
                </button>
                <button
                  onClick={() => setSelectedSubmenu('withdraw')}
                  className={`w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-300 ${selectedSubmenu === 'withdraw' ? 'bg-[#c8c8c8]' : ''}`}
                >
                  Withdraw
                </button>
                <button
                  onClick={() => setSelectedSubmenu('transaction-history')}
                  className={`w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-300 ${selectedSubmenu === 'transaction-history' ? 'bg-[#c8c8c8]' : ''}`}
                >
                  Transaction History
                </button>
                <button
                  onClick={() => setSelectedSubmenu('withdraw-status')}
                  className={`w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-300 ${selectedSubmenu === 'withdraw-status' ? 'bg-[#c8c8c8]' : ''}`}
                >
                  Withdraw Status
                </button>
              </div>
            )}
          </div>

          <button
            onClick={() => {
              setBetHistoryOpen(!betHistoryOpen);
              setSelectedSubmenu('bet-history');
            }}
            className={`w-full px-4 py-3 bg-white hover:bg-gray-50 flex items-center justify-between text-sm font-medium border-b border-gray-300 ${selectedSubmenu === 'bet-history' ? 'text-purple-700 bg-purple-50' : 'text-gray-800'}`}
          >
            <div className="flex items-center gap-2">
              <History className="w-4 h-4" />
              <span>BET HISTORY</span>
            </div>
            <ChevronDown className={`w-4 h-4 transition-transform ${betHistoryOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Bonuses */}
          <button
            onClick={() => {
              setBonusesOpen(!bonusesOpen);
              setSelectedSubmenu('bonuses');
            }}
            className="w-full px-4 py-3 bg-white hover:bg-gray-50 flex items-center justify-between text-sm font-medium text-gray-800 border-b border-gray-300"
          >
            <div className="flex items-center gap-2">
              <Gift className="w-4 h-4" />
              <span>BONUSES</span>
            </div>
            <ChevronDown className={`w-4 h-4 transition-transform ${bonusesOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>

      {/* Main Profile Content */}
      <div className="flex-1 bg-[#e0e0e0] overflow-y-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-300 px-6 py-3 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-800">
            {selectedSubmenu === 'personal-details' && 'Personal Details'}
            {selectedSubmenu === 'change-password' && 'Change Password'}
            {selectedSubmenu === 'two-step' && 'Two-Step Authentication'}
            {selectedSubmenu === 'confirmation-settings' && 'Communication Settings'}
            {selectedSubmenu === 'bonuses' && 'Bonuses'}
            {selectedSubmenu === 'bet-history' && 'Bet History'}
            {selectedSubmenu === 'deposit' && 'Deposit Funds'}
            {selectedSubmenu === 'withdraw' && 'Withdraw Funds'}
            {selectedSubmenu === 'transaction-history' && 'Transaction History'}
            {selectedSubmenu === 'withdraw-status' && 'Withdrawal Status'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {/* Personal Details Content */}
          {selectedSubmenu === 'personal-details' && (
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-6">
                <h3 className="text-sm font-bold text-gray-800 mb-4">Account Information</h3>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-2">Username</label>
                    <input
                      type="text"
                      value={user?.username || ''}
                      disabled
                      className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded text-sm text-gray-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-2">First Name</label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-2">Last Name</label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-2">Date of Birth</label>
                    <input
                      type="date"
                      value={dateOfBirth}
                      onChange={(e) => setDateOfBirth(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-xs font-medium text-gray-700 mb-2">Address</label>
                  <textarea
                    rows={3}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  />
                </div>

                <button
                  onClick={handleUpdateProfile}
                  disabled={isProcessing}
                  className="w-full py-3 bg-[#3d3d7a] hover:bg-[#4d4d8a] text-white font-bold rounded text-sm transition-all"
                >
                  {isProcessing ? 'UPDATING...' : 'UPDATE PROFILE'}
                </button>
              </div>
            </div>
          )}

          {/* Change Password Content */}
          {selectedSubmenu === 'change-password' && (
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-6">
                <h3 className="text-sm font-bold text-gray-800 mb-4">Change Your Password</h3>

                <div className="mb-4">
                  <label className="block text-xs font-medium text-gray-700 mb-2">Current Password</label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter current password"
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-xs font-medium text-gray-700 mb-2">New Password</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-xs font-medium text-gray-700 mb-2">Confirm New Password</label>
                  <input
                    type="password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    placeholder="Confirm new password"
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  />
                </div>

                <button
                  onClick={handleChangePassword}
                  disabled={isProcessing}
                  className="w-full py-3 bg-[#3d3d7a] hover:bg-[#4d4d8a] text-white font-bold rounded text-sm transition-all"
                >
                  {isProcessing ? 'CHANGING...' : 'CHANGE PASSWORD'}
                </button>
              </div>
            </div>
          )}

          {/* Time-Out Content */}
          {selectedSubmenu === 'time-out' && (
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-6">
                <h3 className="text-sm font-bold text-gray-800 mb-4">Responsible Gaming - Time-Out</h3>
                <p className="text-xs text-gray-600 mb-4">
                  Take a break from gaming. Select a time-out period during which your account will be temporarily suspended.
                </p>

                <div className="mb-4">
                  <label className="block text-xs font-medium text-gray-700 mb-2">Select Time-Out Period</label>
                  <select className="w-full px-3 py-2 bg-white border border-gray-300 rounded text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400">
                    <option value="">Choose a period</option>
                    <option value="24h">24 Hours</option>
                    <option value="48h">48 Hours</option>
                    <option value="1week">1 Week</option>
                    <option value="1month">1 Month</option>
                    <option value="3months">3 Months</option>
                    <option value="6months">6 Months</option>
                  </select>
                </div>

                <button className="w-full py-3 bg-[#3d3d7a] hover:bg-[#4d4d8a] text-white font-bold rounded text-sm transition-all">
                  ACTIVATE TIME-OUT
                </button>
              </div>
            </div>
          )}

          {/* Two-Step Authentication Content */}
          {selectedSubmenu === 'two-step' && (
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-6">
                <h3 className="text-sm font-bold text-gray-800 mb-4">Two-Step Authentication</h3>
                <p className="text-xs text-gray-600 mb-4">
                  Add an extra layer of security to your account by enabling two-step authentication.
                </p>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded mb-4">
                  <div>
                    <div className="text-sm font-semibold text-gray-800">Two-Step Authentication</div>
                    <div className="text-xs text-gray-500">Status: Disabled</div>
                  </div>
                  <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded text-xs transition-all">
                    ENABLE
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Verify Account Content */}
          {selectedSubmenu === 'verify-account' && (
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-6">
                <h3 className="text-sm font-bold text-gray-800 mb-4">Verify Your Account</h3>
                <p className="text-xs text-gray-600 mb-4">
                  Please upload the required documents to verify your account. This helps us ensure the security of your account.
                </p>

                <div className="mb-4">
                  <label className="block text-xs font-medium text-gray-700 mb-2">Identity Document (ID/Passport)</label>
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-xs font-medium text-gray-700 mb-2">Proof of Address</label>
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  />
                </div>

                <button className="w-full py-3 bg-[#3d3d7a] hover:bg-[#4d4d8a] text-white font-bold rounded text-sm transition-all">
                  SUBMIT DOCUMENTS
                </button>
              </div>
            </div>
          )}

          {/* Confirmation Settings Content */}
          {selectedSubmenu === 'confirmation-settings' && (
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-6">
                <h3 className="text-sm font-bold text-gray-800 mb-4">Communication Preferences</h3>

                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-3 bg-gray-50 rounded cursor-pointer hover:bg-gray-100">
                    <input type="checkbox" className="w-4 h-4" defaultChecked />
                    <div>
                      <div className="text-sm font-medium text-gray-800">Email Notifications</div>
                      <div className="text-xs text-gray-500">Receive updates and promotions via email</div>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-3 bg-gray-50 rounded cursor-pointer hover:bg-gray-100">
                    <input type="checkbox" className="w-4 h-4" defaultChecked />
                    <div>
                      <div className="text-sm font-medium text-gray-800">SMS Notifications</div>
                      <div className="text-xs text-gray-500">Receive important updates via SMS</div>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-3 bg-gray-50 rounded cursor-pointer hover:bg-gray-100">
                    <input type="checkbox" className="w-4 h-4" />
                    <div>
                      <div className="text-sm font-medium text-gray-800">Promotional Offers</div>
                      <div className="text-xs text-gray-500">Receive special offers and bonuses</div>
                    </div>
                  </label>
                </div>

                <button className="w-full py-3 bg-[#3d3d7a] hover:bg-[#4d4d8a] text-white font-bold rounded text-sm transition-all mt-4">
                  SAVE PREFERENCES
                </button>
              </div>
            </div>
          )}

          {/* Bonuses Content */}
          {selectedSubmenu === 'bonuses' && (
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-sm font-bold text-gray-800">Your Bonuses</h3>
                  <button onClick={fetchBonuses} className="text-xs text-purple-600 font-bold hover:underline">REFRESH</button>
                </div>

                {isBonusesLoading ? (
                  <div className="flex justify-center py-20"><Loader2 className="w-10 h-10 animate-spin text-purple-600" /></div>
                ) : bonuses.length === 0 ? (
                  <div className="text-center py-20 text-gray-400 italic bg-gray-50 rounded-xl border-2 border-dashed border-gray-100">
                    No bonuses active.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {bonuses.map((b: any) => (
                      <div key={b._id} className="p-4 border border-gray-100 rounded-xl bg-gray-50">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-bold text-gray-800">{b.name}</h4>
                          <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-[10px] font-black uppercase">{b.status}</span>
                        </div>
                        <div className="text-xs text-gray-500 mb-4">{b.description}</div>
                        <div className="flex justify-between text-xs font-bold">
                          <span className="text-gray-400">Amount</span>
                          <span className="text-purple-600">{b.amount} ₺</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Bet History Content */}
          {selectedSubmenu === 'bet-history' && (
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-sm font-bold text-gray-800">Your Recent Bets</h3>
                  <button onClick={fetchBetHistory} className="text-xs text-purple-600 font-bold hover:underline">REFRESH</button>
                </div>

                {isHistoryLoading ? (
                  <div className="flex justify-center py-20"><Loader2 className="w-10 h-10 animate-spin text-purple-600" /></div>
                ) : betHistory.length === 0 ? (
                  <div className="text-center py-20 text-gray-400 italic bg-gray-50 rounded-xl border-2 border-dashed border-gray-100">
                    You haven't placed any bets yet.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-left text-gray-500 border-b border-gray-100">
                          <th className="pb-3 font-semibold">Game</th>
                          <th className="pb-3 font-semibold">Date</th>
                          <th className="pb-3 font-semibold text-right">Amount</th>
                          <th className="pb-3 font-semibold text-right">Payout</th>
                          <th className="pb-3 font-semibold text-center">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {betHistory.map((bet: any) => (
                          <tr key={bet.id || bet._id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                            <td className="py-4 font-bold text-gray-800">{bet.gameName || 'Sweet Bonanza'}</td>
                            <td className="py-4 text-gray-500">{new Date(bet.createdAt).toLocaleString()}</td>
                            <td className="py-4 text-right font-mono font-bold text-red-500">-{bet.amount} ₺</td>
                            <td className={`py-4 text-right font-mono font-bold ${bet.winAmount > 0 ? 'text-green-500' : 'text-gray-400'}`}>
                              +{bet.winAmount || 0} ₺
                            </td>
                            <td className="py-4 text-center">
                              <span className={`px-2 py-1 rounded text-[10px] font-black uppercase ${bet.winAmount > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                {bet.winAmount > 0 ? 'WIN' : 'LOSS'}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Deposit Content */}
          {selectedSubmenu === 'deposit' && (
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-6">
                {!activeDepositRequest ? (
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 text-gray-800 mb-6">
                      <Banknote className="w-5 h-5 text-purple-600" />
                      <h3 className="font-bold">IBAN Bank Transfer</h3>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-2 uppercase">Enter Amount (₺)</label>
                      <input
                        type="number"
                        value={depositAmount}
                        onChange={(e) => setDepositAmount(e.target.value)}
                        placeholder="Min 100 ₺"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-xl font-bold focus:bg-white focus:border-purple-500 transition-all outline-none"
                      />
                    </div>
                    <button
                      onClick={handleApplyDeposit}
                      disabled={isProcessing}
                      className="w-full py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-purple-200"
                    >
                      {isProcessing ? 'Processing...' : 'Apply for Deposit'}
                    </button>
                  </div>
                ) : activeDepositRequest.status === 'pending' ? (
                  <div className="text-center py-10">
                    <Clock className="w-12 h-12 text-yellow-500 mx-auto mb-4 animate-pulse" />
                    <h3 className="text-lg font-bold text-gray-800">Request Pending</h3>
                    <p className="text-sm text-gray-500">Admin is processing your request. Please wait...</p>
                  </div>
                ) : (activeDepositRequest.status === 'waiting_for_payment' || activeDepositRequest.status === 'payment_submitted') && (
                  <div className="space-y-6">
                    <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
                      <div className="flex justify-between text-xs mb-1"><span className="text-purple-600 font-bold">Bank Name</span><span className="font-bold text-gray-700">{activeDepositRequest.bankName || ibanInfo?.bankName}</span></div>
                      <div className="flex justify-between text-xs mb-1"><span className="text-purple-600 font-bold">Account Holder</span><span className="font-bold text-gray-700">{activeDepositRequest.accountHolder || ibanInfo?.accountHolder}</span></div>
                      <div className="mt-2 p-2 bg-white rounded-lg border border-purple-200 font-mono text-center text-sm font-bold text-purple-800">{activeDepositRequest.iban || ibanInfo?.iban}</div>
                    </div>

                    {activeDepositRequest.status === 'waiting_for_payment' ? (
                      <div className="space-y-4">
                        <label className="block w-full h-32 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-all">
                          <input type="file" className="hidden" onChange={handleDepositFileChange} />
                          {screenshot ? <CheckCircle className="w-10 h-10 text-green-500" /> : <Upload className="w-10 h-10 text-gray-300" />}
                          <span className="text-xs font-bold text-gray-400 mt-2 uppercase">{screenshot ? 'Screenshot Attached' : 'Attach Screenshot'}</span>
                        </label>
                        <button onClick={handleSubmitProof} disabled={isProcessing || !screenshot} className="w-full py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-green-200 uppercase tracking-widest text-sm">Confirm Payment</button>
                      </div>
                    ) : (
                      <div className="text-center py-6 bg-green-50 rounded-xl">
                        <CheckCircle className="w-10 h-10 text-green-500 mx-auto mb-2" />
                        <h4 className="font-bold text-green-800">Payment Submitted</h4>
                        <p className="text-[10px] text-green-600">Verification in progress...</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Withdraw Content */}
          {selectedSubmenu === 'withdraw' && (
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-6">
                <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
                  {['ALL', 'WALLETS', 'CRYPTO'].map(tab => (
                    <button key={tab} onClick={() => setWithdrawActiveTab(tab.toLowerCase())} className={`px-4 py-2 rounded-xl text-[10px] font-black tracking-widest transition-all ${withdrawActiveTab === tab.toLowerCase() ? 'bg-gray-800 text-white shadow-lg' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'}`}>{tab}</button>
                  ))}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                  {paymentMethods.map(m => (
                    <button key={m.id} onClick={() => setSelectedWithdrawMethod(m)} className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${selectedWithdrawMethod?.id === m.id ? 'border-purple-600 bg-purple-50 text-purple-700' : 'border-gray-100 bg-gray-50 text-gray-400 hover:border-gray-200'}`}>
                      <span className="text-2xl">{m.icon}</span>
                      <span className="text-[10px] font-black uppercase">{m.name}</span>
                    </button>
                  ))}
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">IBAN / Account Number</label>
                    <input type="text" value={withdrawIban} onChange={e => setWithdrawIban(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-bold focus:bg-white outline-none focus:border-purple-500 transition-all" placeholder="Enter your details" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Amount (₺)</label>
                    <input type="number" value={withdrawAmount} onChange={e => setWithdrawAmount(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-bold focus:bg-white outline-none focus:border-purple-500 transition-all" placeholder="0.00" />
                    <p className="text-[10px] font-bold text-gray-400 mt-2">Available: {user?.balance?.toLocaleString()} ₺</p>
                  </div>
                  <button onClick={handleWithdraw} className="w-full py-4 bg-gray-800 hover:bg-black text-white font-bold rounded-xl transition-all shadow-xl shadow-black/10 uppercase tracking-widest text-sm">Request Withdrawal</button>
                </div>
              </div>
            </div>
          )}

          {/* Transaction History Content */}
          {selectedSubmenu === 'transaction-history' && (
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-6">
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input type="text" value={transSearchTerm} onChange={e => setTransSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-xs" placeholder="Search transactions..." />
                  </div>
                  <select value={transFilterType} onChange={e => setTransFilterType(e.target.value)} className="bg-gray-50 border border-gray-200 rounded-lg text-xs px-4 py-2 outline-none">
                    <option value="all">All Types</option>
                    <option value="deposit">Deposit</option>
                    <option value="withdraw">Withdraw</option>
                  </select>
                </div>

                {isTransLoading ? <div className="flex justify-center py-20"><Loader2 className="w-10 h-10 animate-spin text-purple-600" /></div> : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-[11px]">
                      <thead>
                        <tr className="text-left text-gray-400 border-b border-gray-100"><th className="pb-3 font-black uppercase">Reference</th><th className="pb-3 font-black uppercase">Type</th><th className="pb-3 font-black uppercase">Amount</th><th className="pb-3 font-black uppercase">Status</th><th className="pb-3 font-black uppercase">Date</th></tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {transactions.length === 0 ? <tr><td colSpan={5} className="py-20 text-center text-gray-300 italic">No transactions found</td></tr> : transactions.map(t => (
                          <tr key={t._id}>
                            <td className="py-4 font-mono font-bold text-gray-600">{t.transactionId || t._id.substring(0, 8)}</td>
                            <td className="py-4 font-black text-purple-600 uppercase">{t.type}</td>
                            <td className="py-4 font-black text-gray-800">{t.amount} ₺</td>
                            <td className="py-4">
                              <span className={`px-2 py-1 rounded text-[9px] font-black uppercase ${t.status === 'completed' || t.status === 'approved' ? 'bg-green-100 text-green-700' : t.status === 'cancelled' || t.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                {t.status}
                              </span>
                            </td>
                            <td className="py-4 text-gray-400 italic">{new Date(t.createdAt).toLocaleDateString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Withdraw Status Content */}
          {selectedSubmenu === 'withdraw-status' && (
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-sm font-bold text-gray-800">Withdrawal Status</h3>
                  <button onClick={fetchWithdrawalRequests} className="text-xs text-purple-600 font-bold hover:underline">REFRESH</button>
                </div>

                {isWithdrawLoading ? (
                  <div className="flex justify-center py-20"><Loader2 className="w-10 h-10 animate-spin text-purple-600" /></div>
                ) : withdrawalRequests.length === 0 ? (
                  <div className="text-center py-20 text-gray-400 italic bg-gray-50 rounded-xl border-2 border-dashed border-gray-100">
                    No withdrawal requests found.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-left text-gray-500 border-b border-gray-100">
                          <th className="pb-3 font-semibold">Amount</th>
                          <th className="pb-3 font-semibold">Method</th>
                          <th className="pb-3 font-semibold">Status</th>
                          <th className="pb-3 font-semibold">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {withdrawalRequests.map((r: any) => (
                          <tr key={r._id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                            <td className="py-4 font-bold text-gray-800">{r.amount} ₺</td>
                            <td className="py-4 text-gray-500">{r.paymentMethod || 'Bank Transfer'}</td>
                            <td className="py-4">
                              <span className={`px-2 py-1 rounded text-[10px] font-black uppercase ${r.status === 'approved' || r.status === 'completed' ? 'bg-green-100 text-green-700' : r.status === 'cancelled' || r.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                {r.status}
                              </span>
                            </td>
                            <td className="py-4 text-gray-400 italic">{new Date(r.createdAt).toLocaleDateString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);
}
