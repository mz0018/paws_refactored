import { createClient } from 'redis'

export const redisClient = createClient({ url: process.env.REDIS_URL })
redisClient.on('error', (err) => console.error('Redis Client Error:', err))

const WINDOW_MS = 60 * 1000
const MAX_REQUESTS = 5

export const productFetchLimiter = async (req, res, next) => {

  const userId = req.user_id
  if (!userId) return next()

  const key = `ratelimit:product:${userId}`
  const current = await redisClient.incr(key)
  
  if (current === 1) {
    await redisClient.pExpire(key, WINDOW_MS)
  }
  
  const ttl = await redisClient.pTTL(key)
  
  res.setHeader('X-RateLimit-Limit', MAX_REQUESTS)
  res.setHeader('X-RateLimit-Remaining', Math.max(0, MAX_REQUESTS - current))
  
  if (current > MAX_REQUESTS) {
    return res.status(429).json({ 
      message: `Rate limit exceeded. Try again in ${Math.ceil(ttl/1000)}s`,
      retryAfter: Math.ceil(ttl/1000)
    })
  }
  
  next()
}