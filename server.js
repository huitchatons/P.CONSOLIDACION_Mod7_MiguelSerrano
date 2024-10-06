// server.js
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/db.config');
const { User, Bootcamp } = require('./models');  // Importamos los modelos desde index.js
const userRoutes = require('./controllers/user.controller');
const bootcampRoutes = require('./controllers/bootcamp.controller');

const app = express();
app.use(bodyParser.json());

// Rutas de usuarios
app.post('/users', userRoutes.createUser);
app.get('/users/:id', userRoutes.findUserById);
app.get('/users', userRoutes.findAll);
app.put('/users/:id', userRoutes.updateUserById);
app.delete('/users/:id', userRoutes.deleteUserById);

// Rutas de bootcamp
app.post('/bootcamps', bootcampRoutes.createBootcamp);
app.post('/bootcamps/:bootcampId/users/:userId', bootcampRoutes.addUser);
app.get('/bootcamps/:id', bootcampRoutes.findById);
app.get('/bootcamps', bootcampRoutes.findAllBootcamps);

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);  // Logea el error para depuración
  res.status(500).send('Algo salió mal!');  // Respuesta genérica en caso de error
});

// Iniciar la conexión y el servidor
sequelize.sync({ force: true }).then(async () => {
  // Crear usuarios
  const users = await Promise.all([
    User.create({ firstName: 'Mateo', lastName: 'Díaz', email: 'mateo.diaz@correo.com' }),
    User.create({ firstName: 'Santiago', lastName: 'Mejías', email: 'santiago.mejias@correo.com' }),
    User.create({ firstName: 'Lucas', lastName: 'Rojas', email: 'lucas.rojas@correo.com' }),
    User.create({ firstName: 'Facundo', lastName: 'Fernández', email: 'facundo.fernandez@correo.com' }),
  ]);

  // Crear bootcamps
  const bootcamps = await Promise.all([
    Bootcamp.create({
      title: 'Introduciendo El Bootcamp De React',
      cue: 10,
      description: 'React es la librería más usada en JavaScript para el desarrollo de interfaces.',
    }),
    Bootcamp.create({
      title: 'Bootcamp Desarrollo Web Full Stack',
      cue: 12,
      description: 'Crearás aplicaciones web utilizando las tecnologías y lenguajes más actuales y populares.',
    }),
    Bootcamp.create({
      title: 'Bootcamp de Python',
      cue: 8,
      description: 'Aprenderás a crear aplicaciones en Python desde cero.',
    }),
  ]);

  app.listen(3000, () => {
    console.log('Servidor iniciado en el puerto 3000');
  });
}).catch(error => console.log(error));
