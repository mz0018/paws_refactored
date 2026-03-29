import express from 'express'
import UserController from '../controllers/UserController.js'

import { signupSchema } from '../schemas/user.schema.js'
import { validate } from '../middleware/validate.js'
import { authorizeViaCookie } from '../middleware/authorizeViaCookie.js'


const router = express.Router()

router.get('/verify', authorizeViaCookie, UserController.verifyUser)
router.post('/signup', validate(signupSchema), UserController.signupUser)
router.post('/signin', UserController.signinUser)

export default router