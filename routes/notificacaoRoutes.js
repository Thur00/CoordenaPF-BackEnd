// routes/aspectos.js

// Importa o módulo "express" para criar um roteador
const express = require("express");

// Cria uma nova instância do roteador do Express
const router = express.Router();

// Importa o controller de usuários que contém a lógica para cada rota
const AspectosController = require("../controllers/notificacaoController");

// Rota GET para obter todos os usuários
// Chama o método "getAspectos" do controller quando a rota raiz "/aspectos" for acessada
router.get("/", NotificacaoController.getNotificacao);

// Rota POST para criar um novo usuário
// Chama o método "createAspecto" do controller ao acessar "/aspectos" com dados no corpo da requisição
router.post("/", NotificacaoController.createNotificacao);

// Rota PUT para atualizar um usuário existente pelo ID
// Chama o método "updateAspecto" do controller ao acessar "/aspectos/:id" e fornecer novos dados no corpo da requisição
router.put("/:id", NotificacaoController.updateNotificacao);

// Exporta o roteador para que ele possa ser usado na aplicação principal (app.js)
module.exports = router;