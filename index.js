require("dotenv").config();
const express = require("express");
var router = express.Router();
const { connectToMongo } = require("./server/config/mongooseConnection");
const logger = require("./server/config/logger");
const bodyParser = require("body-parser");
const AppError = require("./server/utils/appError");
const globalErrorHandler = require("./server/controller/errorController");
const cors = require("cors");
const app = express();
const helmet = require("helmet");
const routes = require("./server/routes");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());
const mongoConnection = connectToMongo();

app.use(routes);
app.all("*", (req, res, next) => {
  next(new AppError(`can't find ${req.originalUrl} on this server!`, 404));
});
app.use(globalErrorHandler);
const PORT = process.env.PORT;

// Set Port, hosting services will look for process.env.PORT
app.set("port", PORT);

// start the server

app.listen(PORT, () => {
 
  logger.info(`Server Running on Port: http://localhost:${PORT}`);
  logger.info("************* test db " + process.env.MONGO_URI);
});
