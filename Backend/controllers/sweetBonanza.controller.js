/**
 * Sweet Bonanza Game Controller
 * Handles Sweet Bonanza slot game logic with progressive house edge and fake multipliers
 */

const User = require('../models/User.model');
const Transaction = require('../models/Transaction.model');
const BalanceHistory = require('../models/BalanceHistory.model');
const mongoose = require('mongoose');
const asyncHandler = require('../middleware/error.middleware').asyncHandler;
const AppError = require('../middleware/error.middleware').AppError;
const sweetBonanzaService = require('../services/sweetBonanzaService');

// --- CONSTANTS ---
const SYMBOLS = [
  'grapes', 'plum', 'watermelon', 'apple', 'banana',
  'oval', 'pentagon', 'square', 'heart', 'scatter', 'multiplier'
];

// Symbols that can "pay"
const PAYING_SYMBOLS = SYMBOLS.filter(s => s !== 'scatter' && s !== 'multiplier');

const SYMBOL_WEIGHTS_NORMAL = {
  'grapes': 30, 'plum': 25, 'watermelon': 20, 'apple': 15, 'banana': 10,
  'oval': 8, 'pentagon': 6, 'square': 4, 'heart': 2, 'scatter': 1, 'multiplier': 0.5
};

const SYMBOL_WEIGHTS_FAKE = {
  'grapes': 20, 'plum': 20, 'watermelon': 20, 'apple': 15, 'banana': 10,
  'oval': 8, 'pentagon': 6, 'square': 4, 'heart': 2, 'scatter': 1, 'multiplier': 10 // HIGH chance of multipliers in fake mode
};

// Base payout multipliers (simplified for 8+ cluster logic)
const SYMBOL_PAYOUTS = {
  'heart': 50, 'square': 25, 'pentagon': 15, 'oval': 12, 'apple': 10,
  'banana': 8, 'watermelon': 5, 'plum': 4, 'grapes': 2
};

const MULTIPLIER_VALUES = [2, 3, 5, 8, 10, 12, 15, 20, 25, 50, 100];
const FAKE_MULTIPLIER_VALUES = [500, 1000, 2500, 5000, 10000]; // 10000X for fake teases

/**
 * Helper: Get Weighted Random Symbol
 */
const getWeightedSymbol = (weights = SYMBOL_WEIGHTS_NORMAL, forceMultiplier = false) => {
  if (forceMultiplier) return 'multiplier:' + FAKE_MULTIPLIER_VALUES[Math.floor(Math.random() * FAKE_MULTIPLIER_VALUES.length)];

  const totalWeight = Object.values(weights).reduce((a, b) => a + b, 0);
  let random = Math.random() * totalWeight;
  for (const [symbol, weight] of Object.entries(weights)) {
    random -= weight;
    if (random <= 0) {
      if (symbol === 'multiplier') {
        const val = MULTIPLIER_VALUES[Math.floor(Math.random() * MULTIPLIER_VALUES.length)];
        return `multiplier:${val}`;
      }
      return symbol;
    }
  }
  return 'grapes';
};

/**
 * Generate a Grid Result
 * @param {string} outcome 'win' or 'loss'
 * @param {number} betAmount
 */
