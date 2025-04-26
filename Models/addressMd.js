import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({

    city: {
        type: String,
        required: [true, 'city is required'],
    },
    state: {
        type: String,
        required: [true, 'state is required'],
    },
    street: {
        type: String,
        required: [true, 'street is required'],
    },
    description: {
        type: String,
        required: [true, 'description is required'],
    },
    receiverName: {
        type: String,
        required: [true, 'receiverName is required'],
    },
    postalCode: {
        type: String,
        required: [true, 'postalCode is required'],
    },
    userId: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
        default: []

    },

}, {
    timestamps: true
})

export const Address = mongoose.model('Address', addressSchema)
export default Address