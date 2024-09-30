// models/userModel.js

// Importa o Request e os tipos de dados (TYPES) do pacote "tedious" para criar e executar consultas SQL
const { Request, TYPES } = require("tedious");

// Importa a função que conecta ao banco de dados
const connectDatabase = require("../db/connection");
const { getAllEncaminhamentos } = require("./encaminhamentoModel");

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
async function getAllNotificacao() {
    const query = "SELECT * FROM Notificacao;";  // Define a query SQL para obter todos os registros da tabela "Users"
    return await executeQuery(query);  // Executa a query usando a função executeQuery
}

// Função para criar um novo usuário
async function createNotificacao(Cod_ocorrencia, Criador, Solicitado) {
    const query = `INSERT INTO Notificacao (Cod_ocorrencia, Criador, Solicitado) VALUES (@Cod_ocorrencia, @Criador, @Solicitado);`;  // Query SQL para inserir um novo registro
    const params = [
        { name: "Cod_ocorrencia", type: TYPES.VarChar, value: Cod_ocorrencia },  // Define o parâmetro @name
        { name: "Criador", type: TYPES.VarChar, value: Criador },
        { name: "Solicitado", type: TYPES.VarChar, value: Solicitado },
    ];
    await executeQuery(query, params);  // Executa a query com os parâmetros
}

// Função para atualizar um usuário existente
async function updateNotificacao(id, notificacao) {
    const query = `UPDATE Notificacao SET Cod_ocorrencia = @nome WHERE Notificacao_id = @id;`;  // Query SQL para atualizar o registro
    const params = [
        { name: "Cod_ocorrencia", type: TYPES.VarChar, value: Cod_ocorrencia },  // Define o parâmetro @name
        { name: "Criador", type: TYPES.VarChar, value: Criador },
        { name: "Solicitado", type: TYPES.VarChar, value: Solicitado },
    ];
    await executeQuery(query, params);  // Executa a query com os parâmetros
}

// Exporta as funções para serem usadas nos controllers
module.exports = {
    getAllNotificacao,
    createNotificacao,
    updateNotificacao,
};