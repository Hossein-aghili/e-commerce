import mongoose from 'mongoose';

const categorySchama = new mongoose.Schama({

    title: {
        type: String,
        required: [true, 'title is required'],
    },
    image: {
        type: String,
        required: [true, 'image is required'],
    },
    parentCategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    timestamps: true
})

export const Category = mongoose.model('Category', categorySchama)
export default Category