import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: 'Name is required!',
      minlength: 3,
    },
    quantity: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: { createdAt: 'createdDate', updatedAt: 'modifyDate' },
    collection: 'products',
  },
);

export default mongoose.model('productModel', productSchema);
