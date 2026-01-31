import api from './index';

const sweetBonanzaAPI = {
    playGame: async (betAmount) => {
        return api.post('/sweet-bonanza/play', { betAmount: parseFloat(betAmount) });
    },
    syncBalance: async (data) => {
        return api.post('/sweet-bonanza/sync', data);
    },
    getHistory: async (params = {}) => {
        return api.get('/sweet-bonanza/history', { params });
    },
    getStats: async () => {
        return api.get('/sweet-bonanza/stats');
    },
    getSession: async () => {
        return api.get('/sweet-bonanza/session');
    },
    placeLobbyBet: async (betAmount, side) => {
        return api.post('/sweet-bonanza/bet', {
            betAmount: parseFloat(betAmount),
            side
        });
    },
    submitAdminDecision: async (decision) => {
        return api.post('/sweet-bonanza/admin-decision', { decision });
    }
};

export default sweetBonanzaAPI;
