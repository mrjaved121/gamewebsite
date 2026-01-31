// Sweet Bonanza Layout Configuration - Percentage Based
// This file contains responsive layout configurations for both mobile and desktop views

export interface LayoutElement {
    x: number;
    y: number;
    w: number;
    h: number;
    type: string;
    label: string;
    visible: boolean;
    isDynamic: boolean;
    scale: number;
}

export interface LayoutConfig {
    mobile: Record<string, LayoutElement>;
    desktop: Record<string, LayoutElement>;
}

export const layoutConfig: LayoutConfig = {
    mobile: {
        slotMachine: {
            x: 0,
            y: 17,
            w: 96,
            h: 45,
            type: "slot",
            label: "Slot Machine\n6x6 Grid",
            visible: true,
            isDynamic: false,
            scale: 100
        },
        logo: {
            x: 5,
            y: 0,
            w: 90,
            h: 8,
            type: "logo",
            label: "Game Logo",
            visible: true,
            isDynamic: false,
            scale: 100
        },
        spinButton: {
            x: 35,
            y: 62,
            w: 30,
            h: 12,
            type: "button",
            label: "Spin Button",
            visible: true,
            isDynamic: false,
            scale: 100
        },
        autoSpinBtn: {
            x: 25,
            y: 74,
            w: 50,
            h: 5,
            type: "button",
            label: "Auto Spin",
            visible: true,
            isDynamic: false,
            scale: 100
        },
        betDecrease: {
            x: 18,
            y: 65,
            w: 15,
            h: 9,
            type: "control",
            label: "-",
            visible: true,
            isDynamic: false,
            scale: 100
        },
        betIncrease: {
            x: 66,
            y: 65,
            w: 15,
            h: 9,
            type: "control",
            label: "+",
            visible: true,
            isDynamic: false,
            scale: 100
        },
        balanceDisplay: {
            x: 55,
            y: 80,
            w: 45,
            h: 8,
            type: "display",
            label: "Balance",
            visible: true,
            isDynamic: false,
            scale: 100
        },
        betDisplay: {
            x: 55,
            y: 90,
            w: 45,
            h: 6,
            type: "display",
            label: "Bet Amount",
            visible: true,
            isDynamic: false,
            scale: 100
        },
        soundBtn: {
            x: 0,
            y: 92,
            w: 12,
            h: 8,
            type: "control",
            label: "🔊",
            visible: true,
            isDynamic: false,
            scale: 100
        },
        infoBtn: {
            x: 13,
            y: 92,
            w: 12,
            h: 8,
            type: "control",
            label: "ℹ️",
            visible: true,
            isDynamic: false,
            scale: 100
        },
        bonusBuyBtn: {
            x: 10,
            y: 9.5,
            w: 35,
            h: 6,
            type: "sidebar",
            label: "Bonus Buy",
            visible: true,
            isDynamic: false,
            scale: 100
        },
        doubleChanceBtn: {
            x: 55,
            y: 9.5,
            w: 35,
            h: 6,
            type: "sidebar",
            label: "Double Chance",
            visible: true,
            isDynamic: false,
            scale: 100
        },
        winDisplay: {
            x: 20,
            y: 40,
            w: 60,
            h: 15,
            type: "dynamic",
            label: "Win Display",
            visible: false,
            isDynamic: true,
            scale: 100
        },
        winCelebration: {
            x: 10,
            y: 25,
            w: 80,
            h: 50,
            type: "dynamic",
            label: "Win Celebration",
            visible: false,
            isDynamic: true,
            scale: 100
        },
        freeSpinsCounter: {
            x: 0,
            y: 80,
            w: 50,
            h: 12,
            type: "dynamic",
            label: "Free Spins Counter",
            visible: false,
            isDynamic: true,
            scale: 100
        },
        bonusBuyModal: {
            x: 10,
            y: 20,
            w: 80,
            h: 60,
            type: "dynamic",
            label: "Bonus Buy Modal",
            visible: false,
            isDynamic: true,
            scale: 100
        },
        infoModal: {
            x: 5,
            y: 15,
            w: 90,
            h: 70,
            type: "dynamic",
            label: "Info Modal",
            visible: false,
            isDynamic: true,
            scale: 100
        },
        betModal: {
            x: 15,
            y: 25,
            w: 70,
            h: 50,
            type: "dynamic",
            label: "Bet Modal",
            visible: false,
            isDynamic: true,
            scale: 100
        },
        autoSpinSelector: {
            x: 20,
            y: 30,
            w: 60,
            h: 40,
            type: "dynamic",
            label: "Auto Spin Selector",
            visible: false,
            isDynamic: true,
            scale: 100
        }
    },
    desktop: {
        slotMachine: {
            x: 30,
            y: 20,
            w: 40,
            h: 55,
            type: "slot",
            label: "Slot Machine\n6x6 Grid",
            visible: true,
            isDynamic: false,
            scale: 100
        },
        logo: {
            x: 35,
            y: 2,
            w: 30,
            h: 12,
            type: "logo",
            label: "Game Logo",
            visible: true,
            isDynamic: false,
            scale: 100
        },
        spinButton: {
            x: 45,
            y: 78,
            w: 10,
            h: 15,
            type: "button",
            label: "Spin",
            visible: true,
            isDynamic: false,
            scale: 100
        },
        autoSpinBtn: {
            x: 40,
            y: 94,
            w: 20,
            h: 4,
            type: "button",
            label: "Auto Spin",
            visible: true,
            isDynamic: false,
            scale: 100
        },
        betDecrease: {
            x: 32,
            y: 81,
            w: 8,
            h: 10,
            type: "control",
            label: "-",
            visible: true,
            isDynamic: false,
            scale: 100
        },
        betIncrease: {
            x: 60,
            y: 81,
            w: 8,
            h: 10,
            type: "control",
            label: "+",
            visible: true,
            isDynamic: false,
            scale: 100
        },
        balanceDisplay: {
            x: 5,
            y: 83,
            w: 20,
            h: 7,
            type: "display",
            label: "Balance",
            visible: true,
            isDynamic: false,
            scale: 100
        },
        betDisplay: {
            x: 5,
            y: 91,
            w: 20,
            h: 6,
            type: "display",
            label: "Bet",
            visible: true,
            isDynamic: false,
            scale: 100
        },
        soundBtn: {
            x: 75,
            y: 85,
            w: 5,
            h: 7,
            type: "control",
            label: "🔊",
            visible: true,
            isDynamic: false,
            scale: 100
        },
        infoBtn: {
            x: 82,
            y: 85,
            w: 5,
            h: 7,
            type: "control",
            label: "ℹ️",
            visible: true,
            isDynamic: false,
            scale: 100
        },
        bonusBuyBtn: {
            x: 2,
            y: 25,
            w: 18,
            h: 10,
            type: "sidebar",
            label: "Bonus\nBuy",
            visible: true,
            isDynamic: false,
            scale: 100
        },
        doubleChanceBtn: {
            x: 2,
            y: 40,
            w: 18,
            h: 15,
            type: "sidebar",
            label: "Double\nChance",
            visible: true,
            isDynamic: false,
            scale: 100
        },
        winDisplay: {
            x: 38,
            y: 62,
            w: 24,
            h: 8,
            type: "dynamic",
            label: "Win Display",
            visible: false,
            isDynamic: true,
            scale: 100
        },
        winCelebration: {
            x: 20,
            y: 15,
            w: 60,
            h: 70,
            type: "dynamic",
            label: "Win Celebration",
            visible: false,
            isDynamic: true,
            scale: 100
        },
        freeSpinsCounter: {
            x: 35,
            y: 5,
            w: 30,
            h: 15,
            type: "dynamic",
            label: "Free Spins Counter",
            visible: false,
            isDynamic: true,
            scale: 100
        },
        bonusBuyModal: {
            x: 25,
            y: 15,
            w: 50,
            h: 70,
            type: "dynamic",
            label: "Bonus Buy Modal",
            visible: false,
            isDynamic: true,
            scale: 100
        },
        infoModal: {
            x: 20,
            y: 10,
            w: 60,
            h: 80,
            type: "dynamic",
            label: "Info Modal",
            visible: false,
            isDynamic: true,
            scale: 100
        },
        betModal: {
            x: 30,
            y: 20,
            w: 40,
            h: 60,
            type: "dynamic",
            label: "Bet Modal",
            visible: false,
            isDynamic: true,
            scale: 100
        },
        autoSpinSelector: {
            x: 35,
            y: 25,
            w: 30,
            h: 50,
            type: "dynamic",
            label: "Auto Spin Selector",
            visible: false,
            isDynamic: true,
            scale: 100
        }
    }
};

// Helper function to convert percentage-based layout to style object
export const getElementStyle = (element: LayoutElement, containerRef?: 'mobile' | 'desktop') => {
    return {
        position: 'absolute' as const,
        left: `${element.x}%`,
        top: `${element.y}%`,
        width: `${element.w}%`,
        height: `${element.h}%`,
        transform: `scale(${element.scale / 100})`,
        transformOrigin: 'top left',
        display: element.visible ? 'block' : 'none'
    };
};
