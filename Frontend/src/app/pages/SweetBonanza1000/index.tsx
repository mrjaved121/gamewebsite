'use client'
// Sweet Bonanza 1000 - v2.1 Refined Visuals

import { useState, useEffect, useRef } from 'react'
import { Home, Settings as SettingsIcon } from 'lucide-react'
import { Howl } from 'howler'
import { authAPI } from '@/lib/api'
import sweetBonanzaAPI from '@/lib/api/sweetBonanza.api'
import { SettingsModal } from './components/SettingsModal'
import { spin } from '@/lib/engines/sweetBonanzaEngine'

// Sound sources (unchanged)
const bgmSound = '/assets/bgm/sweet-bonanza-bgm-1.mp3'
const winSound = '/assets/bgm/sweet-bonanza-win-sound-effect.mp3'
const lossSound = '/assets/bgm/sweet-bonanza-loss-sound-effect.mp3'
const spinSound = '/assets/bgm/sweet-bonanza-slot-scroll-sound-effect.mp3'
const xsound = '/assets/Sound Effects/xsound.mp3'
const clickSound = '/assets/Sound Effects/bsound.mp3'

const PragmaticLoading = ({ progress }: any) => (
    <div className="min-h-screen bg-gradient-to-br from-[#1a0a2e] via-[#16213e] to-[#0f3460] flex items-center justify-center">
        <div className="text-center">
            <div className="mb-8 px-4 py-8">
                <div className="text-6xl md:text-8xl font-black italic text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 animate-pulse"
                    style={{ fontFamily: "'Enchanted Land', cursive", lineHeight: '1.4' }}>
                    SWEET BONANZA 1000
                </div>
            </div>
            <div className="w-64 h-2 bg-white/10 rounded-full overflow-hidden mx-auto">
                <div className="h-full bg-gradient-to-r from-yellow-400 to-pink-500 transition-all duration-300"
                    style={{ width: `${progress}%` }} />
            </div>
            <div className="text-white/60 mt-6 text-2xl font-bold tracking-widest" style={{ fontFamily: "'Enchanted Land', cursive" }}>Loading... {progress}%</div>
        </div>
    </div>
)

