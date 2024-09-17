//urgenciaRoutes.js
const express = require('express');
const router = express.Router();
const urgenciaController = require('../controllers/urgenciaController');
// lembrando que a rota raiz tem urgencias, definido no app.js
// Rota para obter todos os urgencias
router.get('/', urgenciaController.getAllUrgencias);
// Rota para criar um novo urgencia
router.post('/', urgenciaController.createUrgencia);
// Rota para atualizar um urgencia existente
router.put('/:id', urgenciaController.updateUrgencia);
module.exports = router;