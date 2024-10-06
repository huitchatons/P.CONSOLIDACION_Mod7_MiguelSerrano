// config/db.config.js

const { Sequelize } = require('sequelize');

// Configuración de la base de datos
const sequelize = new Sequelize('db_bootcamp', 'postgres', 'lolito', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;
