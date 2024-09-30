// models/userModel.js

// Importa o Request e os tipos de dados (TYPES) do pacote "tedious" para criar e executar consultas SQL
const { Request, TYPES } = require("tedious");

// Importa a função que conecta ao banco de dados
const connectDatabase = require("../db/connection");
const { getAllStatus } = require("../controllers/statusController");

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

        // Adiciona parâmetros à requisição SQL (categoria, tipo e valor)
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
async function getAllStatus() {
    const query = "SELECT * FROM Status;";  // Define a query SQL para obter todos os registros da tabela "Users"
    return await executeQuery(query);  // Executa a query usando a função executeQuery
}

// Função para criar um novo usuário
async function createStatus(Status) {
    const { categoria, icone } = Status;  // Extrai o categoria do Status do objeto passado como parâmetro
    const query = `INSERT INTO Status (Categoria, Icone) VALUES (@categoria, @icone);`;  // Query SQL para inserir um novo registro
    const params = [
        { name: "categoria", type: TYPES.VarChar, value: categoria },  // Define o parâmetro @name
        { name: "icone", type: TYPES.VarChar, value: icone },  

    ];
    await executeQuery(query, params);  // Executa a query com os parâmetros
}

// Função para atualizar um usuário existente
async function updateStatus(id, Status) {
    const { categoria, icone } = Status;  // Extrai o categoria do Status do objeto passado como parâmetro
    const query = `UPDATE Status SET Categoria = @categoria, Icone = @icone WHERE Status_id = @id;`;  // Query SQL para atualizar o registro
    const params = [
        { name: "id", type: TYPES.Int, value: id },  // Define o parâmetro @id
        { name: "categoria", type: TYPES.NVarChar, value: categoria },  // Define o parâmetro @categoria
        { name: "icone", type: TYPES.NVarChar, value: icone },  

    ];
    await executeQuery(query, params);  // Executa a query com os parâmetros
}


// Exporta as funções para serem usadas nos controllers
module.exports = {
    getAllStatus,
    createStatus,
    updateStatus,
};