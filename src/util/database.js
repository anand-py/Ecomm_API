/* This code is setting up a connection to a MySQL database using the Sequelize library in JavaScript. */
const Sequelize = require('sequelize');

const sequelize = new Sequelize('ecommerce', 'root', 'root', {
  dialect: 'mysql',
  host: 'localhost',
});

module.exports = sequelize;