import mongoose from 'mongoose';

const informationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required'],
        trim: true
    },
    value: {
        type: String,
        required: [true, 'value is required'],
        trim: true
    }
}, {_id: false});

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'description is required'],
        trim: true
    },
    information: {
        type: [informationSchema],
        default: []
    },
    images: {
        type: [String],
        default: []
    },
    categoryIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }],
    brandId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brand',
        required: [true, 'Brand is required']
    },
    isActive: {
        type: Boolean,
        default: true
    },
    rate: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    rateCount: {
        type: Number,
        default: 0
    },
    defaultProductVariant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductVariant'
    }
}, {
    timestamps: true
});

export const Product = mongoose.model('Product', ProductSchema);
export default Product;
