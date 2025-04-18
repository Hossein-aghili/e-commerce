import mongoose from 'mongoose';

const variantSchama = new mongoose.Schama({

    title: {
        type: String,
        required: [true, 'title is required'],
        enum: ['color', 'size'],
    },

    value: {
        type: String,
        required: [true, 'value is required'],
    },

    timestamps: true
})

export const Variant = mongoose.model('Variant', variantSchama)
export default Variant