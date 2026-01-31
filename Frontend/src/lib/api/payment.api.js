import api from "./index";

const prefix = "/payment";

export const paymentAPI = {
    // User endpoints
    requestDeposit: async (amount) => {
        return api.post(`${prefix}/iban-deposit`, {
            amount: parseFloat(amount),
            description: "Bank Transfer Deposit Request"
        });
    },
    submitPaymentProof: async (requestId, screenshot) => {
        return api.post(`${prefix}/deposit-proof/${requestId}`, { screenshot });
    },
    getDepositRequests: async () => {
        return api.get(`${prefix}/deposit-requests`);
    },
    getIbanInfo: async () => {
        return api.get(`${prefix}/iban-info`);
    },
    createWithdrawalRequest: async (withdrawData) => {
        return api.post(`${prefix}/withdrawal/request`, withdrawData);
    },
    getWithdrawalRequests: async () => {
        return api.get(`${prefix}/withdrawal-requests`);
    },
    updateUserProfile: async (profileData) => {
        return api.put(`${prefix}/profile`, profileData);
    },
    getTransactions: async (params) => {
        return api.get(`/transactions`, { params });
    },
    getBonuses: async () => {
        return api.get(`/bonus/my-bonuses`);
    },

    // Admin endpoints (The backend will handle these via dedicated admin routes or permission checks)
    // Note: In the backend routes shown, we have generic /payment routes. 
    // Usually admin-specific actions are in /admin/payment or handled by the same controller with logic.
    getAllRequests: async () => {
        return api.get(`/admin/deposit-pool?status=pending,payment_submitted`);
    },
    approveInitialRequest: async (requestId, bankDetails) => {
        return api.post(`/admin/deposit-pool/${requestId}/provide-details`, bankDetails);
    },
    confirmPayment: async (requestId) => {
        return api.post(`/admin/deposit-pool/${requestId}/approve`);
    },
    rejectRequest: async (requestId, reason) => {
        return api.post(`/admin/payment/reject/${requestId}`, { reason });
    },

    // Admin direct balance update
    updateUserBalance: async (identifier, amount, operation) => {
        return api.post(`/admin/users/balance`, { identifier, amount: parseFloat(amount), operation });
    },
    searchUsers: async (query) => {
        return api.get(`/admin/users/search?q=${query}`);
    }
};
