import cors from 'cors'
import express from 'express'
import cookieParser from 'cookie-parser'
import userRoute from './routes/userRoute.js'
import adminRoute from './routes/adminRoute.js'
import connection from './config/connection.js'

import { errorHandler } from './middleware/errorHandler.js'
import { redisClient } from './middleware/productFetchLimiter.js'
import { gzipCompression } from './middleware/compression.js'

await redisClient.connect()

const app = express()

app.set('trust proxy', true)

app.use(express.json())
app.use(cookieParser())
app.use(gzipCompression)

app.use(express.urlencoded({ extended: true }))

//IP Checker lang to sah!
// app.use((req, res, next) => {
//     console.log(`IP: ${req.ip}`)
//     console.log(`Connection: ${req.connection.remoteAddress}`)
//     next()
// })

app.use(cors({
    origin: ['http://187.127.113.42:5000/','http://localhost:5173'],
    credentials: true
}))

app.use('/api/users', userRoute)
app.use('/api/admin', adminRoute)

app.use(errorHandler)

const start_server = async () => {
    try {
        await connection.connect_to_mongo()
        app.listen(connection.PORT, () => {
            console.log(`Running on PORT ${connection.PORT}`)
        })
    } catch (err) {
        console.error('', err.message)
        process.exit(1)
    }
}

start_server()

