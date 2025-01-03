const sequelize = require('./../../config').sequelize;
const { DataTypes } = require('sequelize')

const Lot = sequelize.define('Lot', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            primaryKey: true,
            autoIncrement: true,
        },
        nomBoutique: {
            type: DataTypes.STRING,
        },
        livraison: {
            type: DataTypes.STRING,
        },
        maison: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.STRING,
        },
        physique: {
            type: DataTypes.STRING
        },
        gagnant_e: {
            type: DataTypes.STRING
        },
        gagnant_eZoneLivraison: {
            type: DataTypes.STRING
        }
    }
    ,{
        timestamps: false
    })

module.exports = Lot;
