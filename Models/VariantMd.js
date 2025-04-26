import mongoose from 'mongoose';

const variantSchema = new mongoose.Schema({

    title: {
        type: String,
        required: [true, 'title is required'],
        enum: ['color', 'size'],
    },

    value: {
        type: String,
        required: [true, 'value is required'],
    },


},{
    timestamps: true
})

export const Variant = mongoose.model('Variant', variantSchema)
export default Variant