const generateGameResult = (outcome, betAmount) => {
  let reels = [];
  let totalWin = 0;
  let winningPositions = [];
  let attempt = 0;
  const MAX_ATTEMPTS = 50;

  do {
    attempt++;
    reels = Array(6).fill(null).map(() => Array(6).fill(null).map(() => getWeightedSymbol(
      outcome === 'loss' && Math.random() < 0.2 ? SYMBOL_WEIGHTS_FAKE : SYMBOL_WEIGHTS_NORMAL
    )));

    // --- VISUAL REFINEMENT: Explicit Multiplier Injection ---
    let bombCount = 0;
    if (outcome === 'win') {
      // Many multipliers (3 to 5)
      bombCount = 3 + Math.floor(Math.random() * 3);
    } else {
      // Few multipliers (1 to 2) - Teasers
      bombCount = 1 + Math.floor(Math.random() * 2);
    }

    // DEBUG:
    // console.log(`[SB DEBUG] Generating Grid. Outcome: ${outcome}, InjectedBombs: ${bombCount}`);

    for (let k = 0; k < bombCount; k++) {
      const rC = Math.floor(Math.random() * 6);
      const rR = Math.floor(Math.random() * 6);
      if (outcome === 'win') {
        // Real values
        const val = MULTIPLIER_VALUES[Math.floor(Math.random() * MULTIPLIER_VALUES.length)];
        reels[rC][rR] = `multiplier:${val}`;
      } else {
        // Teaser values (mostly big ones)
        // 85% chance of 10000X, 15% others
        if (Math.random() < 0.85) reels[rC][rR] = 'multiplier:10000';
        else {
          const val = FAKE_MULTIPLIER_VALUES[Math.floor(Math.random() * FAKE_MULTIPLIER_VALUES.length)];
          reels[rC][rR] = `multiplier:${val}`;
        }
      }
    }

    // Calculate win for this grid
    const counts = {};
    let currentGridWin = 0;
    let currentMultiplier = 0;

    // Count symbols & multipliers
    reels.forEach((col, c) => col.forEach((sym, r) => {
      if (!sym) return; // Skip undefined
      if (sym.startsWith('multiplier:')) {
        currentMultiplier += parseInt(sym.split(':')[1]);
      } else if (sym !== 'scatter') {
        counts[sym] = (counts[sym] || 0) + 1;
      }
    }));

    // Calculate Base Win (Symbol Clusters)
    // Rule: 8+ symbols to win
    for (const [sym, count] of Object.entries(counts)) {
      if (count >= 8) {
        let mult = 0;
        if (count >= 12) mult = 1; // Full payout
        else if (count >= 10) mult = 0.5;
        else mult = 0.25;

        const symbolBase = SYMBOL_PAYOUTS[sym] || 1;
        currentGridWin += betAmount * symbolBase * mult * 0.1; // modest base wins
      }
    }

    // Apply Multiplier (only if there's a base win)
    if (currentGridWin > 0 && currentMultiplier > 0) {
      currentGridWin *= currentMultiplier;
    }

    totalWin = currentGridWin;

    // Validation
    if (outcome === 'loss') {
      if (totalWin === 0) break; // Perfect loss
    } else {
      if (totalWin > betAmount) break; // Valid win
    }

    if (attempt >= MAX_ATTEMPTS) {
      if (outcome === 'loss') {
        reels = Array(6).fill(null).map((_, c) => Array(6).fill(null).map((_, r) => SYMBOLS[(c + r) % 8]));
        // Inject fake multiplier again because we reset grid
        const rC = Math.floor(Math.random() * 6);
        const rR = Math.floor(Math.random() * 6);
        reels[rC][rR] = 'multiplier:10000';
        totalWin = 0;
      } else {
        reels = Array(6).fill(null).map(() => Array(6).fill('heart'));
        totalWin = betAmount * 50;
      }
      break;
    }

  } while (true);

  // Identify winning positions
  if (totalWin > 0) {
    const counts = {};
    reels.forEach(c => c.forEach(s => {
      if (s && typeof s === 'string' && !s.startsWith('multiplier')) {
        counts[s] = (counts[s] || 0) + 1;
      }
    }));
    reels.forEach((col, c) => col.forEach((sym, r) => {
      if (sym && typeof sym === 'string' && !sym.startsWith('multiplier') && (counts[sym] || 0) >= 8) {
        winningPositions.push({ reel: c, position: r });
      }
    }));
  }

  return { reels, totalWin, winningPositions };
};

/**
 * Play Game Endpoint
 */

