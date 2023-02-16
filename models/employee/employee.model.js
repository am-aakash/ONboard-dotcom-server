var DataTypes = require("sequelize/lib/data-types")

module.exports = (sequelize, Sequelize) => {
  const Employee = sequelize.define("employee", {
    id: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    role: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    date_of_joining: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    phone: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    employee_id: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    company_id: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    team: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    status: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    sub_total: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  })

  return Employee
}
