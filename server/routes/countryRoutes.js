const express = require("express");

const countryController = require("../controller/countryController");

const router = express.Router();



router
  .route("/")
  .get( countryController.getAllCountry )
  router.route("/:id").get(countryController.getAllStatesByCountryId)
module.exports = router;
