// controllers/bootcamp.controller.js
const Bootcamp = require('../models/bootcamp.model');
const User = require('../models/user.model');  // Importamos el modelo User

// Crear y guardar un nuevo Bootcamp
const createBootcamp = async (req, res) => {
  const { title, cue, description } = req.body;
  try {
    const bootcamp = await Bootcamp.create({ title, cue, description });
    res.json({ message: 'Creado el bootcamp:', bootcamp });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Agregar un usuario al Bootcamp
const addUser = async (req, res) => {
  const { bootcampId, userId } = req.params;
  try {
    const bootcamp = await Bootcamp.findByPk(bootcampId);
    const user = await User.findByPk(userId);
    await bootcamp.addUser(user);
    res.json({ message: `Agregado el usuario id=${userId} al bootcamp con id=${bootcampId}` });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener el Bootcamp por id, incluyendo los usuarios
const findById = async (req, res) => {
  const { id } = req.params;
  try {
    const bootcamp = await Bootcamp.findByPk(id, { include: User });
    res.json(bootcamp);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener todos los Bootcamp con sus usuarios
const findAllBootcamps = async (req, res) => {
  try {
    const bootcamps = await Bootcamp.findAll({ include: User });
    res.json(bootcamps);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createBootcamp, addUser, findById, findAllBootcamps };
