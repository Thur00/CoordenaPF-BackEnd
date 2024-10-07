// controllers/pesquisaController.js

// Importa o modelo de usuário que contém a lógica de interação com o banco de dados
const pesquisaModel = require("../models/pesquisaModel");

async function getAlunoByRm(req, res) {
  try {
    // Chama o método do modelo para obter o usuário com base no ID fornecido
    const aluno = await pesquisaModel.getAlunoByRm(req.params.rm);

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
async function getAlunoByNome(req, res) {
  try {
    const aluno = await pesquisaModel.getAlunoByNome(req.params.nome);
    if (!aluno) {
      return res.status(404).send("Nome não encontrado");
    } else {
      return res.json(aluno);
    }
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Erro ao obter o nome");
  }
}
async function getAlunoByTema(req, res) {
  try {
    const aluno = await pesquisaModel.getAlunoByTema(req.params.tema);
    if (!aluno) {
      res.status(404).send("Tema não encontrado");
    } else {
      res.json(aluno);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erro ao obter o tema");
  }
}
async function getAlunoByData(req, res) {
  try {
    const alunos = await pesquisaModel.getAlunoByData(req.params);
    if (!alunos) {
      return res
        .status(404)
        .send("Nenhuma data encontrada para o período informado");
    } else {
      return res.json(alunos);
    }
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Erro ao obter data");
  }
}
async function getAlunoByStatus(req, res) {
  try {
    const aluno = await pesquisaModel.getAlunoByStatus(req.params.status);
    if (!aluno) {
      res.status(404).send("Status não encontrado");
    } else {
      res.json(aluno);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erro ao obter o status");
  }
}
async function getAlunoByUrgencia(req, res) {
  try {
    const aluno = await pesquisaModel.getAlunoByUrgencia(req.params.urgencia);
    if (!aluno) {
      res.status(404).send("Urgência não encontrada");
    } else {
      res.json(aluno);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erro ao obter a urgência");
  }
}

module.exports = {
  getAlunoByRm,
  getAlunoByNome,
  getAlunoByTema,
  getAlunoByData,
  getAlunoByStatus,
  getAlunoByUrgencia,
};
