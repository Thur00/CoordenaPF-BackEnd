//notificacaoRoutes.js
const express = require('express');
const router = express.Router();
const notificacaoController = require('../controllers/notificacaoController');
// lembrando que a rota raiz tem notificacaos, definido no app.js
// Rota para obter todos os notificacaos
router.get('/', notificacaoController.getAllNotificacao);

// Rota para criar um novo notificacao
router.post('/', notificacaoController.createNotificacao);

// Rota para atualizar um notificacao existente
router.put('/:id', notificacaoController.updateNotificacao);

module.exports = router;