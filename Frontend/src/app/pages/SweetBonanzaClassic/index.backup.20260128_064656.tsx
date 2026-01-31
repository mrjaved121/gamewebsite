'use client'

import { useState, useEffect, useRef } from 'react'
import { Home, Settings as SettingsIcon, Info, Volume2, VolumeX, Menu, ChevronUp } from 'lucide-react'
import { Howl } from 'howler'
import { useLanguage } from '../../contexts/LanguageContext'

// Asset paths
const ASSET_PATH = '/games/sweet-bonanza-classic'
const SYMBOLS_PATH = `${ASSET_PATH}/symbols`
const SOUNDS_PATH = `${ASSET_PATH}/sounds`

const symbols = [
    { id: 'heart', image: `${SYMBOLS_PATH}/heart.png`, value: 50 },
    { id: 'square', image: `${SYMBOLS_PATH}/square.png`, value: 25 },
    { id: 'pentagon', image: `${SYMBOLS_PATH}/pentagon.png`, value: 15 },
    { id: 'oval', image: `${SYMBOLS_PATH}/oval.png`, value: 12 },
    { id: 'apple', image: `${SYMBOLS_PATH}/apple.png`, value: 10 },
    { id: 'plum', image: `${SYMBOLS_PATH}/plum.png`, value: 8 },
    { id: 'watermelon', image: `${SYMBOLS_PATH}/watermelon.png`, value: 5 },
    { id: 'grapes', image: `${SYMBOLS_PATH}/grapes.png`, value: 4 },
    { id: 'banana', image: `${SYMBOLS_PATH}/banana.png`, value: 2 },
    { id: 'scatter', image: `${SYMBOLS_PATH}/scatter.png`, value: 100 },
]

const GameLogo = ({ className, fireEffect = true }: { className?: string; fireEffect?: boolean }) => (
    <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 505.11 120.02" className={`${className} ${fireEffect ? 'animate-logo-fire' : ''}`}>
        <defs>
            <style>{`
                .cls-1, .cls-2, .cls-3, .cls-4, .cls-5, .cls-6, .cls-7, .cls-8, .cls-9, .cls-10 { font-size: 78.51px; font-family: MilkywayDEMO, 'Milkyway DEMO'; font-weight: 900; font-style: italic; }
                .cls-1, .cls-2, .cls-4, .cls-5, .cls-6, .cls-9 { letter-spacing: -.04em; }
                .cls-2, .cls-11, .cls-12, .cls-3, .cls-13, .cls-4, .cls-5, .cls-14, .cls-15, .cls-16, .cls-17, .cls-18, .cls-19, .cls-20, .cls-21, .cls-22, .cls-23, .cls-24, .cls-25, .cls-26, .cls-27, .cls-10, .cls-28 { stroke-miterlimit: 10; }
                .cls-2, .cls-11, .cls-14, .cls-15, .cls-18, .cls-23, .cls-28 { stroke-width: 23px; }
                .cls-2, .cls-13, .cls-4, .cls-15, .cls-17, .cls-21, .cls-22, .cls-23, .cls-24, .cls-25, .cls-26, .cls-27, .cls-28 { fill: #cf0208; }
                .cls-11, .cls-12, .cls-3, .cls-5, .cls-14, .cls-16, .cls-18, .cls-19, .cls-20, .cls-10 { fill: #db059d; }
                .cls-11, .cls-22, .cls-29 { font-size: 84.32px; letter-spacing: -.04em; font-family: MilkywayDEMO, 'Milkyway DEMO'; }
                .cls-12, .cls-4, .cls-16, .cls-17, .cls-29, .cls-25, .cls-26, .cls-9, .cls-10 { stroke-width: 20px; }
                .cls-12, .cls-17, .cls-30, .cls-19, .cls-31, .cls-28 { font-size: 69.96px; letter-spacing: -.04em; font-family: MilkywayDEMO, 'Milkyway DEMO'; }
                .cls-3, .cls-5, .cls-19, .cls-20 { stroke: #db059d; stroke-width: 17px; }
                .cls-3, .cls-7, .cls-8, .cls-10 { letter-spacing: -.04em; }
                .cls-32, .cls-15 { letter-spacing: -.03em; }
                .cls-32, .cls-15, .cls-23, .cls-33, .cls-25, .cls-26 { font-size: 73.42px; font-family: MilkywayDEMO, 'Milkyway DEMO'; }
                .cls-32, .cls-6, .cls-31, .cls-33 { fill: #f6cf09; }
                .cls-13 { letter-spacing: -.04em; }
                .cls-13, .cls-14 { font-size: 75.13px; font-family: MilkywayDEMO, 'Milkyway DEMO'; }
                .cls-13, .cls-21, .cls-22, .cls-24, .cls-27 { stroke-width: 26px; }
                .cls-4, .cls-17, .cls-25, .cls-26 { stroke: #cf0208; }
                .cls-14 { letter-spacing: -.04em; }
                .cls-16, .cls-20, .cls-34, .cls-35 { font-size: 67.37px; letter-spacing: -.04em; font-family: MilkywayDEMO, 'Milkyway DEMO'; }
                .cls-30 { fill: #f6d90d; }
                .cls-18 { font-size: 72.35px; letter-spacing: -.04em; font-family: MilkywayDEMO, 'Milkyway DEMO'; }
                .cls-36 { stroke: #fff; font-family: MilkywayDEMO, 'Milkyway DEMO'; }
                .cls-36, .cls-37, .cls-38 { font-family: MilkywayDEMO, 'Milkyway DEMO'; }
                .cls-37 { stroke: #602a7c; font-family: MilkywayDEMO, 'Milkyway DEMO'; }
                .cls-21 { letter-spacing: -.04em; }
                .cls-21, .cls-24, .cls-27 { font-size: 78.85px; font-family: MilkywayDEMO, 'Milkyway DEMO'; }
                .cls-34 { fill: #f5a8fb; }
                .cls-7 { fill: #15cff9; }
                .cls-23, .cls-33, .cls-25 { letter-spacing: -.04em; }
                .cls-8 { fill: #edb058; }
                .cls-24 { letter-spacing: -.04em; }
                .cls-26 { letter-spacing: -.03em; }
                .cls-27 { letter-spacing: -.03em; }
                .cls-35 { fill: #0db0ae; }
            `}</style>
        </defs>
        <text className="cls-36" transform="translate(18.39 85.16) scale(.94 1)"><tspan className="cls-10" x="0" y="0">S</tspan><tspan className="cls-12" x="38.79" y="0">W</tspan><tspan className="cls-16" x="100.42" y="0">EE</tspan><tspan className="cls-10" x="162.4" y="0">T</tspan><tspan className="cls-9" x="200.32" y="0"> </tspan><tspan className="cls-2" x="217.59" y="0">B</tspan><tspan className="cls-23" x="257.16" y="0">O</tspan><tspan className="cls-28" x="297.1" y="0">N</tspan><tspan className="cls-15" x="337.96" y="0">A</tspan><tspan className="cls-23" x="379.14" y="0">N</tspan><tspan className="cls-28" x="422.01" y="0">Z</tspan><tspan className="cls-2" x="453.99" y="0">A</tspan></text>
        <text className="cls-37" transform="translate(11.5 86.28) scale(.89 1)"><tspan className="cls-11" x="0" y="0">S</tspan><tspan className="cls-14" x="41.65" y="0">W</tspan><tspan className="cls-18" x="107.85" y="0">EE</tspan><tspan className="cls-11" x="174.41" y="0">T</tspan><tspan className="cls-29" x="215.14" y="0"> </tspan><tspan className="cls-22" x="233.69" y="0">B</tspan><tspan className="cls-21" x="276.18" y="0">O</tspan><tspan className="cls-13" x="319.08" y="0">N</tspan><tspan className="cls-27" x="362.95" y="0">A</tspan><tspan className="cls-24" x="407.18" y="0">N</tspan><tspan className="cls-13" x="453.23" y="0">Z</tspan><tspan className="cls-22" x="487.56" y="0">A</tspan></text>
        <text className="cls-38" transform="translate(18.38 85.16) scale(.94 1)"><tspan className="cls-5" x="0" y="0">S</tspan><tspan className="cls-19" x="38.79" y="0">W</tspan><tspan className="cls-20" x="100.42" y="0">EE</tspan><tspan className="cls-3" x="162.4" y="0">T</tspan><tspan className="cls-1" x="200.32" y="0"> </tspan><tspan className="cls-4" x="217.59" y="0">B</tspan><tspan className="cls-25" x="257.16" y="0">O</tspan><tspan className="cls-17" x="297.1" y="0">N</tspan><tspan className="cls-26" x="337.96" y="0">A</tspan><tspan className="cls-25" x="379.14" y="0">N</tspan><tspan className="cls-17" x="422.02" y="0">Z</tspan><tspan className="cls-4" x="453.99" y="0">A</tspan></text>
        <text className="cls-38" transform="translate(17.28 83.68) scale(.94 1)"><tspan className="cls-8" x="0" y="0">S</tspan><tspan className="cls-30" x="38.79" y="0">W</tspan><tspan className="cls-34" x="100.42" y="0">E</tspan><tspan className="cls-35" x="131.41" y="0">E</tspan><tspan className="cls-7" x="162.4" y="0">T</tspan><tspan className="cls-1" x="200.32" y="0"> </tspan><tspan className="cls-6" x="217.59" y="0">B</tspan><tspan className="cls-33" x="257.16" y="0">O</tspan><tspan className="cls-31" x="297.1" y="0">N</tspan><tspan className="cls-32" x="337.96" y="0">A</tspan><tspan className="cls-33" x="379.14" y="0">N</tspan><tspan className="cls-31" x="422.01" y="0">Z</tspan><tspan className="cls-6" x="453.99" y="0">A</tspan></text>
    </svg>
)

