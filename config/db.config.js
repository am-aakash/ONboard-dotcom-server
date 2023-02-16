const CONFIG = require("./config");

module.exports = {
  HOST: CONFIG.db_host,
  USER: CONFIG.db_user,
  PASSWORD: CONFIG.db_password,
  DB: CONFIG.db_name,
  dialect: CONFIG.db_dialect,
  port: CONFIG.db_port,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
