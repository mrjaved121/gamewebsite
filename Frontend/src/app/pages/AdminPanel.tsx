import { useState, useEffect } from 'react';
import { X, Search, User, DollarSign, Image as ImageIcon, Banknote, Clock, AlertTriangle, Settings, Zap, Users, Play, BarChart3 } from 'lucide-react';
import { paymentAPI } from '../../lib/api/payment.api';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '../components/ui/button';
import sweetBonanzaAPI from '../../lib/api/sweetBonanza.api';

export function AdminPanel({ onClose }: { onClose: () => void }) {
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState<'payments' | 'users' | 'game'>('payments');
    const [requests, setRequests] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    // Bank details for approval
    const [bankDetails, setBankDetails] = useState({
        bankName: '',
        iban: '',
        accountHolder: ''
    });
    const [selectedRequest, setSelectedRequest] = useState<any>(null);
    const [showApprovalModal, setShowApprovalModal] = useState(false);
    const [showDirectBalanceModal, setShowDirectBalanceModal] = useState(false);

    // Direct Balance Update State
    const [directBalance, setDirectBalance] = useState({
        identifier: '',
        amount: '',
        operation: 'add' as 'add' | 'subtract'
    });

    // Game Control State
    const [gameSession, setGameSession] = useState<any>(null);

    const fetchRequests = async () => {
        setIsLoading(true);
        try {
            const response = await paymentAPI.getAllRequests();
            const data = response.data?.deposits || response.data || [];
            setRequests(data);
        } catch (err) {
            console.error('Failed to fetch requests', err);
            // For demo purposes, if API fails, use mock data
            setRequests([
                { id: '1', user: { username: 'testuser1', email: 'test@user.com' }, amount: 500, status: 'PENDING', createdAt: new Date().toISOString() },
                { id: '2', user: { username: 'gamer22', email: 'gamer@user.com' }, amount: 1000, status: 'PAYMENT_SUBMITTED', screenshot: 'https://placehold.co/400x600?text=Payment+Proof', createdAt: new Date().toISOString() }
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchRequests();

        // Game session polling
        const pollGame = async () => {
            try {
                const response = await sweetBonanzaAPI.getSession();
                setGameSession(response.data?.data || response.data || response);
            } catch (err) {
                console.error('Failed to fetch game session', err);
            }
        };

        pollGame();
        const gameInterval = setInterval(pollGame, 2000);

        // Polling requests every 10 seconds
        const requestInterval = setInterval(fetchRequests, 10000);

        return () => {
            clearInterval(gameInterval);
            clearInterval(requestInterval);
        };
    }, []);

    const handleApproveInitial = async () => {
        if (!bankDetails.bankName || !bankDetails.iban || !bankDetails.accountHolder) {
            alert('Please fill all bank details');
            return;
        }

        try {
            await paymentAPI.approveInitialRequest(selectedRequest._id, bankDetails);
            alert('Request approved. Bank details sent to user.');
            setShowApprovalModal(false);
            fetchRequests();
        } catch (err) {
            alert('Action failed');
        }
    };

    const handleConfirmPayment = async (requestId: string) => {
        try {
            await paymentAPI.confirmPayment(requestId);
            alert('Payment confirmed and balance added to user.');
            fetchRequests();
        } catch (err) {
            alert('Action failed');
        }
    };

    const handleDirectBalanceUpdate = async () => {
        if (!directBalance.identifier || !directBalance.amount) {
            alert('Please fill all fields');
            return;
        }
        try {
            await paymentAPI.updateUserBalance(directBalance.identifier, directBalance.amount, directBalance.operation);
            alert(`Balance ${directBalance.operation === 'add' ? 'added' : 'removed'} successfully.`);
            setShowDirectBalanceModal(false);
        } catch (err) {
            alert('Action failed');
        }
    };

    const handleAdminDecision = async (decision: 'win' | 'loss' | 'none') => {
        try {
            await sweetBonanzaAPI.submitAdminDecision(decision);
            alert(`Game outcome forced to ${decision.toUpperCase()}.`);
            // Re-fetch game session to update UI
            const response = await sweetBonanzaAPI.getSession();
            setGameSession(response.data?.data || response.data || response);
        } catch (err) {
            console.error('Failed to set admin decision', err);
            alert('Failed to set admin decision.');
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <div className="bg-[#1a1c23] w-full max-w-6xl h-[85vh] rounded-3xl shadow-2xl overflow-hidden border border-white/10 flex flex-col">
                {/* Header */}
                <div className="bg-gradient-to-r from-purple-800 to-indigo-900 p-4 md:p-6 flex items-center justify-between">
                    <div className="flex items-center gap-3 md:gap-4">
                        <div className="bg-white/20 p-2 md:p-3 rounded-2xl">
                            <Settings className="text-white w-5 h-5 md:w-6 md:h-6" />
                        </div>
                        <div>
                            <h2 className="text-white text-lg md:text-2xl font-black italic tracking-wider">ADMIN CONTROL</h2>
                            <p className="text-purple-200 text-[10px] font-bold uppercase tracking-widest opacity-70">Management</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/50 hover:text-white">
                        <X className="w-8 h-8" />
                    </button>
                </div>

                {/* Sidebar Tabs - Responsive */}
                <div className="flex flex-1 overflow-hidden flex-col md:flex-row">
                    <div className="w-full md:w-64 bg-black/30 border-b md:border-b-0 md:border-r border-white/5 p-4 flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-y-auto scrollbar-hide">
                        <button
                            onClick={() => setActiveTab('payments')}
                            className={`flex items-center gap-3 p-3 md:p-4 rounded-xl font-bold transition-all whitespace-nowrap md:whitespace-normal ${activeTab === 'payments' ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30' : 'text-gray-400 hover:bg-white/5'}`}
                        >
                            <Banknote className="w-4 h-4 md:w-5 md:h-5" />
                            PAYMENT REQUESTS
                        </button>
                        <button
                            onClick={() => setActiveTab('users')}
                            className={`flex items-center gap-3 p-3 md:p-4 rounded-xl font-bold transition-all whitespace-nowrap md:whitespace-normal ${activeTab === 'users' ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30' : 'text-gray-400 hover:bg-white/5'}`}
                        >
                            <User className="w-4 h-4 md:w-5 md:h-5" />
                            USER MANAGEMENT
                        </button>
                        <button
                            onClick={() => setActiveTab('game')}
                            className={`flex items-center gap-3 p-3 md:p-4 rounded-xl font-bold transition-all whitespace-nowrap md:whitespace-normal ${activeTab === 'game' ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30' : 'text-gray-400 hover:bg-white/5'}`}
                        >
                            <Zap className="w-4 h-4 md:w-5 md:h-5" />
                            GAME CONTROL
                        </button>
                        <div className="hidden md:block mt-auto p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
                            <div className="flex items-center gap-2 text-yellow-500 mb-1">
                                <AlertTriangle className="w-4 h-4" />
                                <span className="text-[10px] font-black uppercase">Admin Note</span>
                            </div>
                            <p className="text-[10px] text-yellow-500/70 leading-relaxed font-medium">Verify all screenshots manually before adding balance.</p>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-[#0f1118]">
                        {activeTab === 'payments' ? (
                            <div className="space-y-6">
                                <div className="flex items-center justify-between mb-8">
                                    <h3 className="text-white text-xl font-black italic">ACTIVE DEPOSIT REQUESTS</h3>
                                    <div className="flex gap-2">
                                        <button onClick={fetchRequests} className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg text-xs font-bold transition-all">REFRESH</button>
                                    </div>
                                </div>

                                <div className="grid gap-4">
                                    {requests.length === 0 ? (
                                        <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10 text-gray-400">
                                            No active requests found.
                                        </div>
                                    ) : requests.map(req => {
                                        const status = req.status?.toLowerCase() || '';
                                        return (
                                            <div key={req._id} className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-white/[0.07] transition-all">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/20 to-indigo-500/20 flex items-center justify-center text-purple-400 ring-1 ring-white/10 shadow-lg">
                                                        <Banknote className="w-7 h-7" />
                                                    </div>
                                                    <div>
                                                        <p className="text-white font-black text-lg">{req.amount} ₺</p>
                                                        <p className="text-gray-400 text-sm font-bold">{req.user?.username || 'Unknown'} <span className="opacity-40 font-normal">({req.user?.email || 'No Email'})</span></p>
                                                        <div className="flex items-center gap-2 mt-1">
                                                            <Clock className="w-3 h-3 text-purple-400/50" />
                                                            <span className="text-[10px] text-gray-500 font-bold uppercase">{new Date(req.createdAt).toLocaleString()}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-4">
                                                    <div className={`px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest ${status === 'pending' ? 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/30' :
                                                        status === 'payment_submitted' ? 'bg-blue-500/20 text-blue-500 border border-blue-500/30' :
                                                            status === 'waiting_for_payment' ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30' :
                                                                'bg-purple-500/20 text-purple-500 border border-purple-500/30'
                                                        }`}>
                                                        {status.toUpperCase()}
                                                    </div>

                                                    {status === 'pending' && (
                                                        <button
                                                            onClick={() => { setSelectedRequest(req); setShowApprovalModal(true); }}
                                                            className="px-6 py-2.5 bg-green-600 hover:bg-green-500 text-white rounded-xl text-xs font-black italic tracking-wider transition-all shadow-lg shadow-green-600/20"
                                                        >
                                                            APPROVE (SEND IBAN)
                                                        </button>
                                                    )}

                                                    {status === 'payment_submitted' && (
                                                        <div className="flex gap-2">
                                                            <Button
                                                                onClick={() => window.open(req.screenshot || req.slipImage, '_blank')}
                                                                variant="outline"
                                                                className="bg-white/5 border-white/10 text-white"
                                                            >
                                                                <ImageIcon className="w-4 h-4 mr-2" />
                                                                VIEW PROOF
                                                            </Button>
                                                            <button
                                                                onClick={() => handleConfirmPayment(req._id)}
                                                                className="px-6 py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-black italic tracking-wider transition-all shadow-lg shadow-purple-600/20"
                                                            >
                                                                CONFIRM & ADD BALANCE
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ) : activeTab === 'users' ? (
                            <div className="space-y-6">
                                <div className="flex items-center justify-between mb-8">
                                    <h3 className="text-white text-xl font-black italic">USER MANAGEMENT TOOLS</h3>
                                    <button
                                        onClick={() => setShowDirectBalanceModal(true)}
                                        className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-xs font-black italic tracking-widest transition-all shadow-lg shadow-emerald-600/30"
                                    >
                                        + DIRECT BALANCE UPDATE
                                    </button>
                                </div>

                                <div className="bg-white/5 border border-white/10 rounded-3xl p-8 text-center">
                                    <p className="text-gray-500 font-bold mb-4">Search users to manage profile, view bets or logs</p>
                                    <div className="relative max-w-md mx-auto">
                                        <input
                                            type="text"
                                            placeholder="Username, Email or User ID..."
                                            className="w-full bg-[#1a1c23] border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-purple-500 transition-all font-medium"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                        <Search className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500" />
                                    </div>
                                </div>
                            </div>
                        ) : activeTab === 'game' ? (
                            <div className="space-y-8 animate-in fade-in duration-500">
                                <div className="flex items-center justify-between mb-2">
                                    <div>
                                        <h3 className="text-white text-2xl font-black italic">SWEET BONANZA 1000</h3>
                                        <p className="text-purple-400 text-[10px] font-black uppercase tracking-[0.2em] mt-1">Live Institutional Game Management</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className={`px-4 py-2 rounded-xl border-2 font-black italic tracking-widest text-sm ${gameSession?.phase === 'BETTING' ? 'bg-green-500/20 border-green-500 text-green-500' :
                                            gameSession?.phase === 'SPINNING' ? 'bg-blue-500/20 border-blue-500 text-blue-500 animate-pulse' :
                                                'bg-purple-500/20 border-purple-500 text-purple-500'
                                            }`}>
                                            {gameSession?.phase || 'OFFLINE'}
                                        </div>
                                        <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl">
                                            <span className="text-white font-mono font-black italic">00:{gameSession?.timeLeft?.toString().padStart(2, '0') || '00'}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {/* Stat Cards */}
                                    <div className="bg-gradient-to-br from-[#1a1c23] to-[#252833] p-6 rounded-3xl border border-white/5 shadow-xl">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="p-2 bg-green-500/10 rounded-xl text-green-500">
                                                <DollarSign className="w-5 h-5" />
                                            </div>
                                            <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Total Bets (WIN)</span>
                                        </div>
                                        <div className="text-3xl font-black italic text-green-500">₺ {gameSession?.betsTotals?.win?.toLocaleString() || '0'}</div>
                                    </div>

                                    <div className="bg-gradient-to-br from-[#1a1c23] to-[#252833] p-6 rounded-3xl border border-white/5 shadow-xl">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="p-2 bg-red-500/10 rounded-xl text-red-500">
                                                <DollarSign className="w-5 h-5" />
                                            </div>
                                            <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Total Bets (LOSS)</span>
                                        </div>
                                        <div className="text-3xl font-black italic text-red-500">₺ {gameSession?.betsTotals?.loss?.toLocaleString() || '0'}</div>
                                    </div>

                                    <div className="bg-gradient-to-br from-[#1a1c23] to-[#252833] p-6 rounded-3xl border border-white/5 shadow-xl">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="p-2 bg-purple-500/10 rounded-xl text-purple-500">
                                                <Users className="w-5 h-5" />
                                            </div>
                                            <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Live Players</span>
                                        </div>
                                        <div className="text-3xl font-black italic text-white">{gameSession?.betsCount || '0'} <span className="text-xs text-white/30 font-normal ml-2">({gameSession?.viewersCount || '0'} watching)</span></div>
                                    </div>
                                </div>

                                {/* Decision Controls */}
                                <div className="bg-[#1a1c23] p-8 rounded-[2rem] border-2 border-dashed border-white/10 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-8 opacity-[0.03]">
                                        <Zap className="w-48 h-48" />
                                    </div>

                                    <div className="relative z-10 flex flex-col items-center">
                                        <div className="text-center mb-8">
                                            <h4 className="text-white text-xl font-black italic mb-2 uppercase tracking-tight">Override Game Algorithm</h4>
                                            <p className="text-gray-500 text-sm max-w-md mx-auto">Forces the outcome of the current round. This is persistent until the next transition.</p>
                                        </div>

                                        <div className="flex gap-6 w-full max-w-2xl">
                                            <button
                                                onClick={() => handleAdminDecision('win')}
                                                className={`flex-1 h-32 rounded-3xl border-4 transition-all flex flex-col items-center justify-center gap-2 shadow-2xl ${gameSession?.adminDecision === 'win' ? 'bg-green-600 border-yellow-400 scale-105 shadow-green-600/50' : 'bg-green-600/10 border-green-500/30 hover:bg-green-600/20'}`}
                                            >
                                                <Play className="w-8 h-8 text-green-500" />
                                                <span className="text-2xl font-black italic text-white">{gameSession?.adminDecision === 'win' ? 'ROUND: WIN ✓' : 'FORCE WIN'}</span>
                                            </button>

                                            <button
                                                onClick={() => handleAdminDecision('loss')}
                                                className={`flex-1 h-32 rounded-3xl border-4 transition-all flex flex-col items-center justify-center gap-2 shadow-2xl ${gameSession?.adminDecision === 'loss' ? 'bg-red-600 border-yellow-400 scale-105 shadow-red-600/50' : 'bg-red-600/10 border-red-500/30 hover:bg-red-600/20'}`}
                                            >
                                                <Play className="w-8 h-8 text-red-500" />
                                                <span className="text-2xl font-black italic text-white">{gameSession?.adminDecision === 'loss' ? 'ROUND: LOSS ✓' : 'FORCE LOSS'}</span>
                                            </button>
                                        </div>

                                        <div className="mt-8 p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-4 text-xs font-bold w-full max-w-2xl">
                                            <div className="p-2 bg-yellow-500/20 rounded-lg text-yellow-500">
                                                <BarChart3 className="w-4 h-4" />
                                            </div>
                                            <div className="text-gray-400 uppercase tracking-widest">
                                                Algorithm Recommendation:
                                                <span className="text-white ml-2">
                                                    {gameSession?.roundCycle === 1 ? 'MAJORITY LOSS (CYCLE 1)' :
                                                        gameSession?.roundCycle === 5 ? 'MAJORITY WIN (CYCLE 5)' :
                                                            'DYNAMIC BALANCE'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>

            {/* Approval Modal */}
            {showApprovalModal && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
                    <div className="bg-[#1a1c23] w-full max-w-md rounded-3xl shadow-2xl overflow-hidden border border-white/10">
                        <div className="p-6 bg-purple-600 text-white flex items-center justify-between">
                            <h4 className="font-black italic">SEND PAYMENT DETAILS</h4>
                            <button onClick={() => setShowApprovalModal(false)}><X /></button>
                        </div>
                        <div className="p-8 space-y-4">
                            <div>
                                <label className="text-xs text-gray-500 font-black uppercase mb-2 block tracking-widest">Bank Name</label>
                                <input
                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-purple-500 outline-none"
                                    placeholder="e.g. Ziraat Bankası"
                                    value={bankDetails.bankName}
                                    onChange={e => setBankDetails({ ...bankDetails, bankName: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="text-xs text-gray-500 font-black uppercase mb-2 block tracking-widest">IBAN Number</label>
                                <input
                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-purple-500 outline-none font-mono"
                                    placeholder="TR..."
                                    value={bankDetails.iban}
                                    onChange={e => setBankDetails({ ...bankDetails, iban: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="text-xs text-gray-500 font-black uppercase mb-2 block tracking-widest">Account Holder Name</label>
                                <input
                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-purple-500 outline-none"
                                    placeholder="Full Name"
                                    value={bankDetails.accountHolder}
                                    onChange={e => setBankDetails({ ...bankDetails, accountHolder: e.target.value })}
                                />
                            </div>
                            <button
                                onClick={handleApproveInitial}
                                className="w-full py-4 bg-purple-600 hover:bg-purple-500 text-white rounded-2xl font-black italic tracking-widest transition-all mt-4"
                            >
                                SEND TO USER
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Direct Balance Update Modal */}
            {showDirectBalanceModal && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
                    <div className="bg-[#1a1c23] w-full max-w-md rounded-3xl shadow-2xl overflow-hidden border border-white/10">
                        <div className="p-6 bg-emerald-600 text-white flex items-center justify-between">
                            <h4 className="font-black italic">UPDATE USER BALANCE</h4>
                            <button onClick={() => setShowDirectBalanceModal(false)}><X /></button>
                        </div>
                        <div className="p-8 space-y-4">
                            <div>
                                <label className="text-xs text-gray-500 font-black uppercase mb-2 block tracking-widest">User Email or Username</label>
                                <input
                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-emerald-500 outline-none"
                                    placeholder="Enter user email..."
                                    value={directBalance.identifier}
                                    onChange={e => setDirectBalance({ ...directBalance, identifier: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="text-xs text-gray-500 font-black uppercase mb-2 block tracking-widest">Amount (₺)</label>
                                <input
                                    type="number"
                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-emerald-500 outline-none"
                                    value={directBalance.amount}
                                    onChange={e => setDirectBalance({ ...directBalance, amount: e.target.value })}
                                />
                            </div>
                            <div className="flex gap-2 p-1 bg-black/40 border border-white/10 rounded-xl">
                                <button
                                    onClick={() => setDirectBalance({ ...directBalance, operation: 'add' })}
                                    className={`flex-1 py-3 rounded-lg font-black text-xs transition-all ${directBalance.operation === 'add' ? 'bg-emerald-600 text-white' : 'text-gray-500'}`}
                                >
                                    ADD
                                </button>
                                <button
                                    onClick={() => setDirectBalance({ ...directBalance, operation: 'subtract' })}
                                    className={`flex-1 py-3 rounded-lg font-black text-xs transition-all ${directBalance.operation === 'subtract' ? 'bg-red-600 text-white' : 'text-gray-500'}`}
                                >
                                    SUBTRACT
                                </button>
                            </div>
                            <button
                                onClick={handleDirectBalanceUpdate}
                                className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-black italic tracking-widest transition-all mt-4"
                            >
                                EXECUTE UPDATE
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
