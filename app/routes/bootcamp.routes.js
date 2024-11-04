// bootcamp.routes.js 
const express = require('express');
const router = express.Router();
const bootcampController = require('../controllers/bootcamp.controller');

// Otras rutas...
router.post('/', bootcampController.createBootcamp);
router.get('/', bootcampController.getAllBootcamps);
router.get('/:id', bootcampController.getBootcampById);
router.put('/:id', bootcampController.updateBootcamp); 
router.delete('/:id', bootcampController.deleteBootcamp);
router.post('/adduser', bootcampController.addUserToBootcamp); 
module.exports = router;
