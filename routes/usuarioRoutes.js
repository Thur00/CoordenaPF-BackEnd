// routes/usuarios.js

// Importa o módulo "express" para criar um roteador
const express = require("express");

// Cria uma nova instância do roteador do Express
const router = express.Router();

// Importa o controller de usuários que contém a lógica para cada rota
const usuarioController = require("../controllers/usuarioController");

// Rota GET para obter todos os usuários
// Chama o método "getusuario" do controller quando a rota raiz "/usuario" for acessada
router.get("/", usuarioController.getAllUsuarios);

// Rota POST para criar um novo usuário
// Chama o método "createusuario" do controller ao acessar "/usuario" com dados no corpo da requisição
router.post("/", usuarioController.createUsuario);

// Rota PUT para atualizar um usuário existente pelo ID
// Chama o método "updateusuario" do controller ao acessar "/usuario/:id" e fornecer novos dados no corpo da requisição
router.put("/:id", usuarioController.updateUsuario);


// Exporta o roteador para que ele possa ser usado na aplicação principal (app.js)
module.exports = router;