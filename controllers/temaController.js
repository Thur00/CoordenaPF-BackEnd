// controllers/temaController.js

// Importa o modelo de usuário que contém a lógica de interação com o banco de dados
const temaModel = require("../models/temaModel");

// Função para obter todos os temas
async function getAllTemas(req, res) {
  try {
    // Chama o método do modelo para obter todos os temas do banco de dados
    const temas = await temaModel.getAllTemas();

    // Retorna a lista de temas em formato JSON
    res.json(temas);
  } catch (err) {
    // Exibe o erro no console, se houver, e retorna uma resposta com status 500
    console.error(err.message);
    res.status(500).send("Erro ao obter os temas");
  }
}

// Função para criar um novo tema
async function createTema(req, res) {
  try {
    // Chama o método do modelo para criar o novo tema com os dados fornecidos
    await temaModel.createTema(req.body);

    // Retorna um status 201 (criado com sucesso)
    res.status(201).send("Tema criado com sucesso");
  } catch (err) {
    // Exibe o erro no console e retorna uma resposta com status 500
    console.error(err.message);
    res.status(500).send("Erro ao criar o tema");
  }
}

// Função para atualizar um tema existente
async function updateTema(req, res) {
  try {
    // Chama o método do modelo para atualizar o tema com base no ID e nos dados fornecidos
    await temaModel.updateTema(req.params.id, req.body);

    // Retorna uma mensagem de sucesso após a atualização
    res.send("Tema atualizado com sucesso");
  } catch (err) {
    // Exibe o erro no console e retorna uma resposta com status 500
    console.error(err.message);
    res.status(500).send("Erro ao atualizar o tema");
  }
}

// Exporta as funções do controller para serem usadas nas rotas da aplicação
module.exports = {
  getAllTemas,
  createTema,
  updateTema,
};
