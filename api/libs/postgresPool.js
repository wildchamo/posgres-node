const { Pool } = require("pg");
const { config } = require("../config/config");

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;
const HOST = config.dbHost;
const PORT = config.dbPort;

const URI = `postgresql://${USER}:${PASSWORD}@${HOST}:${PORT}/${DB_NAME}`;

const pool = new Pool({
  connectionString: URI
});

module.exports = pool;
