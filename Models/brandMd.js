import mongoose from 'mongoose';

const BrandSchama = new mongoose.Schama({

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
})

export const Brand = mongoose.model('Brand', BrandSchama)
export default Brand