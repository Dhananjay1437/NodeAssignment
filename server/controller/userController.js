const User = require("../models/userModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

const { DATA_STATUS } = require("./../config/string_constants");


const getUserByUserId = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.userId);
  if (!user) {
    return next(new AppError("No user found with given id", 404));
  }
  res.status(200).json({
    success: true,
    data: user,
  });
});

const updateUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.userId, req.body, {
    new: true,
    runValidators: false,
  });

  if (!user) {
    return next(new AppError("No user found with given id", 404));
  }
  res.status(200).json({
    success: true,
    data: user,
  });
});


module.exports = {
  getUserByUserId,
  updateUser,
};
