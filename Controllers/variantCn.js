import catchAsync from "../Utils/catchAsync.js";
import Variant from "../Models/VariantMd.js";
import ApiFeatures from "../Utils/apiFeatures.js";
import { __dirname } from "../app.js";
export const create = catchAsync(async (req, res, next) => {
  const variant = await Variant.create(req.body);
  return res.status(200).json({
    success: true,
    data: variant,
    message: "create variant successfully",
  });
});

export const getAll = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Variant, req?.query)
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate();

  const variants = await features.query;
  const count = await Variant.countDocuments(req?.query?.filters);
  return res.status(200).json({
    success: true,
    count,
    data: variants,
  });
});
export const getOne = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const variant = await Variant.findById(id);
  return res.status(200).json({
    success: true,
    data: variant,
  });
});
export const update = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const variant = await Variant.findByIdAndUpdate(id, req.body, { new: true });
  return res.status(200).json({
    success: true,
    data: variant,
    message: "update Variant successfully",
  });
});
export const remove = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  await Variant.findByIdAndDelete(id);
  return res.status(200).json({
    success: true,
    message: "remove Variant successfully",
  });
});
