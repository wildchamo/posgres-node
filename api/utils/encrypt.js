const bcrypt = require("bcrypt");

async function encryptPassword(password) {
  const hash = await bcrypt.hash(password, 10);
  return hash;
}

async function verifyHash(comparePass, hash) {
  const isMatch = await bcrypt.compare(comparePass, hash);
  return isMatch;
}

module.exports = { encryptPassword, verifyHash };
