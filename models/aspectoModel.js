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
async function getAllAspectos() {
    const query = "SELECT * FROM Aspecto;";  // Define a query SQL para obter todos os registros da tabela "Users"
    return await executeQuery(query);  // Executa a query usando a função executeQuery
}

// Função para criar um novo usuário
async function createAspecto(aspecto) {
    const { nome } = aspecto;  // Extrai o nome do aspecto do objeto passado como parâmetro
    const query = `INSERT INTO Aspecto (Nome) VALUES (@nome);`;  // Query SQL para inserir um novo registro
    const params = [
        { name: "nome", type: TYPES.VarChar, value: nome },  // Define o parâmetro @name
    ];
    await executeQuery(query, params);  // Executa a query com os parâmetros
}

// Função para atualizar um usuário existente
async function updateAspecto(id, aspecto) {
    const { nome } = aspecto;  // Extrai o nome do aspecto do objeto passado como parâmetro
    const query = `UPDATE Aspecto SET Nome = @nome WHERE Aspecto_id = @id;`;  // Query SQL para atualizar o registro
    const params = [
        { name: "id", type: TYPES.Int, value: id },  // Define o parâmetro @id
        { name: "nome", type: TYPES.NVarChar, value: nome },  // Define o parâmetro @nome
    ];
    await executeQuery(query, params);  // Executa a query com os parâmetros
}

// Função para deletar um usuário pelo ID
async function deleteAspecto(id) {
    const query = "DELETE FROM Aspecto WHERE Aspecto_id = @id;";  // Query SQL para deletar o usuário pelo ID
    const params = [{ name: "id", type: TYPES.Int, value: id }];  // Define o parâmetro @id
    await executeQuery(query, params);  // Executa a query com o parâmetro
}

// Exporta as funções para serem usadas nos controllers
module.exports = {
    getAllAspectos,
    createAspecto,
    updateAspecto,
    deleteAspecto,
};