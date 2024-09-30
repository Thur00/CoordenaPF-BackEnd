// controllers/urgenciasController.js

// Importa o modelo de usuário que contém a lógica de interação com o banco de dados
const urgenciaModel = require("../models/urgenciasModel");

// Função para obter todos os usuários
async function getUrgencias(req, res) {
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
    // Extrai as informações do novo usuário a partir do corpo da requisição (name, email, age)
    const { Tipo_urgencia, Cor } = req.body;
    try {
        // Chama o método do modelo para criar o novo usuário com os dados fornecidos
        await urgenciaModel.createUrgencia(Tipo_urgencia, Cor);

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
    // Extrai o ID do usuário da URL e os novos dados do corpo da requisição
    const id = req.params.id;
    const { Tipo_urgencia, Cor } = req.body;
    try {
        // Chama o método do modelo para atualizar o usuário com base no ID e nos dados fornecidos
        await urgenciaModel.updateUrgencia(id, Tipo_urgencia, Cor);

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
    getUrgencias,
    createUrgencia,
    updateUrgencia,
};