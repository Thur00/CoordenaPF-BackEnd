// routes/users.js

// Importa o módulo "express" para criar um roteador
const express = require("express");

// Cria uma nova instância do roteador do Express
const router = express.Router();

// Importa o controller de usuários que contém a lógica para cada rota
const alunoController = require("../controllers/alunoController");

// Rota GET para obter todos os usuários
// Chama o método "getUsers" do controller quando a rota raiz "/users" for acessada
router.get("/", alunoController.getUsers);

// Rota GET para obter um usuário específico pelo ID
// Chama o método "getUser" do controller ao acessar "/users/:id", onde ":id" é o ID do usuário
router.get("/:rm", alunoController.getUser);

// Rota POST para criar um novo usuário
// Chama o método "createUser" do controller ao acessar "/users" com dados no corpo da requisição
router.post("/", alunoController.createUser);

// Rota PUT para atualizar um usuário existente pelo ID
// Chama o método "updateUser" do controller ao acessar "/users/:id" e fornecer novos dados no corpo da requisição
router.put("/:rm", alunoController.updateUser);

// Exporta o roteador para que ele possa ser usado na aplicação principal (app.js)
module.exports = router;