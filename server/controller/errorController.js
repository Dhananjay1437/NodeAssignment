const logger = require("./../config/logger");
const AppError = require("./../utils/appError");
const handleCastErrorDB = (err) => {
  const message = `Invalid mongoId ${err.path}:${err.value}`;
  return new AppError(message, 400);
};
const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `${errors.join(". ")}`;
  return new AppError(message, 400);
};
const handleJWTError = (err) =>
  new AppError("Invalid token.Please log in again!", 401);
const handleJWTExpiredError = (err) =>
  new AppError("Your token has expired! Please log in again", 401);

const handleDublicateFieldsDB = (errmsg) => {
  const value = errmsg.match(/(["'])(\\?.)*?\1/)[0];
  const message = `Dublicate field value ${value}. Please use another value !`;
  return new AppError(message, 400);
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
  });
};
const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: "error",
      message: "Something went wrong!",
    });
  }
};
module.exports = (err, req, res, next) => {
  logger.error(err.stack);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (process.env.NODE_ENV === "devlopment") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = JSON.parse(JSON.stringify(err));
    error.message = err.message;
    if (error.name === "CastError") error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDublicateFieldsDB(err.errmsg);
    if (error.name === "ValidationError")
      error = handleValidationErrorDB(error);
    if (error.name === "JsonWebTokenError") error = handleJWTError(error);
    if (error.name === "TokenExpiredError")
      error = handleJWTExpiredError(error);
    sendErrorProd(error, res);
  }
};
