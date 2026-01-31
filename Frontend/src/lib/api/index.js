import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 60000, // Increased to 60 seconds for slower connections
});

// Request interceptor: Attach token
api.interceptors.request.use(
    (config) => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor: Handle 401/Invalid Token
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Only handle 401 if we actually had a token (stale session)
        // This prevents infinite reload loops on pages that try to fetch auth data while logged out
        if (error.response?.status === 401) {
            const hasExistingToken = !!localStorage.getItem('token');

            if (hasExistingToken) {
                console.warn('Authentication expired. Clearing session...');
                localStorage.removeItem('token');
                localStorage.removeItem('user');

                // Only reload if we are on a page that likely needs auth
                // For now, let's just clear the state. The components will see balance = 0 and prompt login.
                // Disabling auto-reload to fix the "back to home" issue.
                window.dispatchEvent(new CustomEvent('userUpdated', { detail: null }));
            }
        }
        return Promise.reject(error);
    }
);

export default api;

export * from './auth.api';
export * from './betRound.api';
export * from './sweetBonanza.api';
export * from './payment.api';
