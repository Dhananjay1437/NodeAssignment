const mongoose = require("mongoose");
const config = require("./index");
const logger = require("./logger");
const { MONGO_CONNECTION } = require("./mongo_connection_constants");

const connectToMongo = () => {
  let db = mongoose.connection;

  // On connecting to mongoDB
  db.on(MONGO_CONNECTION.CONNECTING, () => {
    logger.info(MONGO_CONNECTION.CONNECTION_MESSAGE);
  });

  // On error of mongoDB
  db.on(MONGO_CONNECTION.ERROR, (error) => {
    logger.error(MONGO_CONNECTION.ERROR_MESSAGE + error);
  });

  // On connection to MongoDB
  db.on(MONGO_CONNECTION.CONNECTED, () => {
    logger.info(MONGO_CONNECTION.CONNECTED_MESSAGE);
  });

  // on Connection opened to mongoDB
  db.once(MONGO_CONNECTION.OPEN, () => {
    logger.info(MONGO_CONNECTION.OPEN_MESSAGE);
  });

  // On Reconnection to MongoDB
  db.on(MONGO_CONNECTION.RECONNECTED, () => {
    logger.info(MONGO_CONNECTION.RECONNECTED_MESSAGE);
  });

  // On Disconnection from MongoDB
  db.on(MONGO_CONNECTION.DISCONNECTED, () => {
    logger.error(MONGO_CONNECTION.DISCONNECTED_MESSAGE);
  });

  mongoose
    .connect(config.DATABASE.URI, {
      useNewUrlParser: config.DATABASE.NEW_URL_PARSER,
      useFindAndModify: config.DATABASE.USE_FIND_AND_MODIFY,
      useCreateIndex: config.DATABASE.USE_CREATE_INDEX,
      // Automatically try to reconnect when it loses connection to MongoDB
      autoReconnect: config.DATABASE.AUTO_RECONNECT,
      // Never stop trying to reconnect
      reconnectTries: Number.MAX_VALUE,
      // Reconnect every Xms mentioned in config
      reconnectInterval: config.DATABASE.RECONNECT_INTERVAL,
      // Maintain up to X socket connections. If not connected, mentioned in config
      // return errors immediately rather than waiting for reconnect
      poolSize: config.DATABASE.POOL_SIZE,
      // Give up initial connection after X seconds mentioned in config
      connectTimeoutMS: config.DATABASE.CONNECTION_TIMEOUT_MS,
      // inactive after the connection successful
      socketTimeoutMS: config.DATABASE.SOCKET_TIMEOUT_MS,
    })
    .then(() => {
      logger.info(MONGO_CONNECTION.SUCCESS_MESSAGE);
    })
    .catch((err) => {
      logger.info(err);
    }); // init of Mongo Connection

  // If debug true shows the mongoose query
  mongoose.set(MONGO_CONNECTION.DEBUG, config.MONGO_DEBUG);

  return db;
};

module.exports = { connectToMongo };
