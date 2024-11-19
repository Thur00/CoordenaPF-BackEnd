// controllers/aspectoController.js

// Importa o modelo de usuário que contém a lógica de interação com o banco de dados
const OcorrenciasModel = require("../models/ocorrenciaModel");

// Função para obter todos os usuários
async function getAllOcorrencias(req, res) {
  try {
    // Chama o método do modelo para obter todos os usuários do banco de dados
    const Ocorrencias = await OcorrenciasModel.getAllOcorrencias();

    // Retorna a lista de usuários em formato JSON
    res.json(Ocorrencias);
  } catch (err) {
    // Exibe o erro no console, se houver, e retorna uma resposta com status 500
    console.error(err.message);
    res.status(500).send("Erro ao obter as ocorrências");
  }
}

// Função para obter um usuário específico pelo ID
async function getOcorrenciaById(req, res) {
  try {
    // Chama o método do modelo para obter o usuário com base no ID fornecido
    const ocorrencia = await OcorrenciasModel.getOcorrenciaById(req.params.id);

    // Se o usuário não for encontrado, retorna um status 404 (não encontrado)
    if (!ocorrencia) {
      res.status(404).send("Ocorrência não encontrada");
    } else {
      // Se o usuário for encontrado, retorna os dados em formato JSON
      res.json(ocorrencia);
    }
  } catch (err) {
    // Exibe o erro no console e retorna uma resposta com status 500
    console.error(err.message);
    res.status(500).send("Erro ao obter o ocorrência");
  }
}

// Função para criar um novo usuário
async function createOcorrencias(req, res) {
  try {
    // Chama o método do modelo para criar o novo usuário com os dados fornecidos
    await OcorrenciasModel.createOcorrencias(req.body);

    // Retorna um status 201 (criado com sucesso)
    res.status(201).send("Ocorrência criada com sucesso");
  } catch (err) {
    // Exibe o erro no console e retorna uma resposta com status 500
    console.error(err.message);
    res.status(500).send("Erro ao criar a ocorrência");
  }
}

// Função para atualizar um usuário existente
async function updateOcorrencias(req, res) {
  try {
    // Chama o método do modelo para atualizar o usuário com base no ID e nos dados fornecidos
    await OcorrenciasModel.updateOcorrencias(req.params.id, req.body);

    // Retorna uma mensagem de sucesso após a atualização
    res.send("Ocorrência atualizada com sucesso");
  } catch (err) {
    // Exibe o erro no console e retorna uma resposta com status 500
    console.error(err.message);
    res.status(500).send("Erro ao atualizar as ocorrências");
  }
}

async function updateStatus(req, res) {
  try {
    // Chama o método do modelo para atualizar o usuário com base no ID e nos dados fornecidos
    await OcorrenciasModel.updateStatus(req.params.id, req.body);

    // Retorna uma mensagem de sucesso após a atualização
    res.send("Status atualizada com sucesso");
  } catch (err) {
    // Exibe o erro no console e retorna uma resposta com status 500
    console.error(err.message);
    res.status(500).send("Erro ao atualizar status");
  }
}

// Exporta as funções do controller para serem usadas nas rotas da aplicação
module.exports = {
  getAllOcorrencias,
  getOcorrenciaById,
  createOcorrencias,
  updateOcorrencias,
  updateStatus
};
