module.exports = (sequelize, Sequelize) => {
    const Devices = sequelize.define("devices", {
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
        employee_id: {
            type: Sequelize.UUID,
            allowNull: false,
        },
        photo: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        recieved: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
        cancelled: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
    })

    return Devices
}
