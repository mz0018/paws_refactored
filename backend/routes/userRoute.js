import express from 'express'

import UserController from '../controllers/UserController.js'

const router = express.Router()

router.get('/verify', UserController.verifyUser)

export default router