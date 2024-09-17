//clienteRoutes.js
const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/exemploController');
// lembrando que a rota raiz tem clientes, definido no app.js
// Rota para obter todos os clientes
router.get('/', clienteController.getAllClientes);
// Rota para obter um único cliente pelo ID
router.get('/:id', clienteController.getClienteById);
// Rota para criar um novo cliente
router.post('/', clienteController.createCliente);
// Rota para atualizar um cliente existente
router.put('/:id', clienteController.updateCliente);
// Rota para deletar um cliente
router.delete('/:id', clienteController.deleteCliente);
module.exports = router;