var DataTypes = require("sequelize/lib/data-types");

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    id: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    type: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    company_id: {
      type: Sequelize.STRING,
      allowNull: true,
    }
  });

  return User;
};
