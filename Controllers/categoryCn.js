import Category from "../Models/categoryMd.js";
import Product from "../Models/productMd.js";
import ApiFeatures from "../Utils/apiFeatures.js";
import catchAsync from "../Utils/catchAsync.js";
import fs  from 'fs';
import { __dirname } from './../app.js';
export const create = catchAsync(async (req, res, next) => {
    const category = await Category.create(req.body)
    return res.status(200).json({
        status: 'success',
        data: category,
        message: 'carete category successfully'

    })
})

export const getAll = catchAsync(async (req, res, next) => {
    const features = new ApiFeatures(Category, req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate()
        .populate()
        .secondPopulate('parentCategoryId')
    const categories = await features.query
    const count = await Category.countDocuments(req?.query?.filters)
    return res.status(200).json({
        status: 'success',
        data: categories,
        count
    })
})
export const getOne = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const category = await Category.findById(id).paginate('parentCategoryId')
    return res.status(200).json({
        status: 'success',
        data: category
    })
})
export const update = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const category = await Category.findByIdAndUpdate(id, req.body, { new: true })
    return res.status(200).json({
        status: 'success',
        data: category,
        message: 'category updated successfully'
    })
})
export const remove = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const product = await Product.find({ categoryId: id })
    if (product) {
        return next(new HandleERROR('you can not delete this category because it has products', 400))
    }
    const category = await Category.findByIdAndDelete(id)
    fs.unlinkSync(`${__dirname}/Public/${category.image}`);
    return res.status(200).json({
        status: 'success',
        data: category,
        message: 'category deleted successfully'
    })
})