const express = require("express");
var router = express.Router();
const userRoute = require("./userRoutes");
const authController = require("../controller/authController");
const countryRoutes=require("../routes/countryRoutes");
const formDataRoute = require("./formDataRoutes");
router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.use("/api/country", countryRoutes);
router.use(authController.protected);

router.use("/api/user", userRoute);
router.use("/api/formdata", formDataRoute);
module.exports = router;

