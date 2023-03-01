module.exports = (sequelize, Sequelize) => {
    const StatusHistory = sequelize.define("status_history", {
        id: {
            type: Sequelize.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
        },
        date: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        employee_id: {
            type: Sequelize.UUID,
            allowNull: false,
        },
        status: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        status_subheading: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    })

    return StatusHistory
}