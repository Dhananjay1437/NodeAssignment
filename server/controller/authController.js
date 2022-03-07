const logger = require("./../config/logger");
const User = require("../models/userModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("../utils/appError");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
exports.signup = catchAsync(async (req, res, next) => {
  let data = {
    name:req.body.name,
    username: req.body.username,
    email: req.body.email,
   role: req.body.role,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  };

  const newUser = await User.create(data);
  const token = createSessionAuthToken(newUser);
  res.status(201).json({
    success: true,
    token,
    user: newUser,
  });
});
exports.login = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    next(new AppError("Please provide username and password", 400));
  }
  const user = await User.findOne({ username }).select("+password");
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect username or password", 400));
  }
  const token = createSessionAuthToken(user);
  user.password = undefined;
  res.status(201).json({
    success: true,
    token,
    user,
  });
});

exports.protected = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access", 401)
    );
  }
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  //check user still exist
  const currentUser = await User.findById(decoded._id);
  if (!currentUser) {
    return next(
      new AppError("The user belonging to this token does no longer exist", 401)
    );
  }
  //check if user has changed his password after jwt token issued
  if (currentUser.changePasswordAfter(decoded.iat)) {
    return next(
      new AppError("Password got changed recently! Please login again", 401)
    );
  }
  req.user = currentUser;
  next();
});
exports.restictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You don't have permission to perform this action"),
        403
      );
    }
    next();
  };
};
const createSessionAuthToken = (user) => {
  let userPayload = {
    _id: user._id,
  };
  const generateJwtToken = jwt.sign(userPayload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return generateJwtToken ? generateJwtToken : false;
};
