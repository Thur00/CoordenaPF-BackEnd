// controllers/encaminhamentoController.js

// Importa o modelo de usuário que contém a lógica de interação com o banco de dados
const EncaminhamentoModel = require("../models/encaminhamentoModel");

// Função para obter todos os usuários
async function getAllEncaminhamentos(req, res) {
  try {
    // Chama o método do modelo para obter todos os usuários do banco de dados
    const encaminhamento = await EncaminhamentoModel.getAllEncaminhamentos();

    // Retorna a lista de usuários em formato JSON
    res.json(encaminhamento);
  } catch (err) {
    // Exibe o erro no console, se houver, e retorna uma resposta com status 500
    console.error(err.message);
    res.status(500).send("Erro ao obter os encaminhamento");
  }
}

// Função para criar um novo usuário
async function createEncaminhamento(req, res) {
  // Extrai as informações do novo usuário a partir do corpo da requisição (name, email, age)
  try {
    // Chama o método do modelo para criar o novo usuário com os dados fornecidos
    await EncaminhamentoModel.createEncaminhamento(req.body);

    // Retorna um status 201 (criado com sucesso)
    res.status(201).send("Encaminhamento criado com sucesso");
  } catch (err) {
    // Exibe o erro no console e retorna uma resposta com status 500
    console.error(err.message);
    res.status(500).send("Erro ao criar o encaminhamento");
  }
}

// Função para atualizar um usuário existente
async function updateEncaminhamento(req, res) {
  try {
    // Chama o método do modelo para atualizar o usuário com base no ID e nos dados fornecidos
    await EncaminhamentoModel.updateEncaminhamento(req.params.id, req.body);

    // Retorna uma mensagem de sucesso após a atualização
    res.send("Encaminhamento atualizado com sucesso");
  } catch (err) {
    // Exibe o erro no console e retorna uma resposta com status 500
    console.error(err.message);
    res.status(500).send("Erro ao atualizar o encaminhamento");
  }
}

// Exporta as funções do controller para serem usadas nas rotas da aplicação
module.exports = {
  getAllEncaminhamentos,
  createEncaminhamento,
  updateEncaminhamento,
};
