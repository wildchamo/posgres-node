const { config } = require("../config/config.js");

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;
const HOST = config.dbHost;
const PORT = config.dbPort;

const URI = `postgresql://${USER}:${PASSWORD}@${HOST}:${PORT}/${DB_NAME}`;

module.exports = {
  development: {
    url: URI,
    dialect: "postgres"
  },
  production: {
    url: URI,
    dialect: "postgres"
  }
};
