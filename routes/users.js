// routes/users.js

// Importa o módulo "express" para criar um roteador
const express = require("express");

// Cria uma nova instância do roteador do Express
const router = express.Router();

// Importa o controller de usuários que contém a lógica para cada rota
const usersController = require("../controllers/usersController");

// Rota GET para obter todos os usuários
// Chama o método "getUsers" do controller quando a rota raiz "/users" for acessada
router.get("/", usersController.getUsers);

// Rota GET para obter um usuário específico pelo ID
// Chama o método "getUser" do controller ao acessar "/users/:id", onde ":id" é o ID do usuário
router.get("/:id", usersController.getUser);

// Rota POST para criar um novo usuário
// Chama o método "createUser" do controller ao acessar "/users" com dados no corpo da requisição
router.post("/", usersController.createUser);

// Rota PUT para atualizar um usuário existente pelo ID
// Chama o método "updateUser" do controller ao acessar "/users/:id" e fornecer novos dados no corpo da requisição
router.put("/:id", usersController.updateUser);

// Rota DELETE para deletar um usuário específico pelo ID
// Chama o método "deleteUser" do controller ao acessar "/users/:id"
router.delete("/:id", usersController.deleteUser);

// Exporta o roteador para que ele possa ser usado na aplicação principal (app.js)
module.exports = router;