export interface GameResult {
    reels: string[][];
    winAmount: number;
    winningPositions: { reel: number; position: number }[];
    multipliers: { reel: number; position: number; value: number }[];
    totalMultiplier: number;
    isWin: boolean;
    scatterCount: number;
    isFreeSpins: boolean;
}

// Symbol definitions matching UI
const SYMBOLS = [
    'banana', 'grapes', 'watermelon', 'plum', 'apple',
    'blue_candy', 'green_candy', 'oval', 'heart', 'scatter'
];

// Payout table (multiplier of bet for 8+ cluster matches)
const PAYOUTS: Record<string, number> = {
    'heart': 50,
    'oval': 25,
    'green_candy': 15,
    'blue_candy': 12,
    'apple': 10,
    'plum': 8,
    'watermelon': 5,
    'grapes': 3,
    'banana': 2
};

// Multiplier values and their weights (10000X has 85% chance)
const MULTIPLIER_POOL = [
    { value: 10, weight: 3 },
    { value: 50, weight: 3 },
    { value: 100, weight: 3 },
    { value: 500, weight: 3 },
    { value: 1000, weight: 3 },
    { value: 10000, weight: 85 }
];

function getRandomMultiplier(): number {
    const totalWeight = MULTIPLIER_POOL.reduce((sum, item) => sum + item.weight, 0);
    let random = Math.random() * totalWeight;
    for (const item of MULTIPLIER_POOL) {
        if (random < item.weight) return item.value;
        random -= item.weight;
    }
    return 10000;
}

// Symbol weights for random generation
const SYMBOL_WEIGHTS: Record<string, number> = {
    'banana': 15,
    'grapes': 15,
    'watermelon': 14,
    'plum': 13,
    'apple': 12,
    'blue_candy': 10,
    'green_candy': 8,
    'oval': 6,
    'heart': 4,
    'scatter': 3
};

/**
 * Get a weighted random symbol
 */
function getWeightedSymbol(): string {
    const totalWeight = Object.values(SYMBOL_WEIGHTS).reduce((a, b) => a + b, 0);
    let random = Math.random() * totalWeight;

    for (const [symbol, weight] of Object.entries(SYMBOL_WEIGHTS)) {
        random -= weight;
        if (random <= 0) {
            return symbol;
        }
    }

    return 'banana'; // Fallback
}

/**
 * Main spin function - generates game result
 */
export const spin = (betAmount: number, isFreeSpins: boolean = false): GameResult => {
    // 1. Generate 6x5 grid
    const reels: string[][] = Array(6).fill(null).map(() =>
        Array(5).fill(null).map(() => getWeightedSymbol())
    );

    // 2. Add multipliers (guaranteed 1-4 random multipliers after every spin)
    const multipliers: { reel: number; position: number; value: number }[] = [];
    const multiplierCount = 1 + Math.floor(Math.random() * 4); // 1 to 4 multipliers
    const usedPositions = new Set<string>();

    while (multipliers.length < multiplierCount) {
        const reel = Math.floor(Math.random() * 6);
        const position = Math.floor(Math.random() * 5);
        const posKey = `${reel}-${position}`;

        if (!usedPositions.has(posKey)) {
            usedPositions.add(posKey);
            multipliers.push({
                reel,
                position,
                value: getRandomMultiplier()
            });
        }
    }

    // 3. Count symbols (excluding scatter)
    const symbolCounts: Record<string, number> = {};
    const symbolPositions: Record<string, { reel: number; position: number }[]> = {};

    reels.forEach((col, colIdx) => {
        col.forEach((symbol, rowIdx) => {
            if (symbol !== 'scatter') {
                symbolCounts[symbol] = (symbolCounts[symbol] || 0) + 1;
                if (!symbolPositions[symbol]) {
                    symbolPositions[symbol] = [];
                }
                symbolPositions[symbol].push({ reel: colIdx, position: rowIdx });
            }
        });
    });

    // 4. Count scatters
    const scatterCount = reels.flat().filter(s => s === 'scatter').length;

    // 5. Calculate wins (8+ symbols = cluster win)
    let totalWin = 0;
    const winningPositions: { reel: number; position: number }[] = [];

    Object.entries(symbolCounts).forEach(([symbol, count]) => {
        if (count >= 8) {
            const basePayout = PAYOUTS[symbol] || 0;
            let multiplier = 0.25; // Base multiplier for 8 symbols

            // Increase multiplier based on count
            if (count >= 15) multiplier = 2.0;
            else if (count >= 12) multiplier = 1.0;
            else if (count >= 10) multiplier = 0.5;

            const symbolWin = betAmount * basePayout * multiplier;
            totalWin += symbolWin;

            // Add winning positions
            winningPositions.push(...symbolPositions[symbol]);
        }
    });

    // 6. Scatter bonus (4+ scatters trigger free spins or bonus)
    if (scatterCount >= 4) {
        let scatterBonus = 0;
        if (scatterCount >= 6) scatterBonus = betAmount * 100;
        else if (scatterCount === 5) scatterBonus = betAmount * 10;
        else scatterBonus = betAmount * 3;

        totalWin += scatterBonus;

        // Mark scatter positions as winning
        reels.forEach((col, colIdx) => {
            col.forEach((symbol, rowIdx) => {
                if (symbol === 'scatter') {
                    winningPositions.push({ reel: colIdx, position: rowIdx });
                }
            });
        });
    }

    // 7. Apply multipliers (only if there's a win)
    let totalMultiplier = 0;
    if (totalWin > 0 && multipliers.length > 0) {
        totalMultiplier = multipliers.reduce((sum, m) => sum + m.value, 0);
        totalWin = totalWin * totalMultiplier;
    }

    // 8. Round to 2 decimals
    totalWin = Math.round(totalWin * 100) / 100;

    console.log('🎰 ENGINE RESULT:', {
        symbolCounts,
        scatterCount,
        totalWin,
        totalMultiplier,
        multiplierCount: multipliers.length,
        winningPositions: winningPositions.length,
        isFreeSpins
    });

    return {
        reels,
        winAmount: totalWin,
        winningPositions,
        multipliers,
        totalMultiplier,
        isWin: totalWin > 0,
        scatterCount,
        isFreeSpins: scatterCount >= 4 // 4+ scatters trigger free spins
    };
};
