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
async function getAluno(req, res) {
    const rm = req.params.rm;

    try {
        // Chama o método do modelo para obter o usuário com base no ID fornecido
        const aluno = await alunoModel.getAlunoByRm(rm);

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
    const { rm, turma, nome, ano } = req.body;

    try {
        // Chama o método do modelo para criar o novo usuário com os dados fornecidos
        await alunoModel.createAluno(rm, turma, nome, ano);

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
    const rm = req.params.rm;
    const { turma, nome, ano } = req.body;

    try {
        // Chama o método do modelo para atualizar o usuário com base no ID e nos dados fornecidos
        await alunoModel.updateAluno(rm, turma, nome, ano);

        // Retorna uma mensagem de sucesso após a atualização
        res.send("Aluno atualizado com sucesso");
    } catch (err) {
        // Exibe o erro no console e retorna uma resposta com status 500
        console.error(err.message);
        res.status(500).send("Erro ao atualizar o aluno");
    }
}

// Exporta as funções do controller para serem usadas nas rotas da aplicação
module.exports = {
    getAlunos,
    getAluno,
    createAluno,
    updateAluno,
};