var mongoose = require("mongoose");

//Country Schema

var countrySchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    currency: {
      type: String,
    },
    dialCode: {
      type: String,
    },
   
    //    cities: [{type: String}],
    states: [
      {
        name: { type: String },
        cities: [ {name: { type: String }}],
      },
    ],
  },
  {
    timestamps: true,
  }
);

var Country = mongoose.model("countries", countrySchema);
module.exports = Country;
