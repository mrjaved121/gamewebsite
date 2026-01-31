'use client'

import { useState, useEffect, useRef } from 'react'
import { Home, Settings as SettingsIcon, Volume2, VolumeX, FastForward } from 'lucide-react'
import { Howl } from 'howler'
import { useTranslation } from '@/hooks/useTranslation'
import { authAPI, betRoundAPI } from '@/lib/api'
import sweetBonanzaAPI from '@/lib/api/sweetBonanza.api'
import { logger } from '@/utils/logger'
import { handleError } from '@/utils/errorHandler'
import { SettingsModal } from './components/SettingsModal'

// Sound sources from public directory
const bgmSound = '/assets/bgm/sweet-bonanza-bgm-1.mp3'
const winSound = '/assets/bgm/sweet-bonanza-win-sound-effect.mp3'
const lossSound = '/assets/bgm/sweet-bonanza-loss-sound-effect.mp3'
const spinSound = '/assets/bgm/sweet-bonanza-slot-scroll-sound-effect.mp3'
const countdownSound = '/assets/bgm/sweet-bonanza-countdown-sound-effect.mp3'
const xsound = '/assets/Sound Effects/xsound.mp3'
const clickSound = '/assets/Sound Effects/bsound.mp3'

// Pragmatic-style loading screen component
const PragmaticLoading = ({ progress }: any) => (
    <div className="min-h-screen bg-gradient-to-br from-[#1a0a2e] via-[#16213e] to-[#0f3460] flex items-center justify-center">
        <div className="text-center">
            <div className="mb-8 px-4 py-8">
                <div className="text-6xl md:text-8xl font-black italic text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 animate-pulse"
                    style={{ fontFamily: "'Enchanted Land', cursive", lineHeight: '1.4', padding: '0.2em 0' }}>
                    SWEET BONANZA
                </div>
            </div>
            <div className="w-64 h-2 bg-white/10 rounded-full overflow-hidden mx-auto">
                <div
                    className="h-full bg-gradient-to-r from-yellow-400 to-pink-500 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                />
            </div>
            <div className="text-white/60 mt-6 text-2xl font-bold tracking-widest" style={{ fontFamily: "'Enchanted Land', cursive" }}>Loading... {progress}%</div>
        </div>
    </div>
)

