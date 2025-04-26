import Address from "../Models/addressMd.js";
import catchAsync from "../Utils/catchAsync.js";
import ApiFeatures from "../Utils/apiFeatures.js";
import HandleERROR from "../Utils/handleError.js";

export const create = catchAsync(async (req, res, next) => {
    const address = await Address.create({ ...req.body, userId: req.userId })
    res.status(200).json({
        status: 'success',
        data: address
    })
})

export const getAll = catchAsync(async (req, res, next) => {
    let queryString = req.query
    if (req.role !== 'admin' && req.role !== 'superAdmin') {
        queryString = { ...queryString, filters: { ...queryString.filters, userId: req.userId } }
    }
    const features = ApiFeatures(Address, queryString).filter().sort().paginate().populate().limitFields()
    const addresses = await features.query
    return res.status(200).json({
        status: 'success',
        data: addresses
    })
})
export const getOne = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const address = await Address.findById(id)
    if (req.role !== 'admin' && req.role !== 'superAdmin' && address.userId != req.userId) {
        return next(new HandleERROR("you don't have a permission", 400))
    }
    return res.status(200).json({
        status: 'success',
        data: address
    })
})
export const update = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const address = await Address.findById(id)
    if (req.role !== 'admin' && req.role !== 'superAdmin' && address.userId != req.userId) {
        return next(new HandleERROR("you don't have a permission", 400))
    }
    const { userId = null, ...others } = req.body
    const newAddress = await Address.findByIdAndUpdate(id, others, { new: true })
    return res.status(200).json({
        success: true,
        data: newAddress,
        message: 'update address success'

    })
})
export const remove = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const address = await Address.findById(id)
    if (req.role !== 'admin' && req.role !== 'superAdmin' && address.userId != req.userId) {
        return next(new HandleERROR("you don't have a permission", 400))
    }
    const newAddress = await Address.findByIdAndDelete(id)
    return res.status(200).json({
        success: true,
        data: newAddress,
        message: 'remove address success'
    })
})