module.exports = {
  DATABASE: {
    URI:
      process.env.MONGO_URI ||
      "mongodb+srv://tarunVerma:H6cR5Gr5qkcOOp6v@cluster0.vb9nd.mongodb.net/sportzmentor_local?retryWrites=true&w=majority",
    NEW_URL_PARSER: true,
    USE_FIND_AND_MODIFY: true,
    USE_CREATE_INDEX: true,
    AUTO_RECONNECT: true,
    RECONNECT_INTERVAL: 2000,
    POOL_SIZE: 10,
    CONNECTION_TIMEOUT_MS: 50000,
    SOCKET_TIMEOUT_MS: 50000,
  },
  MONGO_DEBUG: false,
  mailDetails: {
    host: "",
    port: 465,
    secure: true,
    auth: {
      user: "",
      pass: "",
    },
  },
  APPLICATION: {
    PAGINATION: {
      DEFAULT_PAGE: 1,
      LIMIT: 10,
    },
  },
  server: {
    HOST: "localhost",
    DEFAULT_PORT: "5000",
    SESSION_SECRET: "Jf#)25dP-Wbt3E7(+-V}6[yDx1",
    COOKIE_MAX_AGE: 604800000, // 7 Days in milliseconds
    JWT: {
      TOKEN_SECRET: "K!4nA0$h-1T@*m8Qi-%l0.C9sJ",
      TOKEN_EXPIRY: 7776000, // 3 months in seconds
    },
    LOG_FOLDER: "logs",
    ERROR_LOG_FILE_NAME: "error-%DATE%.log",
    INFO_LOG_FILE_NAME: "info-%DATE%.log",
    LOG_FILE_SIZE: "10m", // 10 Mega Bytes
    SERVER_LOGGING_LEVEL: "debug",
  },
  TNC_DOCUMENT_URL: "url",
  TNC_TEXT: "I agree to the terms and conditions",

  //   AMAZON_S3: {
  //     SECRET_ACCESS_KEY:
  //       process.env.AMAZON_S3_SECRET_ACCESS_KEY ||
  //       "BEilMeJJE0od3KO4tEEcwz7LFIwpBnzN4rOX7jcOc9N8",
  //     ACCESS_KEY_ID:
  //       process.env.AMAZON_S3_ACCESS_KEY_ID || "AKIAVOCMSQKHHEVFOSQP",
  //   },
};
