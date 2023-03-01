module.exports = (sequelize, Sequelize) => {
    const CompanyPhotos = sequelize.define("company_photos", {
        id: {
            type: Sequelize.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
        },
        company_id: {
            type: Sequelize.UUID,
            allowNull: true,
        },
        photo_url: {
            type: Sequelize.STRING,
            allowNull: true,
        },
    })

    return CompanyPhotos
}
