// controllers/usuarioController.js

// Importa o modelo de usuário que contém a lógica de interação com o banco de dados
const usuarioModel = require("../models/usuarioModel");

// Função para obter todos os usuários
async function getAllUsuarios(req, res) {
    try {
        // Chama o método do modelo para obter todos os usuários do banco de dados
        const usuarios = await usuarioModel.getAllUsuarios();

        // Retorna a lista de usuários em formato JSON
        res.json(usuarios);
    } catch (err) {
        // Exibe o erro no console, se houver, e retorna uma resposta com usuario 500
        console.error(err.message);
        res.status(500).send("Erro ao obter o usuário");
    }
}

// Função para criar um novo usuário
async function createUsuario(req, res) {
    // Extrai as informações do novo usuário a partir do corpo da requisição (name, email, age)
    try {
        // Chama o método do modelo para criar o novo usuário com os dados fornecidos
        await usuarioModel.createUsuario(req.body);

        // Retorna um usuario 201 (criado com sucesso)
        res.status(201).send("usuário criado com sucesso");
    } catch (err) {
        // Exibe o erro no console e retorna uma resposta com usuario 500
        console.error(err.message);
        res.status(500).send("Erro ao criar o usuário");
    }
}

// Função para atualizar um usuário existente
async function updateUsuario(req, res) {
    try {
        // Chama o método do modelo para atualizar o usuário com base no ID e nos dados fornecidos
        await usuarioModel.updateUsuario(req.params.id, req.body);

        // Retorna uma mensagem de sucesso após a atualização
        res.send("usuario atualizado com sucesso");
    } catch (err) {
        // Exibe o erro no console e retorna uma resposta com usuario 500
        console.error(err.message);
        res.status(500).send("Erro ao atualizar o usuario");
    }
}


// Exporta as funções do controller para serem usadas nas rotas da aplicação
module.exports = {
    getAllUsuarios,
    createUsuario,
    updateUsuario,
};