// routes/urgencia.js

// Importa o módulo "express" para criar um roteador
const express = require("express");

// Cria uma nova instância do roteador do Express
const router = express.Router();

// Importa o controller de usuários que contém a lógica para cada rota
const urgenciasController = require("../controllers/urgenciasController");

// Rota GET para obter todos os usuários
// Chama o método "getUsers" do controller quando a rota raiz "/users" for acessada
router.get("/", urgenciasController.getUrgencias);

// Rota POST para criar um novo usuário
// Chama o método "createUser" do controller ao acessar "/users" com dados no corpo da requisição
router.post("/", urgenciasController.createUrgencia);

// Rota PUT para atualizar um usuário existente pelo ID
// Chama o método "updateUser" do controller ao acessar "/users/:id" e fornecer novos dados no corpo da requisição
router.put("/:id", urgenciasController.updateUrgencia);

// Exporta o roteador para que ele possa ser usado na aplicação principal (app.js)
module.exports = router;