const WinCelebration = ({ amount }: { amount: number }) => {
    // Fake highly increased numbers with many zeros for aesthetics
    const fakeDisplayAmount = amount * 1250.75 + Math.random() * 100000;
    const formattedAmount = fakeDisplayAmount.toLocaleString('tr-TR', { minimumFractionDigits: 0 }).replace(/,/g, '') + "000000";

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none overflow-hidden">
            <div className="absolute inset-0 bg-black/90 backdrop-blur-3xl animate-fade-in" />

            {/* Fire and Glow Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-600/40 blur-[150px] animate-pulse rounded-full" />
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/30 blur-[100px] animate-pulse rounded-full" style={{ animationDelay: '0.5s' }} />
            </div>

            <div className="relative flex flex-col items-center z-10 w-full px-20 text-center">
                <div className="relative flex flex-col items-center animate-premium-pop mb-10">
                    <GameLogo className="w-[800px] h-auto drop-shadow-[0_20px_50px_rgba(255,100,0,0.8)]" />
                </div>

                <div className="flex flex-col items-center gap-4">
                    <span className="text-yellow-400 text-6xl font-black italic tracking-widest uppercase animate-bounce" style={{ fontFamily: 'MilkywayDEMO' }}>MÜKEMMEL KAZANÇ!</span>
                    <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 blur-3xl opacity-50 group-hover:opacity-100 transition-opacity animate-pulse" />
                        <div className="text-[14rem] font-black text-white drop-shadow-[0_5px_40px_rgba(255,150,0,1)] tabular-nums tracking-tighter leading-none relative z-10 animate-multiplier-fire"
                            style={{ fontFamily: 'MilkywayDEMO, sans-serif', WebkitTextStroke: '6px #cf0208' }}>
                            ₺ {formattedAmount}
                        </div>
                    </div>
                </div>

                <div className="mt-16 text-white/90 text-4xl font-black italic flex gap-8">
                    <span className="animate-bounce" style={{ animationDelay: '0s' }}>🔥 MAGNIFICENT 🔥</span>
                    <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>🔥 LEGENDARY 🔥</span>
                    <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>🔥 ULTRA WIN 🔥</span>
                </div>
            </div>

            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(150)].map((_, i) => {
                    const randomLeft = 45 + Math.random() * 10; // Start from center (behind logo)
                    const randomDelay = Math.random() * 1.5; // 0-1.5s delay
                    const randomAngle = -60 + Math.random() * 120; // -60 to 60 degrees
                    const randomDistance = 200 + Math.random() * 400; // How far to toss
                    const randomRotation = Math.random() * 720 - 360; // Random spin
                    const randomScale = 0.5 + Math.random() * 0.5; // 0.5-1.0 scale

                    return (
                        <div key={i} className="absolute animate-coin-toss"
                            style={{
                                left: `${randomLeft}%`,
                                top: '15%', // Start from logo position
                                animationDelay: `${randomDelay}s`,
                                animationDuration: '3s',
                                '--toss-angle': `${randomAngle}deg`,
                                '--toss-distance': `${randomDistance}px`,
                                '--coin-rotation': `${randomRotation}deg`,
                                '--coin-scale': randomScale,
                            } as any}>
                            <div className="relative" style={{
                                width: '40px',
                                height: '40px',
                                transform: `scale(${randomScale})`,
                            }}>
                                {/* 3D Coin */}
                                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-300 via-yellow-500 to-yellow-700 border-4 border-yellow-600 shadow-[0_8px_16px_rgba(0,0,0,0.4),inset_0_2px_4px_rgba(255,255,255,0.5)]"
                                    style={{
                                        transform: 'rotateY(var(--coin-rotation)) rotateX(20deg)',
                                        transformStyle: 'preserve-3d',
                                    }}>
                                    <div className="absolute inset-2 rounded-full bg-yellow-400 flex items-center justify-center text-yellow-900 font-black text-xs">₺</div>
                                </div>
                                {/* Glow effect */}
                                <div className="absolute inset-0 bg-yellow-400/40 blur-md rounded-full animate-pulse" />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const CLOUD_SVGS = [
    // Cloud 1
    (className: string) => (
        <svg className={className} viewBox="0 0 255.85 74.15">
            <path fill="#e4ecff" d="M255.85,50.74c-1.16.69-2.33,1.36-3.5,2.02-1.28.7-2.57,1.38-3.87,2.03-22.41,11.28-48.6,15.44-73.93,17.49-44.53,3.61-89.48,2.01-133.64-4.75-13.82-2.12-27.83-4.83-40.45-10.67-.15-.07-.31-.14-.46-.21,7.75.87,15.5,1.72,23.25,2.58,2.03.22,4.14.44,6.07-.24,2.22-.8,3.85-2.67,5.59-4.27,5.96-5.49,16.15-7.81,21.87-2.07,1.69-11.83,13.49-21.29,25.41-20.36-.39-2.77.92-5.86,3.89-6.38,1.29-.23,3.04-.17,4.33.11,1.93.4,2.03,2.06,3.44,2.97,1.59-1.45,2.71-3.76,3.97-5.51,1.6-2.22,3.24-4.4,5-6.5,3.47-4.14,7.38-7.97,11.96-10.89,4.15-2.64,8.76-4.39,13.55-5.3,12.06-2.31,25.27.65,35.33,7.9,14.05,10.13,21.97,27.51,22.53,44.83,3.57-1.22,7.22-2.46,10.99-2.48,3.77-.02,7.77,1.4,9.9,4.51.69.99,1.23,2.19,2.32,2.7.9.42,1.95.25,2.93.08,14.5-2.59,29.01-5.11,43.53-7.57Z" />
            <path fill="#feeff2" d="M255.85,50.74c-2.41,1.44-4.87,2.79-7.38,4.05-.88.13-1.77.23-2.66.31-6.66.59-14.44.28-18.65,5.46-5.85-.65-11.94,1.38-16.24,5.4-2.28-2.25-4.73-4.6-7.85-5.29-3.12-.69-7.01,1.08-7.34,4.26-7.75-4.54-17.58-5.36-25.97-2.16,7.77-5.08,10.2-15.95,7.54-24.84-2.66-8.9-9.41-16-16.79-21.62-8.13-6.18-17.31-10.99-27.03-14.16-1.7-.56-3.43-1.03-5.18-1.39,12.06-2.31,25.27.65,35.33,7.9,14.05,10.13,21.97,27.51,22.53,44.83,3.57-1.22,7.22-2.46,10.99-2.48,3.77-.02,7.77,1.4,9.9,4.51.69.99,1.23,2.19,2.32,2.7.9.42,1.95.25,2.93.08,14.5-2.59,29.01-5.11,43.53-7.57Z" />
            <path fill="#cdcff8" d="M252.38,52.79c-1,.88-2.83,1.47-3.9,2-22.41,11.28-48.6,15.44-73.93,17.49-44.53,3.61-89.48,2.01-133.64-4.75-13.82-2.12-27.83-4.83-40.45-10.67,4.77.41,9.68,1.14,14.35,2.24.79.19,1.4.47,2.13.78,1.64.68,3.54.75,5.28.99,3.91.55,7.83,1.07,11.75,1.56,7.84.97,15.7,1.82,23.56,2.53,15.74,1.42,31.52,2.32,47.31,2.7,15.8.37,31.6.22,47.39-.45,15.79-.68,31.55-1.88,47.25-3.61,15.27-1.68,30.65-3.88,45.15-9.16,1.67-.61,3.33-1.22,5.06-1.66.87-.22,2.23-.75,3.09-.43-.11.15-.25.3-.41.44Z" />
            <path fill="none" stroke="#feeff2" strokeMiterlimit="10" strokeWidth=".75px" d="M140.07,9.58c7.65,1.99,14.85,5.7,20.92,10.77,4.91,4.11,9.22,9.41,10.31,15.72.97,5.6-.69,11.29-2.34,16.74" />
            <path fill="none" stroke="#feeff2" strokeMiterlimit="10" strokeWidth=".75px" d="M87.03,28.46c2.23-.33,4.41,1.99,3.95,4.19" />
            <path fill="none" stroke="#feeff2" strokeMiterlimit="10" strokeWidth=".75px" d="M66.97,42.8c2.27-4.68,8.59-6.88,13.28-4.62" />
        </svg>
    ),
    // Cloud 2
    (className: string) => (
        <svg className={className} viewBox="0 0 188.98 62.56">
            <path fill="#e4ecff" d="M188.98,36.44c-23.36,20.14-56.87,27.99-88.16,25.75-35.09-2.52-68.34-15.78-100.82-29.52.03-.45.11-.89.26-1.28.3-.85.85-1.58,1.72-2.07,2.15-1.23,4.84-.27,7.11.68,4.7,2,9.39,3.99,14.09,5.98,1.12-4.27,6.29-6.4,10.64-5.69,4.36.71,8.06,3.48,11.57,6.17C47.32,16.23,66.64-.93,86.95.04c4.28.2,8.43,1.22,12.33,2.9,14.61,6.27,25.44,21.73,24.41,37.75,5.65-5.05,15.92-3.05,19.27,3.74.91-3.36,4.26-5.89,7.74-5.87,3.48.03,6.78,2.61,7.65,5.98,7.02-5.35,15.81-8.27,24.63-8.42.19,0,.39,0,.58,0,1.8-.01,3.62.1,5.42.33Z" />
            <path fill="#e4ecff" d="M99.27,39.25c-1.8.49-3.68.56-5.55.08,1.84-.52,3.73-.51,5.55-.08Z" />
            <path fill="#feeff2" d="M182.97,36.12c-9.63,2.05-18.85,6.02-26.88,11.72-5.69-3.42-14.26.48-15.42,7.01-7.55-8.74-22.63-9.41-30.92-1.36.97-6.48-4.28-12.78-10.48-14.23,5.04-1.38,9.37-6.07,10.49-11.37,1.52-7.18-1.62-14.66-6.24-20.36-1.31-1.63-2.75-3.14-4.24-4.59,14.61,6.27,25.44,21.73,24.41,37.75,5.65-5.05,15.92-3.05,19.27,3.74.91-3.36,4.26-5.89,7.74-5.87,3.48.03,6.78,2.61,7.65,5.98,7.02-5.35,15.81-8.27,24.63-8.42Z" />
            <path fill="#cdcff8" d="M188.98,36.44c-23.36,20.14-56.87,27.99-88.16,25.75-35.09-2.52-68.34-15.78-100.82-29.52.03-.45.11-.89.26-1.28.07.04.15.08.22.11,2.22,1.03,4.44,2.05,6.66,3.04,4.46,2,8.96,3.93,13.48,5.77,9.04,3.67,18.22,7,27.58,9.8,9.37,2.81,18.9,5.1,28.56,6.66,1.09.18,2.18.35,3.27.5,28.6,4.15,58.72,1.62,84.67-11.08,6.38-3.13,12.51-6.86,18.85-10.08,1.8-.01,3.62.1,5.42.33Z" />
            <path fill="none" stroke="#feeff2" strokeMiterlimit="10" strokeWidth=".87px" d="M73.29,9.15c-9.39,3.2-16.61,12.02-17.9,21.86" />
            <path fill="none" stroke="#feeff2" strokeMiterlimit="10" strokeWidth=".87px" d="M33.56,35.45c2.82-.71,6.01,1.45,6.4,4.34" />
        </svg>
    ),
    // Cloud 3
    (className: string) => (
        <svg className={className} viewBox="0 0 258.46 70.42">
            <path fill="#e4ecff" d="M258.46,45.49c-4.05,2.35-8.21,4.53-12.46,6.52-9.2,4.3-18.82,7.76-28.66,10.45-.02,0-.04,0-.06.02-6.6,1.81-13.31,3.27-20.05,4.41-3.29.57-6.59,1.06-9.9,1.47-27.38,3.43-55.12,2.14-82.6-.79-4.25-.45-8.51-.95-12.75-1.47-28.2-3.46-56.25-8.14-84.03-14.05-2.62-.56-5.31-1.17-7.95-1.89.59-.28,1.19-.55,1.78-.79,5.82-2.4,11.95-3.04,18.26-2.12,1.26.18,2.54.49,3.8.58,1.14-3.92,2.6-7.06,5.71-9.86,2.92-2.63,6.5-4.54,10.22-5.79,13.39-4.51,28.95-2.01,40.25,6.48C82.26,16.68,103.89-1.49,125.95.1c.33.02.66.05.99.08h0c21.62,2.15,39.85,22.92,38.92,44.69,9.54-3.64,21.48,4.39,21.71,14.59,6.13-5.91,15.78-7.85,23.72-4.79,4.09-8.7,13.34-14.75,22.96-15,5.84-.16,12.29,2.22,14.75,7.52.48-3.4,5.24-4.91,8.09-2.99.53.36.99.8,1.38,1.29Z" />
            <path fill="#feeff2" d="M258.46,45.49c-4.05,2.35-8.21,4.53-12.46,6.52-2.21-2.17-5.03-3.74-8.06-4.21-8.44-1.32-16.82,3.84-21.95,10.68-.6.8-1.23,1.67-2.15,2.02-1.11.42-2.34-.01-3.47-.37-6.01-1.96-14.17-1.37-16.65,4.45-5.86-5.61-15.33-7.05-22.59-3.43,1.87-4.95-2.21-10.54-7.22-12.18-5.02-1.64-10.49-.41-15.57,1.03,4.14-14.17.27-30.4-9.82-41.17-3.31-3.53-7.26-6.45-11.57-8.63,21.62,2.15,39.85,22.91,38.92,44.69,9.54-3.64,21.48,4.39,21.71,14.59,6.13-5.91,15.78-7.85,23.72-4.79,4.09-8.7,13.34-14.75,22.96-15,5.84-.16,12.29,2.22,14.75,7.52.48-3.4,5.24-4.91,8.09-2.99.53.36.99.8,1.38,1.29Z" />
            <path fill="#cdcff8" d="M217.28,62.48c-9.82,2.69-19.88,4.62-29.95,5.89-27.38,3.43-55.12,2.14-82.6-.79,4.86.43,9.72.79,14.6,1.08,15.02.89,30.08,1.11,45.12.42,15.04-.69,30.05-2.3,44.86-5.02,2.67-.5,5.33-1.02,7.97-1.58Z" />
            <path fill="#cdcff8" d="M197.23,66.89c-3.29.57-6.59,1.06-9.9,1.47-27.38,3.43-55.12,2.14-82.6-.79-4.25-.45-8.51-.95-12.75-1.47-28.2-3.46-56.25-8.14-84.03-14.05-2.62-.56-5.31-1.17-7.95-1.89.59-.28,1.19-.55,1.78-.79,30.74.95,61.45,3.06,92.03,6.34,34.46,3.69,68.86,8.88,103.41,11.15Z" />
            <path fill="none" stroke="#feeff2" strokeMiterlimit="10" strokeWidth=".87px" d="M124.6,5.85c5.41,4.15,11.05,8.57,13.74,14.84,2.93,6.82,1.86,14.6.74,21.94" />
            <path fill="none" stroke="#feeff2" strokeMiterlimit="10" strokeWidth=".87px" d="M62.4,35.2c5.14.58,9.96,3.56,12.78,7.9" />
        </svg>
    ),
    // Cloud 4
    (className: string) => (
        <svg className={className} viewBox="0 0 248.34 85.46">
            <path fill="#e4ecff" d="M248.34,51.71c-19.75,10.26-40.68,18.2-62.22,23.81-58.69,15.25-122.03,13.06-179.15-7.33t-.02-.01c-.84-.57-1.69-1.13-2.52-1.7C2.31,65.01-.02,63.1,0,60.52c0-.86.27-1.6.69-2.24,1.49-2.25,5.14-3.24,8.14-3.37,14.52-.67,29.22,2.82,41.9,9.95,1.37-3.53,2.87-7.24,5.85-9.57,2.98-2.33,7.95-2.58,10.15.49.54-8.07,10.19-14.06,17.66-10.95,1.88-13.29,6.7-27.54,16.21-36.3,2.91-2.68,6.25-4.85,10.08-6.31,10.18-3.9,21.57-1.95,32.16.61,11.23,2.71,22.61,6.19,31.7,13.32,9.08,7.14,15.5,18.67,13.65,30.08,5.18-2.86,10.7-5.78,16.6-5.52,5.9.26,12.01,5.12,11.34,10.99,8.82-3.4,18.66-4.08,27.86-1.93,1.46.35,2.98.81,4.11,1.75.09.06.17.13.25.21Z" />
            <path fill="#e4ecff" d="M200.63,62.05c.78-.64,1.62-1.18,2.53-1.6-.54.91-1.38,1.54-2.53,1.6Z" />
            <path fill="#feeff2" d="M248.34,51.71c-19.75,10.26-40.68,18.2-62.22,23.81-1.36-.52-2.69-1.15-3.98-1.88,11.34.31,22.71-5.01,29.74-13.93-2.87-.83-6.03-.52-8.72.75,1.11-1.88.85-4.93-.92-6.53-2.62-2.36-6.55-2.32-10.07-2.13-8.38.44-16.75.86-25.13,1.3,5.05-1.49,7.88-7.31,7.37-12.56-.51-5.24-3.64-9.87-7.22-13.72-12.57-13.47-31.39-19.78-49.79-20.59-5.19-.23-10.51-.05-15.39,1.72-.48.17-.94.36-1.4.56,2.91-2.68,6.25-4.85,10.08-6.31,10.18-3.9,21.57-1.95,32.16.61,11.23,2.71,22.61,6.19,31.7,13.32,9.08,7.14,15.5,18.67,13.65,30.08,5.18-2.86,10.7-5.78,16.6-5.52,5.9.26,12.01,5.12,11.34,10.99,8.82-3.4,18.66-4.08,27.86-1.93,1.57.37,3.21.88,4.36,1.95Z" />
            <path fill="#cdcff8" d="M248.34,51.71c-19.75,10.26-40.68,18.2-62.22,23.81-58.69,15.25-122.03,13.06-179.15-7.33t-.02-.01c-.84-.57-1.69-1.13-2.52-1.7C2.31,65.01-.02,63.1,0,60.52c0-.86.27-1.6.69-2.24,1.62.37,3.15.9,4.42,1.42,10.45,4.26,20.99,8.39,31.94,11.16,1.25.32,2.51.62,3.78.9,10.41,2.31,21.08,3.26,31.72,3.94,54.56,3.51,110.52-.29,161.45-20.18,4.54-1.77,9.33-3.69,14.1-4.01.09.06.17.13.25.21Z" />
            <path fill="none" stroke="#feeff2" strokeMiterlimit="10" strokeWidth=".87px" d="M74.58,51.95c1.55-2.54,5.53-3.13,7.74-1.14" />
            <path fill="none" stroke="#feeff2" strokeMiterlimit="10" strokeWidth=".87px" d="M129.02,14.53c2.71-1.22,5.84-.2,8.63.83,6.68,2.45,13.61,5.06,18.55,10.18,4.71,4.87,7.1,11.47,9.36,17.86" />
        </svg>
    ),
];

const MovingClouds = () => {
    const [clouds, setClouds] = useState<any[]>([]);

    useEffect(() => {
        const spawnCloud = () => {
            setClouds(prev => {
                if (prev.length >= 3) return prev;
                const id = Math.random().toString(36).substr(2, 9);
                const cloudIndex = Math.floor(Math.random() * CLOUD_SVGS.length);
                const direction = Math.random() > 0.5 ? 'right' : 'left';
                const top = 5 + Math.random() * 20; // Top 5-25%
                const duration = 30 + Math.random() * 20; // 30-50s

                return [...prev, { id, cloudIndex, direction, top, duration }];
            });
        };

        const interval = setInterval(spawnCloud, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
            {clouds.map(cloud => (
                <div
                    key={cloud.id}
                    className={`absolute w-[300px] h-auto pointer-events-none opacity-0 ${cloud.direction === 'right' ? 'animate-cloud-right' : 'animate-cloud-left'
                        }`}
                    style={{
                        top: `${cloud.top}%`,
                        animationDuration: `${cloud.duration}s`
                    }}
                    onAnimationEnd={() => {
                        setClouds(prev => prev.filter(c => c.id !== cloud.id));
                    }}
                >
                    {CLOUD_SVGS[cloud.cloudIndex]('w-full h-auto drop-shadow-xl')}
                </div>
            ))}
        </div>
    );
};

export default function SweetBonanzaClassic({ onNavigate }: any) {
    const [gameState, setGameState] = useState('LOADING');
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [balance, setBalance] = useState(10000.00);
    const [betAmount, setBetAmount] = useState(2.00);
    const [winAmount, setWinAmount] = useState(0.00);
    const [isAutoPlaying, setIsAutoPlaying] = useState(false);
    const [consecutiveWins, setConsecutiveWins] = useState(0);
    const [grid, setGrid] = useState<(typeof symbols[0] | any | null)[]>([]);
    const [visibleGrid, setVisibleGrid] = useState<(typeof symbols[0] | any | null)[]>([]);
    const [isSpinning, setIsSpinning] = useState(false);
    const [soundEnabled, setSoundEnabled] = useState(true);
    const [gameScale, setGameScale] = useState(1);
    const [winningIndices, setWinningIndices] = useState<number[]>([]);
    const [landingIndices, setLandingIndices] = useState<number[]>([]);
    const [showWinCelebration, setShowWinCelebration] = useState(false);
    const [multiplierTotalValue, setMultiplierTotalValue] = useState(0);
    const [screenShake, setScreenShake] = useState(false);
    const [isDoubleChanceActive, setIsDoubleChanceActive] = useState(false);
    const [autoPlaySessions, setAutoPlaySessions] = useState(0);
    const [showVolumeBar, setShowVolumeBar] = useState(false);
    const [volume, setVolume] = useState(0.5);

    // New Feature States
    const [freeSpinsRemaining, setFreeSpinsRemaining] = useState(0);
    const [isFreeSpinsMode, setIsFreeSpinsMode] = useState(false);
    const [freeSpinsWinTotal, setFreeSpinsWinTotal] = useState(0);
    const [showFreeSpinsTrigger, setShowFreeSpinsTrigger] = useState(false);
    const [isBonusBuyModalOpen, setIsBonusBuyModalOpen] = useState(false);
    const [winTierMessage, setWinTierMessage] = useState('');
    const [showWinTierMessage, setShowWinTierMessage] = useState(false);

    // Auto-spin enhancements
    const [autoSpinCount, setAutoSpinCount] = useState(0);
    const [autoSpinRemaining, setAutoSpinRemaining] = useState(0);
    const [showAutoSpinSelector, setShowAutoSpinSelector] = useState(false);

    // Fire intensity (increases with activity)
    const [fireIntensity, setFireIntensity] = useState(0);

    // Fake multiplier system for free spins
    const [showFakeMultipliers, setShowFakeMultipliers] = useState(false);
    const [fakeMultiplierValue, setFakeMultiplierValue] = useState(0);

    // Info modal
    const [showInfoModal, setShowInfoModal] = useState(false);
    const [infoSlideIndex, setInfoSlideIndex] = useState(0);

    const { t, language } = useLanguage();

    const sounds = useRef<any>({});

    useEffect(() => {
        const initialGrid = Array(30).fill(null).map(() => symbols[Math.floor(Math.random() * (symbols.length - 1))]);
        setGrid(initialGrid);
        setVisibleGrid(initialGrid);

        sounds.current = {
            bgm: new Howl({ src: [`${SOUNDS_PATH}/sweet-bonanza-bgm-1.mp3`], loop: true, volume: 0.35 }),
            spin: new Howl({ src: [`${SOUNDS_PATH}/sweet-bonanza-slot-scroll-sound-effect.mp3`], volume: 0.45 }),
            win: new Howl({ src: [`${SOUNDS_PATH}/sweet-bonanza-win-sound-effect.mp3`], volume: 0.65 }),
            loss: new Howl({ src: [`${SOUNDS_PATH}/sweet-bonanza-loss-sound-effect.mp3`], volume: 0.4 }),
            land: new Howl({ src: [`${SOUNDS_PATH}/sweet-bonanza-countdown-sound-effect.mp3`], volume: 0.2, rate: 1.5 }),
        };

        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 25;
            if (progress >= 100) {
                progress = 100;
                setGameState('PLAYING');
                clearInterval(interval);
            }
            setLoadingProgress(Math.floor(progress));
        }, 120);

        const handleResize = () => {
            const targetWidth = 1920;
            const targetHeight = 1080;
            const scale = Math.min(window.innerWidth / targetWidth, window.innerHeight / targetHeight);
            setGameScale(scale);
        };
        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            clearInterval(interval);
            window.removeEventListener('resize', handleResize);
            if (sounds.current.bgm) sounds.current.bgm.stop();
        };
    }, []);

    useEffect(() => {
        if (gameState === 'PLAYING' && soundEnabled) {
            sounds.current.bgm?.play();
            sounds.current.bgm?.volume(volume * 0.7);
        } else {
            sounds.current.bgm?.stop();
        }
    }, [gameState, soundEnabled, volume]);

    // Handle Auto Play
    useEffect(() => {
        if (autoPlaySessions > 0 && !isSpinning && gameState === 'PLAYING') {
            const timer = setTimeout(() => {
                handleSpin();
                setAutoPlaySessions(prev => prev - 1);
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [autoPlaySessions, isSpinning, gameState]);

    // Multiplier timeout - hide after 8 seconds if no new game started
    useEffect(() => {
        if (landingIndices.length > 0 && !isSpinning) {
            const timer = setTimeout(() => {
                setLandingIndices([]);
            }, 8000); // 8 seconds
            return () => clearTimeout(timer);
        }
    }, [landingIndices, isSpinning]);

    const checkWins = (currentGrid: (typeof symbols[0] | any | null)[]) => {
        const counts: Record<string, number[]> = {};
        currentGrid.forEach((sym, idx) => {
            if (!sym || sym.id === 'scatter' || sym.id === 'multiplier') return;
            if (!counts[sym.id]) counts[sym.id] = [];
            counts[sym.id].push(idx);
        });

        let totalWin = 0;
        let winIndices: number[] = [];

        Object.entries(counts).forEach(([id, indices]) => {
            if (indices.length >= 8) {
                const sym = symbols.find(s => s.id === id);
                const payout = (sym?.value || 0) * (indices.length / 8) * (betAmount / 2);
                totalWin += payout;
                winIndices = [...winIndices, ...indices];
            }
        });

        const scatterIndices = currentGrid.map((s, i) => s?.id === 'scatter' ? i : -1).filter(i => i !== -1);
        if (scatterIndices.length >= 4) {
            totalWin += betAmount * 10;
            winIndices = [...winIndices, ...scatterIndices];
        }

        let multiplierValue = 0;
        currentGrid.forEach(sym => {
            if (sym?.id === 'multiplier') {
                multiplierValue += sym.value || 0;
            }
        });

        return { totalWin, winIndices, multiplierValue };
    };

    const animateWinCount = (target: number) => {
        let current = 0;
        const duration = 800;
        const start = performance.now();

        const step = (now: number) => {
            const progress = Math.min(1, (now - start) / duration);
            current = target * progress;
            setWinAmount(current);
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    };

    const handleSpin = async () => {
        if (isSpinning || balance < betAmount) return;

        setIsSpinning(true);
        setWinAmount(0);
        setWinningIndices([]);
        setLandingIndices([]);
        setMultiplierTotalValue(0);
        setBalance(prev => prev - betAmount);

        if (soundEnabled) sounds.current.spin?.play();

        const probModifier = isDoubleChanceActive ? 1.25 : 1.0;

        const fullNewGrid = Array(30).fill(null).map(() => {
            const isMultiplier = Math.random() > (0.95 / probModifier);
            if (isMultiplier) return { id: 'multiplier', image: `${SYMBOLS_PATH}/multiplier.png`, value: [2, 5, 8, 10, 15, 20, 25, 50, 100][Math.floor(Math.random() * 9)] };
            const isScatter = Math.random() > (0.97 / probModifier);
            if (isScatter) return symbols.find(s => s.id === 'scatter');

            // Bias slightly towards higher value symbols if double chance active
            if (isDoubleChanceActive && Math.random() > 0.7) {
                return symbols[Math.floor(Math.random() * 4)]; // Top 4 symbols
            }
            return symbols[Math.floor(Math.random() * (symbols.length - 1))];
        });

        // Clear cascading arrival
        const tempVisibleGrid = [...visibleGrid];
        setGrid(fullNewGrid);

        for (let col = 0; col < 6; col++) {
            await new Promise(r => setTimeout(r, 100)); // Faster column stagger
            for (let row = 0; row < 5; row++) {
                const idx = row * 6 + col;
                tempVisibleGrid[idx] = fullNewGrid[idx];
                setVisibleGrid([...tempVisibleGrid]);
            }
            setLandingIndices(prev => [...prev, col]);
            if (soundEnabled) {
                const s = sounds.current.land?.play();
                sounds.current.land?.volume(volume, s);
            }
        }

        await new Promise(r => setTimeout(r, 400));
        sounds.current.spin?.stop();

        let currentGrid: (typeof symbols[0] | any | null)[] = [...fullNewGrid];
        let hasMoreWins = true;
        let sessionWin = 0;
        let sessionMultiplier = 0;

        while (hasMoreWins) {
            const { totalWin, winIndices, multiplierValue } = checkWins(currentGrid);

            if (multiplierValue > 0) {
                sessionMultiplier += multiplierValue;
                setMultiplierTotalValue(sessionMultiplier);
                setScreenShake(true);
                setTimeout(() => setScreenShake(false), 300);
            }

            if (totalWin > 0) {
                setWinningIndices(winIndices);
                if (soundEnabled) sounds.current.win?.play();
                await new Promise(r => setTimeout(r, 800));

                sessionWin += totalWin;
                animateWinCount(sessionWin);

                setWinningIndices([]);
                const nextGrid: (typeof symbols[0] | null)[] = [...currentGrid];
                winIndices.forEach(idx => { nextGrid[idx] = null; });

                // Tumble Logic
                for (let col = 0; col < 6; col++) {
                    for (let row = 4; row >= 0; row--) {
                        const idx = row * 6 + col;
                        if (nextGrid[idx] !== null) {
                            const sym = nextGrid[idx];
                            nextGrid[idx] = null;
                            let lowest = row;
                            for (let r = row + 1; r < 5; r++) {
                                if (nextGrid[r * 6 + col] === null) lowest = r;
                                else break;
                            }
                            nextGrid[lowest * 6 + col] = sym;
                        }
                    }
                }

                // Fill gaps
                for (let i = 0; i < 30; i++) {
                    if (nextGrid[i] === null) {
                        const isMultiplier = Math.random() > 0.98;
                        if (isMultiplier) nextGrid[i] = { id: 'multiplier', image: `${SYMBOLS_PATH}/multiplier.png`, value: [2, 5, 10, 25, 100][Math.floor(Math.random() * 5)] };
                        else nextGrid[i] = symbols[Math.floor(Math.random() * (symbols.length - 1))];
                    }
                }

                currentGrid = nextGrid;
                setVisibleGrid(currentGrid);
                await new Promise(r => setTimeout(r, 600));
            } else {
                hasMoreWins = false;
            }
        }

        if (sessionWin > 0) {
            const currentWinIdx = consecutiveWins + 1;
            let houseEdgeMultiplier = 0.25; // Default for 1st win (House keeps 75%, player gets 25%)

            if (currentWinIdx === 2) houseEdgeMultiplier = 0.50;
            else if (currentWinIdx === 3) houseEdgeMultiplier = 0.75;
            else if (currentWinIdx >= 4) houseEdgeMultiplier = 0.95;

            // Randomize after 4th win but stay around a range if needed, 
            // the user said "randomize this" after 4th.
            if (currentWinIdx > 4) houseEdgeMultiplier = 0.05 + Math.random() * 0.9;

            const baseWin = sessionMultiplier > 0 ? sessionWin * sessionMultiplier : sessionWin;
            const houseAdjustedWin = baseWin * houseEdgeMultiplier;

            setConsecutiveWins(currentWinIdx);
            animateWinCount(houseAdjustedWin);
            setBalance(prev => prev + houseAdjustedWin);

            // Update free spins win total if in free spins mode
            if (isFreeSpinsMode) {
                setFreeSpinsWinTotal(prev => prev + houseAdjustedWin);
            }

            // Determine win tier message
            const winMultiple = houseAdjustedWin / betAmount;
            let tierMsg = '';
            if (winMultiple >= 100) tierMsg = 'MAGNIFICENT!';
            else if (winMultiple >= 20) tierMsg = 'SENSATIONAL!';
            else if (winMultiple >= 5) tierMsg = 'GREAT!';
            else if (winMultiple >= 2) tierMsg = 'NICE!';

            if (tierMsg) {
                setWinTierMessage(tierMsg);
                setShowWinTierMessage(true);
                setTimeout(() => setShowWinTierMessage(false), 2000);
            }

            if (houseAdjustedWin >= betAmount * 5) {
                setShowWinCelebration(true);
                setTimeout(() => setShowWinCelebration(false), 5500);
            }
        } else {
            setConsecutiveWins(0); // Reset on loss
            if (soundEnabled) sounds.current.loss?.play();

            // Show fake multipliers during free spins even if no real win
            if (isFreeSpinsMode) {
                const fakeMultipliers = [5, 10, 25, 50, 100];
                const randomMultiplier = fakeMultipliers[Math.floor(Math.random() * fakeMultipliers.length)];
                const fakeWinAmount = betAmount * randomMultiplier * (0.5 + Math.random() * 0.5);

                setFakeMultiplierValue(randomMultiplier);
                setShowFakeMultipliers(true);

                // Animate fake win
                animateWinCount(fakeWinAmount);
                setFreeSpinsWinTotal(prev => prev + fakeWinAmount);

                // Show fake win tier message
                setWinTierMessage('NICE!');
                setShowWinTierMessage(true);
                setTimeout(() => setShowWinTierMessage(false), 2000);

                // Hide fake multipliers after animation
                setTimeout(() => {
                    setShowFakeMultipliers(false);
                }, 2000);
            }
        }

        // Check for scatter symbols to trigger free spins (3+ scatters)
        const scatterCount = currentGrid.filter(sym => sym?.id === 'scatter').length;
        if (scatterCount >= 3 && !isFreeSpinsMode) {
            setShowFreeSpinsTrigger(true);
        }


        // Handle free spins mode
        if (isFreeSpinsMode && freeSpinsRemaining > 0) {
            const newRemaining = freeSpinsRemaining - 1;
            setFreeSpinsRemaining(newRemaining);

            if (newRemaining === 0) {
                // Free spins ended
                setIsFreeSpinsMode(false);
                setFreeSpinsWinTotal(0);
            }
        }

        // Increase fire intensity on spin
        setFireIntensity(prev => Math.min(prev + 1, 4));

        // Decrease fire intensity slowly over time
        setTimeout(() => {
            setFireIntensity(prev => Math.max(prev - 1, 0));
        }, 3000);

        // Handle auto-spin countdown
        if (autoSpinRemaining > 0) {
            const newRemaining = autoSpinRemaining - 1;
            setAutoSpinRemaining(newRemaining);

            // Pause on big win (10x+ bet)
            if (sessionWin >= betAmount * 10) {
                setAutoSpinRemaining(0);
                setIsAutoPlaying(false);
            } else if (newRemaining === 0) {
                setIsAutoPlaying(false);
            }
        }

        setIsSpinning(false);
    };

    // Auto spin effect
    useEffect(() => {
        let timer: any;
        if (isAutoPlaying && !isSpinning && balance >= betAmount) {
            timer = setTimeout(() => {
                handleSpin();
            }, 1500);
        }
        return () => clearTimeout(timer);
    }, [isAutoPlaying, isSpinning, balance, betAmount]);

    if (gameState === 'LOADING') {
        return (
            <div className="h-screen w-full bg-[#1b0a21] flex flex-col items-center justify-center relative overflow-hidden">
                <style dangerouslySetInnerHTML={{
                    __html: `
                    @font-face { font-family: 'Enchanted Land'; src: url('/assets/Fonts/Enchanted Land 400.otf') format('opentype'); }
                    @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
                    @keyframes logo-glow { from { filter: drop-shadow(0 0 20px rgba(255,100,0,0.4)); } to { filter: drop-shadow(0 0 40px rgba(255,100,0,0.8)); } }
                    .animate-logo-fire { animation: logo-glow 1.5s ease-in-out infinite alternate; }
                `}} />

                {/* Background Glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,149,0.15),transparent_70%)]" />

                <div className="relative mb-16 transform scale-150 animate-bounce flex items-center justify-center w-full">
                    <GameLogo className="w-[600px] h-auto drop-shadow-3xl" fireEffect={false} />
                </div>

                <div className="w-[450px] h-6 bg-white/10 rounded-full overflow-hidden border-2 border-white/20 relative mt-24">
                    <div className="h-full bg-gradient-to-r from-[#ff0095] via-[#ffeb3b] to-[#ff0095] transition-all duration-300 shadow-[0_0_30px_rgba(255,0,149,1)]"
                        style={{ width: `${loadingProgress}%`, backgroundSize: '200% 100%', animation: 'shimmer 2s linear infinite' }} />
                </div>
                <div className="text-white font-black tracking-[0.4em] text-3xl mt-12 italic drop-shadow-lg" style={{ fontFamily: 'MilkywayDEMO' }}>{t('game.loading')}... {loadingProgress}%</div>
            </div>
        );
    }

    return (
        <div className={`h-screen w-full overflow-hidden bg-[#0a0a0a] relative flex items-center justify-center font-sans select-none overflow-x-hidden ${screenShake ? 'animate-shake' : ''}`}>
            <style dangerouslySetInnerHTML={{
                __html: `
                @font-face { font-family: 'Enchanted Land'; src: url('/assets/Fonts/Enchanted Land 400.otf') format('opentype'); }
                @import url('https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,700;0,900;1,700;1,900&display=swap');
                
                @keyframes float { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-20px) rotate(2deg); } }
                .animate-float { animation: float 5s ease-in-out infinite; }

                @keyframes shake {
                    0%, 100% { transform: translate(0, 0); }
                    25% { transform: translate(-10px, 10px); }
                    50% { transform: translate(10px, -10px); }
                    75% { transform: translate(-10px, -10px); }
                }
                @font-face {
                    font-family: 'MilkywayDEMO';
                    src: url('/assets/Fonts/Milkyway.ttf') format('truetype');
                }

                @keyframes sparkle { 0%, 100% { opacity: 0; transform: scale(0.5); } 50% { opacity: 1; transform: scale(1.5); } }
                .sparkle { position: absolute; background: white; border-radius: 50%; opacity: 0; pointer-events: none; }

                @keyframes idle-float {
                    0% { transform: translateY(0) scale(0.9); filter: drop-shadow(0 0 10px transparent); }
                    50% { transform: translateY(-5px) scale(0.95); filter: drop-shadow(0 0 20px rgba(255,100,0,0.6)); }
                    100% { transform: translateY(0) scale(0.9); filter: drop-shadow(0 0 10px transparent); }
                }
                .animate-idle-glow { animation: idle-float 3s ease-in-out infinite; }

                @keyframes multiplier-fire {
                    0%, 100% { filter: drop-shadow(0 0 20px #ff4500) brightness(1.2); }
                    50% { filter: drop-shadow(0 0 40px #ff0000) brightness(1.5); transform: scale(1.1); }
                }
                .animate-multiplier-fire { animation: multiplier-fire 1s ease-in-out infinite; }

                @keyframes cloudMoveRight {
                    0% { transform: translateX(-100%) scale(0.8); opacity: 0; }
                    10% { opacity: 0.8; }
                    90% { opacity: 0.8; }
                    100% { transform: translateX(120vw) scale(1); opacity: 0; }
                }

                @keyframes cloudMoveLeft {
                    0% { transform: translateX(110vw) scale(1); opacity: 0; }
                    10% { opacity: 0.8; }
                    90% { opacity: 0.8; }
                    100% { transform: translateX(-120%) scale(0.8); opacity: 0; }
                }

                .animate-cloud-right { animation: cloudMoveRight 40s linear forwards; }
                .animate-cloud-left { animation: cloudMoveLeft 40s linear forwards; }
                
                @keyframes land-bounce { 0% { transform: translateY(-50px); } 100% { transform: translateY(0); } }
                .animate-land-bounce { animation: land-bounce 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
                
                @keyframes reel-fall { 
                    0% { transform: translateY(-100%); opacity: 0; } 
                    100% { transform: translateY(0); opacity: 1; } 
                }
                .animate-reel-fall { animation: reel-fall 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; }

                @keyframes multiplier-vibrate { 0%, 100% { transform: scale(1) rotate(0); } 50% { transform: scale(1.1) rotate(5deg); } }
                .animate-multiplier-vibrate { animation: multiplier-vibrate 0.15s ease-in-out infinite; }
                
                @keyframes fall {
                    0% { transform: translateY(-100px) rotate(0deg); opacity: 1; }
                    100% { transform: translateY(100vh) rotate(720deg); opacity: 0.5; }
                }
                .animate-fall { animation: fall linear forwards; }
                
                @keyframes coin-toss {
                    0% { 
                        transform: translate(0, 0) rotate(0deg) scale(0.5); 
                        opacity: 0; 
                    }
                    15% { 
                        transform: translate(
                            calc(cos(var(--toss-angle)) * var(--toss-distance)), 
                            calc(sin(var(--toss-angle)) * var(--toss-distance) - 150px)
                        ) rotate(calc(var(--coin-rotation) * 0.3)) scale(var(--coin-scale)); 
                        opacity: 1; 
                    }
                    40% { 
                        transform: translate(
                            calc(cos(var(--toss-angle)) * var(--toss-distance) * 1.2), 
                            calc(sin(var(--toss-angle)) * var(--toss-distance) * 0.5 + 200px)
                        ) rotate(calc(var(--coin-rotation) * 0.6)) scale(var(--coin-scale)); 
                        opacity: 1; 
                    }
                    70% { 
                        transform: translate(
                            calc(cos(var(--toss-angle)) * var(--toss-distance) * 1.1), 
                            calc(100vh - 120px)
                        ) rotate(calc(var(--coin-rotation) * 0.9)) scale(calc(var(--coin-scale) * 0.8)); 
                        opacity: 0.9;
                        animation-timing-function: ease-out;
                    }
                    85% { 
                        transform: translate(
                            calc(cos(var(--toss-angle)) * var(--toss-distance) * 1.1), 
                            calc(100vh - 80px)
                        ) rotate(var(--coin-rotation)) scale(calc(var(--coin-scale) * 0.6)); 
                        opacity: 0.7;
                    }
                    100% { 
                        transform: translate(
                            calc(cos(var(--toss-angle)) * var(--toss-distance) * 1.1), 
                            calc(100vh + 100px)
                        ) rotate(var(--coin-rotation)) scale(0.3); 
                        opacity: 0; 
                    }
                }
                .animate-coin-toss { animation: coin-toss 3s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; }
                
                @keyframes logo-fire-low {
                    0%, 100% { filter: drop-shadow(0 0 15px rgba(255,100,0,0.3)); }
                    50% { filter: drop-shadow(0 0 25px rgba(255,100,0,0.5)); }
                }
                
                @keyframes logo-fire-medium {
                    0%, 100% { filter: drop-shadow(0 0 25px rgba(255,100,0,0.5)) drop-shadow(0 0 35px rgba(255,50,0,0.4)); }
                    50% { filter: drop-shadow(0 0 40px rgba(255,100,0,0.7)) drop-shadow(0 0 50px rgba(255,50,0,0.6)); }
                }
                
                @keyframes logo-fire-high {
                    0%, 100% { filter: drop-shadow(0 0 35px rgba(255,100,0,0.7)) drop-shadow(0 0 50px rgba(255,0,0,0.6)); }
                    50% { filter: drop-shadow(0 0 55px rgba(255,100,0,0.9)) drop-shadow(0 0 70px rgba(255,0,0,0.8)); transform: scale(1.02); }
                }
                
                @keyframes logo-fire-extreme {
                    0%, 100% { filter: drop-shadow(0 0 50px rgba(255,100,0,1)) drop-shadow(0 0 70px rgba(255,0,0,0.9)) drop-shadow(0 0 90px rgba(255,150,0,0.7)); }
                    50% { filter: drop-shadow(0 0 70px rgba(255,100,0,1)) drop-shadow(0 0 90px rgba(255,0,0,1)) drop-shadow(0 0 110px rgba(255,150,0,0.9)); transform: scale(1.05); }
                }
                
                .fire-intensity-0 { animation: none; }
                .fire-intensity-1 { animation: logo-fire-low 2s ease-in-out infinite; }
                .fire-intensity-2 { animation: logo-fire-medium 1.5s ease-in-out infinite; }
                .fire-intensity-3 { animation: logo-fire-high 1s ease-in-out infinite; }
                .fire-intensity-4 { animation: logo-fire-extreme 0.8s ease-in-out infinite; }
                
                @keyframes match-pop {
                    0% { transform: scale(1); filter: brightness(1); }
                    30% { transform: scale(1.5); filter: brightness(2.5) drop-shadow(0 0 40px white); }
                    100% { transform: scale(0); opacity: 0; filter: blur(10px); }
                }
                .animate-match-pop { animation: match-pop 0.75s cubic-bezier(0.6, -0.28, 0.735, 0.045) forwards; }
                
                @keyframes spin-fast { from { transform: rotate(0deg); } to { transform: rotate(-1080deg); } }
                .animate-spin-fast { animation: spin-fast 1.2s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
            `}} />

            {/* Background Layer */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <img src={`${SYMBOLS_PATH}/background.png`} className="w-full h-full object-cover scale-110 blur-[1px]" alt="bg" />
                <div className="absolute inset-0 bg-black/10" />
                <MovingClouds />
                {[...Array(80)].map((_, i) => (
                    <div key={i} className="sparkle w-2 h-2 bg-white/40 blur-[1px]"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animation: `sparkle ${1 + Math.random() * 2}s infinite`,
                            animationDelay: `${Math.random() * 5}s`
                        }} />
                ))}
            </div>

            {/* Total Game Container - Fully Responsive */}
            <div className="relative flex flex-col items-center justify-center z-10"
                style={{
                    width: window.innerWidth >= 1024 ? '1920px' : '100%',
                    height: window.innerWidth >= 1024 ? '1080px' : 'auto',
                    minHeight: window.innerWidth >= 1024 ? '1080px' : '100vh',
                    transform: window.innerWidth >= 1024 ? `scale(${gameScale})` : 'none',
                    transformOrigin: 'center center'
                }}>

                {/* Return Icon */}
                <button
                    onClick={() => onNavigate?.('home')}
                    className="absolute top-10 left-10 w-16 h-16 bg-black/40 hover:bg-black/60 rounded-full flex items-center justify-center text-white border-2 border-white/20 shadow-2xl backdrop-blur-md transition-all hover:scale-110 z-50 pointer-events-auto"
                >
                    <Home size={32} />
                </button>

                {/* Logo Section - Fully Responsive */}
                <div className={`absolute top-[60px] sm:top-[40px] md:top-[60px] lg:top-[130px] left-1/2 -translate-x-1/2 flex flex-col items-center group cursor-pointer transition-all duration-500 z-30 drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)] fire-intensity-${Math.min(fireIntensity, 4)}`}>
                    <GameLogo className="w-[300px] sm:w-[350px] md:w-[450px] lg:w-[600px] h-auto" />
                </div>

                {/* Sidebar Features - Responsive positioning */}
                <div className="hidden lg:flex absolute left-[11px] top-[35%] flex-col gap-8 z-20">
                    <button
                        onClick={() => setIsBonusBuyModalOpen(true)}
                        className="group relative w-[240px] h-[110px] bg-gradient-to-b from-[#ff8ebb] to-[#e9118c] rounded-[2rem] border-[6px] border-white shadow-[0_15px_30px_rgba(0,0,0,0.4)] flex flex-col items-center justify-center pointer-events-auto hover:rotate-1 hover:scale-105 transition-all">
                        <span className="text-[14px] font-black text-white text-center leading-tight uppercase drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)] mb-1 italic">SATIN ALMA<br />ÖZELLİĞİ</span>
                        <div className="bg-[#ffeb3b] rounded-full px-10 py-1.5 border-[3px] border-white shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]">
                            <span className="text-[#bf1e2e] font-black text-3xl tabular-nums italic">200 ₺</span>
                        </div>
                    </button>

                    <button
                        onClick={() => setIsDoubleChanceActive(!isDoubleChanceActive)}
                        className="group relative w-[240px] h-[180px] bg-gradient-to-b from-[#b4ec51] to-[#429321] rounded-[2.5rem] border-[6px] border-white shadow-[0_15px_30px_rgba(0,0,0,0.4)] flex flex-col items-center justify-center pointer-events-auto hover:-rotate-1 hover:scale-105 transition-all"
                    >
                        <div className="bg-[#ffeb3b] rounded-full px-8 py-1 border-[3px] border-white shadow-lg mb-2 -mt-4">
                            <span className="text-[#429321] font-black text-2xl italic uppercase">KAZANIN</span>
                        </div>
                        <span className="text-white font-black text-5xl tabular-nums drop-shadow-[0_3px_5px_rgba(0,0,0,0.5)] leading-none italic">{(betAmount * 1.25).toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺</span>
                        <span className="text-[11px] font-bold text-white px-4 text-center leading-tight mt-2 uppercase opacity-95 text-shadow-sm">KAZANMA ŞANSINI İKİYE KATLAMA ÖZELLİĞİ</span>

                        <div className="mt-4 w-[150px] h-10 bg-black/40 rounded-full border-[3px] border-white/80 flex items-center px-1 overflow-hidden">
                            <div className={`p-1 flex items-center transition-all w-full ${isDoubleChanceActive ? 'flex-row-reverse bg-green-500/40 rounded-full' : 'flex-row'}`}>
                                <div className={`w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-lg transform transition-transform ${isDoubleChanceActive ? 'rotate-180' : ''}`}>
                                    <div className={`w-1.5 h-4 ${isDoubleChanceActive ? 'bg-green-600' : 'bg-red-600'} rounded-full rotate-45`} />
                                    <div className={`w-1.5 h-4 ${isDoubleChanceActive ? 'bg-green-600' : 'bg-red-600'} rounded-full -rotate-45 -ml-1.5`} />
                                </div>
                                <span className="text-white font-black text-[13px] px-3 flex-1 text-center">{isDoubleChanceActive ? 'AÇIK' : 'KAPALI'}</span>
                            </div>
                        </div>
                    </button>
                </div>

                {/* Mobile/Tablet Sidebar - Horizontal at top - Fully Responsive */}
                <div className="lg:hidden absolute top-[150px] sm:top-[130px] md:top-[140px] left-1/2 -translate-x-1/2 flex flex-row gap-3 sm:gap-4 z-20">
                    <button
                        onClick={() => setIsBonusBuyModalOpen(true)}
                        className="group relative w-[140px] sm:w-[160px] md:w-[180px] h-[70px] sm:h-[80px] md:h-[90px] bg-gradient-to-b from-[#ff8ebb] to-[#e9118c] rounded-[1.2rem] sm:rounded-[1.4rem] md:rounded-[1.5rem] border-[3px] sm:border-[3.5px] md:border-[4px] border-white shadow-[0_8px_16px_rgba(0,0,0,0.4)] sm:shadow-[0_9px_18px_rgba(0,0,0,0.4)] md:shadow-[0_10px_20px_rgba(0,0,0,0.4)] flex flex-col items-center justify-center pointer-events-auto hover:rotate-1 hover:scale-105 transition-all">
                        <span className="text-[9px] sm:text-[10px] md:text-[11px] font-black text-white text-center leading-tight uppercase drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)] mb-1 italic">SATIN ALMA<br />ÖZELLİĞİ</span>
                        <div className="bg-[#ffeb3b] rounded-full px-3 sm:px-5 md:px-6 py-0.5 sm:py-0.5 md:py-1 border-[2px] border-white shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]">
                            <span className="text-[#bf1e2e] font-black text-base sm:text-lg md:text-xl tabular-nums italic">200 ₺</span>
                        </div>
                    </button>

                    <button
                        onClick={() => setIsDoubleChanceActive(!isDoubleChanceActive)}
                        className="group relative w-[140px] sm:w-[160px] md:w-[180px] h-[70px] sm:h-[80px] md:h-[90px] bg-gradient-to-b from-[#b4ec51] to-[#429321] rounded-[1.2rem] sm:rounded-[1.4rem] md:rounded-[1.5rem] border-[3px] sm:border-[3.5px] md:border-[4px] border-white shadow-[0_8px_16px_rgba(0,0,0,0.4)] sm:shadow-[0_9px_18px_rgba(0,0,0,0.4)] md:shadow-[0_10px_20px_rgba(0,0,0,0.4)] flex flex-col items-center justify-center pointer-events-auto hover:-rotate-1 hover:scale-105 transition-all"
                    >
                        <div className="bg-[#ffeb3b] rounded-full px-2 sm:px-4 md:px-5 py-0.5 border-[2px] border-white shadow-lg mb-1">
                            <span className="text-[#429321] font-black text-xs sm:text-base md:text-lg italic uppercase">KAZANIN</span>
                        </div>
                        <span className="text-white font-black text-lg sm:text-2xl md:text-3xl tabular-nums drop-shadow-[0_2px_3px_rgba(0,0,0,0.5)] leading-none italic">{(betAmount * 1.25).toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺</span>
                        <span className="text-[7px] sm:text-[9px] md:text-[10px] font-bold text-white px-2 text-center leading-tight mt-0.5 uppercase opacity-95">KAZANMA ŞANSINI İKİYE KATLAMA ÖZELLİĞİ</span>
                        <div className="absolute top-1 right-1 flex items-center gap-1 bg-black/40 rounded-full px-2 py-0.5">
                            <div className={`w-4 h-4 sm:w-5 sm:h-5 bg-white rounded-full flex items-center justify-center shadow-lg transform transition-transform ${isDoubleChanceActive ? 'rotate-180' : ''}`}>
                                <div className={`w-1 h-2 sm:w-1.5 sm:h-3 ${isDoubleChanceActive ? 'bg-green-600' : 'bg-red-600'} rounded-full rotate-45`} />
                                <div className={`w-1 h-2 sm:w-1.5 sm:h-3 ${isDoubleChanceActive ? 'bg-green-600' : 'bg-red-600'} rounded-full -rotate-45 -ml-1`} />
                            </div>
                            <span className="text-white font-black text-[8px] sm:text-[10px]">{isDoubleChanceActive ? 'AÇIK' : 'KAPALI'}</span>
                        </div>
                    </button>
                </div>

                {/* Slot Machine Area - Fully Responsive */}
                <div className="relative w-[429px] h-[528px] sm:w-[450px] sm:h-[550px] md:w-[550px] md:h-[650px] lg:w-[1000px] lg:h-[750px] mt-[105px] sm:mt-[200px] md:mt-[220px] lg:mt-48 flex items-center justify-center">
                    <div className="absolute inset-0 bg-[#7a3ea3]/40 backdrop-blur-md rounded-[3rem] border-[12px] border-white/90 shadow-[0_0_50px_rgba(0,0,0,0.5)]" />
                    <div className="absolute inset-0 border-[4px] border-dashed border-red-500/60 rounded-[3rem] m-1 z-10 pointer-events-none" />
                    <div className="absolute inset-4 overflow-visible">
                        <div className="grid grid-cols-6 h-full w-full">
                            {visibleGrid.map((sym, i) => {
                                const col = i % 6;
                                return (
                                    <div key={i} className={`flex items-center justify-center relative 
                                        ${winningIndices.includes(i) ? 'animate-match-pop z-20' : ''} 
                                        ${landingIndices.includes(col) ? 'animate-land-bounce' : ''}`}>
                                        {sym && (
                                            <div className="relative w-[90%] h-[90%] flex items-center justify-center group">
                                                <img
                                                    src={sym.image}
                                                    className={`w-full h-full object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.5)] transition-all duration-300 group-hover:scale-110 
                                                        ${isSpinning ? 'animate-reel-fall opacity-80' : 'animate-idle-glow'}`}
                                                    alt={sym.id}
                                                />
                                                {sym.id === 'scatter' && !isSpinning && (
                                                    <div className="absolute inset-0 bg-yellow-400/30 blur-3xl animate-pulse rounded-full -z-10" />
                                                )}
                                                {sym.id === 'multiplier' && !isSpinning && landingIndices.includes(col) && (
                                                    <div className="absolute inset-0 flex items-center justify-center mt-10">
                                                        <span className="text-[#ffeb3b] font-black text-6xl italic drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] animate-multiplier-vibrate"
                                                            style={{ fontFamily: 'MilkywayDEMO, sans-serif', WebkitTextStroke: '2px #5D4418' }}>
                                                            {sym.value}x
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Win Display Floating Overlay - Fully Responsive */}
                <div className={`absolute left-1/2 bottom-[180px] sm:bottom-[200px] md:bottom-[240px] lg:bottom-[300px] -translate-x-1/2 flex flex-col items-center transition-all duration-700 ${winAmount > 0 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20 pointer-events-none'} z-40`}>
                    <div className="bg-gradient-to-b from-[#8b44ad] to-[#5e3370] px-8 sm:px-12 md:px-16 lg:px-24 py-3 sm:py-4 md:py-5 lg:py-6 rounded-[2rem] sm:rounded-[2.5rem] md:rounded-[3rem] border-[6px] sm:border-[8px] md:border-[10px] lg:border-[12px] border-white shadow-[0_15px_40px_rgba(0,0,0,0.7)]">
                        <span className="text-white text-5xl sm:text-6xl md:text-7xl lg:text-9xl font-black tabular-nums drop-shadow-[0_4px_4px_rgba(0,0,0,0.6)] italic">
                            {winAmount.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺
                        </span>
                    </div>
                </div>

                {/* Bottom Control Bar - Fully Responsive */}
                <div className="absolute bottom-[72px] sm:bottom-[20px] md:bottom-[30px] lg:bottom-10 left-0 right-0 h-[80px] sm:h-[90px] md:h-[100px] lg:h-[120px] px-2 sm:px-4 md:px-8 lg:px-16 flex items-center z-50 pointer-events-none">
                    {/* Removed Background Gradient */}

                    {/* Left Stats & Icons - Responsive */}
                    <div className="flex items-center gap-2 sm:gap-4 md:gap-6 lg:gap-10 pointer-events-auto mt-auto mb-2 sm:mb-3 md:mb-4">
                        <div className="flex items-center gap-2 sm:gap-3 md:gap-4 text-white/80">
                            <div className="w-10 h-10 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-black/40 flex items-center justify-center hover:bg-black/60 transition-all border sm:border border-white/20 cursor-pointer">
                                <Menu size={20} className="sm:w-5 sm:h-5 md:w-7 md:h-7" />
                            </div>
                            <div className="w-10 h-10 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-black/40 flex items-center justify-center hover:bg-black/60 transition-all border sm:border border-white/20 cursor-pointer" onClick={() => setSoundEnabled(!soundEnabled)}>
                                {soundEnabled ? <Volume2 size={20} className="sm:w-5 sm:h-5 md:w-7 md:h-7" /> : <VolumeX size={20} className="sm:w-5 sm:h-5 md:w-7 md:h-7" />}
                            </div>
                            <div className="w-10 h-10 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-black/40 flex items-center justify-center hover:bg-black/60 transition-all border sm:border border-white/20 cursor-pointer" onClick={() => { setShowInfoModal(true); setInfoSlideIndex(0); }}>
                                <Info size={20} className="sm:w-5 sm:h-5 md:w-7 md:h-7" />
                            </div>
                        </div>

                        <div className="flex flex-col gap-0">
                            <div className="flex items-baseline gap-1 sm:gap-2 md:gap-4">
                                <span className="text-[#ffeb3b] font-black text-xs sm:text-sm md:text-lg lg:text-xl tracking-tighter uppercase drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">KREDİ</span>
                                <span className="text-black text-sm sm:text-xl md:text-2xl lg:text-3xl font-black tabular-nums">{balance.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺</span>
                            </div>
                            <div className="flex items-baseline gap-1 sm:gap-2 md:gap-4">
                                <span className="text-[#ffeb3b] font-black text-xs sm:text-sm md:text-lg lg:text-xl tracking-tighter uppercase drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">BAHİS</span>
                                <span className="text-black text-sm sm:text-xl md:text-2xl lg:text-3xl font-black tabular-nums">{betAmount.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺</span>
                            </div>
                        </div>
                    </div>

                    {/* Center Hint - Hidden on mobile */}
                    <div className="hidden md:block absolute left-1/2 -translate-x-1/2 bottom-6 md:bottom-8 text-white/80 font-black text-[8px] md:text-[10px] lg:text-[11px] tracking-[0.1em] md:tracking-[0.2em] uppercase text-center w-full">
                        TURBO SPİN İÇİN BOŞLUK TUŞUNA BASILI TUTUN
                    </div>

                    {/* Right Controls - Responsive */}
                    <div className="ml-auto flex items-center gap-2 sm:gap-3 md:gap-4 lg:gap-6 pointer-events-auto mt-auto mb-2 sm:mb-3 md:mb-4 pr-[5px] sm:pr-[10px] md:pr-[15px] lg:pr-[25px]">
                        <button
                            onClick={() => setBetAmount(prev => Math.max(1, prev - 1))}
                            className="w-12 h-12 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full bg-gradient-to-b from-gray-100 to-gray-300 border-2 sm:border-3 md:border-4 border-white text-gray-800 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black flex items-center justify-center transition-all shadow-xl hover:scale-110 active:scale-90"
                        >
                            -
                        </button>

                        <div className="flex flex-col items-center relative -mt-2 sm:-mt-3 md:-mt-4">
                            <button
                                onClick={handleSpin}
                                disabled={isSpinning}
                                className={`w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] md:w-[120px] md:h-[120px] lg:w-[140px] lg:h-[140px] rounded-full border-[6px] sm:border-[7px] md:border-[8px] lg:border-[10px] border-white shadow-[0_10px_30px_rgba(0,0,0,0.8)] sm:shadow-[0_10px_40px_rgba(0,0,0,0.8)] flex items-center justify-center transition-all bg-gradient-to-br from-zinc-800 to-black hover:from-zinc-700 hover:to-zinc-900
                                    ${isSpinning ? 'grayscale opacity-80' : 'hover:scale-105 active:scale-95 group'}`}
                            >
                                <svg width="40" height="40" viewBox="0 0 100 100" fill="none" className="sm:w-[50px] sm:h-[50px] md:w-[60px] md:h-[60px] lg:w-[80px] lg:h-[80px] relative z-10 transition-transform duration-700 ${isSpinning ? 'animate-spin-fast' : 'group-hover:rotate-180'}">
                                    <path d="M50 15C69.33 15 85 30.67 85 50C85 69.33 69.33 85 50 85C30.67 85 15 69.33 15 50" stroke="white" strokeWidth="8" strokeLinecap="round" />
                                    <path d="M15 50L5 35M15 50L25 35" stroke="white" strokeWidth="8" strokeLinecap="round" />
                                </svg>
                            </button>
                            <button
                                onClick={() => {
                                    if (autoSpinRemaining > 0) {
                                        // Stop auto-spin
                                        setAutoSpinRemaining(0);
                                        setIsAutoPlaying(false);
                                    } else {
                                        // Show selector
                                        setShowAutoSpinSelector(!showAutoSpinSelector);
                                    }
                                }}
                                className={`absolute -bottom-4 sm:-bottom-3 md:-bottom-4 w-[120px] h-[28px] sm:w-[140px] sm:h-[32px] md:w-[160px] md:h-[36px] lg:w-[180px] lg:h-[40px] font-black rounded-full border sm:border text-[8px] sm:text-[9px] md:text-[10px] lg:text-[12px] tracking-[0.1em] sm:tracking-[0.15em] md:tracking-[0.2em] uppercase flex items-center justify-center shadow-2xl transition-all
                                    ${autoSpinRemaining > 0 ? 'bg-red-600 text-white border-white animate-pulse' : 'bg-black text-white border-white/20 hover:bg-zinc-900'}`}
                            >
                                {autoSpinRemaining > 0 ? `DURDUR (${autoSpinRemaining})` : 'OTOMATİK OYUN'}
                            </button>

                            {/* Auto-Spin Selector */}
                            {showAutoSpinSelector && autoSpinRemaining === 0 && (
                                <div className="absolute -bottom-[140px] sm:-bottom-[100px] left-1/2 -translate-x-1/2 bg-gradient-to-b from-purple-700 to-purple-900 rounded-xl sm:rounded-2xl border-2 sm:border-4 border-yellow-400 shadow-2xl p-2 sm:p-2 z-50 pointer-events-auto">
                                    <div className="flex flex-col gap-1 sm:gap-1">
                                        {[5, 10, 20, 50].map(count => (
                                            <button
                                                key={count}
                                                onClick={() => {
                                                    setAutoSpinCount(count);
                                                    setAutoSpinRemaining(count);
                                                    setIsAutoPlaying(true);
                                                    setShowAutoSpinSelector(false);
                                                }}
                                                className="bg-gradient-to-r from-pink-500 to-pink-700 hover:from-pink-600 hover:to-pink-800 text-white px-3 sm:px-4 py-1 sm:py-1.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-black shadow-lg transition-all hover:scale-105"
                                            >
                                                {count} SPİN
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <button
                            onClick={() => setBetAmount(prev => prev + 1)}
                            className="w-12 h-12 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full bg-gradient-to-b from-gray-100 to-gray-300 border-2 sm:border-3 md:border-4 border-white text-gray-800 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black flex items-center justify-center transition-all shadow-xl hover:scale-110 active:scale-90"
                        >
                            +
                        </button>
                    </div>
                </div>

                {/* Watermark Removed */}
            </div>

            {/* Win Celebration Overlay */}
            {showWinCelebration && <WinCelebration amount={winAmount} />}

            {/* Free Spins Trigger Modal - Responsive */}
            {showFreeSpinsTrigger && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center pointer-events-auto px-4">
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" onClick={() => setShowFreeSpinsTrigger(false)} />
                    <div className="relative bg-gradient-to-b from-[#8b44ad] to-[#5e3370] px-8 sm:px-12 md:px-16 py-8 sm:py-10 md:py-12 rounded-[2rem] sm:rounded-[2.5rem] md:rounded-[3rem] border-4 sm:border-6 md:border-[8px] border-white shadow-[0_20px_60px_rgba(0,0,0,0.8)] animate-premium-pop max-w-[90vw] sm:max-w-lg">
                        <div className="flex flex-col items-center gap-3 sm:gap-4 md:gap-6">
                            <span className="text-yellow-400 text-3xl sm:text-4xl md:text-6xl font-black italic tracking-wider uppercase animate-bounce" style={{ fontFamily: 'MilkywayDEMO' }}>TEBRİKLER!</span>
                            <span className="text-white text-2xl sm:text-3xl md:text-5xl font-black tabular-nums" style={{ fontFamily: 'MilkywayDEMO' }}>KAZANDINIZ</span>
                            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 px-6 sm:px-8 md:px-12 py-2 sm:py-3 md:py-4 rounded-full border-2 sm:border-3 md:border-4 border-white">
                                <span className="text-purple-900 text-3xl sm:text-5xl md:text-7xl font-black" style={{ fontFamily: 'MilkywayDEMO' }}>10 FREESPIN</span>
                            </div>
                            <button
                                onClick={() => {
                                    setShowFreeSpinsTrigger(false);
                                    setIsFreeSpinsMode(true);
                                    setFreeSpinsRemaining(10);
                                    setFreeSpinsWinTotal(0);
                                }}
                                className="mt-2 sm:mt-3 md:mt-4 bg-green-600 hover:bg-green-700 text-white px-8 sm:px-12 md:px-16 py-2 sm:py-3 md:py-4 rounded-full text-xl sm:text-2xl md:text-3xl font-black uppercase shadow-2xl transition-all hover:scale-110"
                            >
                                BAŞLAT
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Bonus Buy Modal - Responsive */}
            {isBonusBuyModalOpen && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center pointer-events-auto px-4">
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" onClick={() => setIsBonusBuyModalOpen(false)} />
                    <div className="relative bg-gradient-to-b from-purple-600 to-purple-900 px-6 sm:px-8 md:px-12 py-6 sm:py-8 md:py-10 rounded-[2rem] sm:rounded-[2.5rem] md:rounded-[3rem] border-4 sm:border-6 md:border-[8px] border-yellow-400 shadow-[0_20px_60px_rgba(0,0,0,0.8)] max-w-[90vw] sm:max-w-xl md:max-w-2xl">
                        <div className="flex flex-col items-center gap-3 sm:gap-4 md:gap-6">
                            <span className="text-yellow-400 text-xl sm:text-2xl md:text-4xl font-black italic text-center leading-tight" style={{ fontFamily: 'MilkywayDEMO' }}>
                                SATIN AL 10 FREESPIN<br />
                                TÜM ÇARPAN BOMBALARLA<br />
                                MINIMUM 20X
                            </span>

                            <div className="flex flex-col gap-2 sm:gap-3 md:gap-4 w-full mt-2 sm:mt-3 md:mt-4">
                                <button
                                    onClick={() => {
                                        if (balance >= 1000) {
                                            setBalance(prev => prev - 1000);
                                            setIsBonusBuyModalOpen(false);
                                            setShowFreeSpinsTrigger(true);
                                        }
                                    }}
                                    className="bg-gradient-to-r from-pink-500 to-pink-700 hover:from-pink-600 hover:to-pink-800 text-white px-6 sm:px-8 md:px-12 py-3 sm:py-4 md:py-6 rounded-xl sm:rounded-2xl text-lg sm:text-2xl md:text-3xl font-black shadow-xl transition-all hover:scale-105 border-2 sm:border-3 md:border-4 border-white"
                                >
                                    1.000,00 ₺ (Standard)
                                </button>
                                <button
                                    onClick={() => {
                                        if (balance >= 4000) {
                                            setBalance(prev => prev - 4000);
                                            setIsBonusBuyModalOpen(false);
                                            setShowFreeSpinsTrigger(true);
                                        }
                                    }}
                                    className="bg-gradient-to-r from-orange-500 to-orange-700 hover:from-orange-600 hover:to-orange-800 text-white px-6 sm:px-8 md:px-12 py-3 sm:py-4 md:py-6 rounded-xl sm:rounded-2xl text-lg sm:text-2xl md:text-3xl font-black shadow-xl transition-all hover:scale-105 border-2 sm:border-3 md:border-4 border-white"
                                >
                                    4.000,00 ₺ (Super)
                                </button>
                                <button
                                    onClick={() => {
                                        if (balance >= 5000) {
                                            setBalance(prev => prev - 5000);
                                            setIsBonusBuyModalOpen(false);
                                            setShowFreeSpinsTrigger(true);
                                        }
                                    }}
                                    className="bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white px-6 sm:px-8 md:px-12 py-3 sm:py-4 md:py-6 rounded-xl sm:rounded-2xl text-lg sm:text-2xl md:text-3xl font-black shadow-xl transition-all hover:scale-105 border-2 sm:border-3 md:border-4 border-white"
                                >
                                    5.000,00 ₺ (Mega)
                                </button>
                            </div>

                            <div className="flex gap-3 sm:gap-4 md:gap-6 mt-3 sm:mt-4 md:mt-6">
                                <button
                                    onClick={() => setIsBonusBuyModalOpen(false)}
                                    className="bg-gray-600 hover:bg-gray-700 text-white px-6 sm:px-8 md:px-12 py-2 sm:py-3 md:py-4 rounded-full text-base sm:text-xl md:text-2xl font-black uppercase shadow-xl transition-all hover:scale-110"
                                >
                                    HAYIR
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Win Tier Message - Responsive */}
            {showWinTierMessage && winTierMessage && (
                <div className="fixed inset-0 z-[105] flex items-center justify-center pointer-events-none px-4">
                    <div className="animate-bounce">
                        <span className="text-yellow-400 text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black italic tracking-widest uppercase drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
                            style={{ fontFamily: 'MilkywayDEMO', WebkitTextStroke: '2px #ff6600', WebkitTextStrokeWidth: 'clamp(2px, 0.5vw, 4px)' }}>
                            {winTierMessage}
                        </span>
                    </div>
                </div>
            )}

            {/* Free Spins Counter - Responsive */}
            {isFreeSpinsMode && freeSpinsRemaining > 0 && (
                <div className="fixed top-16 sm:top-20 md:top-24 lg:top-32 left-1/2 -translate-x-1/2 z-[50] pointer-events-none px-4 max-w-[95vw]">
                    <div className="bg-gradient-to-b from-purple-600 to-purple-900 px-4 sm:px-6 md:px-8 lg:px-12 py-3 sm:py-4 md:py-5 lg:py-6 rounded-2xl sm:rounded-2xl md:rounded-3xl border-3 sm:border-4 md:border-5 lg:border-6 border-yellow-400 shadow-[0_15px_40px_rgba(0,0,0,0.7)]">
                        <div className="flex flex-col items-center gap-1 sm:gap-1.5 md:gap-2">
                            <span className="text-yellow-400 text-sm sm:text-base md:text-xl lg:text-2xl font-black uppercase" style={{ fontFamily: 'MilkywayDEMO' }}>
                                {freeSpinsRemaining === 1 ? 'SON FREESPIN' : 'KALAN FREESPINLER'}
                            </span>
                            <span className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tabular-nums" style={{ fontFamily: 'MilkywayDEMO' }}>
                                {freeSpinsRemaining}
                            </span>
                            <span className="text-green-400 text-base sm:text-lg md:text-2xl lg:text-3xl font-black" style={{ fontFamily: 'MilkywayDEMO' }}>
                                KAZANÇ: {freeSpinsWinTotal.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺
                            </span>
                        </div>
                    </div>
                </div>
            )}

            {/* Volatility Indicator - Responsive */}
            <div className="fixed top-2 sm:top-3 md:top-4 right-2 sm:right-3 md:right-4 z-[50] pointer-events-none">
                <div className="bg-black/60 backdrop-blur-md px-2 sm:px-3 md:px-4 lg:px-6 py-1.5 sm:py-2 md:py-2.5 lg:py-3 rounded-lg sm:rounded-xl md:rounded-2xl border border-white/20 sm:border-2">
                    <div className="flex flex-col items-center gap-0.5 sm:gap-1">
                        <span className="text-white text-[8px] sm:text-[10px] md:text-xs lg:text-sm font-bold uppercase">VOLATİLİTE</span>
                        <div className="flex gap-0.5 sm:gap-1">
                            {[...Array(5)].map((_, i) => (
                                <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="#FFD700" stroke="#FFA500" strokeWidth="1" className="sm:w-4 sm:h-4 md:w-5 md:h-5">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                </svg>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Info Modal with Slides */}
            {showInfoModal && (
                <div className="fixed inset-0 z-[120] flex items-center justify-center pointer-events-auto px-4">
                    <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={() => setShowInfoModal(false)} />
                    <div className="relative bg-gradient-to-b from-purple-600 to-purple-900 px-6 sm:px-8 md:px-12 py-6 sm:py-8 md:py-10 rounded-[2rem] sm:rounded-[2.5rem] md:rounded-[3rem] border-4 sm:border-6 md:border-[8px] border-yellow-400 shadow-[0_20px_60px_rgba(0,0,0,0.9)] w-[90vw] sm:max-w-2xl h-[500px] sm:h-[550px] flex flex-col">
                        {/* Slide Content - Centered and Scrollable */}
                        <div className="flex-1 flex items-center justify-center overflow-y-auto">
                            <div className="flex flex-col items-center gap-4 sm:gap-6 text-center w-full py-4">
                                {/* Slide 0: Welcome */}
                                {infoSlideIndex === 0 && (
                                    <div className="flex flex-col items-center gap-3 sm:gap-4 text-center">
                                        <h2 className="text-yellow-400 text-2xl sm:text-3xl md:text-4xl font-black" style={{ fontFamily: 'MilkywayDEMO' }}>
                                            SWEET BONANZA CLASSIC'E HOŞ GELDINIZ!
                                        </h2>
                                        <p className="text-white text-sm sm:text-base md:text-lg max-w-xl">
                                            Bu rehber size oyunun nasıl oynanacağını, sembolleri, çarpanları ve kazanma yollarını gösterecektir.
                                        </p>
                                        <div className="text-yellow-300 text-xs sm:text-sm md:text-base">
                                            Devam etmek için "İleri" butonuna tıklayın
                                        </div>
                                    </div>
                                )}

                                {/* Slide 1: Game Controls */}
                                {infoSlideIndex === 1 && (
                                    <div className="flex flex-col items-center gap-3 sm:gap-4">
                                        <h2 className="text-yellow-400 text-xl sm:text-2xl md:text-3xl font-black" style={{ fontFamily: 'MilkywayDEMO' }}>
                                            OYUN KONTROLLERI
                                        </h2>
                                        <div className="text-white text-xs sm:text-sm md:text-base space-y-2 sm:space-y-3">
                                            <p><strong className="text-yellow-300">Bahis Ayarlama:</strong> + ve - butonları ile bahis miktarınızı ayarlayın</p>
                                            <p><strong className="text-yellow-300">Döndür:</strong> Merkezdeki büyük butona tıklayarak oyunu başlatın</p>
                                            <p><strong className="text-yellow-300">Otomatik Oyun:</strong> Döndür butonunun altındaki "OTOMATİK OYUN" ile 5, 10, 20 veya 50 otomatik spin seçin</p>
                                            <p><strong className="text-yellow-300">Çift Şans:</strong> Kazanma şansınızı ikiye katlamak için yeşil butonu aktifleştirin</p>
                                            <p><strong className="text-yellow-300">Bonus Satın Al:</strong> Pembe buton ile doğrudan free spin satın alabilirsiniz</p>
                                        </div>
                                    </div>
                                )}

                                {/* Slide 2: Symbols - Fruits */}
                                {infoSlideIndex === 2 && (
                                    <div className="flex flex-col items-center gap-3 sm:gap-4">
                                        <h2 className="text-yellow-400 text-xl sm:text-2xl md:text-3xl font-black" style={{ fontFamily: 'MilkywayDEMO' }}>
                                            SEMBOLLER - MEYVELER
                                        </h2>
                                        <div className="grid grid-cols-2 gap-3 sm:gap-4 text-white text-xs sm:text-sm">
                                            <div className="flex flex-col items-center gap-1 sm:gap-2 bg-purple-800/50 p-2 sm:p-3 rounded-xl">
                                                <div className="text-4xl sm:text-5xl">🍇</div>
                                                <p className="font-bold text-yellow-300">Üzüm</p>
                                                <p className="text-center text-[10px] sm:text-xs">8+ sembol: Yüksek kazanç</p>
                                            </div>
                                            <div className="flex flex-col items-center gap-1 sm:gap-2 bg-purple-800/50 p-2 sm:p-3 rounded-xl">
                                                <div className="text-4xl sm:text-5xl">🍉</div>
                                                <p className="font-bold text-yellow-300">Karpuz</p>
                                                <p className="text-center text-[10px] sm:text-xs">8+ sembol: Yüksek kazanç</p>
                                            </div>
                                            <div className="flex flex-col items-center gap-1 sm:gap-2 bg-purple-800/50 p-2 sm:p-3 rounded-xl">
                                                <div className="text-4xl sm:text-5xl">🍎</div>
                                                <p className="font-bold text-yellow-300">Elma</p>
                                                <p className="text-center text-[10px] sm:text-xs">8+ sembol: Orta kazanç</p>
                                            </div>
                                            <div className="flex flex-col items-center gap-1 sm:gap-2 bg-purple-800/50 p-2 sm:p-3 rounded-xl">
                                                <div className="text-4xl sm:text-5xl">🍌</div>
                                                <p className="font-bold text-yellow-300">Muz</p>
                                                <p className="text-center text-[10px] sm:text-xs">8+ sembol: Orta kazanç</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Slide 3: Symbols - Candies */}
                                {infoSlideIndex === 3 && (
                                    <div className="flex flex-col items-center gap-3 sm:gap-4">
                                        <h2 className="text-yellow-400 text-xl sm:text-2xl md:text-3xl font-black" style={{ fontFamily: 'MilkywayDEMO' }}>
                                            SEMBOLLER - ŞEKERLER
                                        </h2>
                                        <div className="grid grid-cols-2 gap-3 sm:gap-4 text-white text-xs sm:text-sm">
                                            <div className="flex flex-col items-center gap-1 sm:gap-2 bg-purple-800/50 p-2 sm:p-3 rounded-xl">
                                                <div className="text-4xl sm:text-5xl">🍬</div>
                                                <p className="font-bold text-yellow-300">Şeker</p>
                                                <p className="text-center text-[10px] sm:text-xs">8+ sembol: Düşük kazanç</p>
                                            </div>
                                            <div className="flex flex-col items-center gap-1 sm:gap-2 bg-purple-800/50 p-2 sm:p-3 rounded-xl">
                                                <div className="text-4xl sm:text-5xl">🍭</div>
                                                <p className="font-bold text-yellow-300">Lolipop</p>
                                                <p className="text-center text-[10px] sm:text-xs">8+ sembol: Düşük kazanç</p>
                                            </div>
                                            <div className="flex flex-col items-center gap-1 sm:gap-2 bg-purple-800/50 p-2 sm:p-3 rounded-xl">
                                                <div className="text-4xl sm:text-5xl">🍩</div>
                                                <p className="font-bold text-yellow-300">Donut</p>
                                                <p className="text-center text-[10px] sm:text-xs">8+ sembol: Düşük kazanç</p>
                                            </div>
                                            <div className="flex flex-col items-center gap-1 sm:gap-2 bg-purple-800/50 p-2 sm:p-3 rounded-xl">
                                                <div className="text-4xl sm:text-5xl">🧁</div>
                                                <p className="font-bold text-yellow-300">Cupcake</p>
                                                <p className="text-center text-[10px] sm:text-xs">8+ sembol: Düşük kazanç</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Slide 4: Special Symbols */}
                                {infoSlideIndex === 4 && (
                                    <div className="flex flex-col items-center gap-3 sm:gap-4">
                                        <h2 className="text-yellow-400 text-xl sm:text-2xl md:text-3xl font-black" style={{ fontFamily: 'MilkywayDEMO' }}>
                                            ÖZEL SEMBOLLER
                                        </h2>
                                        <div className="grid grid-cols-1 gap-3 sm:gap-4 text-white text-xs sm:text-sm w-full max-w-md">
                                            <div className="flex flex-col items-center gap-2 bg-gradient-to-r from-yellow-600 to-orange-600 p-3 sm:p-4 rounded-xl">
                                                <div className="text-5xl sm:text-6xl">🍭</div>
                                                <p className="font-black text-xl sm:text-2xl text-yellow-200">SCATTER</p>
                                                <p className="text-center text-xs sm:text-sm">3 veya daha fazla scatter sembolü ile <strong>10 FREE SPIN</strong> kazanırsınız!</p>
                                            </div>
                                            <div className="flex flex-col items-center gap-2 bg-gradient-to-r from-red-600 to-pink-600 p-3 sm:p-4 rounded-xl">
                                                <div className="text-5xl sm:text-6xl">💣</div>
                                                <p className="font-black text-xl sm:text-2xl text-yellow-200">ÇARPAN BOMBASI</p>
                                                <p className="text-center text-xs sm:text-sm">Kazancınızı <strong>2x, 5x, 10x, 25x, 50x veya 100x</strong> ile çarpabilir!</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Slide 5: Multipliers */}
                                {infoSlideIndex === 5 && (
                                    <div className="flex flex-col items-center gap-3 sm:gap-4">
                                        <h2 className="text-yellow-400 text-xl sm:text-2xl md:text-3xl font-black" style={{ fontFamily: 'MilkywayDEMO' }}>
                                            ÇARPANLAR
                                        </h2>
                                        <div className="text-white text-xs sm:text-sm md:text-base space-y-2 sm:space-y-3">
                                            <p className="text-center text-yellow-300 font-bold text-sm sm:text-base md:text-lg">
                                                Çarpan bombaları kazancınızı katlar!
                                            </p>
                                            <div className="grid grid-cols-3 gap-2 sm:gap-3">
                                                <div className="bg-purple-800/50 p-2 sm:p-3 rounded-lg text-center">
                                                    <p className="text-2xl sm:text-3xl font-black text-yellow-400">2x</p>
                                                    <p className="text-[10px] sm:text-xs">Yaygın</p>
                                                </div>
                                                <div className="bg-purple-800/50 p-2 sm:p-3 rounded-lg text-center">
                                                    <p className="text-2xl sm:text-3xl font-black text-yellow-400">5x</p>
                                                    <p className="text-[10px] sm:text-xs">Yaygın</p>
                                                </div>
                                                <div className="bg-purple-800/50 p-2 sm:p-3 rounded-lg text-center">
                                                    <p className="text-2xl sm:text-3xl font-black text-orange-400">10x</p>
                                                    <p className="text-[10px] sm:text-xs">Orta</p>
                                                </div>
                                                <div className="bg-purple-800/50 p-2 sm:p-3 rounded-lg text-center">
                                                    <p className="text-2xl sm:text-3xl font-black text-orange-400">25x</p>
                                                    <p className="text-[10px] sm:text-xs">Nadir</p>
                                                </div>
                                                <div className="bg-purple-800/50 p-2 sm:p-3 rounded-lg text-center">
                                                    <p className="text-2xl sm:text-3xl font-black text-red-400">50x</p>
                                                    <p className="text-[10px] sm:text-xs">Çok Nadir</p>
                                                </div>
                                                <div className="bg-purple-800/50 p-2 sm:p-3 rounded-lg text-center">
                                                    <p className="text-2xl sm:text-3xl font-black text-red-600">100x</p>
                                                    <p className="text-[10px] sm:text-xs">Efsanevi</p>
                                                </div>
                                            </div>
                                            <p className="text-center text-[10px] sm:text-xs text-yellow-200 mt-2 sm:mt-3">
                                                * Çarpanlar 8 saniye sonra kaybolur (yeni oyun başlatılmazsa)
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {/* Slide 6: How to Win */}
                                {infoSlideIndex === 6 && (
                                    <div className="flex flex-col items-center gap-3 sm:gap-4">
                                        <h2 className="text-yellow-400 text-xl sm:text-2xl md:text-3xl font-black" style={{ fontFamily: 'MilkywayDEMO' }}>
                                            NASIL KAZANILIR?
                                        </h2>
                                        <div className="text-white text-xs sm:text-sm md:text-base space-y-2 sm:space-y-3">
                                            <div className="bg-purple-800/50 p-3 sm:p-4 rounded-xl">
                                                <p className="font-bold text-yellow-300 mb-2">1. Tumbling Kazançlar</p>
                                                <p>Herhangi bir yerde 8 veya daha fazla aynı sembol kazanç getirir. Kazanan semboller kaybolur ve yenileri düşer!</p>
                                            </div>
                                            <div className="bg-purple-800/50 p-3 sm:p-4 rounded-xl">
                                                <p className="font-bold text-yellow-300 mb-2">2. Çarpanlar</p>
                                                <p>Çarpan bombaları kazancınızı 2x ile 100x arasında çarpabilir. Birden fazla çarpan toplanır!</p>
                                            </div>
                                            <div className="bg-purple-800/50 p-3 sm:p-4 rounded-xl">
                                                <p className="font-bold text-yellow-300 mb-2">3. Free Spinler</p>
                                                <p>3+ scatter sembolü ile 10 free spin kazanın. Free spinlerde daha fazla çarpan şansı!</p>
                                            </div>
                                            <div className="bg-red-900/50 p-3 sm:p-4 rounded-xl border-2 border-red-500">
                                                <p className="font-bold text-red-300 mb-2">⚠️ Önemli Bilgi</p>
                                                <p className="text-xs sm:text-sm">Bu bir şans oyunudur. Kazanç garantisi yoktur. Sorumlu oynayın!</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Slide 7: Features */}
                                {infoSlideIndex === 7 && (
                                    <div className="flex flex-col items-center gap-3 sm:gap-4">
                                        <h2 className="text-yellow-400 text-xl sm:text-2xl md:text-3xl font-black" style={{ fontFamily: 'MilkywayDEMO' }}>
                                            OYUN ÖZELLİKLERİ
                                        </h2>
                                        <div className="text-white text-xs sm:text-sm space-y-2 sm:space-y-3">
                                            <div className="bg-purple-800/50 p-3 rounded-xl">
                                                <p className="font-bold text-yellow-300">🎰 Otomatik Oyun</p>
                                                <p className="text-[10px] sm:text-xs">5, 10, 20 veya 50 otomatik spin seçeneği. Büyük kazançta otomatik durur.</p>
                                            </div>
                                            <div className="bg-purple-800/50 p-3 rounded-xl">
                                                <p className="font-bold text-yellow-300">🎯 Çift Şans</p>
                                                <p className="text-[10px] sm:text-xs">Scatter sembolü çıkma şansını ikiye katlar (bahis %25 artar).</p>
                                            </div>
                                            <div className="bg-purple-800/50 p-3 rounded-xl">
                                                <p className="font-bold text-yellow-300">💰 Bonus Satın Al</p>
                                                <p className="text-[10px] sm:text-xs">Doğrudan 10 free spin satın alabilirsiniz (3 farklı fiyat seviyesi).</p>
                                            </div>
                                            <div className="bg-purple-800/50 p-3 rounded-xl">
                                                <p className="font-bold text-yellow-300">🔥 Dinamik Efektler</p>
                                                <p className="text-[10px] sm:text-xs">Oyun logosu aktivitenize göre ateş efekti kazanır!</p>
                                            </div>
                                            <div className="bg-purple-800/50 p-3 rounded-xl">
                                                <p className="font-bold text-yellow-300">⭐ Yüksek Volatilite</p>
                                                <p className="text-[10px] sm:text-xs">5 yıldız volatilite - büyük kazanç potansiyeli!</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                                }
                            </div>
                        </div>

                        {/* Navigation - Stuck to Bottom */}
                        <div className="flex gap-3 sm:gap-4 mt-4 sm:mt-6 justify-center items-center">
                            <button
                                onClick={() => setInfoSlideIndex(Math.max(0, infoSlideIndex - 1))}
                                disabled={infoSlideIndex === 0}
                                className={`px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-full text-sm sm:text-base md:text-lg font-black uppercase transition-all ${infoSlideIndex === 0
                                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white shadow-xl hover:scale-105'
                                    }`}
                            >
                                ← Geri
                            </button>

                            <div className="flex items-center gap-1 sm:gap-2">
                                {[...Array(8)].map((_, i) => (
                                    <div
                                        key={i}
                                        className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all ${i === infoSlideIndex ? 'bg-yellow-400 scale-125' : 'bg-white/30'
                                            }`}
                                    />
                                ))}
                            </div>

                            {infoSlideIndex < 7 ? (
                                <button
                                    onClick={() => setInfoSlideIndex(Math.min(7, infoSlideIndex + 1))}
                                    className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-full text-sm sm:text-base md:text-lg font-black uppercase shadow-xl transition-all hover:scale-105"
                                >
                                    İleri →
                                </button>
                            ) : (
                                <button
                                    onClick={() => setShowInfoModal(false)}
                                    className="bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-full text-sm sm:text-base md:text-lg font-black uppercase shadow-xl transition-all hover:scale-105"
                                >
                                    Kapat
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

