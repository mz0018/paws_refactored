const MAX_ATTEMPTS = 30
const WINDOW_MS = 3600000
const CLEANUP_THRESHOLD = 50
const attempts = new Map()
let requestCount = 0
export const productUploadLimiter = (req, res, next) => {
    const authToken = req.cookies.authToken
    const now = Date.now()
    requestCount++
    
    if (!authToken) {
        return res.status(401).json({ message: 'Unauthorized' })
    }
    
    if (requestCount >= CLEANUP_THRESHOLD) {
        requestCount = 0
        for (const [key, timestamps] of attempts.entries()) {
            const valid = timestamps.filter(t => now - t < WINDOW_MS)
            if (valid.length === 0) {
                attempts.delete(key)
            } else if (valid.length !== timestamps.length) {
                attempts.set(key, valid)
            }
        }
    }
    
    let timestamps = attempts.get(authToken) || []
    timestamps = timestamps.filter(t => now - t < WINDOW_MS)
    
    if (timestamps.length >= MAX_ATTEMPTS) {
        const retryAfter = Math.ceil((timestamps[0] + WINDOW_MS - now) / 1000)
        return res.status(429).json({ 
            message: `Rate limit exceeded. Try again in ${retryAfter} seconds.`,
            retryAfter
        })
    }
    
    timestamps.push(now)
    attempts.set(authToken, timestamps)
    next()
}