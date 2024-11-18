// routes/usuarios.js

// Importa o módulo "express" para criar um roteador
const express = require("express");

// Cria uma nova instância do roteador do Express
const router = express.Router();

// Importa o controller de usuários que contém a lógica para cada rota
const loginController = require("../controllers/loginController");

// Rota POST para obter todos os usuários
// Chama o método "validaLogin" do controller quando a rota raiz "/login" for acessada
router.get("/", loginController.validaLogin);


// Exporta o roteador para que ele possa ser usado na aplicação principal (app.js)
module.exports = router;