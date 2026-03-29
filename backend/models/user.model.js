import mongoose from 'mongoose'

const userModel = new mongoose.Schema({
    firstName: String,
    lastName: String,
    userName: { type: String, unique: true },
    password: String,
    },
    { timestamps: true }
)

export default mongoose.model('User', userModel)