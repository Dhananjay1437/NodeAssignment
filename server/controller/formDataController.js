const FormData = require("../models/formDataModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const { DATA_STATUS } = require("../config/string_constants");

const getAllFormData = catchAsync(async (req, res) => {
   const data =await FormData.find();

  res.status(200).json({
    success: true,
    data: data,
  });
});

const insertFormData=catchAsync(async (req, res, next) => {
  let data = {
    fullname:req.body.fullname,
    phone: req.body.phone,
    email: req.body.email,
    password: req.body.password,
    gender: req.body.gender,
    language: req.body.language,
    country: req.body.country,
    state: req.body.state,
    city: req.body.city,
    language: req.body.language,
   
  };

  const newUser = await FormData.create(data);
  
  res.status(201).json({
    success: true,
     data: newUser,
  });
});




module.exports = {
  getAllFormData,
 insertFormData
};
