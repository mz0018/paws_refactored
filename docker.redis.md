Step 1: Start Redis Container
    docker run -d -p 6379:6379 --name redis-server redis
Step 2: Verify Redis is Running
    docker ps
# Should show redis-server container running
    docker exec redis-server redis-cli ping
# Should return: PONG
Step 3: Start Backend
    cd backend
    node server.js
You should see:
    Redis Client Ready
    Running on PORT 5000
Step 4: Test Rate Limiter
1. Sign in via Postman → get cookie
2. Request GET /api/admin/get-product with cookie
3. Check response headers for rate limit

Run this command to clear all rate limit data (if it hits the limit):
    docker exec redis-server redis-cli FLUSHDB
Or to clear just product rate limits:
    docker exec redis-server redis-cli DEL "ratelimit:product:*"

Stop the Container (keeps data)
    docker stop redis-server
Remove the Container Completely
    docker stop redis-server
    docker rm redis-server
Stop + Remove in One Command
    docker rm -f redis-server