import mongoose from 'mongoose';

const productSchama = new mongoose.Schama({



}, {
    timestamps: true
})

export const Product = mongoose.model('Product', productSchama)
export default Product