//clienteRoutes.js
const express = require('express');
const router = express.Router();
const aspectoController = require('../controllers/aspectoController');
// lembrando que a rota raiz tem clientes, definido no app.js
// Rota para obter todos os clientes
router.get('/', aspectoController.getAllAspectos);
// Rota para criar um novo aspecto
router.post('/', aspectoController.createAspecto);
// Rota para atualizar um aspecto existente
router.put('/:id', aspectoController.updateAspecto);
module.exports = router;