// New Premium Win Screen integration
const WinCelebration = ({ amount, betAmount }: any) => {
    const [coins, setCoins] = useState<any[]>([]);
    const [show, setShow] = useState(false);
    const [rays, setRays] = useState<any[]>([]);
    const [displayMultiplier, setDisplayMultiplier] = useState('0,00000000X');

    useEffect(() => {
        setTimeout(() => setShow(true), 100);

        // Generate rays
        const newRays = Array.from({ length: 16 }, (_, i) => ({
            id: i,
            angle: (360 / 16) * i
        }));
        setRays(newRays);

        // Rolling multiplier effect
        const targetMultiplierNum = betAmount > 0 ? (amount / betAmount) : 0;
        let startTime = Date.now();
        const duration = 2000; // 2 seconds of rolling

        const rollInterval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            if (elapsed >= duration) {
                setDisplayMultiplier(targetMultiplierNum.toFixed(8).replace('.', ',') + 'X');
                clearInterval(rollInterval);
            } else {
                // Show random numbers that look realistic
                const randomVal = (Math.random() * 999).toFixed(8).replace('.', ',');
                setDisplayMultiplier(randomVal + 'X');
            }
        }, 40);

        // Generate coins
        const coinInterval = setInterval(() => {
            const batch = Array.from({ length: 3 }, () => ({
                id: Math.random(),
                left: Math.random() * 100,
                delay: Math.random() * 0.3,
                duration: 2.5 + Math.random() * 1.5,
                size: 40 + Math.random() * 30,
                spin: Math.random() > 0.5 ? 'spin' : 'spinReverse'
            }));
            setCoins(prev => [...prev, ...batch]);
        }, 200);

        const cleanupInterval = setInterval(() => {
            setCoins(prev => prev.slice(-50));
        }, 4000);

        return () => {
            clearInterval(rollInterval);
            clearInterval(coinInterval);
            clearInterval(cleanupInterval);
        };
    }, [amount, betAmount]);

    const getWinText = (amt: number) => {
        if (amt >= 1000) return 'MEGA WIN!';
        if (amt >= 500) return 'BIG WIN!';
        if (amt >= 100) return 'GREAT WIN!';
        return 'WIN!';
    }

    return (
        <div className="absolute inset-0 z-[150] flex items-center justify-center overflow-hidden pointer-events-none">
            {/* 🔥 Premium Fluid Fire System 🔥 */}
            {/* 🔥 Ultra-Premium Fluid Fire & Smoke System 🔥 */}
            <svg style={{ position: 'absolute', width: 0, height: 0 }}>
                <filter id="fire-fluid">
                    <feTurbulence type="fractalNoise" baseFrequency="0.012 0.18" numOctaves="4" seed="5" result="noise">
                        <animate attributeName="baseFrequency" dur="2s" values="0.012 0.18;0.012 0.28;0.012 0.18" repeatCount="indefinite" />
                    </feTurbulence>
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale={Math.min(140, 50 + amount / 60)} />
                </filter>
                <filter id="smoke-drift">
                    <feTurbulence type="fractalNoise" baseFrequency="0.01 0.05" numOctaves="2" seed="2" result="smoke">
                        <animate attributeName="baseFrequency" dur="10s" values="0.01 0.05;0.01 0.1;0.01 0.05" repeatCount="indefinite" />
                    </feTurbulence>
                    <feDisplacementMap in="SourceGraphic" in2="smoke" scale="60" />
                </filter>
            </svg>

            {/* 🔥 Rising Sparks & Embers 🔥 */}
            <div className="absolute inset-0 z-[12] pointer-events-none">
                {[...Array(40)].map((_, i) => (
                    <div key={`spark-${i}`} className="absolute w-[3px] h-[3px] bg-amber-400 rounded-full animate-spark-rise shadow-[0_0_15px_#ffd54f]"
                        style={{
                            left: `${Math.random() * 100}%`,
                            bottom: '0%',
                            animationDelay: `${Math.random() * 4}s`,
                            animationDuration: `${1 + Math.random() * 2}s`,
                            '--tx': `${(Math.random() - 0.5) * 300}px`
                        } as any} />
                ))}
            </div>
            {/* Blurred background overlay */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-md animate-fade-in"></div>

            {/* Rotating rays */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full h-full animate-rotate-slow">
                    {rays.map(ray => (
                        <div
                            key={ray.id}
                            className="absolute top-1/2 left-1/2 origin-left"
                            style={{
                                transform: `rotate(${ray.angle}deg)`,
                                width: '100%',
                                height: '8px'
                            }}
                        >
                            <div className="w-full h-full bg-gradient-to-r from-yellow-300/30 to-transparent"></div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Colorful particles */}
            <div className="absolute inset-0">
                {[...Array(40)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute animate-float-random"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${3 + Math.random() * 4}s`
                        }}
                    >
                        <div
                            className="rounded-full blur-sm"
                            style={{
                                width: `${8 + Math.random() * 16}px`,
                                height: `${8 + Math.random() * 16}px`,
                                backgroundColor: ['#ff6b9d', '#ffd93d', '#6bcf7f', '#a78bfa', '#60a5fa'][Math.floor(Math.random() * 5)],
                                opacity: 0.6
                            }}
                        ></div>
                    </div>
                ))}
            </div>

            {/* 🔥 Layered Fluid Fire & Smoke 🔥 */}
            <div className="absolute inset-x-0 bottom-0 h-5/6 z-[10] flex items-end justify-center pointer-events-none" style={{ filter: 'url(#fire-fluid)' }}>
                {[...Array(Math.min(30, 12 + Math.floor(amount / 30)))].map((_, i) => (
                    <div
                        key={`flame-${i}`}
                        className="absolute bottom-[-20%] animate-flame-flicker"
                        style={{
                            left: `${Math.random() * 100}%`,
                            width: `${250 + Math.random() * 300}px`,
                            height: `${500 + Math.random() * 600}px`,
                            background: `radial-gradient(ellipse at bottom, 
                                ${['#ff0033', '#ff6600', '#ffcc00', '#fffe00', '#ff3300'][Math.floor(Math.random() * 5)]} 0%, 
                                transparent 80%)`,
                            opacity: 0.8,
                            animationDelay: `${Math.random() * 4}s`,
                            animationDuration: `${0.8 + Math.random() * 1.2}s`,
                            mixBlendMode: 'screen'
                        }}
                    ></div>
                ))}
            </div>

            {/* Gray Smoke Clouds */}
            <div className="absolute inset-0 z-[8] opacity-20 pointer-events-none" style={{ filter: 'url(#smoke-drift)' }}>
                {[...Array(10)].map((_, i) => (
                    <div key={`smoke-${i}`} className="absolute bg-gray-600 blur-[100px] rounded-full"
                        style={{
                            width: '600px', height: '600px',
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            opacity: 0.3
                        }} />
                ))}
            </div>

            {/* Ground Glow Haze */}
            <div className="absolute inset-x-0 bottom-0 h-full z-[5] opacity-50 pointer-events-none"
                style={{ filter: 'url(#fire-fluid) blur(60px)', background: 'linear-gradient(transparent, #ff0000, #ff8c00, #ffd700)' }} />

            {/* Confetti burst */}
            {show && [...Array(30)].map((_, i) => (
                <div
                    key={`confetti-${i}`}
                    className="absolute top-1/2 left-1/2 w-3 h-8 animate-confetti-burst"
                    style={{
                        backgroundColor: ['#ff6b9d', '#ffd93d', '#6bcf7f', '#a78bfa', '#60a5fa', '#f87171'][Math.floor(Math.random() * 6)],
                        transform: `rotate(${Math.random() * 360}deg)`,
                        animationDelay: `${Math.random() * 0.3}s`,
                        '--burst-x': `${(Math.random() - 0.5) * 800}px`,
                        '--burst-y': `${(Math.random() - 0.5) * 800}px`,
                        '--rotation': `${Math.random() * 720}deg`
                    } as any}
                ></div>
            ))}

            {/* Falling coins using coin.png */}
            {coins.map(coin => (
                <div
                    key={coin.id}
                    className="absolute pointer-events-none"
                    style={{
                        left: `${coin.left}%`,
                        top: '-100px',
                        animation: `fall ${coin.duration}s linear forwards`,
                        animationDelay: `${coin.delay}s`,
                        width: `${coin.size}px`,
                        height: `${coin.size}px`
                    }}
                >
                    <div
                        className="w-full h-full flex items-center justify-center animate-spin"
                        style={{ animationDuration: '2s' }}
                    >
                        <img src="/games/sweet-bonanza-1000/coin.png" alt="coin" className="w-full h-full object-contain drop-shadow-2xl" />
                    </div>
                </div>
            ))}

            {/* Main content - Centered text */}
            <div className="relative z-20 flex flex-col items-center justify-center text-center px-6 max-w-[95vw]">
                {/* Glow effect behind text */}
                <div className="absolute inset-0 blur-3xl opacity-60">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-300 animate-pulse-slow"></div>
                </div>


                <h1
                    className={`relative text-[5rem] md:text-[clamp(6rem,12vw,14rem)] font-black mb-4 leading-none transform transition-all duration-300 ${show ? 'animate-premium-pop opacity-100' : 'scale-0 opacity-0'}`}
                    style={{
                        fontFamily: "'Enchanted Land', cursive",
                        background: 'linear-gradient(180deg, #FFFFFF 0%, #FFD700 30%, #FFA500 60%, #FF4500 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        filter: `drop-shadow(0 15px 30px rgba(0,0,0,0.9)) drop-shadow(0 0 ${Math.min(200, 60 + amount / 8)}px #ff4500)`,
                        letterSpacing: '0.05em',
                        animation: 'floating-premium 3s ease-in-out infinite'
                    }}
                >
                    {getWinText(amount)}
                </h1>

                {/* Win amount */}
                <div className={`relative transform transition-all duration-500 delay-300 ${show ? 'animate-premium-pop opacity-100' : 'scale-0 opacity-0'}`}>
                    <div className="flex items-center justify-center gap-4 md:gap-8 flex-wrap">
                        <img src="/games/sweet-bonanza-1000/coin.png" className="w-12 h-12 md:w-24 md:h-24 animate-bounce-coin" />
                        <span
                            className="text-5xl md:text-[clamp(6rem,10vw,12rem)] font-black leading-none relative italic whitespace-nowrap"
                            style={{
                                fontFamily: "'Enchanted Land', cursive",
                                background: 'linear-gradient(180deg, #FFF 0%, #FFD700 40%, #FFA500 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                                filter: `drop-shadow(0 15px 40px rgba(0,0,0,0.7)) drop-shadow(0 0 ${Math.min(120, 30 + amount / 15)}px #ff8c00)`,
                            }}
                        >
                            ₺ {amount.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
                        </span>
                        <img src="/games/sweet-bonanza-1000/coin.png" className="w-12 h-12 md:w-24 md:h-24 animate-bounce-coin" style={{ animationDelay: '0.2s' }} />
                    </div>
                    <div className="mt-8 text-center animate-multiplier-temp relative z-50" style={{ perspective: '1200px' }}>
                        {/* 🔥 Multiplier Fire Effects 🔥 */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            {[...Array(Math.min(25, Math.floor((amount / (betAmount || 1)) / 5)))].map((_, i) => (
                                <div key={i} className="absolute bottom-0 w-12 h-24 bg-orange-600 blur-2xl rounded-full animate-flame-rise-fast"
                                    style={{
                                        left: `${20 + Math.random() * 60}%`,
                                        animationDelay: `${Math.random() * 0.5}s`,
                                        height: `${100 + Math.random() * 150}px`,
                                        opacity: 0.8
                                    }} />
                            ))}
                        </div>
                        <span className={`text-7xl md:text-[18rem] font-black italic tracking-tighter drop-shadow-[0_0_80px_rgba(255,215,0,0.8)] golden-shine-stable relative z-10 ${(amount / (betAmount || 1)) >= 50 ? 'animate-multiplier-fire' : ''}`}
                            style={{
                                fontFamily: "'Kanit', sans-serif",
                                fontWeight: 900,
                                background: 'linear-gradient(to b, #FFF9C4 0%, #FFD700 25%, #FFB300 50%, #FFD700 75%, #FBC02D 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                WebkitTextStroke: '6px #CF9A2C',
                                textShadow: '0 20px 40px rgba(0,0,0,0.6), 0 0 20px rgba(212,175,55,0.4)',
                                transform: 'translateZ(150px)',
                            }}>
                            {displayMultiplier}
                        </span>
                    </div>
                </div>
            </div>
            <style dangerouslySetInnerHTML={{
                __html: `
                @import url('https://fonts.googleapis.com/css2?family=Passion+One:wght@400;700;900&family=Luckiest+Guy&family=Fredoka+One&family=Kanit:wght@700;900&display=swap');

                @font-face {
                    font-family: 'Enchanted Land';
                    src: url('/assets/Fonts/Enchanted Land 400.otf') format('opentype');
                    font-weight: normal;
                    font-style: normal;
                }

                @keyframes rotate-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }

                @keyframes float-random {
                    0%, 100% { transform: translate(0, 0); opacity: 0.6; }
                    50% { transform: translate(20px, -30px); opacity: 1; }
                }

                @keyframes confetti-burst {
                    0% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
                    100% { transform: translate(var(--burst-x, 100px), var(--burst-y, -100px)) rotate(var(--rotation, 360deg)); opacity: 0; }
                }

                @keyframes pulse-slow {
                    0%, 100% { opacity: 0.4; transform: scale(1); }
                    50% { opacity: 0.7; transform: scale(1.1); }
                }

                @keyframes pulse-gold {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.05); }
                }

                @keyframes float-text {
                    0%, 100% { transform: translateY(0px) rotate(-1deg); }
                    50% { transform: translateY(-20px) rotate(1deg); }
                }

                .animate-rotate-slow { animation: rotate-slow 20s linear infinite; }
                .animate-float-random { animation: float-random 2s ease-in-out infinite; }
                .animate-confetti-burst { animation: confetti-burst 2s ease-out forwards; }
                .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
                .animate-pulse-gold { animation: pulse-gold 1s ease-in-out infinite; }
                .sparkle-text {
                    background: linear-gradient(
                        to right,
                        #bf953f,
                        #fcf6ba,
                        #b38728,
                        #fbf5b7,
                        #aa771c
                    );
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    filter: drop-shadow(0 0 15px rgba(255, 215, 0, 0.8));
                    animation: sparkle-shimmer 2s linear infinite;
                }

                @keyframes sparkle-shimmer {
                    0% { filter: brightness(1) drop-shadow(0_0_20px_rgba(255,215,0,0.8)); transform: scale(1); }
                    50% { filter: brightness(1.8) drop-shadow(0_0_50px_rgba(255,215,0,1)); transform: scale(1.1); }
                    100% { filter: brightness(1) drop-shadow(0_0_20px_rgba(255,215,0,0.8)); transform: scale(1); }
                }

                @keyframes multiplier-show-hide {
                    0% { transform: scale(0.5) translateZ(-100px) rotateX(20deg); opacity: 0; }
                    10% { transform: scale(1.2) translateZ(50px) rotateX(-10deg); opacity: 1; }
                    20% { transform: scale(1) translateZ(0) rotateX(0deg); opacity: 1; filter: brightness(1.2); }
                    90% { transform: scale(1.05) translateZ(30px) rotateX(5deg); opacity: 1; filter: brightness(1.5); }
                    100% { transform: scale(1.05) translateZ(30px) rotateX(5deg); opacity: 1; filter: brightness(1.5); } /* Removed fade-out */
                }

                .animate-multiplier-temp {
                    animation: multiplier-show-hide 5s cubic-bezier(0.17, 0.67, 0.83, 0.67) forwards;
                    transform-style: preserve-3d;
                }

                @keyframes fire-pulse {
                    0%, 100% { filter: drop-shadow(0 0 20px #ff4500) brightness(1.2); transform: scale(1); }
                    50% { filter: drop-shadow(0 0 50px #ff0000) brightness(1.8); transform: scale(1.05); }
                }

                .animate-multiplier-fire {
                    animation: fire-pulse 0.5s ease-in-out infinite;
                }
            ` }} />
        </div>
    );
};

interface SweetBonanzaProps {
    onNavigate?: (page: string) => void;
}

// 🎊 Confetti Popper Component 🎊
const ConfettiPopper = ({ count = 150 }: { count?: number }) => {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-visible z-[50]">
            {[...Array(count)].map((_, i) => (
                <div key={i} className="absolute left-1/2 top-1/2 w-1.5 h-1.5 rounded-full animate-confetti-pop"
                    style={{
                        backgroundColor: ['#ff4b9d', '#ff8c00', '#ffeb3b', '#4caf50', '#03a9f4', '#ffffff'][i % 6],
                        '--tx': `${(Math.random() - 0.5) * 1000}px`,
                        '--ty': `${-200 - Math.random() * 700}px`,
                        '--tr': `${Math.random() * 1440}deg`,
                        animationDelay: `${Math.random() * 0.4}s`
                    } as any} />
            ))}
        </div>
    );
};

export default function SweetBonanza({ onNavigate }: SweetBonanzaProps) {
    // Game state
    const [balance, setBalance] = useState<number>(0)
    const [betAmount, setBetAmount] = useState<number>(50)
    const [grid, setGrid] = useState<any[]>([])
    const [isSpinning, setIsSpinning] = useState<boolean>(false)
    const [winAmount, setWinAmount] = useState<number>(0)
    const [showFireworks, setShowFireworks] = useState<boolean>(false)
    const [showLossAnimation, setShowLossAnimation] = useState(false)
    const [winningSymbols, setWinningSymbols] = useState<number[]>([])
    const [droppingIndices, setDroppingIndices] = useState<number[]>([])
    const [lastWinColor, setLastWinColor] = useState('#fbbf24')
    const [reelSpeeds, setReelSpeeds] = useState<number[]>([0, 0, 0, 0, 0, 0])
    const [teaserIndices, setTeaserIndices] = useState<Record<number, string>>({})
    const [demoMultiplier, setDemoMultiplier] = useState<number | null>(null)
    const [showMultiplierBadge, setShowMultiplierBadge] = useState(false)
    const reelSpeedsRef = useRef<number[]>([0, 0, 0, 0, 0, 0])
    const [waitingForAdmin, setWaitingForAdmin] = useState(false)
    const [user, setUser] = useState<any>(null)
    const [showSpinMessage, setShowSpinMessage] = useState(false)
    const [currentSpinMessage, setCurrentSpinMessage] = useState('')
    const [showBetSuccess, setShowBetSuccess] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const [isPlacingBet, setIsPlacingBet] = useState(false);
    const [showSettingsModal, setShowSettingsModal] = useState(false)
    const [settings, setSettings] = useState({
        soundEnabled: true,
        musicEnabled: true,
        quickSpin: false,
        showSparkles: true
    })

    const handleToggleSetting = (key: string) => {
        setSettings(prev => ({
            ...prev,
            [key]: !prev[key as keyof typeof prev]
        }))
    }

    const playerSpinMessages = [
        "LET'S BEGIN!",
        "GOOD LUCK!",
        "LET'S WIN!",
        "BIG WIN AWAITS!",
        "SPIN AND WIN!",
        "FEEL THE LUCK!",
        "HERE WE GO!",
        "SWEET SUCCESS!",
        "CANDY FEVER!",
        "GO FOR GOLD!"
    ]

    const spectatorSpinMessages = [
        "JUST WATCHING?",
        "JOIN THE ACTION!",
        "WHO WILL WIN?",
        "NEXT ROUND IS YOURS!",
        "FEEL THE VIBE!"
    ]

    // Lobby / Universal Session state
    const [lobbyPhase, setLobbyPhase] = useState<string>('BETTING')
    const [lobbyTimeLeft, setLobbyTimeLeft] = useState<number>(10)
    const [lobbyRoundId, setLobbyRoundId] = useState<string | null>(null)
    const [userBetSide, setUserBetSide] = useState<string | null>(null)
    const [hasBetInCurrentRound, setHasBetInCurrentRound] = useState<boolean>(false)
    const [lastProcessedRoundId, setLastProcessedRoundId] = useState<string | null>(null)
    const [lobbyViewersCount, setLobbyViewersCount] = useState<number>(0)
    const [lobbyBetsTotals, setLobbyBetsTotals] = useState<{ win: number, loss: number }>({ win: 0, loss: 0 })

    const [lobbyRoundCycle, setLobbyRoundCycle] = useState<number>(1)
    const [lobbyBetsCount, setLobbyBetsCount] = useState<number>(0)
    const [lobbyAdminDecision, setLobbyAdminDecision] = useState<any>(null)
    const [gameScale, setGameScale] = useState<number>(1)

    // Refs for stable access in intervals (Crucial for avoiding stale closures)
    const lobbyRoundIdRef = useRef<string | null>(null)
    const lastProcessedRoundIdRef = useRef<string | null>(null)
    const lobbyPhaseRef = useRef<string>('BETTING')
    const spinningRoundIdRef = useRef<string | null>(null)
    const userBetSideRef = useRef<string | null>(null)
    const betAmountRef = useRef<number>(50)
    const hasBetInCurrentRoundRef = useRef<boolean>(false)

    // Audio refs
    const sounds = useRef<any>({
        bgm: null,
        win: null,
        loss: null,
        spin: null,
        countdown: null,
        multiplier: null,
        click: null
    })

    // Initialize sounds
    useEffect(() => {
        sounds.current.bgm = new Howl({
            src: [bgmSound],
            loop: true,
            volume: 0.3,
            html5: false,
            preload: true,
            format: ['mp3']
        })
        sounds.current.win = new Howl({
            src: [winSound],
            volume: 0.66,
            loop: true,
            html5: false,
            preload: true,
            format: ['mp3']
        })
        sounds.current.loss = new Howl({
            src: [lossSound],
            volume: 0.66,
            loop: true,
            html5: false,
            preload: true,
            format: ['mp3']
        })
        sounds.current.spin = new Howl({
            src: [spinSound],
            loop: true,
            volume: 0.44,
            html5: false,
            preload: true,
            format: ['mp3']
        })
        sounds.current.countdown = new Howl({
            src: [countdownSound],
            volume: 0.44,
            html5: false,
            preload: true,
            format: ['mp3']
        })
        sounds.current.multiplier = new Howl({
            src: [xsound],
            volume: 0.5,
            html5: false,
            preload: true,
            format: ['mp3']
        })
        sounds.current.click = new Howl({
            src: [clickSound],
            volume: 0.8,
            html5: false,
            preload: true,
            format: ['mp3']
        })

        const playBgm = () => {
            if (sounds.current.bgm && !sounds.current.bgm.playing()) {
                sounds.current.bgm.play()
            }
        }
        document.addEventListener('click', playBgm, { once: true })

        return () => {
            document.removeEventListener('click', playBgm)
            Object.values(sounds.current).forEach((sound: any) => {
                if (sound && typeof sound.unload === 'function') sound.unload()
            })
        }
    }, [])

    const playClickSound = () => {
        if (settings.soundEnabled && sounds.current.click) {
            sounds.current.click.stop();
            sounds.current.click.play();
        }
    };

    // Slot scrolling sound
    useEffect(() => {
        if (isSpinning && settings.soundEnabled) {
            sounds.current.spin?.play()
        } else {
            sounds.current.spin?.stop()
        }
    }, [isSpinning, settings.soundEnabled])

    // Win/Loss sounds
    useEffect(() => {
        if (showFireworks && settings.soundEnabled) {
            sounds.current.win?.play()
        } else {
            sounds.current.win?.stop()
        }
    }, [showFireworks, settings.soundEnabled])

    useEffect(() => {
        if (showLossAnimation && settings.soundEnabled) {
            sounds.current.loss?.play()
        } else {
            sounds.current.loss?.stop()
        }
    }, [showLossAnimation, settings.soundEnabled])

    // Countdown sound logic - throttled to play once per tick
    useEffect(() => {
        if (!settings.soundEnabled) {
            sounds.current.countdown?.stop();
            return;
        }

        if (lobbyPhase === 'BETTING' && lobbyTimeLeft > 0) {
            if (!sounds.current.countdown?.playing()) {
                sounds.current.countdown?.play()
            }
        } else if (lobbyTimeLeft <= 3 && lobbyTimeLeft > 0) {
            if (!sounds.current.countdown?.playing()) {
                sounds.current.countdown?.play()
            }
        }
    }, [lobbyTimeLeft, lobbyPhase, settings.soundEnabled])

    // Music control
    useEffect(() => {
        if (settings.musicEnabled) {
            if (sounds.current.bgm && !sounds.current.bgm.playing()) {
                sounds.current.bgm.play()
            }
        } else {
            sounds.current.bgm?.stop()
        }
    }, [settings.musicEnabled])

    useEffect(() => {
        lobbyRoundIdRef.current = lobbyRoundId
    }, [lobbyRoundId])

    useEffect(() => {
        lastProcessedRoundIdRef.current = lastProcessedRoundId
    }, [lastProcessedRoundId])

    useEffect(() => {
        lobbyPhaseRef.current = lobbyPhase
    }, [lobbyPhase])

    useEffect(() => {
        userBetSideRef.current = userBetSide
    }, [userBetSide])

    useEffect(() => {
        betAmountRef.current = betAmount
    }, [betAmount])

    useEffect(() => {
        hasBetInCurrentRoundRef.current = hasBetInCurrentRound
    }, [hasBetInCurrentRound])
    // Free spins state
    const [isFreeSpins, setIsFreeSpins] = useState(false)
    const [freeSpinsRemaining, setFreeSpinsRemaining] = useState(0)
    const [freeSpinType, setFreeSpinType] = useState<'regular' | 'super' | null>(null)

    // UI state
    const [isDesktop, setIsDesktop] = useState(false)
    const [doubleChance, setDoubleChance] = useState(false)
    const [turboSpin, setTurboSpin] = useState(false)
    const [quickSpin, setQuickSpin] = useState(false)
    const [showAutoplayModal, setShowAutoplayModal] = useState(false)
    const [isAutoplayActive, setIsAutoplayActive] = useState(false)
    const [autoplayCount, setAutoplayCount] = useState(10)
    const [pageLoading, setPageLoading] = useState(true)
    const [loadingProgress, setLoadingProgress] = useState(0)
    /* [DELETED: MOVED UP] */

    // Symbols - Corrected to match actual file names
    const symbols = [
        { id: 'oval', image: '/games/sweet-bonanza-1000/oval.png', multiplier: 2 },
        { id: 'grapes', image: '/games/sweet-bonanza-1000/grapes.png', multiplier: 3 },
        { id: 'watermelon', image: '/games/sweet-bonanza-1000/watermelon.png', multiplier: 4 },
        { id: 'apple', image: '/games/sweet-bonanza-1000/apple.png', multiplier: 5 },
        { id: 'plum', image: '/games/sweet-bonanza-1000/plum.png', multiplier: 6 },
        { id: 'banana', image: '/games/sweet-bonanza-1000/banana.png', multiplier: 8 },
        { id: 'heart', image: '/games/sweet-bonanza-1000/heart.png', multiplier: 10 },
        { id: 'scatter', image: '/games/sweet-bonanza-1000/scatter.png', multiplier: 0 }
    ]

    // Initialize grid (6 columns × 5 rows = 30 symbols)
    useEffect(() => {
        const initialGrid = Array(30).fill(null).map(() => symbols[Math.floor(Math.random() * (symbols.length - 1))])
        setGrid(initialGrid)
    }, [])

    // Unified user data fetching and loading simulation
    const fetchUserData = async () => {
        try {
            const response = await authAPI.me()
            const userData = response?.data || response || null
            if (userData) {
                console.log('[DEBUG] Fetched User Balance:', userData.balance);
                console.log('[DEBUG] User Role:', userData.role);
                console.log('[DEBUG] Full User Data:', userData);
                const userBalance = userData.balance !== undefined ? userData.balance :
                    (userData.user?.balance !== undefined ? userData.user.balance : 0)
                setBalance(userBalance)
                setUser(userData)
                try {
                    localStorage.setItem('user', JSON.stringify(userData));
                    // Emit event for real-time sync across components
                    window.dispatchEvent(new CustomEvent('userUpdated', { detail: userData }));
                } catch (e) { }
            }
        } catch (err: any) {
            console.error('Error fetching user data:', err)
        }
    }

    useEffect(() => {
        let progress = 0
        const interval = setInterval(() => {
            progress += Math.random() * 15
            if (progress >= 100) {
                progress = 100
                setPageLoading(false)
                clearInterval(interval)
            }
            setLoadingProgress(Math.floor(progress))
        }, 100)


        const handleResize = () => {
            const mobile = window.innerWidth < 1024
            setIsDesktop(!mobile)
            // Universal scaling:
            // Desktop: Target resolution 1920x1080 (16:9)
            // Mobile: Target resolution 1080x1920 (9:16)
            const baseWidth = mobile ? 1080 : 1920
            const baseHeight = mobile ? 1920 : 1080
            const widthScale = window.innerWidth / baseWidth
            const heightScale = window.innerHeight / baseHeight
            setGameScale(Math.min(widthScale, heightScale))
        }
        handleResize()
        window.addEventListener('resize', handleResize)

        // Background Music is now handled by Howl refs above

        fetchUserData()
        const balanceInterval = setInterval(fetchUserData, 3000)

        // Lobby Polling (Stable Interval)
        const pollLobby = async () => {
            try {
                const response = await sweetBonanzaAPI.getSession();
                const session = response?.data?.data || response?.data || response;

                // Add robust logging to debug "stuck" issues
                if (Math.random() > 0.9) console.log('[LOBBY] Session Active:', { phase: session?.phase, timeLeft: session?.timeLeft, roundId: session?.roundId });

                if (!session || typeof session !== 'object') {
                    console.warn('[LOBBY] Invalid session data received:', session);
                    return;
                }

                const currentPhase = session.phase || session.status || 'BETTING';
                setLobbyPhase(currentPhase);

                const timeLeft = typeof session.timeLeft === 'number' ? session.timeLeft : parseInt(session.timeLeft || '0');
                setLobbyTimeLeft(timeLeft);
                setLobbyViewersCount(session.viewersCount || 0);
                setLobbyBetsTotals(session.betsTotals || { win: 0, loss: 0 });
                setLobbyRoundCycle(session.roundCycle || 1);
                setLobbyBetsCount(session.betsCount || 0);
                setLobbyAdminDecision(session.adminDecision || null);



                // Always sync Round ID to avoid getting "stuck" when joining mid-game
                if (session.roundId !== lobbyRoundIdRef.current) {
                    if (session.phase === 'BETTING') {
                        // Reset state for new round
                        setHasBetInCurrentRound(false);
                        hasBetInCurrentRoundRef.current = false;
                        setUserBetSide(null);
                        userBetSideRef.current = null;
                        setWinningSymbols([]);
                        setShowFireworks(false);
                        setShowLossAnimation(false);
                        setWinAmount(0);
                        // [REMOVED: setLobbyTopWinners([])] - Keep winners from last round for motivation
                    }
                    setLobbyRoundId(session.roundId);
                    lobbyRoundIdRef.current = session.roundId;
                }

                if (session.phase === 'SPINNING') {
                    if (session.roundId !== spinningRoundIdRef.current && session.roundId !== lastProcessedRoundIdRef.current) {
                        spinningRoundIdRef.current = session.roundId;
                        startLobbySpin();
                    }
                }

                if (session.phase === 'RESULT' && session.result && session.roundId !== lastProcessedRoundIdRef.current) {
                    processLobbyResult(session.result, session.roundId);
                } else if (session.phase === 'RESULT' && !session.result && isSpinning) {
                    // Safety: stop spinning if server is in result but has no result data yet
                    setIsSpinning(false);
                    setReelSpeeds([0, 0, 0, 0, 0, 0]);
                }

            } catch (err: any) {
                console.error('Lobby poll error:', err);
            }
        };

        const lobbyInterval = setInterval(pollLobby, 1000);
        pollLobby();

        return () => {
            clearInterval(interval)
            clearInterval(balanceInterval)
            clearInterval(lobbyInterval)
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    const startLobbySpin = () => {
        setIsSpinning(true);
        setReelSpeeds([1, 1, 1, 1, 1, 1]);
        reelSpeedsRef.current = [1, 1, 1, 1, 1, 1];

        // Trigger random spin message - use Ref for latest value
        const messages = hasBetInCurrentRoundRef.current ? playerSpinMessages : spectatorSpinMessages;
        setCurrentSpinMessage(messages[Math.floor(Math.random() * messages.length)]);
        setShowSpinMessage(true);
        setTimeout(() => setShowSpinMessage(false), 1200);
    };

    const processLobbyResult = async (result: any, roundId: any) => {
        setWinningSymbols([]);
        const currentBetSide = userBetSideRef.current;
        const currentBetAmount = betAmountRef.current;

        console.log('[RESULT] CRITICAL CHECK:', {
            roundId,
            serverOutcome: result.outcome,
            winningPositionsCount: result.winningPositions?.length,
            localUserBetSide: currentBetSide,
            match: currentBetSide === result.outcome
        });

        setWinningSymbols(result.winningPositions || []);

        setLastProcessedRoundId(roundId);
        lastProcessedRoundIdRef.current = roundId; // Update ref immediately


        // Sync reels
        const finalFlatGrid = Array(30).fill(null);
        for (let c = 0; c < 6; c++) {
            for (let r = 0; r < 5; r++) {
                const symId = result.reels[c][r];
                finalFlatGrid[r * 6 + c] = symbols.find(s => s.id === symId) || symbols[0];
            }
        }
        setGrid(finalFlatGrid);

        // Stop reels sequentially
        const stopDelay = settings.quickSpin ? 50 : 200;
        for (let i = 0; i < 6; i++) {
            await new Promise(resolve => setTimeout(resolve, stopDelay + i * 50)); // Responsive delay
            reelSpeedsRef.current[i] = 0;
            setReelSpeeds([...reelSpeedsRef.current]);
        }

        // --- TEASER MULTIPLIER PHASE ---
        const isWin = currentBetSide === result.outcome;
        const teaserCount = isWin ? Math.floor(Math.random() * 5) + 6 : Math.floor(Math.random() * 3) + 2;
        const potentialMultipliers = [10, 25, 50, 75, 100, 200, 500, 1000];
        const newTeasers: Record<number, string> = {};
        const availableIndices = Array.from({ length: 30 }, (_, i) => i);

        // Pick random spots to show multipliers
        for (let i = 0; i < teaserCount; i++) {
            if (availableIndices.length === 0) break;
            const randIdx = Math.floor(Math.random() * availableIndices.length);
            const gridIdx = availableIndices.splice(randIdx, 1)[0];
            newTeasers[gridIdx] = String(potentialMultipliers[Math.floor(Math.random() * potentialMultipliers.length)]);
        }

        // Staggered appearance of multipliers
        const teaserIndicesList = Object.keys(newTeasers).map(Number);
        for (const idx of teaserIndicesList) {
            setTeaserIndices(prev => ({ ...prev, [idx]: String(newTeasers[idx]) }));
            if (settings.soundEnabled) {
                sounds.current.multiplier?.play();
            }
            // Small delay between each multiplier appearance
            await new Promise(resolve => setTimeout(resolve, 150));
        }

        // Play win sound during teaser for excitement if it's a win
        if (settings.soundEnabled && isWin) {
            sounds.current.win?.play();
        }

        // Wait for teaser duration (~4.0 seconds total life)
        await new Promise(resolve => setTimeout(resolve, 4000));

        setTeaserIndices({});
        if (settings.soundEnabled && !isWin) {
            sounds.current.win?.stop(); // Stop sound if it's actually a loss
        }
        // -------------------------------

        setTimeout(() => {
            setIsSpinning(false);

            if (isWin) {
                console.log('[RESULT] => TRIGGERING WIN SCREEN');
                const winAmt = currentBetAmount * 2;
                setWinAmount(winAmt);
                setShowFireworks(true);

                // Count-up animation for balance
                const duration = 2000;
                const startTime = Date.now();
                const startBalance = balance;
                const endBalance = balance + winAmt;

                const animateBalance = () => {
                    const elapsed = Date.now() - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const currentBalance = startBalance + (winAmt * progress);
                    setBalance(currentBalance);

                    if (progress < 1) {
                        requestAnimationFrame(animateBalance);
                    } else {
                        fetchUserData(); // Final sync with server
                    }
                };
                requestAnimationFrame(animateBalance);

                setTimeout(() => setShowFireworks(false), 5000);

                // Demo: Trigger visual multiplier badge (no actual calculation)
                const demoMultipliers = [2, 5, 10, 25, 50, 100];
                const randomMultiplier = demoMultipliers[Math.floor(Math.random() * demoMultipliers.length)];
                setDemoMultiplier(randomMultiplier);
                setShowMultiplierBadge(true);
                setTimeout(() => setShowMultiplierBadge(false), 4000);
            } else if (currentBetSide) {
                console.log('[RESULT] => TRIGGERING LOSS SCREEN');
                setShowLossAnimation(true);
                setTimeout(() => setShowLossAnimation(false), 2000); // 2 second duration for consistency
            } else {
                console.log('[RESULT] => VIEWER ONLY (NO BET)');
            }
        }, 200);
    };

    const handlePlaceLobbyBet = async (side: any) => {
        // Prevent double-clicks during processing
        if (isPlacingBet) {
            console.log('[BET] Already processing a bet, ignoring click');
            return;
        }

        // Immediately capture current state to avoid stale closures
        const currentPhase = lobbyPhase;
        const currentBalance = balance;
        const currentBetAmount = betAmount;

        playClickSound();
        console.log('[BET] Attempting to place bet:', { side, hasBetInCurrentRound: hasBetInCurrentRoundRef.current, lobbyPhase: currentPhase, balance: currentBalance, betAmount: currentBetAmount });

        if (currentPhase !== 'BETTING') {
            console.log('[BET] Bet blocked: Not in BETTING phase');
            return;
        }

        // Allow re-choice: check if balance is enough (adding back old bet if exists)
        // Note: we'll use a simplified check here, server does the strict check
        if (currentBetAmount < 50) {
            console.log('[BET] Bet blocked: Below minimum');
            alert('Minimum bet is ₺50');
            return;
        }

        if (currentBalance < currentBetAmount) {
            console.log('[BET] Bet blocked: Insufficient balance');
            alert('Insufficient balance');
            return;
        }

        // Mark as processing
        setIsPlacingBet(true);

        // IMMEDIATE UI UPDATE - Register the choice instantly
        setUserBetSide(side);
        setHasBetInCurrentRound(true);
        setShowBetSuccess(true);
        setShowConfetti(true);

        // Immediate local subtraction
        setBalance(prev => prev - currentBetAmount);

        // Then handle the async server call without blocking UI
        try {
            console.log('[BET] Sending bet to server:', { betAmount: currentBetAmount, side });
            const response = await sweetBonanzaAPI.placeLobbyBet(currentBetAmount, side);
            console.log('[BET] Bet successful:', response.data);

            // Hide success message after animation
            setTimeout(() => setShowBetSuccess(false), 2000);
            setTimeout(() => setShowConfetti(false), 3000);
        } catch (err: any) {
            console.error('[BET] Bet placement failed:', err);

            // Rollback UI changes on error
            setUserBetSide(null);
            setHasBetInCurrentRound(false);
            setShowBetSuccess(false);
            setShowConfetti(false);
            setBalance(prev => prev + currentBetAmount);

            alert(err.response?.data?.message || 'Failed to place bet');
        } finally {
            // Reset processing flag
            setIsPlacingBet(false);
        }
    };

    const handleAdminDecision = async (decision: any) => {
        try {
            await sweetBonanzaAPI.submitAdminDecision(decision);
            console.log(`Admin decision sent: ${decision}`);
        } catch (err) {
            console.error('Admin decision failed:', err);
            alert('Failed to send admin decision');
        }
    }

    const handleSpin = () => {
        // Disabled for lobby mode
    }

    const checkWinAfterStop = (gameData: any, finalGrid: any) => {
        // Calculate which items to highlight based on counts >= 8
        const symbolCounts: Record<string, number[]> = {}
        finalGrid.forEach((symbol: any, idx: number) => {
            if (!symbolCounts[symbol.id]) {
                symbolCounts[symbol.id] = []
            }
            symbolCounts[symbol.id].push(idx)
        })

        let winIndices: number[] = []
        Object.entries(symbolCounts).forEach(([symbolId, indices]) => {
            if (indices.length >= 8 && symbolId !== 'scatter') {
                winIndices.push(...indices)
            }
        })

        if (winIndices.length > 0 || gameData.winAmount > 0) {
            setWinningSymbols(winIndices)
            setLastWinColor(gameData.winAmount >= betAmount * 5 ? '#f59e0b' : '#10b981')
            setShowFireworks(true)
            setTimeout(() => setShowFireworks(false), 3000)
        }
    }

    const updateBalance = (type: string, amount: number) => {
        setBalance(prev => type === 'add' ? prev + amount : prev - amount)
    }

    const handleBuyFreeSpins = (type: 'regular' | 'super') => {
        const cost = type === 'regular' ? betAmount * 100 : betAmount * 500
        if (balance < cost) return

        updateBalance('subtract', cost) // Using the new helper function
        setIsFreeSpins(true)
        setFreeSpinType(type)
        setFreeSpinsRemaining(type === 'regular' ? 10 : 15)
    }

    const adjustBet = (delta: number) => {
        playClickSound();
        setBetAmount(prev => Math.max(50, Math.min(1000, prev + delta)))
    }

    if (pageLoading) return <PragmaticLoading progress={loadingProgress} />

    return (
        <div className="h-screen h-[100dvh] overflow-hidden bg-[#0f172a] text-white flex flex-col font-sans select-none relative">
            {/* Background */}
            <div className="fixed inset-0 bg-cover bg-center pointer-events-none opacity-60 scale-110"
                style={{ backgroundImage: 'url("/games/sweet-bonanza-1000/background.png")' }} />




            {/* Static Background */}
            <div className="fixed inset-0 z-0 bg-[#87CEFA]">
                <img
                    src="/assets/bgm/sweet_bonanza_bg_desktop.png"
                    className="w-full h-full object-cover opacity-90"
                    alt="Background"
                />
            </div>

            {/* Sparkle Rain Effect */}
            {settings.showSparkles && (
                <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
                    {[...Array(60)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute bg-white rounded-full animate-sparkle-fall"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `-${Math.random() * 20}%`,
                                width: `${3 + Math.random() * 10}px`,
                                height: `${3 + Math.random() * 10}px`,
                                animationDuration: `${lobbyPhase === 'SPINNING' ? '4s' : '15s'}`,
                                animationDelay: `${-Math.random() * 15}s`,
                                filter: 'blur(1px) drop-shadow(0 0 10px white)',
                                opacity: 0.1 + Math.random() * 0.5
                            }}
                        />
                    ))}
                </div>
            )}

            {/* Scaling Game Stage */}
            <div className="fixed inset-0 flex items-center justify-center overflow-hidden z-10 pointer-events-none">
                {/* Navigation and Settings Overlay (Fixed to Viewport) */}
                {/* Top HUD: Home & Settings */}
                <div className="absolute top-6 left-6 z-[200] flex gap-4 pointer-events-auto" style={{ perspective: '1000px' }}>
                    <button
                        onClick={() => { playClickSound(); onNavigate?.('home'); }}
                        style={{ transformStyle: 'preserve-3d' }}
                        className="w-16 h-16 md:w-20 md:h-20 bg-black/60 hover:bg-black/80 backdrop-blur-md rounded-2xl border-4 border-white/20 flex items-center justify-center transition-all hover:translate-z-4 active:translate-z-[-10px] shadow-[0_8px_0_rgba(255,255,255,0.1),0_15px_30px_rgba(0,0,0,0.4)] active:shadow-none active:translate-y-2 group"
                    >
                        <Home className="w-8 h-8 md:w-10 md:h-10 text-white group-hover:text-yellow-400 transition-colors" />
                    </button>
                    <button
                        onClick={() => { playClickSound(); setShowSettingsModal(true); }}
                        style={{ transformStyle: 'preserve-3d' }}
                        className="w-16 h-16 md:w-20 md:h-20 bg-black/60 hover:bg-black/80 backdrop-blur-md rounded-2xl border-4 border-white/20 flex items-center justify-center transition-all hover:translate-z-4 active:translate-z-[-10px] shadow-[0_8px_0_rgba(255,255,255,0.1),0_15px_30px_rgba(0,0,0,0.4)] active:shadow-none active:translate-y-2 group"
                    >
                        <SettingsIcon className="w-8 h-8 md:w-10 md:h-10 text-white group-hover:rotate-90 transition-all" />
                    </button>
                </div>

                <div className="relative pointer-events-auto"
                    style={{
                        transform: `scale(${gameScale})`,
                        transformOrigin: 'center center',
                        width: isDesktop ? '1920px' : '1080px',
                        height: isDesktop ? '1080px' : '1920px',
                        flexShrink: 0
                    }}>

                    <SettingsModal
                        isOpen={showSettingsModal}
                        onClose={() => setShowSettingsModal(false)}
                        settings={settings}
                        onToggleSetting={handleToggleSetting}
                    />
                    {isDesktop ? (
                        /* DESKTOP LAYOUT (70/30 SPLIT) */
                        <div className="absolute inset-x-0 top-[125px] bottom-32 flex items-center justify-between px-24">
                            {/* LEFT: Game Grid Area & Status Controls - Middle Aligned */}
                            <div className="flex flex-col justify-center items-center gap-10">
                                <div className="relative flex items-center justify-center" style={{ perspective: '2500px' }}>
                                    {/* Volumetric Cabinet Base (Grounding) */}
                                    <div className="absolute -bottom-10 w-[95%] h-20 bg-black/40 blur-3xl rounded-full"
                                        style={{ transform: 'translateZ(-100px) rotateX(90deg)' }} />

                                    {/* Cabinet 3D Side Walls (thickness) */}
                                    <div className="absolute inset-0 bg-white/10 rounded-[3.5rem] border-[2px] border-white/5"
                                        style={{ transform: 'translateZ(-40px) scale(1.02) rotateX(8deg) rotateY(-2deg)', filter: 'blur(1px)' }} />

                                    <div className="bg-[#4682B4]/90 backdrop-blur-3xl rounded-[3.5rem] p-4 border-[14px] border-white shadow-[0_80px_160px_rgba(0,0,0,0.9),inset_0_-20px_40px_rgba(255,255,255,0.2)] relative overflow-visible group transition-all duration-700 animate-cabinet-sway"
                                        style={{
                                            transform: 'rotateX(8deg) rotateY(-2deg)',
                                            transformStyle: 'preserve-3d'
                                        }}>
                                        {/* 🎨 BEATING NEON LINES SYSTEM 🎨 */}
                                        <div className="absolute -inset-10 pointer-events-none z-[-1]" style={{ transform: 'translateZ(-50px)' }}>
                                            <div className={`absolute inset-0 border-[6px] border-cyan-400/30 rounded-[5rem] blur-xl
                                                ${lobbyPhase === 'BETTING' ? 'animate-neon-breathe' :
                                                    lobbyPhase === 'SPINNING' ? 'animate-neon-dissolve' : 'animate-neon-burn'}`} />
                                            <div className={`absolute inset-4 border-[4px] border-pink-400/40 rounded-[4.5rem] blur-md
                                                ${lobbyPhase === 'BETTING' ? 'animate-neon-breathe' :
                                                    lobbyPhase === 'SPINNING' ? 'animate-neon-dissolve-delayed' : 'animate-neon-burn'}`} />
                                        </div>
                                        <div className={`grid grid-cols-6 gap-3 bg-gradient-to-b from-[#87CEEB]/20 to-[#4682B4]/40 rounded-[2.8rem] p-4 shadow-[inset_0_30px_60px_rgba(0,0,0,0.6),inset_0_0_100px_rgba(0,0,0,0.4)] relative overflow-visible ${reelSpeeds.some(s => s > 0) ? 'overflow-hidden' : 'overflow-visible'}`}
                                            style={{ width: '960px', height: '780px', transform: 'translateZ(20px)' }}>

                                            {/* Glass Reflection Overlay */}
                                            <div className="absolute inset-0 z-[1] pointer-events-none rounded-[2.8rem] overflow-hidden">
                                                <div className="absolute -inset-[100%] bg-gradient-to-br from-white/10 via-transparent to-white/5 rotate-45 transform translate-y-[-10%] transition-transform duration-1000 group-hover:translate-y-0" />
                                            </div>

                                            {[0, 1, 2, 3, 4, 5].map(colIdx => (
                                                <div key={colIdx} className={`h-full relative ${reelSpeeds[colIdx] > 0 ? 'overflow-hidden' : 'overflow-visible'}`}>
                                                    <div className={`flex flex-col gap-4 ${reelSpeeds[colIdx] > 0 ? 'animate-reel-scroll' : ''}`}>
                                                        {(reelSpeeds[colIdx] > 0 ?
                                                            [...Array(3)].flatMap(() => [0, 1, 2, 3, 4].map(r => grid[r * 6 + colIdx])) :
                                                            [0, 1, 2, 3, 4].map(r => grid[r * 6 + colIdx])
                                                        ).map((symbol, rowIdx) => {
                                                            const actualIdx = (rowIdx % 5) * 6 + colIdx;
                                                            const isWinning = winningSymbols.includes(actualIdx) && reelSpeeds[colIdx] === 0;
                                                            return (
                                                                <div key={rowIdx} className={`relative w-[140px] h-[140px] flex items-center justify-center transition-all duration-500 ${isWinning ? 'animate-match-pop z-20' : ''}`}
                                                                    style={{ transformStyle: 'preserve-3d' }}>
                                                                    {symbol && (
                                                                        <img src={symbol.image} alt="" className={`w-full h-full object-contain drop-shadow-2xl transition-transform duration-300 hover:scale-125 hover:translate-z-[40px] ${teaserIndices[actualIdx] ? 'animate-symbol-shatter' : (lobbyPhase === 'BETTING' ? 'animate-symbol-breathe-heavy' : '')}`}
                                                                            style={{
                                                                                filter: teaserIndices[actualIdx] ? 'url(#fire-fluid)' : '',
                                                                                transform: 'translateZ(10px)',
                                                                                animationDuration: '0.8s'
                                                                            }} />
                                                                    )}
                                                                    {teaserIndices[actualIdx] && (
                                                                        <div className="absolute inset-0 flex items-center justify-center z-[150] animate-multiplier-stay pointer-events-none"
                                                                            style={{ transformStyle: 'preserve-3d', perspective: '1200px' }}>
                                                                            <div className="multiplier-coin" />
                                                                            <div className="multiplier-coin-highlight" />
                                                                            {/* High-Impact Radial Flash (Fixed Delay) */}
                                                                            <div className="absolute w-40 h-40 rounded-full animate-high-impact-flash opacity-0"
                                                                                style={{ background: 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,215,0,0.6) 40%, transparent 70%)', animationDelay: '0.2s' }} />

                                                                            {/* Multiplier Fire Scaling Effect - Constantly burning */}
                                                                            <div className="absolute bottom-0 flex justify-center w-full">
                                                                                {[...Array(Math.min(10, Math.floor(parseInt(teaserIndices[actualIdx]) / 10)))].map((_, i) => (
                                                                                    <div key={i} className="w-8 h-16 bg-red-600 blur-md rounded-full animate-flame-rise-fast"
                                                                                        style={{
                                                                                            left: `${20 + Math.random() * 60}%`,
                                                                                            animationDelay: `${Math.random() * 0.8}s`,
                                                                                            height: `${parseInt(teaserIndices[actualIdx]) > 50 ? 100 + Math.random() * 50 : 60}px`,
                                                                                            filter: 'url(#fire-fluid)',
                                                                                            opacity: 0.8
                                                                                        }} />
                                                                                ))}
                                                                            </div>

                                                                            {/* Smash Debris Particles */}
                                                                            {[...Array(12)].map((_, i) => (
                                                                                <div key={i} className="absolute w-5 h-5 bg-gradient-to-br from-yellow-300 to-orange-600 rotate-45 animate-smash-debris-large blur-[1px]"
                                                                                    style={{
                                                                                        '--dx': `${(Math.random() - 0.5) * 400}px`,
                                                                                        '--dy': `${(Math.random() - 0.5) * 400}px`,
                                                                                        animationDelay: '0.2s'
                                                                                    } as any} />
                                                                            ))}
                                                                            <span className={`text-[5rem] font-black italic ${parseInt(teaserIndices[actualIdx]) >= 50 ? 'animate-multiplier-fire' : ''} golden-shine`}
                                                                                style={{
                                                                                    fontFamily: "'Kanit', sans-serif",
                                                                                    fontWeight: 900,
                                                                                    color: '#FFD700',
                                                                                    background: 'linear-gradient(to bottom, #FFF9C4 0%, #FFD700 30%, #FFB300 60%, #CF9A2C 100%)',
                                                                                    WebkitBackgroundClip: 'text',
                                                                                    WebkitTextFillColor: 'currentColor',
                                                                                    WebkitTextStroke: '5px #5D4418',
                                                                                    transform: 'translateZ(100px) scale(1.0)',
                                                                                    filter: parseInt(teaserIndices[actualIdx]) >= 50
                                                                                        ? `drop-shadow(0 0 ${Math.min(90, parseInt(teaserIndices[actualIdx]) / 2)}px #ff4500) drop-shadow(0 0 25px #fff)`
                                                                                        : 'drop-shadow(0 0 35px rgba(0,0,0,0.85)) drop-shadow(0 0 18px rgba(255,255,255,0.6))',
                                                                                    textShadow: '0 2px 0 #7a5415, 0 4px 0 #5d3f10, 0 8px 16px rgba(0,0,0,0.6)',
                                                                                    position: 'relative',
                                                                                    zIndex: 2
                                                                                }}>
                                                                                {teaserIndices[actualIdx]}X
                                                                            </span>
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

                                {/* Phase Indicators & Timer (Moved under Grid) - Middle Aligned */}
                                <div className="flex flex-col items-center gap-6 scale-90">
                                    <div className="flex gap-6 justify-center">
                                        {['BETTING', 'SPINNING', 'RESULT'].map(p => (
                                            <div key={p} className={`px-12 py-3 rounded-full text-3xl font-black transition-all duration-500 border-4 shadow-2xl relative overflow-hidden ${lobbyPhase === p
                                                ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white border-yellow-400 scale-110 -translate-y-2 animate-phase-fire'
                                                : 'bg-black/70 text-white/30 border-transparent'}`}>
                                                {lobbyPhase === p && (
                                                    <div className="absolute inset-x-0 bottom-0 flex justify-around pointer-events-none">
                                                        {[...Array(6)].map((_, i) => (
                                                            <div key={i} className="w-2 h-4 bg-yellow-400 blur-sm rounded-full animate-flame-rise-fast"
                                                                style={{ animationDelay: `${Math.random() * 0.5}s`, left: `${i * 20}%` }} />
                                                        ))}
                                                    </div>
                                                )}
                                                {p}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="bg-black/95 px-14 py-4 rounded-[2.5rem] border-[4px] border-white/10 flex items-center justify-center shadow-[0_0_50px_rgba(0,0,0,0.8)] min-w-[320px]">
                                        <span className="text-6xl font-black text-white italic tabular-nums tracking-tighter">00:{lobbyTimeLeft.toString().padStart(2, '0')}</span>
                                    </div>
                                </div>
                            </div>



                            {/* RIGHT: Logo & Controls */}
                            <div className="w-[500px] h-full flex flex-col items-center justify-center gap-16 pt-10">
                                {/* Premium Logo with Conditional Fire */}
                                <div className={`flex flex-col items-center select-none scale-100 relative ${lobbyPhase === 'SPINNING' ? 'animate-title-fire' : ''}`}>
                                    {/* Fire Flame Particles for Title */}
                                    {lobbyPhase === 'SPINNING' && [...Array(12)].map((_, i) => (
                                        <div key={i} className="absolute bottom-0 w-8 h-12 bg-orange-500 blur-xl rounded-full animate-flame-rise-fast"
                                            style={{ left: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 0.4}s` }} />
                                    ))}
                                    <span className="text-[120px] italic leading-none"
                                        style={{
                                            fontFamily: "'Enchanted Land', cursive", color: '#ff4b9d', WebkitTextStroke: '4px #ff4b9d', fontWeight: 900,
                                            filter: 'drop-shadow(0 0 10px #fff) drop-shadow(0 0 25px rgba(255, 215, 0, 0.8))',
                                            textShadow: '0 1px 0 #d43f8d, 0 2px 0 #bb387c, 0 3px 0 #a2306c, 0 4px 0 #89295b, 0 5px 0 #6f214a, 0 10px 20px rgba(0,0,0,.5)',
                                            transform: 'translateZ(60px)'
                                        }}>SWEET</span>
                                    <span className="text-[130px] italic leading-none -mt-8"
                                        style={{
                                            fontFamily: "'Enchanted Land', cursive", color: '#F57C00', WebkitTextStroke: '5px #F57C00', fontWeight: 900,
                                            filter: 'drop-shadow(0 0 12px #fff) drop-shadow(0 0 35px rgba(255, 215, 0, 0.9))',
                                            textShadow: '0 1px 0 #e67500, 0 2px 0 #d76d00, 0 3px 0 #c86600, 0 4px 0 #b95e00, 0 5px 0 #aa5600, 0 10px 25px rgba(0,0,0,.6)',
                                            transform: 'translateZ(80px)'
                                        }}>BONANZA</span>
                                    <span className={`text-[110px] italic leading-none -mt-5 ${lobbyPhase === 'SPINNING' ? 'animate-title-shimmer animate-title-ember' : ''}`}
                                        style={{
                                            fontFamily: "'Enchanted Land', cursive", color: '#D32F2F', WebkitTextStroke: '2px #D32F2F', fontWeight: 900,
                                            filter: 'drop-shadow(0 0 10px #fff) drop-shadow(0 0 25px rgba(255, 215, 0, 0.9)) drop-shadow(0 0 45px rgba(255, 69, 0, 0.6))',
                                            textShadow: '0 1px 0 #c22b2b, 0 2px 0 #b12727, 0 3px 0 #a02323, 0 4px 0 #8f2020, 0 6px 0 #7e1c1c, 0 12px 20px rgba(0,0,0,.6)',
                                            letterSpacing: '2px',
                                            transform: 'translateZ(110px)',
                                            backgroundImage: 'linear-gradient(120deg, #ffd54f, #ff7043, #ff1744, #ffd54f)',
                                            backgroundSize: '200% 200%',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent'
                                        }}>1000</span>
                                </div>

                                {/* Betting Controls */}
                                <div className="w-full flex flex-col gap-10">
                                    <div className="flex gap-8 h-40">
                                        <button
                                            onClick={() => handlePlaceLobbyBet('win')}
                                            disabled={lobbyPhase !== 'BETTING' || isPlacingBet}
                                            style={{ transformStyle: 'preserve-3d' }}
                                            className={`flex-1 rounded-[2.5rem] border-[6px] transition-all duration-300 hover:translate-z-[-10px] active:translate-z-[-20px] flex items-center justify-center text-6xl font-black italic shadow-[0_15px_0_rgb(56,142,60),0_25px_40px_rgba(0,0,0,0.6)] active:shadow-none active:translate-y-[15px] relative
                                            ${userBetSide === 'win'
                                                    ? 'bg-[#558B2F] border-yellow-400 scale-105 z-10 animate-neon-pulse-green'
                                                    : 'bg-[#558B2F]/60 border-white/20 hover:bg-[#558B2F]/80 hover:border-white/40'}`}
                                        >
                                            {userBetSide === 'win' && (
                                                <>
                                                    {showConfetti && <ConfettiPopper />}
                                                    <div className="absolute inset-0 bg-white/10 animate-pulse" />
                                                    <div className="absolute top-2 right-2 bg-yellow-400 text-black text-xs font-black px-2 py-1 rounded-bl-lg transform rotate-3 shadow-lg z-20 scale-150 origin-top-right">YOUR CHOICE</div>
                                                </>
                                            )}
                                            WIN
                                        </button>
                                        <button
                                            onClick={() => handlePlaceLobbyBet('loss')}
                                            disabled={lobbyPhase !== 'BETTING' || isPlacingBet}
                                            style={{ transformStyle: 'preserve-3d' }}
                                            className={`flex-1 rounded-[2.5rem] border-[6px] transition-all duration-300 hover:translate-z-[-10px] active:translate-z-[-20px] flex items-center justify-center text-6xl font-black italic shadow-[0_15px_0_rgb(8d,6c,63),0_25px_40px_rgba(0,0,0,0.6)] active:shadow-none active:translate-y-[15px] relative
                                            ${userBetSide === 'loss'
                                                    ? 'bg-[#795548] border-yellow-400 scale-105 z-10 animate-neon-pulse-brown'
                                                    : 'bg-[#795548]/60 border-white/20 hover:bg-[#795548]/80 hover:border-white/40'}`}
                                        >
                                            {userBetSide === 'loss' && (
                                                <>
                                                    {showConfetti && <ConfettiPopper />}
                                                    <div className="absolute inset-0 bg-white/10 animate-pulse" />
                                                    <div className="absolute top-2 right-2 bg-yellow-400 text-black text-xs font-black px-2 py-1 rounded-bl-lg transform rotate-3 shadow-lg z-20 scale-150 origin-top-right">YOUR CHOICE</div>
                                                </>
                                            )}
                                            LOSS
                                        </button>
                                    </div>
                                    {/* 🆕 Bet mode attractive lights for adjustment buttons 🆕 */}
                                    <div className="grid grid-cols-2 gap-8 h-24" style={{ transformStyle: 'preserve-3d' }}>
                                        <button onClick={() => adjustBet(1)}
                                            className={`relative rounded-3xl text-white text-4xl font-black border-4 transition-all hover:translate-z-[-5px] active:translate-y-[8px] active:shadow-none uppercase tracking-tight shadow-[0_8px_0_rgba(103,58,183,0.8),0_15px_30px_rgba(0,0,0,0.4)] group overflow-hidden ${lobbyPhase === 'BETTING' ? 'bg-[#9575cd] border-purple-400 animate-glow-pulse-purple' : 'bg-[#D1C4E9]/30 border-white/10 opacity-50'}`}>
                                            <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent group-hover:opacity-100 opacity-0 transition-opacity" />
                                            + ₺1
                                        </button>
                                        <button onClick={() => adjustBet(-1)}
                                            className={`relative rounded-3xl text-white text-4xl font-black border-4 transition-all hover:translate-z-[-5px] active:translate-y-[8px] active:shadow-none uppercase tracking-tight shadow-[0_8px_0_rgba(103,58,183,0.8),0_15px_30px_rgba(0,0,0,0.4)] group overflow-hidden ${lobbyPhase === 'BETTING' ? 'bg-[#9575cd] border-purple-400 animate-glow-pulse-purple' : 'bg-[#D1C4E9]/30 border-white/10 opacity-50'}`}>
                                            <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent group-hover:opacity-100 opacity-0 transition-opacity" />
                                            - ₺1
                                        </button>
                                    </div>
                                    <div className="w-full flex flex-col gap-4" style={{ transform: 'translateZ(40px)' }}>
                                        <div className="bg-black/80 rounded-3xl border-[4px] border-white/20 p-6 flex flex-col gap-2 shadow-[0_20px_60px_rgba(0,0,0,0.8),inset_0_0_40px_rgba(255,255,255,0.05)]">
                                            <div className="flex items-center justify-between px-4">
                                                <span className="text-yellow-500 font-bold text-xl uppercase tracking-widest">KREDİ</span>
                                                <span className={`text-white font-black text-4xl font-mono transition-all duration-300 ${balance < 100 ? 'text-red-400' : ''}`}>
                                                    ₺ {balance.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                </span>
                                            </div>
                                            <div className="h-[2px] bg-white/5 mx-2" />
                                            <div className="flex items-center justify-between px-4">
                                                <span className="text-yellow-500 font-bold text-xl uppercase tracking-widest">BAHİS</span>
                                                <span className="text-white font-black text-4xl italic font-mono transition-transform hover:scale-110">
                                                    ₺ {betAmount.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        /* MOBILE LAYOUT (VERTICAL STACK AS PER REF IMAGE) */
                        <div className="absolute inset-0 flex flex-col items-center pt-10 pb-20 overflow-hidden">
                            {/* 1. Logo (Top) with Conditional Fire */}
                            <div className={`flex flex-col items-center select-none scale-90 mb-4 relative ${lobbyPhase === 'SPINNING' ? 'animate-title-fire' : ''}`}>
                                {/* Fire Flame Particles for Title */}
                                {lobbyPhase === 'SPINNING' && [...Array(8)].map((_, i) => (
                                    <div key={i} className="absolute bottom-0 w-6 h-8 bg-orange-500 blur-lg rounded-full animate-flame-rise-fast"
                                        style={{ left: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 0.4}s` }} />
                                ))}
                                <span className="text-[110px] italic leading-none"
                                    style={{ fontFamily: "'Enchanted Land', cursive", color: '#ff4b9d', WebkitTextStroke: '4px #ff4b9d', fontWeight: 900, filter: 'drop-shadow(0 0 10px #fff) drop-shadow(0 0 25px rgba(255, 215, 0, 0.8))' }}>SWEET</span>
                                <span className="text-[120px] italic leading-none -mt-8"
                                    style={{ fontFamily: "'Enchanted Land', cursive", color: '#F57C00', WebkitTextStroke: '5px #F57C00', fontWeight: 900, filter: 'drop-shadow(0 0 12px #fff) drop-shadow(0 0 35px rgba(255, 215, 0, 0.9))' }}>BONANZA</span>
                                <span className={`text-[96px] italic leading-none -mt-5 ${lobbyPhase === 'SPINNING' ? 'animate-title-shimmer animate-title-ember' : ''}`}
                                    style={{
                                        fontFamily: "'Enchanted Land', cursive",
                                        color: '#D32F2F',
                                        WebkitTextStroke: '2px #D32F2F',
                                        fontWeight: 900,
                                        filter: 'drop-shadow(0 0 10px #fff) drop-shadow(0 0 22px rgba(255, 215, 0, 0.9)) drop-shadow(0 0 40px rgba(255, 69, 0, 0.6))',
                                        textShadow: '0 1px 0 #c22b2b, 0 2px 0 #b12727, 0 3px 0 #a02323, 0 4px 0 #8f2020, 0 6px 0 #7e1c1c, 0 10px 18px rgba(0,0,0,.6)',
                                        letterSpacing: '1px',
                                        backgroundImage: 'linear-gradient(120deg, #ffd54f, #ff7043, #ff1744, #ffd54f)',
                                        backgroundSize: '200% 200%',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent'
                                    }}>10000</span>
                            </div>

                            {/* 2. Grid (Center) */}
                            <div className="scale-100 origin-center mb-8 relative flex items-center justify-center" style={{ perspective: '1800px' }}>
                                {/* Mobile Volumetric Base */}
                                <div className="absolute -bottom-6 w-[80%] h-12 bg-black/40 blur-2xl rounded-full"
                                    style={{ transform: 'translateZ(-60px) rotateX(90deg)' }} />

                                <div className="bg-[#4682B4]/90 backdrop-blur-2xl rounded-[2.5rem] p-3 border-[10px] border-white shadow-[0_40px_80px_rgba(0,0,0,0.6),inset_0_-10px_20px_rgba(255,255,255,0.2)] relative overflow-visible animate-cabinet-sway-mobile"
                                    style={{
                                        transform: 'rotateX(5deg)',
                                        transformStyle: 'preserve-3d'
                                    }}>
                                    {/* 🎨 MOBILE BEATING NEON LINES 🎨 */}
                                    <div className="absolute -inset-6 pointer-events-none z-[-1]" style={{ transform: 'translateZ(-30px)' }}>
                                        <div className={`absolute inset-0 border-[4px] border-cyan-400/30 rounded-[3rem] blur-lg
                                            ${lobbyPhase === 'BETTING' ? 'animate-neon-breathe' :
                                                lobbyPhase === 'SPINNING' ? 'animate-neon-dissolve' : 'animate-neon-burn'}`} />
                                    </div>
                                    <div className={`grid grid-cols-6 gap-2 bg-gradient-to-b from-[#87CEEB]/20 to-[#4682B4]/40 rounded-[2rem] p-3 shadow-[inset_0_15px_30px_rgba(0,0,0,0.5)] relative overflow-visible ${reelSpeeds.some(s => s > 0) ? 'overflow-hidden' : 'overflow-visible'}`}
                                        style={{ width: '900px', height: '600px', transform: 'translateZ(10px)' }}>

                                        {/* Mobile Glass Reflection */}
                                        <div className="absolute inset-0 z-[1] pointer-events-none rounded-[2rem] overflow-hidden">
                                            <div className="absolute -inset-[100%] bg-gradient-to-br from-white/5 via-transparent to-white/5 rotate-45" />
                                        </div>

                                        {[0, 1, 2, 3, 4, 5].map(colIdx => (
                                            <div key={colIdx} className={`h-full relative ${reelSpeeds[colIdx] > 0 ? 'overflow-hidden' : 'overflow-visible'}`}>
                                                <div className={`flex flex-col gap-3 ${reelSpeeds[colIdx] > 0 ? 'animate-reel-scroll' : ''}`}>
                                                    {(reelSpeeds[colIdx] > 0 ? [...Array(3)].flatMap(() => [0, 1, 2, 3, 4].map(r => grid[r * 6 + colIdx])) : [0, 1, 2, 3, 4].map(r => grid[r * 6 + colIdx])).map((symbol, rowIdx) => {
                                                        const actualIdx = (rowIdx % 5) * 6 + colIdx;
                                                        const isWinning = winningSymbols.includes(actualIdx) && reelSpeeds[colIdx] === 0;
                                                        return (
                                                            <div key={rowIdx} className={`relative w-[130px] h-[100px] flex items-center justify-center transition-all duration-500 ${isWinning ? 'animate-match-pop z-20' : ''}`}
                                                                style={{ transformStyle: 'preserve-3d' }}>
                                                                {symbol && <img src={symbol.image} alt="" className={`w-full h-full object-contain drop-shadow-xl transition-all duration-300 ${teaserIndices[actualIdx] ? 'animate-symbol-shatter' : (lobbyPhase === 'BETTING' ? 'animate-symbol-breathe-heavy' : '')}`}
                                                                    style={{
                                                                        filter: teaserIndices[actualIdx] ? 'url(#fire-fluid)' : '',
                                                                        transform: 'translateZ(10px)',
                                                                        animationDuration: '0.8s'
                                                                    }} />}
                                                                {teaserIndices[actualIdx] && (
                                                                    <div className="absolute inset-0 flex items-center justify-center z-[150] animate-multiplier-stay pointer-events-none"
                                                                        style={{ transformStyle: 'preserve-3d', perspective: '1200px' }}>
                                                                        <div className="multiplier-coin" />
                                                                        <div className="multiplier-coin-highlight" />
                                                                        {/* Rounded Flash */}
                                                                        <div className="absolute w-28 h-28 rounded-full animate-high-impact-flash opacity-0"
                                                                            style={{ background: 'radial-gradient(circle, #fff 0%, #ffd700 50%, transparent 70%)', animationDelay: '0.2s' }} />

                                                                        {/* Multiplier Fire Scaling Effect */}
                                                                        <div className="absolute bottom-0 flex justify-center w-full">
                                                                            {[...Array(Math.min(10, Math.floor(parseInt(teaserIndices[actualIdx]) / 10)))].map((_, i) => (
                                                                                <div key={i} className="w-8 h-16 bg-red-600 blur-md rounded-full animate-flame-rise-fast"
                                                                                    style={{
                                                                                        left: `${20 + Math.random() * 60}%`,
                                                                                        animationDelay: `${Math.random() * 0.8}s`,
                                                                                        height: `${parseInt(teaserIndices[actualIdx]) > 50 ? 100 + Math.random() * 50 : 60}px`,
                                                                                        filter: 'url(#fire-fluid)',
                                                                                        opacity: 0.8
                                                                                    }} />
                                                                            ))}
                                                                        </div>

                                                                        {/* Smash Debris Particles */}
                                                                        {[...Array(8)].map((_, i) => (
                                                                            <div key={i} className="absolute w-4 h-4 bg-gradient-to-br from-yellow-300 to-orange-600 rotate-45 animate-smash-debris-large blur-[1px]"
                                                                                style={{
                                                                                    '--dx': `${(Math.random() - 0.5) * 300}px`,
                                                                                    '--dy': `${(Math.random() - 0.5) * 300}px`,
                                                                                    animationDelay: '0.2s'
                                                                                } as any} />
                                                                        ))}
                                                                        <span className={`text-[6rem] font-black italic ${parseInt(teaserIndices[actualIdx]) >= 50 ? 'animate-multiplier-fire' : ''} golden-shine`}
                                                                            style={{
                                                                                fontFamily: "'Kanit', sans-serif",
                                                                                fontWeight: 900,
                                                                                color: '#FFD700',
                                                                                background: 'linear-gradient(to bottom, #FFF9C4 0%, #FFD700 30%, #FFB300 60%, #CF9A2C 100%)',
                                                                                WebkitBackgroundClip: 'text',
                                                                                WebkitTextFillColor: 'currentColor',
                                                                                WebkitTextStroke: '5px #5D4418',
                                                                                transform: 'translateZ(100px) scale(1.0)',
                                                                                filter: parseInt(teaserIndices[actualIdx]) >= 50
                                                                                    ? `drop-shadow(0 0 ${Math.min(90, parseInt(teaserIndices[actualIdx]) / 2)}px #ff4500) drop-shadow(0 0 25px #fff)`
                                                                                    : 'drop-shadow(0 0 35px rgba(0,0,0,0.85)) drop-shadow(0 0 18px rgba(255,255,255,0.6))',
                                                                                textShadow: '0 2px 0 #7a5415, 0 4px 0 #5d3f10, 0 8px 16px rgba(0,0,0,0.6)',
                                                                                position: 'relative',
                                                                                zIndex: 2
                                                                            }}>
                                                                            {teaserIndices[actualIdx]}X
                                                                        </span>
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

                            {/* 3. Phases (Below Grid) */}
                            <div className="flex gap-3 mb-6 scale-95">
                                {['BETTING', 'SPINNING', 'RESULT'].map(p => (
                                    <div key={p} className={`px-10 py-5 rounded-full text-2xl font-black transition-all border-4 relative overflow-hidden ${lobbyPhase === p
                                        ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white border-yellow-100 animate-phase-fire'
                                        : 'bg-black/60 text-white/40 border-transparent'}`}>
                                        {lobbyPhase === p && (
                                            <div className="absolute inset-x-0 bottom-0 flex justify-around pointer-events-none">
                                                {[...Array(4)].map((_, i) => (
                                                    <div key={i} className="w-2 h-4 bg-yellow-400 blur-sm rounded-full animate-flame-rise-fast" />
                                                ))}
                                            </div>
                                        )}
                                        {p}
                                    </div>
                                ))}
                            </div>

                            {/* 4. Timer (Below Phases) */}
                            <div className="bg-black px-12 py-3 rounded-[3rem] border-4 border-white/10 flex items-center shadow-2xl mb-8 min-w-[300px] justify-center">
                                <span className="text-7xl font-black text-white italic tabular-nums">00:{lobbyTimeLeft.toString().padStart(2, '0')}</span>
                            </div>

                            {/* 5. Win/Loss Buttons (Below Timer) */}
                            <div className="flex gap-6 w-[900px] h-40 mb-6" style={{ perspective: '2000px', transformStyle: 'preserve-3d' }}>
                                <button
                                    onClick={() => handlePlaceLobbyBet('win')}
                                    disabled={lobbyPhase !== 'BETTING' || isPlacingBet}
                                    style={{ transformStyle: 'preserve-3d' }}
                                    className={`flex-1 rounded-[3rem] border-[6px] flex items-center justify-center text-7xl font-black italic transition-all duration-300 hover:translate-z-[-10px] active:translate-z-[-30px] shadow-[0_20px_0_rgb(56,142,60),0_30px_60px_rgba(0,0,0,0.6)] active:shadow-none active:translate-y-[20px] relative
                                     ${userBetSide === 'win'
                                            ? 'bg-[#558B2F] border-yellow-400 scale-105 animate-neon-pulse-green'
                                            : 'bg-[#558B2F]/60 border-white/20 hover:bg-[#558B2F]/70'} text-white`}
                                >
                                    {userBetSide === 'win' && (
                                        <>
                                            {showConfetti && <ConfettiPopper />}
                                            <div className="absolute inset-0 bg-white/10 animate-pulse" />
                                            <div className="absolute top-4 right-4 bg-yellow-400 text-black text-xl font-black px-4 py-1 rounded-bl-xl shadow-xl z-20">YOUR CHOICE</div>
                                        </>
                                    )}
                                    WIN
                                </button>
                                <button
                                    onClick={() => handlePlaceLobbyBet('loss')}
                                    disabled={lobbyPhase !== 'BETTING' || isPlacingBet}
                                    style={{ transformStyle: 'preserve-3d' }}
                                    className={`flex-1 rounded-[3rem] border-[6px] flex items-center justify-center text-7xl font-black italic transition-all duration-300 hover:translate-z-[-10px] active:translate-z-[-30px] shadow-[0_20px_0_rgb(8d,6c,63),0_30px_60px_rgba(0,0,0,0.6)] active:shadow-none active:translate-y-[20px] relative
                                     ${userBetSide === 'loss'
                                            ? 'bg-[#795548] border-yellow-400 scale-105 animate-neon-pulse-brown'
                                            : 'bg-[#795548]/60 border-white/20 hover:bg-[#795548]/70'} text-white`}
                                >
                                    {userBetSide === 'loss' && (
                                        <>
                                            {showConfetti && <ConfettiPopper />}
                                            <div className="absolute inset-0 bg-white/10 animate-pulse" />
                                            <div className="absolute top-4 right-4 bg-yellow-400 text-black text-xl font-black px-4 py-1 rounded-bl-xl shadow-xl z-20">YOUR CHOICE</div>
                                        </>
                                    )}
                                    LOSS
                                </button>
                            </div>

                            {/* 6. Bet Adjust Buttons (Below Win/Loss) */}
                            <div className="flex gap-6 w-[800px] h-24 mb-6" style={{ transformStyle: 'preserve-3d' }}>
                                <button onClick={() => adjustBet(1)}
                                    className={`flex-1 rounded-full text-white text-5xl font-black border-4 transition-all active:translate-y-[8px] active:shadow-none shadow-[0_8px_0_rgba(103,58,183,0.8),0_15px_30px_rgba(0,0,0,0.4)] ${lobbyPhase === 'BETTING' ? 'bg-[#9575cd] border-purple-400 animate-glow-pulse-purple' : 'bg-white/10 border-white/20'}`}>
                                    + ₺1
                                </button>
                                <button onClick={() => adjustBet(-1)}
                                    className={`flex-1 rounded-full text-white text-5xl font-black border-4 transition-all active:translate-y-[8px] active:shadow-none shadow-[0_8px_0_rgba(103,58,183,0.8),0_15px_30px_rgba(0,0,0,0.4)] ${lobbyPhase === 'BETTING' ? 'bg-[#9575cd] border-purple-400 animate-glow-pulse-purple' : 'bg-white/10 border-white/20'}`}>
                                    - ₺1
                                </button>
                            </div>

                            {/* 7. Stats Bar (Bottom) */}
                            <div className="absolute bottom-20 w-full px-12">
                                <div className="bg-black/95 h-24 rounded-2xl border-2 border-white/10 flex items-center shadow-2xl overflow-hidden">
                                    <div className="flex-1 flex items-center justify-center gap-6 border-r-2 border-white/10 h-full">
                                        <span className="text-yellow-500 font-bold text-2xl uppercase tracking-widest">KREDİ</span>
                                        <span className="text-white font-black text-5xl font-mono">₺ {balance.toLocaleString()}</span>
                                    </div>
                                    <div className="flex-1 flex items-center justify-center gap-6 h-full">
                                        <span className="text-yellow-500 font-bold text-2xl uppercase tracking-widest">BAHİS</span>
                                        <span className="text-white font-black text-5xl italic font-mono">₺ {betAmount.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Overlays / Announcements inside scaling stage */}
            {
                showSpinMessage && (
                    <div className="absolute inset-0 z-[150] flex items-center justify-center pointer-events-none px-4">
                        <div className="text-4xl sm:text-6xl md:text-7xl lg:text-[120px] font-black italic text-white animate-spin-msg drop-shadow-[0_0_50px_rgba(255,255,255,0.8)] px-4 sm:px-8 md:px-12 lg:px-20 py-4 sm:py-6 md:py-8 lg:py-10 bg-gradient-to-r from-transparent via-pink-500/40 to-transparent backdrop-blur-sm border-y-2 sm:border-y-4 border-white/20 text-center max-w-[90vw]">
                            {currentSpinMessage}
                        </div>
                    </div>
                )
            }

            {showFireworks && <WinCelebration amount={winAmount} betAmount={betAmount} />}

            {/* Multiplier Badge Animation (Visual Only - No Calculation) */}
            {showMultiplierBadge && demoMultiplier && (
                <div className="absolute inset-0 z-[200] flex items-center justify-center pointer-events-none animate-multiplier-badge-pop px-4">
                    <div className="relative">
                        {/* Coin burst particles */}
                        {[...Array(12)].map((_, i) => (
                            <div key={i} className="absolute w-2 sm:w-3 h-2 sm:h-3 bg-yellow-400 rounded-full animate-coin-burst"
                                style={{
                                    '--tx': `${Math.cos(i * 30 * Math.PI / 180) * (window.innerWidth < 640 ? 100 : 200)}px`,
                                    '--ty': `${Math.sin(i * 30 * Math.PI / 180) * (window.innerWidth < 640 ? 100 : 200)}px`,
                                    animationDelay: `${i * 0.05}s`
                                } as any} />
                        ))}

                        {/* Multiplier Badge */}
                        <div className="relative flex flex-col items-center gap-2 sm:gap-3 md:gap-4 animate-multiplier-shake">
                            {/* Glow effect */}
                            <div className="absolute inset-0 bg-gradient-radial from-yellow-400/60 via-orange-500/40 to-transparent blur-2xl sm:blur-3xl scale-150 animate-pulse" />

                            {/* Badge container */}
                            <div className="relative bg-gradient-to-br from-red-600 via-orange-500 to-yellow-500 rounded-full p-1.5 sm:p-2 border-4 sm:border-6 md:border-8 border-yellow-300 shadow-2xl"
                                style={{ width: 'clamp(140px, 25vw, 300px)', height: 'clamp(140px, 25vw, 300px)' }}>
                                <div className="w-full h-full bg-gradient-to-br from-red-700 to-orange-600 rounded-full flex items-center justify-center border-2 sm:border-3 md:border-4 border-yellow-400/50">
                                    <span className="text-white font-black italic text-3xl sm:text-5xl md:text-6xl lg:text-[6rem] drop-shadow-[0_0_20px_rgba(255,255,255,0.8)]"
                                        style={{
                                            textShadow: '0 2px 0 #7a1a1a, 0 4px 0 #5a1010, 0 6px 12px rgba(0,0,0,0.8)',
                                            WebkitTextStroke: '2px #3a0a0a'
                                        }}>
                                        {demoMultiplier}X
                                    </span>
                                </div>
                            </div>

                            {/* Label */}
                            <div className="bg-black/80 px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 rounded-xl sm:rounded-2xl border-2 sm:border-3 md:border-4 border-yellow-400">
                                <span className="text-yellow-300 font-black text-sm sm:text-lg md:text-xl lg:text-2xl uppercase tracking-wider">
                                    Multiplier Applied!
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {
                showLossAnimation && (
                    <div className="absolute inset-0 z-[100] flex items-center justify-center pointer-events-none px-4">
                        <div className="absolute inset-0 bg-black/60 animate-fade-in" />
                        <div className="relative text-center animate-bounce-premium max-w-[95vw]">
                            <div className="text-4xl sm:text-6xl md:text-7xl lg:text-[120px] font-black italic text-transparent bg-clip-text bg-gradient-to-b from-white via-blue-200 to-blue-400 leading-tight">
                                BETTER LUCK<br />NEXT TIME!
                            </div>
                            <div className="mt-4 sm:mt-6 md:mt-8 lg:mt-12 text-6xl sm:text-8xl md:text-9xl lg:text-[150px] animate-pulse">🍀</div>
                        </div>
                    </div>
                )
            }

            {/* Component Styles */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @font-face {
                    font-family: 'Enchanted Land';
                    src: url('/assets/Fonts/Enchanted Land 400.otf') format('opentype');
                    font-weight: 400;
                    font-style: normal;
                }
                @keyframes float-coin {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-20px); }
                }
                .animate-bounce-coin {
                    animation: float-coin 2s ease-in-out infinite;
                    will-change: transform;
                }
                @keyframes fall {
                    0% { transform: translateY(-100px) rotate(0deg); opacity: 1; }
                    100% { transform: translateY(120vh) rotate(360deg); opacity: 0.8; }
                }
                @keyframes reel-scroll {
                    0% { transform: translateY(0); }
                    100% { transform: translateY(-33.33%); }
                }
                .animate-reel-scroll {
                    animation: reel-scroll 0.5s linear infinite;
                    will-change: transform;
                }

                @keyframes drop-in {
                    0% { transform: translateY(-500%) scale(0.8) translateZ(0); opacity: 0; }
                    80% { transform: translateY(5%) scale(1.02) translateZ(0); opacity: 1; }
                    100% { transform: translateY(0) scale(1) translateZ(0); opacity: 1; }
                }

                @keyframes match-pop {
                    0% { transform: scale(1) translateZ(0); filter: brightness(1); }
                    50% { transform: scale(1.6) translateZ(0); filter: brightness(2) drop-shadow(0 0 20px white); }
                    100% { transform: scale(0) translateZ(0); opacity: 0; }
                }
                .animate-match-pop {
                    animation: match-pop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
                    will-change: transform, opacity;
                }

                @keyframes glow-pulse {
                    0% { filter: brightness(1) drop-shadow(0 0 5px rgba(255,255,255,0.2)); }
                    50% { filter: brightness(1.2) drop-shadow(0 0 15px rgba(255,255,255,0.5)); }
                    100% { filter: brightness(1) drop-shadow(0 0 5px rgba(255,255,255,0.2)); }
                }
                .animate-glow-pulse {
                    animation: glow-pulse 1s ease-in-out infinite;
                    will-change: filter;
                }

                @keyframes fade-in-right {
                    from { opacity: 0; transform: translateX(50px) translateZ(0); }
                    to { opacity: 1; transform: translateX(0) translateZ(0); }
                }
                .animate-fade-in-right {
                    animation: fade-in-right 0.8s cubic-bezier(0.23, 1, 0.32, 1) forwards;
                }

                @keyframes neon-pulsate {
                    0%, 100% { box-shadow: 0 0 20px rgba(100, 149, 237, 0.4), inset 0 0 10px rgba(255,255,255,0.2); }
                    50% { box-shadow: 0 0 40px rgba(100, 149, 237, 0.8), inset 0 0 20px rgba(255,255,255,0.4); }
                }
                .animate-neon-pulsate { animation: neon-pulsate 3s ease-in-out infinite; }

                @keyframes spin-slow {
                    from { transform: rotate(0deg) translateZ(0); }
                    to { transform: rotate(360deg) translateZ(0); }
                }
                .animate-spin-slow {
                    animation: spin-slow 1.5s linear infinite;
                    will-change: transform;
                }

                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }

                @keyframes bounce-premium {
                    0%, 100% { transform: translateY(0) scale(1) translateZ(0); }
                    50% { transform: translateY(-30px) scale(1.05) translateZ(0); }
                }
                .animate-bounce-premium {
                    animation: bounce-premium 2s ease-in-out infinite;
                    will-change: transform;
                }

                @keyframes spin-msg {
                    0% { transform: scale(0.5); opacity: 0; filter: blur(10px); }
                    20% { transform: scale(1.1); opacity: 1; filter: blur(0); }
                    80% { transform: scale(1); opacity: 1; filter: blur(0); }
                    100% { transform: scale(1.5); opacity: 0; filter: blur(20px); }
                }

                @keyframes bet-placed {
                    0% { transform: scale(0) translateY(40px); opacity: 0; }
                    20% { transform: scale(1.1) translateY(-10px); opacity: 1; }
                    80% { transform: scale(1) translateY(0); opacity: 1; }
                    100% { transform: scale(1.2) translateY(-20px); opacity: 0; }
                }
                .animate-bet-placed {
                    animation: bet-placed 2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
                }
                @keyframes sparkle-fall {
                    0% { transform: translateY(-100px) scale(0); opacity: 0; }
                    10% { opacity: 1; }
                    50% { opacity: 0.3; }
                    80% { opacity: 1; }
                    100% { transform: translateY(120vh) scale(1.5); opacity: 0; }
                }
                .animate-sparkle-fall {
                    animation: sparkle-fall linear infinite;
                    will-change: transform;
                }

                @keyframes teaser-pop {
                    0% { transform: scale(0) rotate(-20deg); opacity: 0; }
                    50% { transform: scale(1.4) rotate(10deg); opacity: 1; }
                    100% { transform: scale(1) rotate(0deg); opacity: 1; }
                }

                @keyframes golden-shine {
                    0% { filter: brightness(1) drop-shadow(0 0 10px rgba(255,215,0,0.5)); }
                    50% { filter: brightness(1.6) drop-shadow(0 0 30px rgba(255,255,255,0.8)); }
                    100% { filter: brightness(1) drop-shadow(0 0 10px rgba(255,215,0,0.5)); }
                }

                @keyframes golden-shine-stable {
                    0% { filter: brightness(1.1) drop-shadow(0 0 20px rgba(255,215,0,0.6)); }
                    50% { filter: brightness(1.4) drop-shadow(0 0 50px rgba(255,255,255,0.9)); }
                    100% { filter: brightness(1.1) drop-shadow(0 0 20px rgba(255,215,0,0.6)); }
                }

                .golden-shine {
                    animation: golden-shine 1.5s ease-in-out infinite;
                }

                .golden-shine-stable {
                    animation: golden-shine-stable 2s ease-in-out infinite;
                }

                @keyframes flame-flicker {
                    0%, 100% { transform: translateY(0) scale(1) rotate(0deg); opacity: 0.4; }
                    50% { transform: translateY(-30px) scale(1.1) rotate(2deg); opacity: 0.8; }
                }

                @keyframes premium-pop {
                    0% { transform: scale(0); filter: blur(20px) brightness(3); opacity: 0; }
                    60% { transform: scale(1.4); filter: blur(0) brightness(1.5); }
                    80% { transform: scale(0.95); }
                    100% { transform: scale(1); opacity: 1; }
                }

                @keyframes floating-premium {
                    0%, 100% { transform: translateY(0) rotate(-1deg); filter: brightness(1) drop-shadow(0 0 40px #ff4500); }
                    50% { transform: translateY(-15px) rotate(1deg); filter: brightness(1.2) drop-shadow(0 0 80px #ff0000); }
                }

                @keyframes title-fire {
                    0%, 100% { filter: drop-shadow(0 0 10px #fff) drop-shadow(0 0 25px rgba(255, 215, 0, 0.8)); }
                    50% { filter: drop-shadow(0 0 12px #fff) drop-shadow(0 0 35px rgba(255, 215, 0, 0.9)); }
                }

                @keyframes title-flame-rise {
                    0% { transform: translateY(0) scale(1) opacity: 0; }
                    50% { opacity: 0.8; }
                    100% { transform: translateY(-50px) scale(1.5) opacity: 0; }
                }

                @keyframes symbol-shatter {
                    0% { transform: scale(1) translateZ(0); filter: brightness(1) blur(0); opacity: 1; }
                    25% { transform: scale(4.5) translateZ(800px); filter: brightness(2) blur(0); opacity: 1; }
                    45% { transform: scale(4.8) translateZ(900px); filter: brightness(8) blur(4px); opacity: 1; }
                    100% { transform: scale(7.5) translateZ(1200px); filter: brightness(20) blur(50px); opacity: 0; }
                }

                @keyframes multiplier-stay {
                    0% { transform: scale(0) translateZ(-200px); opacity: 0; }
                    10% { transform: scale(1.3) translateZ(100px); opacity: 1; filter: brightness(1.5); }
                    15% { transform: scale(1.0) translateZ(100px); opacity: 1; filter: brightness(1); }
                    85% { transform: scale(1.0) translateZ(100px); opacity: 1; }
                    30%, 50%, 70% { transform: scale(1.05) translateZ(150px); filter: brightness(1.2); }
                    100% { transform: scale(1.3) translateZ(400px); opacity: 0; filter: blur(30px); }
                }

                .animate-multiplier-stay {
                    animation: multiplier-stay 3.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
                    transform-style: preserve-3d;
                }

                @keyframes smash-debris {
                    0% { transform: translate(0, 0) scale(1); opacity: 1; }
                    100% { transform: translate(var(--dx), var(--dy)) scale(0); opacity: 0; }
                }

                @keyframes spark-rise {
                    0% { transform: translateY(0) scale(1); opacity: 0; }
                    20% { opacity: 1; }
                    100% { transform: translateY(-300px) translateX(var(--tx, 20px)) scale(0); opacity: 0; }
                }

                @keyframes neon-pulse-green {
                    0%, 100% { border-color: #4CAF50; box-shadow: 0 0 20px #4CAF50, inset 0 0 10px #4CAF50; }
                    50% { border-color: #8BC34A; box-shadow: 0 0 40px #8BC34A, inset 0 0 20px #8BC34A; }
                }

                @keyframes neon-pulse-brown {
                    0%, 100% { border-color: #795548; box-shadow: 0 0 20px #795548, inset 0 0 10px #795548; }
                    50% { border-color: #8D6E63; box-shadow: 0 0 40px #8D6E63, inset 0 0 20px #8D6E63; }
                }

                @keyframes glow-pulse-purple {
                    0%, 100% { box-shadow: 0 0 10px #9575cd; filter: brightness(1); }
                    50% { box-shadow: 0 0 25px #b39ddb; filter: brightness(1.3); }
                }

                @keyframes confetti-pop {
                    0% { transform: translate(0, 0) scale(0) rotate(0deg); opacity: 1; filter: brightness(1); }
                    15% { transform: translate(calc(var(--tx) * 0.3), calc(var(--ty) * 0.3)) scale(1.5) rotate(90deg); opacity: 1; filter: brightness(2); }
                    100% { transform: translate(var(--tx), var(--ty)) scale(0) rotate(var(--tr)); opacity: 0; filter: brightness(1); }
                }

                .animate-confetti-pop {
                    animation: confetti-pop 1.5s cubic-bezier(0.1, 0.7, 0.1, 1) forwards;
                }

                .animate-spark-rise {
                    animation: spark-rise linear infinite;
                }
                .animate-neon-pulse-green { animation: neon-pulse-green 1.5s ease-in-out infinite; }
                .animate-neon-pulse-brown { animation: neon-pulse-brown 1.5s ease-in-out infinite; }
                .animate-glow-pulse-purple { animation: glow-pulse-purple 2s ease-in-out infinite; }

                @keyframes phase-fire {
                    0%, 100% { box-shadow: 0 0 15px #ff4500, inset 0 0 10px #ff0000; filter: brightness(1.1); transform: scale(1.1) translateY(-8px); }
                    50% { box-shadow: 0 0 30px #ff8c00, inset 0 0 20px #ff4500; filter: brightness(1.3); transform: scale(1.15) translateY(-12px); }
                }

                @keyframes title-fire {
                    0%, 100% { filter: drop-shadow(0 0 15px #ff4500) brightness(1.1) contrast(1.1); }
                    50% { filter: drop-shadow(0 0 45px #ff0000) brightness(1.5) contrast(1.3) saturate(1.5); }
                }

                @keyframes title-shimmer {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }

                @keyframes title-ember {
                    0%, 100% { filter: drop-shadow(0 0 12px #ffb74d) drop-shadow(0 0 28px rgba(255, 69, 0, 0.7)); transform: translateY(0); }
                    50% { filter: drop-shadow(0 0 25px #ffd54f) drop-shadow(0 0 55px rgba(255, 0, 0, 0.9)); transform: translateY(-2px); }
                }

                @keyframes high-impact-flash {
                    0% { opacity: 0; transform: scale(0.2) translateZ(0); }
                    10% { opacity: 1; transform: scale(1) translateZ(50px); }
                    100% { opacity: 0; transform: scale(2.5) translateZ(-50px); }
                }

                .animate-high-impact-flash {
                    animation: high-impact-flash 0.6s ease-out forwards;
                }

                @keyframes cloud-drift {
                    0% { transform: translateX(-50px) scale(1); }
                    50% { transform: translateX(50px) scale(1.1); }
                    100% { transform: translateX(-50px) scale(1); }
                }

                @keyframes float-parallax {
                    0% { transform: translate(0, 0) rotate(0deg); }
                    33% { transform: translate(20px, -40px) rotate(10deg); }
                    66% { transform: translate(-20px, 40px) rotate(-10deg); }
                    100% { transform: translate(0, 0) rotate(0deg); }
                }

                @keyframes symbol-breathe-heavy {
                    0%, 100% { transform: scale(1); filter: brightness(1) drop-shadow(0 0 0px rgba(255,255,255,0)); }
                    50% { transform: scale(1.2) rotate(2deg); filter: brightness(1.8) drop-shadow(0 0 45px rgba(255,215,0,1)); }
                }

                .animate-symbol-breathe-heavy { animation: symbol-breathe-heavy 1.5s ease-in-out infinite; }
                @keyframes neon-breathe {
                    0%, 100% { transform: scale(1); opacity: 0.4; filter: blur(20px) brightness(1); }
                    50% { transform: scale(1.03); opacity: 0.9; filter: blur(15px) brightness(1.5); }
                }

                @keyframes neon-dissolve {
                    0% { transform: scale(1); opacity: 0.8; filter: blur(15px); }
                    100% { transform: scale(1.3); opacity: 0; filter: blur(60px); visibility: hidden; }
                }

                @keyframes neon-burn {
                    0% { transform: scale(1); opacity: 0.6; filter: brightness(1); }
                    20% { transform: scale(1.1); opacity: 1; filter: brightness(3) contrast(2); }
                    100% { transform: scale(0.9); opacity: 0; filter: brightness(0) blur(40px); }
                }

                .animate-neon-breathe { animation: neon-breathe 2s ease-in-out infinite; }
                .animate-neon-dissolve { animation: neon-dissolve 1.2s ease-out forwards; }
                .animate-neon-dissolve-delayed { animation: neon-dissolve 1.5s ease-out 0.2s forwards; }
                .animate-neon-burn { animation: neon-burn 0.8s ease-in forwards; }

                .animate-cloud-drift { animation: cloud-drift linear infinite; }

                .animate-symbol-shatter {
                    animation: symbol-shatter 0.8s cubic-bezier(0.23, 1, 0.32, 1) forwards;
                    will-change: transform, opacity, filter;
                }
                .animate-phase-fire { animation: phase-fire 1s ease-in-out infinite; }
                .animate-multiplier-item-pop { animation: multiplier-item-pop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
                .animate-smash-debris-large { animation: smash-debris-large 0.8s cubic-bezier(0.25, 0.1, 0.25, 1) forwards; }
                .animate-title-fire { animation: title-fire 0.5s ease-in-out infinite alternate; }
                .animate-title-shimmer { animation: title-shimmer 2.5s linear infinite; }
                .animate-title-ember { animation: title-ember 1.2s ease-in-out infinite; }
                .animate-smash-debris { animation: smash-debris 0.6s ease-out forwards; }

                .multiplier-coin {
                    position: absolute;
                    width: clamp(110px, 18vw, 170px);
                    height: clamp(110px, 18vw, 170px);
                    border-radius: 9999px;
                    background: radial-gradient(circle at 30% 30%, #fff7c2 0%, #ffd54f 35%, #f9a825 60%, #d18b00 100%);
                    border: 6px solid #f6e08f;
                    box-shadow: 0 12px 28px rgba(0,0,0,0.55), inset 0 6px 12px rgba(255,255,255,0.7), inset 0 -12px 20px rgba(0,0,0,0.35);
                    filter: drop-shadow(0 0 25px rgba(255, 204, 0, 0.8));
                    z-index: 1;
                }

                .multiplier-coin-highlight {
                    position: absolute;
                    width: clamp(70px, 11vw, 110px);
                    height: clamp(70px, 11vw, 110px);
                    border-radius: 9999px;
                    background: radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.35) 45%, transparent 70%);
                    transform: translate(-25%, -25%);
                    z-index: 2;
                    opacity: 0.9;
                }

                @keyframes multiplier-badge-pop {
                    0% { transform: scale(0) rotate(-180deg); opacity: 0; }
                    50% { transform: scale(1.2) rotate(10deg); opacity: 1; }
                    100% { transform: scale(1) rotate(0deg); opacity: 1; }
                }

                @keyframes multiplier-shake {
                    0%, 100% { transform: translateX(0) translateY(0); }
                    10% { transform: translateX(-10px) translateY(-10px); }
                    20% { transform: translateX(10px) translateY(10px); }
                    30% { transform: translateX(-10px) translateY(5px); }
                    40% { transform: translateX(10px) translateY(-5px); }
                    50% { transform: translateX(-5px) translateY(10px); }
                    60% { transform: translateX(5px) translateY(-10px); }
                    70% { transform: translateX(-8px) translateY(0); }
                    80% { transform: translateX(8px) translateY(0); }
                    90% { transform: translateX(0) translateY(-5px); }
                }

                @keyframes coin-burst {
                    0% { transform: translate(0, 0) scale(1); opacity: 1; }
                    100% { transform: translate(var(--tx), var(--ty)) scale(0); opacity: 0; }
                }

                .animate-multiplier-badge-pop { animation: multiplier-badge-pop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
                .animate-multiplier-shake { animation: multiplier-shake 0.5s ease-in-out infinite; }
                .animate-coin-burst { animation: coin-burst 0.8s ease-out forwards; }

                @keyframes cabinet-sway {
                    0%, 100% { transform: rotateX(8deg) rotateY(-2deg) translateZ(0); }
                    50% { transform: rotateX(9deg) rotateY(-1deg) translateZ(20px); }
                }

                @keyframes cabinet-sway-mobile {
                    0%, 100% { transform: rotateX(5deg) rotateY(0deg) translateZ(0); }
                    50% { transform: rotateX(6deg) rotateY(1deg) translateZ(10px); }
                }

                @keyframes flame-rise-fast {
                    0% { transform: translateY(0) scale(1); opacity: 0; }
                    20% { opacity: 1; }
                    100% { transform: translateY(-100px) scale(2) blur(15px); opacity: 0; }
                }

                @keyframes multiplier-item-pop {
                    0% { transform: scale(0) rotate(-20deg); opacity: 0; }
                    50% { transform: scale(1.4) rotate(10deg); opacity: 1; }
                    100% { transform: scale(1) rotate(0deg); opacity: 1; }
                }

                @keyframes smash-debris-large {
                    0% { transform: translate(0, 0) scale(1) rotate(0deg); opacity: 1; }
                    100% { transform: translate(var(--dx), var(--dy)) scale(0) rotate(360deg); opacity: 0; }
                }

                .animate-cabinet-sway { animation: cabinet-sway 8s ease-in-out infinite; }
                .animate-cabinet-sway-mobile { animation: cabinet-sway-mobile 10s ease-in-out infinite; }
                .animate-flame-rise-fast { animation: flame-rise-fast 0.6s ease-out infinite; }
            ` }} />

            {
                showBetSuccess && (
                    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[250] pointer-events-none">
                        <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-12 py-6 rounded-[2rem] border-4 border-white shadow-[0_0_80px_rgba(16,185,129,0.5)] animate-bet-placed">
                            <div className="text-4xl font-black italic tracking-tighter text-center">BET PLACED!</div>
                            <div className="text-xl font-bold opacity-80 text-center uppercase tracking-widest mt-1">Good Luck!</div>
                        </div>
                    </div>
                )
            }

            {/* Admin Controls Overlay */}
            {user?.role === 'admin' && lobbyPhase === 'SPINNING' && (
                <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[300] bg-black/80 backdrop-blur-xl p-12 rounded-[3.5rem] border-[8px] border-yellow-400 shadow-[0_0_100px_rgba(251,191,36,0.6)] flex flex-col items-center gap-10 animate-scale-in">
                    <div className="text-5xl font-black italic text-yellow-400 tracking-tighter uppercase">ADMIN CONTROL</div>
                    <div className="text-xl text-white/60 font-bold uppercase tracking-widest">Select Next Outcome</div>
                    <div className="flex gap-8 w-full h-32">
                        <button
                            onClick={() => handleAdminDecision('win')}
                            className="flex-1 bg-gradient-to-br from-green-500 to-emerald-700 rounded-3xl border-4 border-white/20 text-white text-4xl font-black italic hover:scale-105 active:scale-95 transition-all shadow-[0_15px_30px_rgba(16,185,129,0.4)]"
                        >
                            FORCE WIN
                        </button>
                        <button
                            onClick={() => handleAdminDecision('loss')}
                            className="flex-1 bg-gradient-to-br from-red-500 to-rose-700 rounded-3xl border-4 border-white/20 text-white text-4xl font-black italic hover:scale-105 active:scale-95 transition-all shadow-[0_15px_30px_rgba(244,63,94,0.4)]"
                        >
                            FORCE LOSS
                        </button>
                    </div>
                    <div className="text-white/40 text-sm font-medium">Decision will apply to the current spinning round immediately.</div>
                </div>
            )}
        </div >
    )
}
