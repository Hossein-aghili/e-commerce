import mongoose from 'mongoose';

const BrandSchema = new mongoose.Schema({
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

export const Brand = mongoose.model('Brand', BrandSchema)
export default Brand