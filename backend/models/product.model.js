import mongoose from 'mongoose';

const productModel = new mongoose.Schema(
  {
    productName: { type: String, required: true },
    productCategory: { type: String, required: true },
    productDescription: { type: String, required: true },
    productPrice: { type: Number, required: true, min: 0 },
    stock: { type: Number, default: 0 },
    createdBy: { 
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    images: [
      {
        url: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

productModel.index({ productName: 1 })
productModel.index({ createdBy: 1 })

export default mongoose.model('Product', productModel);