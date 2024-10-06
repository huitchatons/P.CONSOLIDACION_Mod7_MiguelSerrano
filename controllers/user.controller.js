// controllers/user.controller.js
const User = require('../models/user.model');
const Bootcamp = require('../models/bootcamp.model');

// Crear y guardar usuarios
const createUser = async (req, res) => {
  const { firstName, lastName, email } = req.body;
  try {
    const user = await User.create({ firstName, lastName, email });
    res.json({ message: 'Se ha creado el usuario:', user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener un usuario por id, incluyendo sus Bootcamps
const findUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id, { include: Bootcamp });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener todos los usuarios, incluyendo sus Bootcamps
const findAll = async (req, res) => {
  try {
    const users = await User.findAll({ include: Bootcamp });
    res.json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Actualizar usuario por id
const updateUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    const updatedUser = await user.update(req.body);
    res.json({ message: 'Usuario actualizado', updatedUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar usuario por id
const deleteUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.destroy({ where: { id } });
    res.json({ message: 'Usuario eliminado', user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createUser, findUserById, findAll, updateUserById, deleteUserById };
