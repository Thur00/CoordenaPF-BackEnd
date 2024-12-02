// db.js

const { Connection } = require('tedious'); // Importa a classe Connection do pacote tedious
require('dotenv').config(); // Carrega as variáveis de ambiente do arquivo .env

// Verifica se todas as variáveis de ambiente necessárias estão presentes
if (!process.env.DB_SERVER || !process.env.DB_USERNAME || !process.env.DB_PASSWORD || !process.env.DB_DATABASE) {
    console.error("ERRO: Variáveis de ambiente para configuração do banco de dados não foram definidas.");
    console.error("Verifique o arquivo .env e garanta que DB_SERVER, DB_USER, DB_PASSWORD e DB_NAME estejam definidos.");
}

// Configurações para conectar ao SQL Server
const config = {
    server: process.env.DB_SERVER, // Nome do servidor
    authentication: {
        type: 'default', // Tipo de autenticação
        options: {
            userName: process.env.DB_USERNAME, // Nome do usuário do banco de dados
            password: process.env.DB_PASSWORD, // Senha do banco de dados
        }
    },
    options: {
        database: process.env.DB_DATABASE, // Nome do banco de dados
        encrypt: false, // Define a criptografia (ajuste conforme necessário)
        port: 1433, // Porta padrão do SQL Server
        trustServerCertificate: true // Necessário para evitar erro de SSL em ambiente local
    }
};

// Função para criar uma nova conexão com o banco de dados
function createConnection() {
    return new Connection(config); // Retorna uma nova instância da conexão
}

module.exports = createConnection; // Exporta a função de criação de conexão
