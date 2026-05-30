import mongoose from 'mongoose'

const orderModel = new mongoose.Schema(
    {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        subtotal: {
            type: Number,
            required: true
        }
    },
    { timestamps: true }
)

orderModel.index({ product: 1 })

export default mongoose.model('Order', orderModel)