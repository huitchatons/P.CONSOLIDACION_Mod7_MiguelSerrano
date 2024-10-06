// models/index.js
const Bootcamp = require('./bootcamp.model');
const User = require('./user.model');

// Definir las relaciones
Bootcamp.belongsToMany(User, { through: 'user_bootcamp' });
User.belongsToMany(Bootcamp, { through: 'user_bootcamp' });

module.exports = { Bootcamp, User };
