import mongoose from 'mongoose'

const appointmentLogSchema = new mongoose.Schema({
    appointmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment',
        required: true,
        index: true
    },
    action: {
        type: String,
        enum: ['created', 'follow-up_added', 'completed'],
        required: true
    },
    previousStatus: { type: String, default: null },
    newStatus: { type: String, default: null },
    followUpReason: { type: String, default: null },
    performedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    }
}, { timestamps: true })

export default mongoose.model('AppointmentLog', appointmentLogSchema)
