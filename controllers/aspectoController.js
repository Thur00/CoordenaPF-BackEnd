// controllers/aspectoController.js

// Importa o modelo de usuário que contém a lógica de interação com o banco de dados
const AspectoModel = require("../models/aspectoModel");

// Função para obter todos os usuários
async function getAspectos(req, res) {
    try {
        // Chama o método do modelo para obter todos os usuários do banco de dados
        const aspectos = await AspectoModel.getAllAspectos();

        // Retorna a lista de usuários em formato JSON
        res.json(aspectos);
    } catch (err) {
        // Exibe o erro no console, se houver, e retorna uma resposta com status 500
        console.error(err.message);
        res.status(500).send("Erro ao obter os aspectos");
    }
}

// Função para criar um novo usuário
async function createAspecto(req, res) {
    // Extrai as informações do novo usuário a partir do corpo da requisição (name, email, age)
    try {
        // Chama o método do modelo para criar o novo usuário com os dados fornecidos
        await AspectoModel.createAspecto(req.body);

        // Retorna um status 201 (criado com sucesso)
        res.status(201).send("Aspecto criado com sucesso");
    } catch (err) {
        // Exibe o erro no console e retorna uma resposta com status 500
        console.error(err.message);
        res.status(500).send("Erro ao criar o aspecto");
    }
}

// Função para atualizar um usuário existente
async function updateAspecto(req, res) {
    try {
        // Chama o método do modelo para atualizar o usuário com base no ID e nos dados fornecidos
        await AspectoModel.updateAspecto(req.params.id, req.body);

        // Retorna uma mensagem de sucesso após a atualização
        res.send("Aspecto atualizado com sucesso");
    } catch (err) {
        // Exibe o erro no console e retorna uma resposta com status 500
        console.error(err.message);
        res.status(500).send("Erro ao atualizar o aspecto");
    }
}

// Função para deletar um usuário
async function deleteAspecto(req, res) {
    try {
        // Chama o método do modelo para deletar o usuário com base no ID fornecido
        await AspectoModel.deleteAspecto(req.params.id);

        // Retorna uma mensagem de sucesso após a exclusão
        res.send("Aspecto deletado com sucesso");
    } catch (err) {
        // Exibe o erro no console e retorna uma resposta com status 500
        console.error(err.message);
        res.status(500).send("Erro ao deletar o aspecto");
    }
}

// Exporta as funções do controller para serem usadas nas rotas da aplicação
module.exports = {
    getAspectos,
    createAspecto,
    updateAspecto,
    deleteAspecto,
};