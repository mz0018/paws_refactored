import User from '../models/user.model.js'
import argon2 from 'argon2'
class UserService {
    
    verifyUser() {
        return { message: 'User Verified' }
    }

    async signupUser(userData) {
        
        const existingUser = await User.findOne({ userName: userData.userName })

        if (existingUser) {
            throw new Error('Username already taken')
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
}

export default new UserService()