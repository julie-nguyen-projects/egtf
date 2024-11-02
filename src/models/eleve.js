const sequelize = require('./../../config').sequelize;
const { DataTypes } = require('sequelize')

const Eleve = sequelize.define('Eleve', {
        pseudoDiscord: {
            type: DataTypes.STRING,
        },
        maison: {
            type: DataTypes.STRING,
        },
        zoneLivraison: {
            type: DataTypes.STRING
        },
        idDiscord: {
            type: DataTypes.STRING,
        }
    }
    ,{
        timestamps: false
    })

module.exports = Eleve;
