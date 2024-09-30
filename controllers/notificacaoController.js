// controllers/aspectoController.js

// Importa o modelo de usuário que contém a lógica de interação com o banco de dados
const NotificacaoModel = require("../models/notificacaoModel");

// Função para obter todos os usuários
async function getNotificacao(req, res) {
  try {
    // Chama o método do modelo para obter todos os usuários do banco de dados
    const Notificacao = await NotificacaoModel.getAllNotificacao();

    // Retorna a lista de usuários em formato JSON
    res.json(Notificacao);
  } catch (err) {
    // Exibe o erro no console, se houver, e retorna uma resposta com status 500
    console.error(err.message);
    res.status(500).send("Erro ao obter os Notificacao");
  }
}

// Função para criar um novo usuário
async function createNotificacao(req, res) {
  try {
    // Chama o método do modelo para criar o novo usuário com os dados fornecidos
    await NotificacaoModel.createNotificacao(req.body);

    // Retorna um status 201 (criado com sucesso)
    res.status(201).send("Notificacao criado com sucesso");
  } catch (err) {
    // Exibe o erro no console e retorna uma resposta com status 500
    console.error(err.message);
    res.status(500).send("Erro ao criar o notificacao");
  }
}

// Função para atualizar um usuário existente
async function updateNotificacao(req, res) {
  try {
    // Chama o método do modelo para atualizar o usuário com base no ID e nos dados fornecidos
    await NotificacaoModel.updateNotificacao(req.params.id, req.body);

    // Retorna uma mensagem de sucesso após a atualização
    res.send("Notificacao atualizado com sucesso");
  } catch (err) {
    // Exibe o erro no console e retorna uma resposta com status 500
    console.error(err.message);
    res.status(500).send("Erro ao atualizar o Notificacao");
  }
}

// Exporta as funções do controller para serem usadas nas rotas da aplicação
module.exports = {
  getNotificacao,
  createNotificacao,
  updateNotificacao,
};
