// models/userModel.js

// Importa o Request e os tipos de dados (TYPES) do pacote "tedious" para criar e executar consultas SQL
const { Request, TYPES } = require("tedious");

// Importa a função que conecta ao banco de dados
const connectDatabase = require("../db/connection");

// Função genérica para executar uma query SQL
async function executeQuery(query, params = []) {
    // Estabelece uma conexão com o banco de dados
    const connection = await connectDatabase();

    // Retorna uma Promise para lidar com a execução assíncrona da query
    return new Promise((resolve, reject) => {
        // Cria uma nova requisição SQL com a query passada e um callback para erros
        const request = new Request(query, (err) => {
            if (err) {
                // Se ocorrer um erro, a Promise é rejeitada e a conexão é fechada
                reject(err);
                connection.close();
            }
        });

        // Adiciona parâmetros à requisição SQL (nome, tipo e valor)
        params.forEach(({ name, type, value }) => {
            request.addParameter(name, type, value);
        });

        // Array para armazenar os resultados retornados pela query
        let results = [];

        // Evento "row" é disparado para cada linha retornada pela query
        request.on("row", (columns) => {
            // Cria um objeto para cada linha e armazena suas colunas e valores
            let row = {};
            columns.forEach((column) => {
                row[column.metadata.colName] = column.value;
            });
            results.push(row);
        });

        // Evento "requestCompleted" é disparado quando a query é completamente executada
        request.on("requestCompleted", () => {
            // Fecha a conexão com o banco de dados e resolve a Promise com os resultados
            connection.close();
            resolve(results);
        });

        // Executa a requisição SQL
        connection.execSql(request);
    });
}

// Função para obter todos os usuários do banco de dados
async function getAllUsers() {
    const query = "SELECT * FROM Users;";  // Define a query SQL para obter todos os registros da tabela "Users"
    return await executeQuery(query);  // Executa a query usando a função executeQuery
}

// Função para obter um usuário pelo ID
async function getUserById(id) {
    const query = "SELECT * FROM Users WHERE users_ID = @id;";  // Query SQL com um parâmetro para filtrar pelo ID
    const params = [{ name: "id", type: TYPES.Int, value: id }];  // Define o parâmetro @id para ser passado na query
    const users = await executeQuery(query, params);  // Executa a query com os parâmetros
    return users.length > 0 ? users[0] : null;  // Retorna o primeiro usuário se houver algum resultado, ou null se não houver
}

// Função para criar um novo usuário
async function createUser(name, email, age) {
    const query = `INSERT INTO Users (name, email, age) VALUES (@name, @email, @age);`;  // Query SQL para inserir um novo registro
    const params = [
        { name: "name", type: TYPES.NVarChar, value: name },  // Define o parâmetro @name
        { name: "email", type: TYPES.NVarChar, value: email },  // Define o parâmetro @email
        { name: "age", type: TYPES.Int, value: age || null },  // Define o parâmetro @age, sendo nulo caso não seja fornecido
    ];
    await executeQuery(query, params);  // Executa a query com os parâmetros
}

// Função para atualizar um usuário existente
async function updateUser(id, name, email, age) {
    const query = `UPDATE Users SET name = @name, email = @email, age = @age WHERE users_ID = @id;`;  // Query SQL para atualizar o registro
    const params = [
        { name: "id", type: TYPES.Int, value: id },  // Define o parâmetro @id
        { name: "name", type: TYPES.NVarChar, value: name },  // Define o parâmetro @name
        { name: "email", type: TYPES.NVarChar, value: email },  // Define o parâmetro @email
        { name: "age", type: TYPES.Int, value: age || null },  // Define o parâmetro @age
    ];
    await executeQuery(query, params);  // Executa a query com os parâmetros
}

// Exporta as funções para serem usadas nos controllers
module.exports = {
    getAllUsers,
    createUser,
    updateUser,
};