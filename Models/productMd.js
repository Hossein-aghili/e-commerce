import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'title is required'],
    },
    image: {
        type: String,
        required: [true, 'image is required'],
    },
}, {
    timestamps: true
});

export const Product = mongoose.model('Product', ProductSchema);
export default Product;
