//clienteRoutes.js
const express = require('express');
const router = express.Router();
const encaminhamentoController = require('../controllers/encaminhamentoController');
// lembrando que a rota raiz tem clientes, definido no app.js
// Rota para obter todos os clientes
router.get('/', encaminhamentoController.getAllEncaminhamento);

// Rota para criar um novo cliente
router.post('/', encaminhamentoController.createEncaminhamento);

// Rota para atualizar um cliente existente
router.put('/:id', encaminhamentoController.updateEncaminhamento);

module.exports = router;