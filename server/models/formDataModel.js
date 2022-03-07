const mongoose = require("mongoose");

const { ROLE, DATA_STATUS } = require("../config/string_constants");
const formDataSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: [true, "Please provide your full name"],
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: true,
      lowercase: true,
    },
    phone: {
      type: Number,
      minlength: 6,
     required: [true, "Please provide your phone"],
    },
  password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: 6,
      select: false,
    },
    gender: {
      type: String,
      required: [true, "Please provide gender type"],
      enum: ["MALE","FEMALE"],
      uppercase: true,
    },
    language: {
      type: [{type:String}],
      required: [true, "Please provide language known"],
      enum: ["Hindi","English"],
      uppercase: true,
    },
    country: {
      type: String,
      required: [true, "Please provide  country name"],
    },
    state: {
      type: String,
      required: [true, "Please provide state name"],
    },
    city: {
      type: String,
      required: [true, "Please provide city name"],
    },
    status: {
      type: String,
      default: DATA_STATUS.ACTIVE,
    },
   
  },
  {
    timestamps: true,
  }
);

;
const FormData = mongoose.model("formdata", formDataSchema);
module.exports = FormData;
