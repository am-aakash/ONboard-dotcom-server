module.exports = (sequelize, Sequelize) => {
    const Company = sequelize.define("company", {
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
        logo: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        label: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        about: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        website: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        linkedin: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        twitter: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        blog: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        fb: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        instagram: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        location: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        size: {
            type: Sequelize.STRING,
            allowNull: true,
        },
    })

    return Company
}
