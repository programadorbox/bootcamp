//server.js 
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const models = require('./models/index');
const db = require('./models');
const userController = require('./app/controllers/user.controller');
const bootcampController = require('./app/controllers/bootcamp.controller');
app.use(cors());
app.use(bodyParser.json());

// Rutas a tus controladores
const userRoutes = require('./app/routes/user.routes');  
const bootcampRoutes = require('./app/routes/bootcamp.routes');
app.use('/users', userRoutes);
app.use('/bootcamps', bootcampRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});


