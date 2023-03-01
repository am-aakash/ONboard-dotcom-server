module.exports = (sequelize, Sequelize) => {
    const CompanyAdmin = sequelize.define("company_admin", {
        id: {
            type: Sequelize.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
        },
        company_id: {
            type: Sequelize.UUID,
            allowNull: false,
        },
        admin_id: {
            type: Sequelize.UUID,
            allowNull: false,
        },
    })

    return CompanyAdmin
}
