// models/bootcamp.model.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

// Modelo de Bootcamp
const Bootcamp = sequelize.define('Bootcamp', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cue: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Bootcamp;
