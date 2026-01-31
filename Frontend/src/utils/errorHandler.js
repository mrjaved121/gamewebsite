export const handleError = (error) => {
    console.error('[ERROR HANDLER]', error)
    return error?.response?.data?.message || error?.message || 'An error occurred'
}

export const getErrorMessage = (error) => {
    return error?.response?.data?.message || error?.message || 'An error occurred'
}
