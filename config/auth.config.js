const CONFIG = require("./config");

module.exports = {
  secret: CONFIG.jwt_encryption,
};