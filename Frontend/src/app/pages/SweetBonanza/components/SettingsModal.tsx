import React from 'react';
import { X, Volume2, VolumeX, Zap, ZapOff, Sparkles, Music, Music2 } from 'lucide-react';

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    settings: {
        soundEnabled: boolean;
        musicEnabled: boolean;
        quickSpin: boolean;
        showSparkles: boolean;
    };
    onToggleSetting: (key: string) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
    isOpen,
    onClose,
    settings,
    onToggleSetting
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 pointer-events-none">
            {/* Modal Content */}
            <div className="relative w-full max-w-md bg-gradient-to-b from-[#2d1b4e] to-[#1a0a2e] rounded-[2.5rem] border-4 border-white/20 shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-hidden pointer-events-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-8 border-b border-white/10">
                    <h2 className="text-3xl font-black italic text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-500">
                        GAME SETTINGS
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/10 rounded-full transition-colors group"
                    >
                        <X className="w-8 h-8 text-white/60 group-hover:text-white" />
                    </button>
                </div>

                {/* Settings list */}
                <div className="p-8 space-y-6">
                    {/* Sound Effects */}
                    <div className="flex items-center justify-between group">
                        <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-2xl ${settings.soundEnabled ? 'bg-yellow-400/20 text-yellow-400' : 'bg-white/5 text-white/40'}`}>
                                {settings.soundEnabled ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
                            </div>
                            <div>
                                <div className="font-bold text-lg text-white">Sound Effects</div>
                                <div className="text-sm text-white/40">Game SFX and voices</div>
                            </div>
                        </div>
                        <button
                            onClick={() => onToggleSetting('soundEnabled')}
                            className={`w-14 h-8 rounded-full transition-all relative ${settings.soundEnabled ? 'bg-yellow-400' : 'bg-white/10'}`}
                        >
                            <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all shadow-lg ${settings.soundEnabled ? 'left-7' : 'left-1'}`} />
                        </button>
                    </div>

                    {/* Music */}
                    <div className="flex items-center justify-between group">
                        <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-2xl ${settings.musicEnabled ? 'bg-pink-500/20 text-pink-500' : 'bg-white/5 text-white/40'}`}>
                                {settings.musicEnabled ? <Music className="w-6 h-6" /> : <Music2 className="w-6 h-6" />}
                            </div>
                            <div>
                                <div className="font-bold text-lg text-white">Music</div>
                                <div className="text-sm text-white/40">Background music</div>
                            </div>
                        </div>
                        <button
                            onClick={() => onToggleSetting('musicEnabled')}
                            className={`w-14 h-8 rounded-full transition-all relative ${settings.musicEnabled ? 'bg-pink-500' : 'bg-white/10'}`}
                        >
                            <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all shadow-lg ${settings.musicEnabled ? 'left-7' : 'left-1'}`} />
                        </button>
                    </div>

                    {/* Quick Spin */}
                    <div className="flex items-center justify-between group">
                        <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-2xl ${settings.quickSpin ? 'bg-purple-500/20 text-purple-500' : 'bg-white/5 text-white/40'}`}>
                                {settings.quickSpin ? <Zap className="w-6 h-6" /> : <ZapOff className="w-6 h-6" />}
                            </div>
                            <div>
                                <div className="font-bold text-lg text-white">Quick Spin</div>
                                <div className="text-sm text-white/40">Faster reel animations</div>
                            </div>
                        </div>
                        <button
                            onClick={() => onToggleSetting('quickSpin')}
                            className={`w-14 h-8 rounded-full transition-all relative ${settings.quickSpin ? 'bg-purple-500' : 'bg-white/10'}`}
                        >
                            <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all shadow-lg ${settings.quickSpin ? 'left-7' : 'left-1'}`} />
                        </button>
                    </div>

                    {/* Sparkles Effect */}
                    <div className="flex items-center justify-between group">
                        <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-2xl ${settings.showSparkles ? 'bg-cyan-400/20 text-cyan-400' : 'bg-white/5 text-white/40'}`}>
                                <Sparkles className="w-6 h-6" />
                            </div>
                            <div>
                                <div className="font-bold text-lg text-white">Ambient Sparkles</div>
                                <div className="text-sm text-white/40">Background particle effect</div>
                            </div>
                        </div>
                        <button
                            onClick={() => onToggleSetting('showSparkles')}
                            className={`w-14 h-8 rounded-full transition-all relative ${settings.showSparkles ? 'bg-cyan-400' : 'bg-white/10'}`}
                        >
                            <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all shadow-lg ${settings.showSparkles ? 'left-7' : 'left-1'}`} />
                        </button>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-8 bg-black/20 flex justify-center">
                    <button
                        onClick={onClose}
                        className="px-12 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-black italic rounded-2xl shadow-lg hover:scale-105 active:scale-95 transition-all text-xl"
                    >
                        SAVE & CLOSE
                    </button>
                </div>
            </div>
        </div>
    );
};
