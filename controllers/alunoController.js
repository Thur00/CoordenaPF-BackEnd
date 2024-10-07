// controllers/alunoController.js

// Importa o modelo de usuário que contém a lógica de interação com o banco de dados
const alunoModel = require("../models/alunoModel");

// Função para obter todos os usuários
async function getAlunos(req, res) {
  try {
    // Chama o método do modelo para obter todos os usuários do banco de dados
    const alunos = await alunoModel.getAllAlunos();

    // Retorna a lista de usuários em formato JSON
    res.json(alunos);
  } catch (err) {
    // Exibe o erro no console, se houver, e retorna uma resposta com status 500
    console.error(err.message);
    res.status(500).send("Erro ao obter os alunos");
  }
}

// Função para obter um usuário específico pelo ID
async function getAlunoByRm(req, res) {
  try {
    // Chama o método do modelo para obter o usuário com base no ID fornecido
    const aluno = await alunoModel.getAlunoByRm(req.params.rm);

    // Se o usuário não for encontrado, retorna um status 404 (não encontrado)
    if (!aluno) {
      res.status(404).send("Aluno não encontrado");
    } else {
      // Se o usuário for encontrado, retorna os dados em formato JSON
      res.json(aluno);
    }
  } catch (err) {
    // Exibe o erro no console e retorna uma resposta com status 500
    console.error(err.message);
    res.status(500).send("Erro ao obter o aluno");
  }
}

// Função para criar um novo usuário
async function createAluno(req, res) {
  try {
    // Chama o método do modelo para criar o novo usuário com os dados fornecidos
    await alunoModel.createAluno(req.body);

    // Retorna um status 201 (criado com sucesso)
    res.status(201).send("Aluno cadastrado com sucesso");
  } catch (err) {
    // Exibe o erro no console e retorna uma resposta com status 500
    console.error(err.message);
    res.status(500).send("Erro ao cadastrar o aluno");
  }
}

// Função para atualizar um usuário existente
async function updateAluno(req, res) {
  try {
    // Chama o método do modelo para atualizar o usuário com base no ID e nos dados fornecidos
    await alunoModel.updateAluno(req.params.rm, req.body);

    // Retorna uma mensagem de sucesso após a atualização
    res.send("Aluno atualizado com sucesso");
  } catch (err) {
    // Exibe o erro no console e retorna uma resposta com status 500
    console.error(err.message);
    res.status(500).send("Erro ao atualizar o aluno");
  }
}

// Função para deletar um usuário
async function deleteAluno(req, res) {
  try {
    // Chama o método do modelo para deletar o usuário com base no ID fornecido
    await alunoModel.deleteAluno(req.params.rm);

    // Retorna uma mensagem de sucesso após a exclusão
    res.send("Aluno deletado com sucesso");
  } catch (err) {
    // Exibe o erro no console e retorna uma resposta com status 500
    console.error(err.message);
    res.status(500).send("Erro ao deletar o aluno");
  }
}

// Exporta as funções do controller para serem usadas nas rotas da aplicação
module.exports = {
  getAlunos,
  getAlunoByRm,
  createAluno,
  updateAluno,
  deleteAluno,
};
