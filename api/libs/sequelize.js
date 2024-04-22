const { Sequelize } = require("sequelize");
const { config } = require("../config/config");
const setUpModels = require("../db/models/");

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;
const HOST = config.dbHost;
const PORT = config.dbPort;

const URI = `postgresql://${USER}:${PASSWORD}@${HOST}:${PORT}/${DB_NAME}`;

const sequelize = new Sequelize(URI, {
  dialect: "postgres",
  logging: console.log
});

setUpModels(sequelize);

sequelize.sync();

module.exports = sequelize;
