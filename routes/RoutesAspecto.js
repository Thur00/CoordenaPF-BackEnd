//clienteRoutes.js
const express = require('express');
const router = express.Router();
const ControllerAspecto = require('../controllers/ControllerAspecto');
// lembrando que a rota raiz tem clientes, definido no app.js
// Rota para obter todos os clientes
router.get('/', aspectoController.getAllAspecto);
// Rota para obter um único aspecto pelo ID
router.get('/:id', aspectoController.getAspectoById);
// Rota para criar um novo aspecto
router.post('/', aspectoController.createAspecto);
// Rota para atualizar um aspecto existente
router.put('/:id', ControllerAspecto.updateAspecto);