// app.js
const express = require('express');
const middleware = require('./middleware');

const app = express();

// ... otras configuraciones

// Aplicamos todos los middlewares
middleware(app);

// ... rutas y demás