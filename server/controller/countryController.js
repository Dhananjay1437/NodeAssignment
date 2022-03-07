const Country = require("../models/country");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
var mongoose = require("mongoose");
const { DATA_STATUS } = require("./../config/string_constants");


const getAllCountry = catchAsync(async (req, res, next) => {
  let project = {
    _id:1,
    name: 1,
  
  };
  const countryData = await Country.find({},project);
 
  res.status(200).json({
    success: true,
    data: countryData,
  });
});
const getAllStatesByCountryId = catchAsync(async (req, res, next) => {
  let project = {
    name: 1,
    states: {
      name:1,
      cities:{
        name:1
      }
    },
  };
  const countryData = await Country.findOne({name:req.params.id},project);
 
  res.status(200).json({
    success: true,
    data: countryData,
  });
});

module.exports = {
  getAllCountry,
  getAllStatesByCountryId
 
};
