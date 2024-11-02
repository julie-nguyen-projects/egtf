const { Sequelize } = require('sequelize');
require('dotenv').config(); // Charge les variables d'environnement

const config = {
    development: {
        port: process.env.PORT,
        dialect: 'mysql',
        host: process.env.DATABASE_HOST,
        database: process.env.DATABASE_NAME,
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
    },
    production: {
        port: process.env.O2SWITCH_PORT,
        dialect: 'mysql',
        host: process.env.O2SWITCH_DB_HOST,
        database: process.env.O2SWITCH_DB_NAME,
        username: process.env.O2SWITCH_DB_USER,
        password: process.env.O2SWITCH_DB_PASSWORD,
    }
};

// Utiliser les variables directement
const environment = process.env.NODE_ENV || 'development';
const envConfig = config[environment];

// Construire l'URL de connexion
const databaseUrl = `mysql://${envConfig.username}:${envConfig.password}@${envConfig.host}/${envConfig.database}`;

const sequelize = new Sequelize(databaseUrl, {
    logging: console.log // Affiche les logs Sequelize dans la console
});

module.exports = {
    config,
    sequelize
};
