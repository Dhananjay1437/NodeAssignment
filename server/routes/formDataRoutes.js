const express = require("express");

const formDataController = require("../controller/formDataController");
const authController = require("../controller/authController");
const { USER_TYPE } = require("./../config/string_constants");
const router = express.Router();



router
  .route("/")
  .get(
    authController.restictTo(USER_TYPE.ADMIN, USER_TYPE.USER),
    formDataController.getAllFormData
  )
  .post(
    authController.restictTo(USER_TYPE.ADMIN, USER_TYPE.USER),
    formDataController.insertFormData
  );
module.exports = router;
