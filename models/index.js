const Sequelize = require("sequelize")
const config = require("../config/db.config")

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  port: config.port,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
})

const db = {}
db.sequelize = sequelize

// User table
db.user = require("./user/user.model")(sequelize, Sequelize)

// Order table
db.employee = require("./employee/employee.model")(sequelize, Sequelize)

module.exports = db
