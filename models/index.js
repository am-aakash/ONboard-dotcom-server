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

// Employee table
db.employee = require("./employee/employee.model")(sequelize, Sequelize)
db.devices = require("./employee/devices.model")(sequelize, Sequelize)
db.devices.belongsTo(db.employee, {
  foreignKey: 'employee_id',
})
db.status_history = require("./employee/status_history.model")(sequelize, Sequelize)
db.status_history.belongsTo(db.employee, {
  foreignKey: 'employee_id',
})

// Company tables
db.company = require("./company/company.model")(sequelize, Sequelize)
db.company_photos = require("./company/company_photos.model")(sequelize, Sequelize)
db.company_photos.belongsTo(db.company, {
  foreignKey: 'company_id',
})

// // Company Admin M2M relation
// db.company_admin = require("./company/company_admin.model")(sequelize, Sequelize)
// db.company_admin.belongsTo(db.user, {
//   foreignKey: 'admin_id',
// })
// db.company_admin.belongsTo(db.company, {
//   foreignKey: 'company_id',
// })

db.employee.belongsTo(db.company, {
  foreignKey: 'company_id',
})


module.exports = db
