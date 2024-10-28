const path = require('path');
const { Sequelize } = require('sequelize');

/** DATABASE **/
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, "data", "appTest.db")
});

module.exports = sequelize;
