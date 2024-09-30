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

// Função para obter todos os temas do banco de dados
async function getAllTemas() {
    const query = "SELECT * FROM Tema;";  // Define a query SQL para obter todos os registros da tabela "Temas"
    return await executeQuery(query);  // Executa a query usando a função executeQuery
}

// Função para criar um novo tema
async function createTema(Nome_tema) {
    const query = `INSERT INTO Tema (Nome_tema) VALUES (@Nome_tema);`;  // Query SQL para inserir um novo registro
    const params = [
        { name: "Nome_tema", type: TYPES.NVarChar, value: Nome_tema },  // Define o parâmetro @name
    ];
    await executeQuery(query, params);  // Executa a query com os parâmetros
}

// Função para atualizar um tema existente
async function updateTema(Nome_tema) {
    const query = `UPDATE Tema SET Nome_tema = @Nome_tema;`;  // Query SQL para atualizar o registro
    const params = [
        { name: "Nome_tema", type: TYPES.Int, value: Nome_tema },  // Define o parâmetro @id
    ];
    await executeQuery(query, params);  // Executa a query com os parâmetros
}

// Exporta as funções para serem usadas nos controllers
module.exports = {
    getAllTemas,
    createTema,
    updateTema,
};