import express from 'express'
import UserController from '../controllers/UserController.js'

import { signupSchema } from '../schemas/user.schema.js'
import { validate } from '../middleware/validate.js'
import { authorizeViaCookie } from '../middleware/authorizeViaCookie.js'
import { signinRateLimiter } from '../middleware/signinRateLimiter.js'
import { signupRateLimiter } from '../middleware/signupRateLimiter.js'


const router = express.Router()

router.get('/verify', authorizeViaCookie, UserController.verifyUser)
router.post('/signup', validate(signupSchema), signupRateLimiter, UserController.signupUser)
router.post('/signin', signinRateLimiter, UserController.signinUser)
router.post('/signout', UserController.signoutUser)

export default router