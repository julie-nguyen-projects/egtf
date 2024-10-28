const sequelize = require('../database')
const { DataTypes, Sequelize } = require('sequelize')

const Lot = sequelize.define('Lot', {
        id: {
            field: 'Lot_ID',
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            primaryKey: true,
            autoIncrement: true,
        },
        nomBoutique: {
            field: 'NomBoutique',
            type: DataTypes.STRING,
            allowNull: false
        },
        livraison: {
            field: 'Livraison',
            type: DataTypes.STRING,
            allowNull: false
        },
        maison: {
            field: 'Maison',
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            field: 'Description',
            type: DataTypes.STRING,
            allowNull: false
        }
    }
    ,{
        timestamps: false
    })

module.exports = Lot;
