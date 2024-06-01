require("dotenv").config();

const config = {
  env: process.env.NODE_ENV || "dev",
  port: process.env.PORT || 3000,
  dbUser: process.env.USER,
  dbPassword: process.env.PASSWORD,
  dbHost: process.env.HOST,
  dbName: process.env.DATABASE,
  dbPort: process.env.PORT,
  jwtSecret: process.env.JWT_SECRET,
  email: process.env.EMAIL,
  passwordEmail: process.env.PASSWORD_EMAIL
};

module.exports = { config };