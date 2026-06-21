import mongoose from 'mongoose'

const appointmentModel = new mongoose.Schema({
    selectedDate: { type: Date, required: true },
    selectedTime: { type: String, required: true },
    name: { type: String, required: true },
    purpose: { type: String, required: true },
    status: { type: String, enum: ['pending', 'completed', 'follow-up'], default: 'pending'},
    completedAt: { type: Date, default: null }
}, { timestamps: true })

export default mongoose.model('Appointment', appointmentModel)