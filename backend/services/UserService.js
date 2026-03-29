import User from '../models/user.model.js'
import argon2 from 'argon2'

import ErrorController from '../controllers/ErrorController.js'
class UserService {
    
    verifyUser() {
        return { message: 'User Verified' }
    }

    async signupUser(userData) {
        
        const existingUser = await User.findOne({ userName: userData.userName })

        if (existingUser) {
            throw new ErrorController('Username already taken', 409)
        }

        const hashedPassword = await argon2.hash(userData.password)

        const newUser = await User.create({
            ...userData,
            password: hashedPassword,
        })

        return {
            id: newUser._id,
            userName: newUser.userName,
        }
        
    }

    async signinUser(credentials) {
        const { userName, password } = credentials

        const user = await User.findOne({ userName })

        if (!user) {
            throw new ErrorController('Invalid username or password', 401)
        }

        const isPasswordValid = await argon2.verify(user.password, password)

        if (!isPasswordValid) {
            throw new ErrorController('Invalid username or password', 401)
        }

        //Next step generate token
    }
}

export default new UserService()