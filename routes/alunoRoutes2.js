// routes/alunos.js

// Importa o módulo "express" para criar um roteador
const express = require("express");

// Cria uma nova instância do roteador do Express
const router = express.Router();

// Importa o controller de usuários que contém a lógica para cada rota
const alunoController = require("../controllers/alunoController2");

// Rota GET para obter todos os usuários
// Chama o método "getAlunos" do controller quando a rota raiz "/alunos" for acessada
router.get("/", alunoController.getAlunos);

// Rota GET para obter um usuário específico pelo ID
// Chama o método "getAluno" do controller ao acessar "/alunos/:rm", onde ":id" é o ID do usuário
router.get("/:rm", alunoController.getAluno);

// Rota POST para criar um novo usuário
// Chama o método "createAluno" do controller ao acessar "/alunos" com dados no corpo da requisição
router.post("/", alunoController.createAluno);

// Rota PUT para atualizar um usuário existente pelo ID
// Chama o método "updateAluno" do controller ao acessar "/alunos/:rm" e fornecer novos dados no corpo da requisição
router.put("/:rm", alunoController.updateAluno);

// Exporta o roteador para que ele possa ser usado na aplicação principal (app.js)
module.exports = router;