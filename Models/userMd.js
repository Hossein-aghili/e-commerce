import mongoose from 'mongoose';

const userSchama = new mongoose.Schama({
    firstName: String,
    lastName: String,
    birthDate: Date,
    phoneNumber: {
        type: String,
        match: [/^(\+98|0)?9\d{9}$/, 'phone invalid'],
        required: [true, 'phone number is required'],
        unique: [true, 'phone number already taken']
    },
    favoriteProductIds: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }],
        default: []

    },
    boughtProductIds: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }],
        default: []

    },
    password: {
        type: String,
    },
    role: {
        type: String,
        enum: ['admin', 'user', 'superAdmin'],
        default: 'user'
    }
}, {
    timestamps: true
})

export const User = mongoose.model('User', userSchama)
export default User