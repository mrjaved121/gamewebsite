import api from './index'

export const betRoundAPI = {
    placeBetRound: (data) => api.post('/bet-rounds/place', data),
    getBetRoundHistory: (params) => api.get('/bet-rounds/history', { params }),
    getBetRoundDetails: (id) => api.get(`/bet-rounds/${id}`),
    getBetRoundStatistics: (params) => api.get('/bet-rounds/statistics', { params }),
}
