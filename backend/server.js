import express from 'express'
import userRoute from './routes/userRoute.js'
import connection from './config/connection.js'

import { errorHandler } from './middleware/errorHandler.js'

const app = express()

app.use(express.json())
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

