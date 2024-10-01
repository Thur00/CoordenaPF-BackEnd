// controllers/urgenciasController.js

// Importa o modelo de usuário que contém a lógica de interação com o banco de dados
const urgenciaModel = require("../models/urgenciaModel");

// Função para obter todos os usuários
async function getAllUrgencias(req, res) {
  try {
    // Chama o método do modelo para obter todos os usuários do banco de dados
    const urgencias = await urgenciaModel.getAllUrgencias();

    // Retorna a lista de usuários em formato JSON
    res.json(urgencias);
  } catch (err) {
    // Exibe o erro no console, se houver, e retorna uma resposta com status 500
    console.error(err.message);
    res.status(500).send("Erro ao obter as urgências");
  }
}

// Função para criar um novo usuário
async function createUrgencia(req, res) {
  try {
    // Chama o método do modelo para criar o novo usuário com os dados fornecidos
    await urgenciaModel.createUrgencia(req.body);

    // Retorna um status 201 (criado com sucesso)
    res.status(201).send("Urgência criada com sucesso");
  } catch (err) {
    // Exibe o erro no console e retorna uma resposta com status 500
    console.error(err.message);
    res.status(500).send("Erro ao criar a urgência");
  }
}

// Função para atualizar um usuário existente
async function updateUrgencia(req, res) {
  try {
    // Chama o método do modelo para atualizar o usuário com base no ID e nos dados fornecidos
    await urgenciaModel.updateUrgencia(req.params.id, req.body);

    // Retorna uma mensagem de sucesso após a atualização
    res.send("Urgência atualizada com sucesso");
  } catch (err) {
    // Exibe o erro no console e retorna uma resposta com status 500
    console.error(err.message);
    res.status(500).send("Erro ao atualizar a urgência");
  }
}

// Exporta as funções do controller para serem usadas nas rotas da aplicação
module.exports = {
  getAllUrgencias,
  createUrgencia,
  updateUrgencia,
};