exports.playGame = asyncHandler(async (req, res) => {
  const { betAmount } = req.body;
  const userId = req.user.id;

  if (!betAmount || betAmount <= 0) throw new AppError('Invalid bet amount', 400);
  const bet = parseFloat(betAmount);

  try {
    const user = await User.findById(userId);
    if (!user || user.balance < bet) throw new AppError('Insufficient balance', 400);

    // --- LOGIC REFINEMENT: Guarantee Win ---
    let lastOutcomes = user.sbLastOutcomes || [];
    if (lastOutcomes.length > 2) lastOutcomes = lastOutcomes.slice(-2); // last 2

    const recentWins = lastOutcomes.filter(o => o === 'w').length;
    const recentLosses = lastOutcomes.filter(o => o === 'l').length;
    let forcedOutcome = 'random';

    if (recentWins >= 1) forcedOutcome = 'loss';
    else if (recentLosses >= 2) forcedOutcome = 'win';
    else forcedOutcome = Math.random() < 0.35 ? 'win' : 'loss'; // 35% win rate

    // Generate Grid with VISUALS in mind
    let { reels, totalWin: visualTotalWin, winningPositions } = generateGameResult(forcedOutcome, bet);

    if (forcedOutcome === 'loss' && visualTotalWin > 0) {
      visualTotalWin = 0; winningPositions = [];
    }
    if (forcedOutcome === 'win' && visualTotalWin === 0) {
      // Fallback Visual Win
      visualTotalWin = bet * 15.5; // Make it look nice
    }

    // --- REAL MONEY LOGIC (Back End Only) ---
    // 1. Max Profit Cap: Real Profit cannot exceed Bet Amount
    // If they won visually, valid profit is at most 'bet' (so return is 2x bet max)
    let realProfit = 0;
    if (forcedOutcome === 'win') {
      // Start with random real profit between 0.1x to 1.0x of bet
      realProfit = bet * (0.1 + Math.random() * 0.9);
      // Cap it strictly
      if (realProfit > bet) realProfit = bet;
    }

    // 2. House Cut Cycle (Based on Total Wins)
    // 1st Win: 75% cut, 2nd: 50%, 3rd: 25%, 4th: 0% -> Repeat
    const currentWinCount = (user.sbTotalWins || 0) + 1;
    const cyclePosition = (currentWinCount - 1) % 4; // 0, 1, 2, 3

    let houseCutPercent = 0;
    if (cyclePosition === 0) houseCutPercent = 0.75;      // 1st (1, 5, 9...)
    else if (cyclePosition === 1) houseCutPercent = 0.50; // 2nd (2, 6, 10...)
    else if (cyclePosition === 2) houseCutPercent = 0.25; // 3rd (3, 7, 11...)
    else houseCutPercent = 0.00;                          // 4th (4, 8, 12...) -- Full 1x profit

    // Apply Cut to Profit
    let adjustedRealProfit = realProfit * (1 - houseCutPercent);
    let finalRealPayout = 0;
    let netChange = 0;

    if (forcedOutcome === 'win') {
      finalRealPayout = bet + adjustedRealProfit;
      netChange = finalRealPayout - bet;
    } else {
      finalRealPayout = 0;
      netChange = -bet;
    }

    // Formatting
    netChange = parseFloat(netChange.toFixed(2));
    finalRealPayout = parseFloat(finalRealPayout.toFixed(2));
    adjustedRealProfit = parseFloat(adjustedRealProfit.toFixed(2));

    const initialBalance = user.balance;
    const newBalance = parseFloat((initialBalance - bet + finalRealPayout).toFixed(2));

    // Update User
    if (forcedOutcome === 'win') {
      user.sbTotalWins = currentWinCount;
      lastOutcomes.push('w');
    } else {
      lastOutcomes.push('l');
    }
    user.sbLastOutcomes = lastOutcomes;
    user.balance = newBalance;
    await user.save();

    console.log(`[SB LOGIC] Outcome: ${forcedOutcome}`);
    console.log(`[SB LOGIC] VisualWin: ${visualTotalWin.toFixed(2)} | RealProfit: ${realProfit.toFixed(2)}`);
    // console.log(`[SB LOGIC] Win #${currentWinCount} (Cycle ${cyclePosition + 1}/4) -> Cut: ${houseCutPercent * 100}%`);
    console.log(`[SB LOGIC] FinalPayout: ${finalRealPayout} | NetChange: ${netChange} | NewBal: ${newBalance}`);

    // Record Transaction
    await Transaction.create([{
      user: userId,
      amount: Math.abs(netChange),
      type: netChange >= 0 ? 'game_win' : 'game_loss',
      status: 'completed',
      description: `Sweet Bonanza - ${forcedOutcome === 'win' ? 'Win' : 'Loss'}`,
      metadata: {
        bet,
        visualWin: visualTotalWin,
        realProfit: realProfit,
        houseCut: houseCutPercent,
        finalPayout: finalRealPayout
      }
    }]);

    res.json({
      success: true,
      data: {
        reels,
        // The Frontend will use 'visualWin' for the celebration screen
        visualWin: visualTotalWin,
        // The Frontend will use 'finalPayout' and 'balance' for the wallet
        winAmount: adjustedRealProfit, // Profit amount
        finalPayout: finalRealPayout,  // Profit + Bet
        balance: newBalance,
        winningPositions,
        isWin: forcedOutcome === 'win',
        hasFakeMultipliers: forcedOutcome === 'loss'
      }
    });

  } catch (error) {
    console.error(`[SB ERROR] STACK: ${error.stack || error.message}`);
    throw error;
  }
});

