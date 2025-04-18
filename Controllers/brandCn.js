import Brand from "../Models/brandMd.js";
import Product from "../Models/productMd.js";
import ApiFeatures from "../Utils/apiFeatures.js";
import catchAsync from "../Utils/catchAsync.js";
import fs  from 'fs';
import { __dirname } from './../app.js';
export const create = catchAsync(async (req, res, next) => {
    const brand = await Brand.create(req.body)
    return res.status(200).json({
        status: 'success',
        data: brand,
        message: 'carete brand successfully'

    })
})

export const getAll = catchAsync(async (req, res, next) => {
    const features = new ApiFeatures(Brand, req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate()
        .populate()
    const brand = await features.query
    const count = await Brand.countDocuments(req?.query?.filters)
    return res.status(200).json({
        status: 'success',
        data: brand,
        count
    })
})
export const getOne = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const brand = await Brand.findById(id)
    return res.status(200).json({
        status: 'success',
        data: brand
    })
})
export const update = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const brand = await Brand.findByIdAndUpdate(id, req.body, { new: true })
    return res.status(200).json({
        status: 'success',
        data: brand,
        message: 'brand updated successfully'
    })
})
export const remove = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const product = await Product.find({ brandId: id })
    if (product) {
        return next(new HandleERROR('you can not delete this brand because it has products', 400))
    }
    const brand = await Brand.findByIdAndDelete(id)
    fs.unlinkSync(`${__dirname}/Public/${brand.image}`);
    return res.status(200).json({
        status: 'success',
        data: brand,
        message: 'brand deleted successfully'
    })
})