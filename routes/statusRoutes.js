//clienteRoutes.js
const express = require('express');
const router = express.Router();
const statusController = require('../controllers/statusController');
// lembrando que a rota raiz tem clientes, definido no app.js
// Rota para obter todos os clientes
router.get('/', statusController.getAllStatus);
// Rota para criar um novo cliente
router.post('/', statusController.createStatus);
// Rota para atualizar um cliente existente
router.put('/:id', statusController.updateStatus);

module.exports = router;