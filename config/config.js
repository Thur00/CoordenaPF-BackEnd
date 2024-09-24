// config/config.js

// Carrega o arquivo .env e adiciona as variáveis de ambiente ao process.env
require("dotenv").config();

module.exports = { // Exporta a configuração do banco de dados
    server: process.env.DB_SERVER, // Pega o endereço do servidor de banco de dados da variável de ambiente DB_SERVER
    authentication: { // Configurações de autenticação para o banco de dados   
        type: "default", // Define o tipo de autenticação, aqui é "default" (padrão)
        options: { // Opções de autenticação: nome de usuário e senha
            userName: process.env.DB_USERNAME, // Pega o nome de usuário da variável de ambiente DB_USERNAME
            password: process.env.DB_PASSWORD, // Pega a senha da variável de ambiente DB_PASSWORD
        },
    },  
    options: { // Outras opções de configuração do banco de dados
        database: process.env.DB_DATABASE, // Pega o nome do banco de dados da variável de ambiente DB_DATABASE       
        trustServerCertificate: true, // Habilita a confiança no certificado do servidor (útil para evitar erros SSL em ambientes de desenvolvimento)
    },
};