const sequelize = require('../../database')
const { DataTypes, Sequelize } = require('sequelize')

const Eleve = sequelize.define('Eleve', {
        pseudoDiscord: {
            type: DataTypes.STRING,
        },
        maisonDiscord: {
            type: DataTypes.STRING,
        },
        idDiscord: {
            type: DataTypes.STRING,
        },
        pseudoForms: {
            type: DataTypes.STRING,
        },
        maisonForms: {
            type: DataTypes.STRING,
        }
    }
    ,{
        timestamps: false
    })

module.exports = Eleve;
