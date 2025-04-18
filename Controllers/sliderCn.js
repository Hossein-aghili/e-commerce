import Product from "../Models/productMd.js";
import ApiFeatures from "../Utils/apiFeatures.js";
import catchAsync from "../Utils/catchAsync.js";
import fs  from 'fs';
import { __dirname } from './../app.js';
import Slider from "../Models/SliderMd.js";
export const create = catchAsync(async (req, res, next) => {
    const slider = await Slider.create(req.body)
    return res.status(200).json({
        status: 'success',
        data: slider,
        message: 'carete slider successfully'

    })
})

export const getAll = catchAsync(async (req, res, next) => {
    const features = new ApiFeatures(Slider, req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate()
        .populate()
        .secondPopulate('parentCategoryId')
    const Sliders = await features.query
    const count = await Slider.countDocuments(req?.query?.filters)
    return res.status(200).json({
        status: 'success',
        data: Sliders,
        count
    })
})
export const getOne = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const slider = await Slider.findById(id).paginate('parentCategoryId')
    return res.status(200).json({
        status: 'success',
        data: slider
    })
})

export const remove = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const product = await Product.find({ categoryId: id })
    if (product) {
        return next(new HandleERROR('you can not delete this slider because it has products', 400))
    }
    const slider = await Slider.findByIdAndDelete(id)
    fs.unlinkSync(`${__dirname}/Public/${slider.image}`);
    return res.status(200).json({
        status: 'success',
        data: slider,
        message: 'slider deleted successfully'
    })
})