const WinCelebration = ({ amount, betAmount }: any) => {
    const [coins, setCoins] = useState<any[]>([]);
    const [show, setShow] = useState(false);
    const [displayMultiplier, setDisplayMultiplier] = useState('0,00X');

    useEffect(() => {
        setTimeout(() => setShow(true), 100);
        // Avoid division by zero
        const targetMultiplierNum = betAmount > 0 ? (amount / betAmount) : 0;
        let startTime = Date.now();
        const duration = 2000;
        const rollInterval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            if (elapsed >= duration) {
                setDisplayMultiplier(targetMultiplierNum.toFixed(2).replace('.', ',') + 'X');
                clearInterval(rollInterval);
            } else {
                const randomVal = (Math.random() * targetMultiplierNum).toFixed(2).replace('.', ',');
                setDisplayMultiplier(randomVal + 'X');
            }
        }, 40);

        const coinInterval = setInterval(() => {
            const batch = Array.from({ length: 3 }, () => ({
                id: Math.random(),
                left: Math.random() * 100,
                delay: Math.random() * 0.3,
                duration: 2.5 + Math.random() * 1.5,
                size: 40 + Math.random() * 30
            }));
            setCoins(prev => [...prev.slice(-30), ...batch]);
        }, 300);

        return () => { clearInterval(rollInterval); clearInterval(coinInterval); };
    }, [amount, betAmount]);

    return (
        <div className="absolute inset-0 z-[150] flex items-center justify-center overflow-hidden pointer-events-none">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-xl animate-fade-in" />
            {coins.map(coin => (
                <div key={coin.id} className="absolute pointer-events-none"
                    style={{ left: `${coin.left}%`, top: '-100px', animation: `fall ${coin.duration}s linear forwards`, animationDelay: `${coin.delay}s`, width: `${coin.size}px`, height: `${coin.size}px` }}>
                    <img src="/games/sweet-bonanza-1000/coin.png" alt="" className="w-full h-full object-contain animate-spin" style={{ animationDuration: '2s' }} />
                </div>
            ))}
            <div className="relative z-20 flex flex-col items-center justify-center text-center px-6 animate-premium-pop">
                <h1 className="text-[10rem] font-black leading-none italic text-transparent bg-clip-text bg-gradient-to-b from-white via-yellow-300 to-orange-500 drop-shadow-2xl"
                    style={{ fontFamily: "'Enchanted Land', cursive" }}>
                    MEGA WIN!
                </h1>
                <div className="mt-4 flex flex-col items-center">
                    <span className="text-[8rem] font-black italic text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.5)]">
                        ₺ {amount.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
                    </span>
                    <span className="text-5xl font-black text-yellow-400 mt-4 bg-black/50 px-10 py-3 rounded-3xl border-4 border-yellow-400/30 animate-pulse">
                        {displayMultiplier}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default function SweetBonanza1000({ onNavigate, onShowSignIn }: any) {
    // Game State
    const [balance, setBalance] = useState<number>(0)
    const [betAmount, setBetAmount] = useState<number>(50)
    const [grid, setGrid] = useState<any[]>([])
    const [isSpinning, setIsSpinning] = useState<boolean>(false)
    const [winAmount, setWinAmount] = useState<number>(0)
    const [showFireworks, setShowFireworks] = useState<boolean>(false)
    const [showLossAnimation, setShowLossAnimation] = useState(false)
    const [winningSymbols, setWinningSymbols] = useState<any[]>([]) // Used for highlighting
    const [reelSpeeds, setReelSpeeds] = useState<number[]>([0, 0, 0, 0, 0, 0])
    const [pageLoading, setPageLoading] = useState(true)
    const [loadingProgress, setLoadingProgress] = useState(0)
    const [gameScale, setGameScale] = useState<number>(1)
    const [isDesktop, setIsDesktop] = useState(false)
    const [showSettingsModal, setShowSettingsModal] = useState(false)
    const [settings, setSettings] = useState({ soundEnabled: true, musicEnabled: true, quickSpin: false, showSparkles: true })
    const [gameError, setGameError] = useState<string | null>(null)
    const [randomFireIndices, setRandomFireIndices] = useState<number[]>([])
    const [multiplierPositions, setMultiplierPositions] = useState<any[]>([])
    const [freeSpinsRemaining, setFreeSpinsRemaining] = useState<number>(0)
    const [totalMultiplier, setTotalMultiplier] = useState<number>(0)

    const sounds = useRef<any>({})
    const reelSpeedsRef = useRef<number[]>([0, 0, 0, 0, 0, 0])

    const symbols = [
        { id: 'grapes', image: '/games/sweet-bonanza-1000/grapes.png' },
        { id: 'plum', image: '/games/sweet-bonanza-1000/plum.png' },
        { id: 'watermelon', image: '/games/sweet-bonanza-1000/watermelon.png' },
        { id: 'apple', image: '/games/sweet-bonanza-1000/apple.png' },
        { id: 'banana', image: '/games/sweet-bonanza-1000/banana.png' },
        { id: 'oval', image: '/games/sweet-bonanza-1000/oval.png' },
        { id: 'heart', image: '/games/sweet-bonanza-1000/heart.png' },
        { id: 'blue_candy', image: '/games/sweet-bonanza-1000/blue_candy.png' },
        { id: 'green_candy', image: '/games/sweet-bonanza-1000/green_candy.png' },
        { id: 'scatter', image: '/games/sweet-bonanza-1000/scatter.png' }
    ]

    const fetchUserData = async () => {
        try {
            const res = await authAPI.me();
            const userData = res?.data || res;
            if (userData && (userData.balance !== undefined || userData.user?.balance !== undefined)) {
                setGameError(null);
                const b = userData.balance ?? userData.user?.balance ?? 0;
                setBalance(Number(b));
            }
        } catch (err: any) {
            console.error('Error fetching balance:', err);
        }
    }

    useEffect(() => {
        // Initial random grid
        const initialGrid = Array(30).fill(null).map(() => symbols[Math.floor(Math.random() * (symbols.length - 2))])
        setGrid(initialGrid)

        sounds.current = {
            bgm: new Howl({ src: [bgmSound], loop: true, volume: 0.3 }),
            win: new Howl({ src: [winSound], volume: 0.6 }),
            loss: new Howl({ src: [lossSound], volume: 0.5 }),
            spin: new Howl({ src: [spinSound], loop: true, volume: 0.4 }),
            multiplier: new Howl({ src: [xsound], volume: 0.5 }),
            click: new Howl({ src: [clickSound], volume: 0.7 })
        }


        // fetchUserData(); // Moved to separate effect
        // const bInterval = setInterval(fetchUserData, 5000);

        const handleResize = () => {
            const desktop = window.innerWidth >= 1024
            setIsDesktop(desktop)
            const baseW = desktop ? 1920 : 1080
            const baseH = desktop ? 1080 : 1920
            setGameScale(Math.min(window.innerWidth / baseW, window.innerHeight / baseH))
        }
        window.addEventListener('resize', handleResize);
        handleResize();

        let lProg = 0;
        const lInt = setInterval(() => {
            lProg += (100 - lProg) * 0.2;
            setLoadingProgress(Math.floor(lProg));
            if (lProg >= 99) { setPageLoading(false); clearInterval(lInt); }
        }, 100);

        return () => {
            // clearInterval(bInterval);
            window.removeEventListener('resize', handleResize);
            clearInterval(lInt);
            Object.values(sounds.current).forEach((s: any) => s.unload());
        };
    }, []);

    useEffect(() => {
        if (settings.musicEnabled && !pageLoading) sounds.current.bgm?.play();
        else sounds.current.bgm?.stop();
    }, [settings.musicEnabled, pageLoading]);

    // Separate Balance Polling to avoid race conditions
    useEffect(() => {
        // Initial fetch
        fetchUserData();

        const intervalId = setInterval(() => {
            if (!isSpinning) {
                fetchUserData();
            }
        }, 5000);

        return () => clearInterval(intervalId);
    }, [isSpinning]);

    const playClickSound = () => settings.soundEnabled && sounds.current.click?.play();

    // --- MAIN GAME LOGIC ---
    const handlePlay = async () => {
        if (isSpinning) return;

        const isFreeSpinMode = freeSpinsRemaining > 0;

        // Check balance only if NOT in free spins mode
        if (!isFreeSpinMode && balance < betAmount) {
            console.warn('Insufficient balance');
            return;
        }

        playClickSound();
        setIsSpinning(true);
        setWinAmount(0);
        setShowFireworks(false);
        setWinningSymbols([]);
        setShowLossAnimation(false);
        setRandomFireIndices([]);
        setMultiplierPositions([]);
        setTotalMultiplier(0);
        setReelSpeeds([1, 1, 1, 1, 1, 1]);
        reelSpeedsRef.current = [1, 1, 1, 1, 1, 1];

        // Deduct balance ONLY if NOT in free spins mode
        if (!isFreeSpinMode) {
            setBalance(prev => Math.max(0, prev - betAmount));
        }

        if (settings.soundEnabled) sounds.current.spin?.play();

        const startTime = Date.now();
        const MIN_SPIN_TIME = settings.quickSpin ? 1000 : 2000;

        try {
            // Generate result locally
            const result = spin(betAmount, isFreeSpinMode);
            console.log('🎰 SPIN RESULT:', result);

            // Wait for visual spin time
            const elapsed = Date.now() - startTime;
            const remaining = Math.max(0, MIN_SPIN_TIME - elapsed);

            setTimeout(() => {
                processResult(result, isFreeSpinMode);
            }, remaining);

        } catch (err: any) {
            console.error('❌ Spin failed:', err);
            setIsSpinning(false);
            setReelSpeeds([0, 0, 0, 0, 0, 0]);
            sounds.current.spin?.stop();
            // Restore balance if deducted
            if (!isFreeSpinMode) {
                setBalance(prev => prev + betAmount);
            }
            fetchUserData();
        }
    }

    const processResult = async (result: any, wasFreeSpinMode: boolean) => {
        // Stop Sound
        sounds.current.spin?.stop();

        // 1. Process Grid and Multipliers
        const finalFlatGrid = Array(30).fill(null);
        const multiplierData: any[] = [];

        if (result.reels) {
            for (let c = 0; c < 6; c++) {
                for (let r = 0; r < 5; r++) {
                    const symId = result.reels[c][r];
                    const symbolObj = symbols.find(s => s.id === symId) || symbols[0];
                    finalFlatGrid[r * 6 + c] = symbolObj;
                }
            }
        }

        // Add multiplier overlays from result
        if (result.multipliers && result.multipliers.length > 0) {
            result.multipliers.forEach((mult: any) => {
                const gridIndex = mult.position * 6 + mult.reel;
                multiplierData.push({ index: gridIndex, value: mult.value });
            });
            setMultiplierPositions(multiplierData);
            setTotalMultiplier(result.totalMultiplier);
            console.log('💣 Multipliers:', multiplierData);
        }

        // 2. Stop Reels One by One
        for (let i = 0; i < 6; i++) {
            reelSpeedsRef.current[i] = 0;
            setReelSpeeds([...reelSpeedsRef.current]);
            setGrid(prev => {
                const n = [...prev];
                for (let r = 0; r < 5; r++) n[r * 6 + i] = finalFlatGrid[r * 6 + i];
                return n;
            });
        }

        // 3. Apply Fire Effects
        const fires: number[] = [];
        for (let i = 0; i < 30; i++) {
            if (Math.random() < 0.15) fires.push(i);
        }
        setRandomFireIndices(fires);

        // 4. Handle Free Spins Trigger
        if (result.isFreeSpins && result.scatterCount >= 4) {
            const newFreeSpins = result.scatterCount === 6 ? 15 : result.scatterCount === 5 ? 12 : 10;
            setFreeSpinsRemaining(prev => prev + newFreeSpins);
            console.log(`🎉 FREE SPINS TRIGGERED! +${newFreeSpins} spins`);
        }

        // Decrement free spins if in free spin mode
        if (wasFreeSpinMode) {
            setFreeSpinsRemaining(prev => Math.max(0, prev - 1));
        }

        // 5. Show Win/Loss & Sync
        setTimeout(async () => {
            setIsSpinning(false);

            if (result.winAmount > 0) {
                console.log('✅ WIN DETECTED!', result.winAmount);
                setWinAmount(result.winAmount);
                setShowFireworks(true);
                setWinningSymbols(result.winningPositions.map((p: any) => p.position * 6 + p.reel));
                if (settings.soundEnabled) {
                    sounds.current.win?.play();
                    if (result.totalMultiplier > 0) {
                        sounds.current.multiplier?.play();
                    }
                }

                // Auto-hide win screen after 5 seconds
                setTimeout(() => {
                    setShowFireworks(false);
                    setWinAmount(0);
                }, 5000);
            } else {
                console.log('❌ LOSS');
                setShowLossAnimation(true);
                if (settings.soundEnabled) sounds.current.loss?.play();
                setTimeout(() => {
                    setShowLossAnimation(false);
                    sounds.current.loss?.stop();
                }, 2000);
            }

            // SYNC WITH BACKEND (only if NOT free spin)
            if (!wasFreeSpinMode) {
                try {
                    const syncRes = await sweetBonanzaAPI.syncBalance({
                        betAmount,
                        winAmount: result.winAmount,
                        gameData: {
                            reels: result.reels,
                            multiplier: result.totalMultiplier,
                            scatterCount: result.scatterCount,
                            freeSpinsTriggered: result.isFreeSpins
                        }
                    });

                    if (syncRes.data && syncRes.data.newBalance !== undefined) {
                        setBalance(syncRes.data.newBalance);
                        window.dispatchEvent(new CustomEvent('userUpdated', { detail: { balance: syncRes.data.newBalance } }));
                        console.log('💰 Balance synced:', syncRes.data.newBalance);
                    }
                } catch (err) {
                    console.error('❌ Sync failed:', err);
                    fetchUserData();
                }
            } else {
                // In free spins mode, just add winnings without deducting bet
                if (result.winAmount > 0) {
                    setBalance(prev => prev + result.winAmount);
                }
            }
        }, 500);
    }
    // --- END GAME LOGIC ---

    const adjustBet = (delta: number) => {
        if (isSpinning) return;
        playClickSound();
        setBetAmount(prev => Math.max(50, Math.min(1000000, prev + delta)))
    }

    if (pageLoading) return <PragmaticLoading progress={loadingProgress} />

    return (
        <div className="h-screen h-[100dvh] overflow-hidden bg-[#1e293b] text-white flex flex-col font-sans select-none relative">
            <div className="fixed inset-0 z-0">
                <img src="/assets/bgm/sweet_bonanza_bg_desktop.png" className="w-full h-full object-cover scale-105 opacity-80" alt="" />
                <div className="absolute inset-0 bg-gradient-to-b from-sky-400/20 via-transparent to-black/40" />
            </div>

            {settings.showSparkles && (
                <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
                    {[...Array(30)].map((_, i) => (
                        <div key={i} className="absolute bg-white rounded-full animate-sparkle-fall opacity-30"
                            style={{ left: `${Math.random() * 100}%`, top: `-${Math.random() * 20}%`, width: `${2 + Math.random() * 6}px`, height: `${2 + Math.random() * 6}px`, animationDuration: `${8 + Math.random() * 12}s`, animationDelay: `${-Math.random() * 10}s` }} />
                    ))}
                </div>
            )}

            <div className="absolute top-8 left-8 z-[200] flex gap-4 pointer-events-auto">
                <button onClick={() => { playClickSound(); onNavigate?.('home'); }}
                    className="w-20 h-20 bg-black/60 backdrop-blur-md rounded-[2.5rem] border-4 border-white/20 flex items-center justify-center hover:bg-black/80 hover:scale-110 active:scale-90 transition-all shadow-2xl">
                    <Home className="w-10 h-10 text-white" />
                </button>
                <button onClick={() => { playClickSound(); setShowSettingsModal(true); }}
                    className="w-20 h-20 bg-black/60 backdrop-blur-md rounded-[2.5rem] border-4 border-white/20 flex items-center justify-center hover:bg-black/80 hover:scale-110 active:scale-90 transition-all shadow-2xl">
                    <SettingsIcon className="w-10 h-10 text-white" />
                </button>
            </div>

            <div className="fixed inset-0 flex items-center justify-center z-10 pointer-events-none">
                <div className="relative pointer-events-auto flex items-center justify-center"
                    style={{ transform: `scale(${gameScale})`, transformOrigin: 'center center', width: isDesktop ? '1920px' : '1080px', height: isDesktop ? '1080px' : '1920px' }}>

                    <div className="flex flex-col lg:flex-row items-center gap-16 px-10">
                        {/* Left: Main Game Slot */}
                        <div className="flex flex-col items-center gap-12">
                            <div className="relative group">
                                <div className="absolute -bottom-10 left-10 right-10 h-20 bg-black/50 blur-3xl rounded-full transform rotateX(90deg)" />
                                <div className="absolute -inset-10 pointer-events-none z-[-1]" style={{ transform: 'translateZ(-50px)' }}>
                                    <div className={`absolute inset-0 border-[8px] border-pink-400/40 rounded-[5rem] blur-2xl animate-neon-breathe`} />
                                </div>

                                <div className="bg-[#ff80b3] p-4 rounded-[4.5rem] border-[16px] border-white shadow-[0_40px_100px_rgba(255,105,180,0.4)] relative overflow-visible animate-cabinet-sway">
                                    <div className={`grid grid-cols-6 gap-3 bg-white/20 backdrop-blur-md rounded-[3.5rem] p-4 shadow-[inset_0_20px_60px_rgba(0,0,0,0.3)] ${reelSpeeds.some(s => s > 0) ? 'overflow-hidden' : 'overflow-visible'}`}
                                        style={{ width: '1000px', height: '800px' }}>
                                        {Array.from({ length: 6 }).map((_, c) => (
                                            <div key={c} className="h-full relative overflow-hidden">
                                                <div className={`flex flex-col gap-4 ${reelSpeeds[c] > 0 ? 'animate-reel-scroll' : ''}`}>
                                                    {(reelSpeeds[c] > 0 ? Array(3).fill(0).flatMap(() => Array.from({ length: 5 }).map((_, r) => grid[r * 6 + c])) : Array.from({ length: 5 }).map((_, r) => grid[r * 6 + c])).map((sym, ri) => {
                                                        const flatIdx = (ri % 5) * 6 + c; // Calculate grid index for checks
                                                        const multiplier = multiplierPositions.find(m => m.index === flatIdx);
                                                        return (
                                                            <div key={ri} className={`w-[145px] h-[145px] flex items-center justify-center relative cursor-pointer group/symbol 
                                                            ${winningSymbols.includes(flatIdx) ? 'animate-match-pop z-20' : ''}`}>
                                                                {sym && (
                                                                    <div className={`relative w-[130px] h-[130px] flex items-center justify-center transform transition-all duration-300 z-10
                                                                    ${randomFireIndices.includes(flatIdx) && !isSpinning ? 'animate-fire-pulse' : ''}`}>

                                                                        {/* Fire Effect Overlay */}
                                                                        {!isSpinning && randomFireIndices.includes(flatIdx) && (
                                                                            <div className="absolute inset-[-20px] bg-red-500/30 blur-xl rounded-full mix-blend-screen animate-pulse" />
                                                                        )}

                                                                        <img
                                                                            src={sym.image}
                                                                            className={`w-[95%] h-[95%] object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)] 
                                                                         ${!isSpinning && multiplier ? 'animate-smash' : !isSpinning ? 'animate-symbol-breathe' : ''}`}
                                                                            alt=""
                                                                        />
                                                                        {/* Display multiplier overlay */}
                                                                        {multiplier && !isSpinning && (
                                                                            <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
                                                                                <div className="animate-multiplier-pop flex flex-col items-center">
                                                                                    <div className="bg-gradient-to-b from-yellow-300 to-orange-600 px-6 py-2 rounded-2xl border-[4px] border-white shadow-[0_0_20px_rgba(234,179,8,0.8)] relative group/mult">
                                                                                        <span className="text-white font-black text-6xl italic multiplier-shadow tracking-tighter">
                                                                                            {multiplier.value}X
                                                                                        </span>
                                                                                        <div className="absolute -inset-1 bg-white/20 blur-md rounded-2xl -z-10 animate-pulse" />
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="bg-black/90 backdrop-blur-2xl px-20 py-8 rounded-[4rem] border-4 border-white/10 flex flex-col items-center justify-center gap-4 shadow-2xl">
                                <div className="flex items-center gap-8">
                                    <span className="text-yellow-400 font-black text-3xl uppercase tracking-[0.2em]">KAZANÇ</span>
                                    <span className="text-7xl font-black text-white italic drop-shadow-lg tabular-nums">₺ {winAmount.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</span>
                                </div>
                                {totalMultiplier > 0 && !isSpinning && (
                                    <div className="flex items-center gap-3 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 px-8 py-3 rounded-full border-2 border-yellow-400/40">
                                        <span className="text-yellow-300 text-2xl font-bold">💣 TOPLAM ÇARPan:</span>
                                        <span className="text-yellow-400 text-4xl font-black">{totalMultiplier}x</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right: Controls & Logo */}
                        <div className="flex flex-col items-center justify-center gap-14 w-[550px]">
                            <div className="flex flex-col items-center select-none">
                                <span className="text-[110px] font-black italic text-pink-500 leading-none drop-shadow-[0_10px_20px_rgba(0,0,0,0.4)]" style={{ fontFamily: "'Enchanted Land', cursive" }}>SWEET</span>
                                <span className="text-[130px] font-black italic text-orange-500 leading-none -mt-8 drop-shadow-[0_10px_20px_rgba(0,0,0,0.4)]" style={{ fontFamily: "'Enchanted Land', cursive" }}>BONANZA</span>
                                <span className="text-[100px] font-black italic text-red-600 -mt-4 drop-shadow-[0_10px_20px_rgba(0,0,0,0.4)]" style={{ fontFamily: "'Enchanted Land', cursive" }}>1000</span>
                            </div>

                            {/* Free Spins Indicator */}
                            {freeSpinsRemaining > 0 && (
                                <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 px-12 py-6 rounded-[3rem] border-4 border-white/30 shadow-2xl animate-pulse">
                                    <div className="text-center">
                                        <div className="text-white text-3xl font-black uppercase tracking-wider">🎉 FREE SPINS 🎉</div>
                                        <div className="text-yellow-300 text-6xl font-black mt-2">{freeSpinsRemaining}</div>
                                        <div className="text-white/80 text-xl font-bold mt-1">Spins Remaining</div>
                                    </div>
                                </div>
                            )}

                            <button onClick={handlePlay} disabled={isSpinning || (freeSpinsRemaining === 0 && balance < betAmount)}
                                className={`w-[320px] h-[320px] rounded-full border-[14px] border-white shadow-[0_30px_60px_rgba(0,0,0,0.5),inset_0_5px_15px_rgba(255,255,255,0.4)] flex flex-col items-center justify-center transition-all relative overflow-hidden group
                                ${isSpinning ? 'opacity-50 cursor-not-allowed bg-slate-600' : freeSpinsRemaining > 0 ? 'bg-gradient-to-br from-purple-500 via-pink-600 to-red-800 hover:scale-105 active:scale-90' : 'bg-gradient-to-br from-pink-500 via-red-600 to-red-800 hover:scale-105 active:scale-90 active:shadow-inner'}`}>
                                <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <span className="text-white text-8xl font-black italic drop-shadow-2xl">{freeSpinsRemaining > 0 ? 'FREE' : 'SPIN'}</span>
                                <div className="w-24 h-1.5 bg-yellow-400 mt-4 rounded-full animate-pulse shadow-[0_0_15px_rgba(250,204,21,0.6)]" />
                                {balance < betAmount && !isSpinning && freeSpinsRemaining === 0 && (
                                    <div className="absolute bottom-10 bg-black/60 px-4 py-1 rounded-full text-sm font-bold text-red-400 uppercase tracking-tighter">Bakiye Yetersiz</div>
                                )}
                            </button>

                            <div className="w-full flex flex-col gap-6">
                                <div className="flex gap-4">
                                    <button onClick={() => adjustBet(50)} disabled={isSpinning} className="flex-1 bg-gradient-to-b from-indigo-500 to-indigo-700 py-6 rounded-[2.5rem] border-4 border-white/10 text-white text-4xl font-black shadow-xl hover:brightness-110 active:translate-y-1 active:shadow-none transition-all">+₺50</button>
                                    <button onClick={() => adjustBet(-50)} disabled={isSpinning} className="flex-1 bg-gradient-to-b from-indigo-500 to-indigo-700 py-6 rounded-[2.5rem] border-4 border-white/10 text-white text-4xl font-black shadow-xl hover:brightness-110 active:translate-y-1 active:shadow-none transition-all">-₺50</button>
                                </div>
                                <div className="bg-black/90 p-10 rounded-[3.5rem] border-4 border-white/15 flex flex-col gap-6 shadow-2xl relative overflow-hidden backdrop-blur-xl">
                                    <div className="flex justify-between items-center px-4 relative z-10">
                                        <span className="text-yellow-500 font-black text-2xl tracking-widest uppercase">KREDİ</span>
                                        <span className="text-white font-black text-5xl tabular-nums italic drop-shadow-glow">₺ {balance.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</span>
                                    </div>
                                    <div className="h-[2px] bg-white/10 mx-4" />
                                    <div className="flex justify-between items-center px-4 relative z-10">
                                        <span className="text-yellow-500 font-black text-2xl tracking-widest uppercase">BAHİS</span>
                                        <span className="text-white font-black text-5xl tabular-nums italic drop-shadow-glow">₺ {betAmount.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showFireworks && <WinCelebration amount={winAmount} betAmount={betAmount} />}

            {gameError && (
                <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[300] bg-red-600/90 backdrop-blur-xl p-10 rounded-[3rem] border-8 border-white shadow-2xl flex flex-col items-center gap-6 animate-shake">
                    <span className="text-white text-5xl font-black italic text-center drop-shadow-lg">{gameError}</span>
                    <button onClick={() => { playClickSound(); fetchUserData(); }}
                        className="bg-white text-red-600 px-12 py-4 rounded-full font-black text-2xl hover:scale-110 active:scale-95 transition-all shadow-xl">
                        TEKRAR DENE (RETRY)
                    </button>
                </div>
            )}

            {showLossAnimation && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none px-4">
                    <div className="bg-black/40 backdrop-blur-sm inset-0 absolute" />
                    <div className="bg-gradient-to-b from-white via-slate-200 to-slate-400 bg-clip-text text-transparent text-[8rem] font-black italic drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)] animate-bounce text-center">
                        TEKRAR DENE!
                    </div>
                </div>
            )}

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes fall { 0% { transform: translateY(-100px) rotate(0deg); opacity: 1; } 100% { transform: translateY(110vh) rotate(360deg); opacity: 0; } }
                @keyframes reel-scroll { 0% { transform: translateY(0); } 100% { transform: translateY(-33.33%); } }
                .animate-reel-scroll { animation: reel-scroll 0.3s linear infinite; will-change: transform; }
                @keyframes match-pop { 0% { transform: scale(1); } 50% { transform: scale(1.6); filter: brightness(2) contrast(1.5); } 100% { transform: scale(0); opacity: 0; } }
                .animate-match-pop { animation: match-pop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
                .animate-sparkle-fall { animation: fall linear infinite; }
                @keyframes premium-pop { 0% { transform: scale(0.5); opacity: 0; filter: blur(20px); } 100% { transform: scale(1); opacity: 1; filter: blur(0); } }
                .animate-premium-pop { animation: premium-pop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
                @font-face { font-family: 'Enchanted Land'; src: url('/assets/Fonts/Enchanted Land 400.otf') format('opentype'); }
                @keyframes cabinet-sway { 0%, 100% { transform: rotateX(2deg) rotateY(-1deg); } 50% { transform: rotateX(4deg) rotateY(1deg); } }
                .animate-cabinet-sway { animation: cabinet-sway 10s ease-in-out infinite; }
                @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
                .animate-fade-in { animation: fade-in 0.5s ease-out; }
                @keyframes symbol-breathe {
                    0%, 100% { transform: scale(1); filter: drop-shadow(0 8px 15px rgba(0,0,0,0.6)) brightness(1); }
                    50% { transform: scale(1.06); filter: drop-shadow(0 12px 30px rgba(255,105,180,0.5)) brightness(1.2); }
                }
                .animate-symbol-breathe { animation: symbol-breathe 3s ease-in-out infinite; }
                @keyframes neon-breathe { 0%, 100% { opacity: 0.4; transform: scale(1); filter: blur(25px); } 50% { opacity: 0.8; transform: scale(1.05); filter: blur(40px); } }
                .animate-neon-breathe { animation: neon-breathe 4s ease-in-out infinite; }
                @keyframes neon-pulse-pink { 0%, 100% { border-color: #ff80b3; box-shadow: 0 0 20px #ff80b3; } 50% { border-color: #ffb3d1; box-shadow: 0 0 40px #ffb3d1; } }
                .drop-shadow-glow { filter: drop-shadow(0 0 15px rgba(255,255,255,0.4)); }
                
                @keyframes fire-pulse { 0%, 100% { filter: brightness(1) drop-shadow(0 0 0 transparent); } 50% { filter: brightness(1.3) drop-shadow(0 0 15px red); transform: scale(1.02); } }
                .animate-fire-pulse { animation: fire-pulse 2s infinite; }
                
                @keyframes smash-item {
                    0% { transform: scale(1); filter: brightness(1); }
                    10% { transform: scale(1.2); filter: brightness(1.5); }
                    20% { transform: scale(0.8) rotate(5deg); filter: brightness(2); }
                    30% { transform: scale(1.1) rotate(-5deg); }
                    40% { transform: scale(0.9); }
                    50% { transform: scale(1); }
                }
                .animate-smash { animation: smash-item 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) both; }

                @keyframes multiplier-pop {
                    0% { transform: scale(0) rotate(-20deg); opacity: 0; }
                    60% { transform: scale(1.4) rotate(10deg); opacity: 1; }
                    80% { transform: scale(0.9) rotate(-5deg); }
                    100% { transform: scale(1) rotate(0deg); }
                }
                .animate-multiplier-pop { animation: multiplier-pop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
                
                .multiplier-shadow {
                    text-shadow: 0 0 10px rgba(0,0,0,0.8), 0 0 20px rgba(234, 179, 8, 0.5);
                }
            ` }} />
        </div>
    )
}
