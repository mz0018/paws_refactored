import express from 'express'
import cookieParser from 'cookie-parser'
import userRoute from './routes/userRoute.js'
import connection from './config/connection.js'

import { errorHandler } from './middleware/errorHandler.js'

const app = express()

app.set('trust proxy', true)

app.use(express.json())
app.use(cookieParser())

//IP Checker lang to sah!
// app.use((req, res, next) => {
//     console.log(`IP: ${req.ip}`)
//     console.log(`Connection: ${req.connection.remoteAddress}`)
//     next()
// })

app.use('/api/users', userRoute)

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

