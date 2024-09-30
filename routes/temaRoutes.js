// routes/temas.js

// Importa o módulo "express" para criar um roteador
const express = require("express");

// Cria uma nova instância do roteador do Express
const router = express.Router();

// Importa o controller de temas que contém a lógica para cada rota
const temaController = require("../controllers/temaController");

// Rota GET para obter todos os temas
// Chama o método "getTemas" do controller quando a rota raiz "/temas" for acessada
router.get("/", temaController.getAllTemas);

// Rota POST para criar um novo tema
// Chama o método "createTema" do controller ao acessar "/tema" com dados no corpo da requisição
router.post("/", temaController.createTema);

// Rota PUT para atualizar um tema existente pelo ID
// Chama o método "updateTema" do controller ao acessar "/tema/:id" e fornecer novos dados no corpo da requisição
router.put("/:id", temaController.updateTema);

// Exporta o roteador para que ele possa ser usado na aplicação principal (app.js)
module.exports = router;