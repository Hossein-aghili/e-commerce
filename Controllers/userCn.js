import User from "../Models/userMd.js";
import catchAsync from "../Utils/catchAsync.js";
import ApiFeatures from './../Utils/apiFeatures.js';
import HandleERROR from './../Utils/handleError.js';

export const getAll = catchAsync(async (req, res, next) => {
    const features = new ApiFeatures(User, req.query).filter().sort().limitFields().paginate()
    const users = await features.query
    const count = await User.countDocuments(req?.query?.filters)
    return res.status(200).json({
        status: 'success',
        data: users,
        count
    })
})
export const getOne = catchAsync(async (req, res, next) => {
    const { id } = req.params
    if (id != req.userId && req.role != 'admin' && req.role != 'superAdmin') {
        return next(new HandleERROR("you don't have a permission"))
    }
    const user = await User.findById(id)
    return res.status(200).json({
        status: 'success',
        data: user
    })
})

export const update = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const { role = null, phoneNumber = null, boughtProductIds = null, ...others } = req.body
    if (id != req.userId && req.role != 'admin' && req.role != 'superAdmin') {
        return next(new HandleERROR("you don't have a permission"))
    }
    const user = await User.findByIdAndUpdate(id, others, { new: true })
    return res.status(200).json({
        status: 'success',
        data: user
    })
})