// Stubs
/**
 * SYNC Balance from Frontend Game Engine
 * TRUSTS FRONTEND CALCULATIONS (SECURITY RISK ACCEPTED BY USER)
 */
exports.syncBalance = asyncHandler(async (req, res) => {
  const { betAmount, winAmount, gameData } = req.body;
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    if (!user) throw new AppError('User not found', 404);

    const initialBalance = user.balance;
    const isFreeSpins = gameData?.freeSpinsTriggered || false;

    // Calculate net change
    // In free spins mode: no bet deduction, only add winnings
    // In normal mode: deduct bet, add winnings
    let netChange = 0;
    if (isFreeSpins) {
      // Free spins: only add winnings, no bet deduction
      netChange = parseFloat(winAmount.toFixed(2));
    } else {
      // Normal spin: win - bet
      netChange = parseFloat((winAmount - betAmount).toFixed(2));

      // Check if user has enough balance for the bet
      if (user.balance < betAmount) {
        throw new AppError('Insufficient balance on server', 400);
      }
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      {
        $inc: {
          balance: netChange,
          totalWinnings: winAmount > 0 ? winAmount : 0,
          sbBetCount: isFreeSpins ? 0 : 1, // Don't count free spins as bets
          sbWinCount: winAmount > 0 ? 1 : 0
        },
        $set: {
          sbSessionLastActive: new Date()
        }
      },
      { new: true, runValidators: true }
    );

    // Create transaction record
    const transactionData = {
      user: userId,
      type: winAmount > 0 ? 'game_win' : 'game_loss',
      amount: Math.abs(netChange),
      status: 'completed',
      currency: user.currency || 'TRY',
      paymentMethod: 'internal',
      description: `Sweet Bonanza - ${isFreeSpins ? 'FREE SPIN ' : ''}${winAmount > 0 ? 'Win' : 'Loss'}`,
      metadata: {
        gameType: 'sweet-bonanza',
        betAmount: isFreeSpins ? 0 : betAmount,
        winAmount: winAmount,
        netChange: netChange,
        balanceBefore: initialBalance,
        balanceAfter: updatedUser.balance,
        isFreeSpins: isFreeSpins,
        scatterCount: gameData?.scatterCount || 0,
        multiplier: gameData?.multiplier || 0,
        gameData // Store reels/multipliers from frontend
      }
    };

    const transaction = await Transaction.create([transactionData]);

    // Record balance history
    const balanceHistoryData = {
      user: userId,
      changeType: winAmount > 0 ? 'win' : 'loss',
      previousBalance: initialBalance,
      newBalance: updatedUser.balance,
      change: netChange,
      referenceType: 'game',
      referenceId: transaction[0]._id,
      description: `Sweet Bonanza${isFreeSpins ? ' (FREE SPIN)' : ''} - Bet: ₺${isFreeSpins ? 0 : betAmount}, Win: ₺${winAmount}`,
      metadata: { ...transactionData.metadata }
    };

    await BalanceHistory.create([balanceHistoryData]);

    console.log(`💰 Balance synced for user ${user.email}: ${initialBalance} → ${updatedUser.balance} (${isFreeSpins ? 'FREE SPIN' : 'NORMAL'})`);

    res.json({
      success: true,
      newBalance: updatedUser.balance,
      netChange,
      isFreeSpins
    });

  } catch (error) {
    console.error(`[SB SYNC ERROR] STACK: ${error.stack || error.message}`);
    throw error;
  }
});

exports.getGameHistory = asyncHandler(async (req, res) => { res.json({ success: true, data: { history: [], total: 0 } }) });
exports.getStats = asyncHandler(async (req, res) => { res.json({ success: true, data: {} }) });
exports.getSession = asyncHandler(async (req, res) => { res.json({ success: true, data: {} }) });
exports.placeLobbyBet = asyncHandler(async (req, res) => { res.json({ success: true }) });
exports.submitAdminDecision = asyncHandler(async (req, res) => { res.json({ success: true }) });
exports.getDebugSession = asyncHandler(async (req, res) => { res.json({ success: true }) });
