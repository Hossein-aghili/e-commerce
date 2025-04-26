import Product from "../Models/productMd.js";
import ApiFeatures from "../Utils/apiFeatures.js";
import catchAsync from "../Utils/catchAsync.js";
import { __dirname } from './../app.js';
import jwt from 'jsonwebtoken';
import HandleERROR from "../Utils/handleError.js";
import User from "../Models/userMd.js";

export const create = catchAsync(async (req, res, next) => {
    const product = await Product.create(req.body);
    return res.status(200).json({
        success: true,
        data: product,
        message: 'create product successfully'
    });
});

export const getAll = catchAsync(async (req, res, next) => {
    let queryString = req.query;
    if (req?.headers?.authorization?.split(" ")[1]) {
        const { role } = jwt.verify(
            req.headers.authorization.split(" ")[1],
            process.env.SECRET_JWT
        );
        if (role !== 'admin' && role !== 'superAdmin') {
            queryString = { ...queryString, filters: { ...queryString.filters, isActive: true } };
        }
    }

    const features = new ApiFeatures(Product, req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate()
        .populate()
        .secondPopulate('categoryIds brandId defaultProductVariant');

    const products = await features.query;
    const count = await Product.countDocuments(req.query.filters);
    return res.status(200).json({
        success: true,
        data: products,
        count
    });
});

export const getOne = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findById(id).populate('categoryIds brandId defaultProductVariant');
    let favoriteProduct = false;
    if (req?.headers?.authorization?.split(" ")[1]) {
        const { id: userId, role } = jwt.verify(
            req.headers.authorization.split(" ")[1],
            process.env.SECRET_JWT
        );
        if (role !== 'admin' && role !== 'superAdmin' && !product.isActive) {
            return next(new HandleERROR('you can not see this product', 400));
        }
        const user = await User.findById(userId);
        const fav = user.favoriteProducts.find((e) => e == id)
        if (fav) {
            favoriteProduct = true;
        }
    }
    return res.status(200).json({
        success: true,
        data: product,
        favoriteProduct
    });
});

export const update = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
    return res.status(200).json({
        success: true,
        data: product,
        message: 'product updated successfully'
    });
});