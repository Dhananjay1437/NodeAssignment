const express = require("express");

const userController = require("../controller/userController");
const authController = require("../controller/authController");
const { USER_TYPE } = require("./../config/string_constants");
const router = express.Router();



router
  .route("/:userId")
  .get(
    authController.restictTo(USER_TYPE.ADMIN, USER_TYPE.USER),
    userController.getUserByUserId
  )
  .patch(
    authController.restictTo(USER_TYPE.ADMIN, USER_TYPE.USER),
    userController.updateUser
  );
module.exports = router;
