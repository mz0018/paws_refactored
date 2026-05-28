const placeOrderAttempts = new Map()
const MAX_PLACE_ORDER_ATTEMPTS = 3
const WINDOW_MS = 15 * 60 * 1000

export const placeOrderRateLimiter = (req, res, next) => {
    const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.ip || req.socket.remoteAddress
    const now = Date.now()
    const record = placeOrderAttempts.get(ip)

    if (!record) {
        placeOrderAttempts.set(ip, { count: 1, resetTime: now + WINDOW_MS })
        return next()
    }

    if (now > record.resetTime) {
        placeOrderAttempts.set(ip, { count: 1, resetTime: now + WINDOW_MS })
        return next()
    }

    if (record.count >= MAX_PLACE_ORDER_ATTEMPTS) {
        const remainingTime = Math.ceil((record.resetTime - now) / 1000)
        return res.status(429).json({
            message: `You’ve reached your limit of 3 order attempts for today. Please try again tomorrow.`
        })
    }

    record.count++
    placeOrderAttempts.set(ip, record)

    next()
}