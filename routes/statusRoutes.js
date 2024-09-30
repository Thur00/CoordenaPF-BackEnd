// routes/status.js

// Importa o módulo "express" para criar um roteador
const express = require("express");

// Cria uma nova instância do roteador do Express
const router = express.Router();

// Importa o controller de usuários que contém a lógica para cada rota
const statusController = require("../controllers/statusController");

// Rota GET para obter todos os usuários
// Chama o método "getstatus" do controller quando a rota raiz "/status" for acessada
router.get("/", statusController.getAllStatus);

// Rota POST para criar um novo usuário
// Chama o método "createStatus" do controller ao acessar "/status" com dados no corpo da requisição
router.post("/", statusController.createStatus);

// Rota PUT para atualizar um usuário existente pelo ID
// Chama o método "updateStatus" do controller ao acessar "/status/:id" e fornecer novos dados no corpo da requisição
router.put("/:id", statusController.updateStatus);


// Exporta o roteador para que ele possa ser usado na aplicação principal (app.js)
module.exports = router;