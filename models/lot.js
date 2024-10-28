const sequelize = require('../database')
const { DataTypes, Sequelize } = require('sequelize')

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
            type: DataTypes.BOOLEAN
        },
        gagnant_e: {
            type: DataTypes.STRING
        }
    }
    ,{
        timestamps: false
    })

module.exports = Lot;
