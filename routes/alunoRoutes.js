//clienteRoutes.js
const express = require('express');
const router = express.Router();
const alunoController = require('../controllers/alunoController');
// lembrando que a rota raiz tem clientes, definido no app.js
// Rota para obter todos os clientes
router.get('/', alunoController.getAllAlunos);
// Rota para obter um único cliente pelo ID
router.get('/:id', alunoController.getAlunoByTurma);
// Rota para criar um novo cliente
router.post('/', alunoController.createAluno);
// Rota para atualizar um cliente existente
router.put('/:id', alunoController.updateAluno);
module.exports = router;