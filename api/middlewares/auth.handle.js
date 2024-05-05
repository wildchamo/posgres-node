const boom = require("@hapi/boom");

function checkAPIkey(req, res, next) {
  const apiKey = req.headers["api"];
  if (apiKey === "1234") {
    next();
  } else {
    next(boom.unauthorized());
  }
}

module.exports = checkAPIkey;
