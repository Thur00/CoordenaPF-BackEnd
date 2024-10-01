// routes/ocorrencias.js

// Importa o módulo "express" para criar um roteador
const express = require("express");

// Cria uma nova instância do roteador do Express
const router = express.Router();

// Importa o controller de usuários que contém a lógica para cada rota
const ocorrenciaController = require("../controllers/ocorrenciaController");

// Rota GET para obter todos os usuários
// Chama o método "getocorrencias" do controller quando a rota raiz "/ocorrencias" for acessada
router.get("/", ocorrenciaController.getAllOcorrencias);

// Rota POST para criar um novo usuário
// Chama o método "createocorrencias" do controller ao acessar "/ocorrencias" com dados no corpo da requisição
router.post("/", ocorrenciaController.createOcorrencias);

// Rota PUT para atualizar um usuário existente pelo ID
// Chama o método "updateocorrencias" do controller ao acessar "/ocorrencias/:id" e fornecer novos dados no corpo da requisição
router.put("/:id", ocorrenciaController.updateOcorrencias);


// Exporta o roteador para que ele possa ser usado na aplicação principal (app.js)
module.exports = router;