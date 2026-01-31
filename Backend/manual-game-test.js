const axios = require('axios');

const API_URL = 'http://localhost:5000/api';
const EMAIL = 'admin@az.com';
const PASSWORD = 'admin@123';

async function runTest() {
    try {
        // 1. Login
        console.log('Logging in...');
        const loginRes = await axios.post(`${API_URL}/auth/login`, {
            email: EMAIL,
            password: PASSWORD
        });
        const token = loginRes.data.token;
        const headers = { Authorization: `Bearer ${token}` };
        console.log('Logged in.');

        // 2. Play 50 Rounds
        console.log('\n--- Playing 50 Rounds ---');
        let wins = 0;
        let losses = 0;
        let winSequence = [];
        let totalBet = 0;
        let totalPayout = 0;

        for (let i = 1; i <= 50; i++) {
            const bet = 100;
            try {
                const res = await axios.post(`${API_URL}/sweet-bonanza/play`, { betAmount: bet }, { headers });
                const data = res.data.data;
                const isWin = data.isWin;

                totalBet += bet;
                totalPayout += data.finalPayout;

                if (isWin) {
                    wins++;
                    winSequence.push('W');
                    console.log(`Round ${i}: WIN  | Payout: ${data.finalPayout.toFixed(2)} (WinAmount: ${data.winAmount.toFixed(2)})`);
                } else {
                    losses++;
                    winSequence.push('L');
                    console.log(`Round ${i}: LOSS | Payout: ${data.finalPayout.toFixed(2)}`);
                }
            } catch (err) {
                console.log(`Round ${i}: ERROR - ${err.message}`);
                if (err.response) console.log('ERROR DATA:', JSON.stringify(err.response.data, null, 2));
            }
            // Small delay
            await new Promise(r => setTimeout(r, 100));
        }

        // 3. Analysis
        console.log('\n--- Analysis ---');
        console.log(`Total Rounds: ${wins + losses}`);
        console.log(`Wins: ${wins} (${((wins / (wins + losses)) * 100).toFixed(1)}%)`);
        console.log(`Losses: ${losses}`);
        console.log(`Win Sequence: ${winSequence.join('')}`);

        // CHECK: Max 1 win in 3
        let failedFrequencyCap = false;
        for (let i = 0; i < winSequence.length - 2; i++) {
            const chunk = winSequence.slice(i, i + 3); // Get 3 games
            const winCount = chunk.filter(x => x === 'W').length;
            if (winCount > 1) {
                console.error(`FAILURE: Found sequence with >1 wins in 3 games: ${chunk.join('')} at index ${i}`);
                failedFrequencyCap = true;
            }
        }

        if (!failedFrequencyCap) console.log('✅ Frequency Cap Passed: No >1 win in any 3-game sequence.');
        else console.log('❌ Frequency Cap FAILED.');

    } catch (err) {
        console.error('Test Failed:', err.message);
        if (err.response) console.error(err.response.data);
    }
}

runTest();
