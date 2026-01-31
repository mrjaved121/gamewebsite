export const LogLevel = {
    DEBUG: 'debug',
    INFO: 'info',
    WARN: 'warn',
    ERROR: 'error',
}

class Logger {
    debug(message, data = null) {
        if (import.meta.env.MODE !== 'development') return
        console.log(`[DEBUG] ${message}`, data || '')
    }
    info(message, data = null) {
        console.info(`[INFO] ${message}`, data || '')
    }
    warn(message, data = null) {
        console.warn(`[WARN] ${message}`, data || '')
    }
    error(message, error = null) {
        console.error(`[ERROR] ${message}`, error || '')
    }
    apiError(endpoint, error) {
        this.error(`API Error [${endpoint}]`, error)
    }
}

export const logger = new Logger()
export const log = {
    debug: (message, data) => logger.debug(message, data),
    info: (message, data) => logger.info(message, data),
    warn: (message, data) => logger.warn(message, data),
    error: (message, error) => logger.error(message, error),
}
export default logger
