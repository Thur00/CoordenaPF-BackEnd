// controllers/statusController.js

// Importa o modelo de usuário que contém a lógica de interação com o banco de dados
const statusModel = require("../models/statusModel");

// Função para obter todos os usuários
async function getAllStatus(req, res) {
    try {
        // Chama o método do modelo para obter todos os usuários do banco de dados
        const status = await statusModel.getAllStatus();

        // Retorna a lista de usuários em formato JSON
        res.json(status);
    } catch (err) {
        // Exibe o erro no console, se houver, e retorna uma resposta com status 500
        console.error(err.message);
        res.status(500).send("Erro ao obter os status");
    }
}

// Função para criar um novo usuário
async function createStatus(req, res) {
    // Extrai as informações do novo usuário a partir do corpo da requisição (name, email, age)
    try {
        // Chama o método do modelo para criar o novo usuário com os dados fornecidos
        await statusModel.createStatus(req.body);

        // Retorna um status 201 (criado com sucesso)
        res.status(201).send("Status criado com sucesso");
    } catch (err) {
        // Exibe o erro no console e retorna uma resposta com status 500
        console.error(err.message);
        res.status(500).send("Erro ao criar o Status");
    }
}

// Função para atualizar um usuário existente
async function updateStatus(req, res) {
    try {
        // Chama o método do modelo para atualizar o usuário com base no ID e nos dados fornecidos
        await statusModel.updateStatus(req.params.id, req.body);

        // Retorna uma mensagem de sucesso após a atualização
        res.send("Status atualizado com sucesso");
    } catch (err) {
        // Exibe o erro no console e retorna uma resposta com status 500
        console.error(err.message);
        res.status(500).send("Erro ao atualizar o Status");
    }
}


// Exporta as funções do controller para serem usadas nas rotas da aplicação
module.exports = {
    getAllStatus,
    createStatus,
    updateStatus,
};