const { Strategy } = require("passport-local");
const boom = require("@hapi/boom");

const { verifyHash } = require("../../encrypt");
const AuthService = require("../../../services/auth.service");
const service = new AuthService();

const LocalStrategy = new Strategy(
  {
    usernameField: "email"
  },
  async (email, password, done) => {
    try {
      const user = await service.createUser({ email, password });
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  }
);

module.exports = LocalStrategy;
