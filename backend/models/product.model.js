import mongoose from 'mongoose';

const productModel = new mongoose.Schema(
  {
    productName: { type: String, required: true },
    productCategory: { type: String, required: true },
    productDescription: { type: String, required: true },
    productPrice: { type: Number, required: true, min: 0 },
    stock: { type: Number, default: 0 },
    images: [
      {
        url: { type: String, required: true },
        alt: { type: String, default: '' },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model('Product', productModel);