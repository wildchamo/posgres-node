const { Strategy } = require("passport-local");
const UserService = require("../../../services/user.service");
const boom = require("@hapi/boom");

const { verifyHash } = require("../../encrypt");

const service = new UserService();
const LocalStrategy = new Strategy(
  {
    usernameField: "email",
  },
  async (email, password, done) => {
    try {
      const user = await service.findByEmail(email);
      if (!user) {
        done(boom.unauthorized("User not found"), false);
      }
      const isMatch = await verifyHash(password, user.password);
      if (!isMatch) {
        done(boom.unauthorized("Password doesn't match"), false);
      }
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  }
);

module.exports = LocalStrategy;
