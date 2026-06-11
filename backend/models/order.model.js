import mongoose from 'mongoose'

const orderModel = new mongoose.Schema({
    items: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        subtotal: { type: Number, required: true },
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
    }],
    status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
    completedAt: { type: Date, default: null }
}, { timestamps: true })

orderModel.index({ 'items.product': 1 })

export default mongoose.model('Order', orderModel)