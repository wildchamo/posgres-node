const { Client } = require("pg");
const { config } = require("../config/config");

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;
const HOST = config.dbHost;
const PORT = config.dbPort;

async function getConnection() {
  const client = new Client({
    host: HOST,
    port: PORT,
    user: USER,
    password: PASSWORD,
    database: DB_NAME
  });

  await client.connect();
  return client;
}

module.exports = getConnection;