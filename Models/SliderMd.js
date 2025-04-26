import mongoose from 'mongoose';

const sliderSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'title is required'],
    },
    image: {
        type: String,
        required: [true, 'image is required'],
    },
    location: {
        type: String,
        required: [true, 'href is required'],
        default: 'home'
    },

},{
    timestamps: true
})

export const Slider = mongoose.model('Slider', sliderSchema)
export default Slider