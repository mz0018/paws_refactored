const appointmentAttempts = new Map()
const MAX_APPOINTMENT_ATTEMPTS = 1
const WINDOW_MS = 86400000

export const appointmentRateLimiter = (req, res, next) => {
    const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.ip || req.socket.remoteAddress
    const now = Date.now()
    const record = appointmentAttempts.get(ip)

    if (!record) {
        appointmentAttempts.set(ip, { count: 1, resetTime: now + WINDOW_MS })
        return next()
    }

    if (now > record.resetTime) {
        appointmentAttempts.set(ip, { count: 1, resetTime: now + WINDOW_MS })
        return next()
    }

    if (record.count >= MAX_APPOINTMENT_ATTEMPTS) {
        const remainingTime = Math.ceil((record.resetTime - now) / 1000)
        return res.status(429).json({
            message: `You’ve reached your limit of 1 appointment attempts for today. Please try again tomorrow.`
        })
    }

    record.count++
    appointmentAttempts.set(ip, record)

    next()
}