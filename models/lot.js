const sequelize = require('../database')
const { DataTypes, Sequelize } = require('sequelize')

const Lot = sequelize.define('Lot', {
        id: {
            field: 'id',
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            primaryKey: true,
            autoIncrement: true,
        },
        nomBoutique: {
            field: 'nomBoutique',
            type: DataTypes.STRING,
        },
        livraison: {
            field: 'livraison',
            type: DataTypes.STRING,
        },
        maison: {
            field: 'maison',
            type: DataTypes.STRING,
        },
        description: {
            field: 'description',
            type: DataTypes.STRING,
        }
    }
    ,{
        timestamps: false
    })

module.exports = Lot;
