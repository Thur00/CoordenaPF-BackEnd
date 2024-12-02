// controllers/usuarioController.js

// Importa o modelo de usuário que contém a lógica de interação com o banco de dados
const loginModel = require("../models/loginModel");

// Função para criar um novo usuário
async function validaLogin(req, res) {
  try {
    // Chama o método do modelo para obter o usuário com base no ID fornecido
    const login = await loginModel.validaLogin(req.params);

    // Se o usuário não for encontrado, retorna um status 404 (não encontrado)
    if (!login) {
      res.status(404).send("CPF ou senha incorretos.");
    } else {
      // Se o usuário for encontrado, retorna os dados em formato JSON
      res.json(login);
    }
  } catch (err) {
    // Exibe o erro no console e retorna uma resposta com status 500
    console.error(err.message);
    res.status(500).send("Não foi possivel");
  }
}

// Exporta as funções do controller para serem usadas nas rotas da aplicação
module.exports = {
  validaLogin,
};
