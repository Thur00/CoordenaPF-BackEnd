// controllers/usersController.js

// Importa o modelo de usuário que contém a lógica de interação com o banco de dados
const userModel = require("../models/usersModel");

// Função para obter todos os usuários
async function getUsers(req, res) {
    try {
        // Chama o método do modelo para obter todos os usuários do banco de dados
        const users = await userModel.getAllUsers();

        // Retorna a lista de usuários em formato JSON
        res.json(users);
    } catch (err) {
        // Exibe o erro no console, se houver, e retorna uma resposta com status 500
        console.error(err.message);
        res.status(500).send("Erro ao obter os usuários");
    }
}

// Função para criar um novo usuário
async function createUser(req, res) {
    // Extrai as informações do novo usuário a partir do corpo da requisição (name, email, age)
    const { name, email, age } = req.body;
    try {
        // Chama o método do modelo para criar o novo usuário com os dados fornecidos
        await userModel.createUser(name, email, age);

        // Retorna um status 201 (criado com sucesso)
        res.status(201).send("Usuário criado com sucesso");
    } catch (err) {
        // Exibe o erro no console e retorna uma resposta com status 500
        console.error(err.message);
        res.status(500).send("Erro ao criar o usuário");
    }
}

// Função para atualizar um usuário existente
async function updateUser(req, res) {
    // Extrai o ID do usuário da URL e os novos dados do corpo da requisição
    const id = req.params.id;
    const { name, email, age } = req.body;
    try {
        // Chama o método do modelo para atualizar o usuário com base no ID e nos dados fornecidos
        await userModel.updateUser(id, name, email, age);

        // Retorna uma mensagem de sucesso após a atualização
        res.send("Usuário atualizado com sucesso");
    } catch (err) {
        // Exibe o erro no console e retorna uma resposta com status 500
        console.error(err.message);
        res.status(500).send("Erro ao atualizar o usuário");
    }
}

// Exporta as funções do controller para serem usadas nas rotas da aplicação
module.exports = {
    getUsers,
    createUser,
    updateUser,
};