// models/alunoModel.js

// Importa o Request e os tipos de dados (TYPES) do pacote "tedious" para criar e executar consultas SQL
const { Request, TYPES } = require("tedious");

// Importa a função que conecta ao banco de dados
const connectDatabase = require("../db/databaseConfig");

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
async function getAllAlunos() {
    const query = "SELECT * FROM Aluno;";  // Define a query SQL para obter todos os registros da tabela "Alunos"
    return await executeQuery(query);  // Executa a query usando a função executeQuery
}

// Função para obter um usuário pelo ID
async function getAlunoByRm(rm) {
    const query = "SELECT * FROM Aluno WHERE RM = @rm;";  // Query SQL com um parâmetro para filtrar pelo ID
    const params = [{ name: "rm", type: TYPES.Int, value: rm }];  // Define o parâmetro @id para ser passado na query
    const alunos = await executeQuery(query, params);  // Executa a query com os parâmetros
    return alunos.length > 0 ? alunos[0] : null;  // Retorna o primeiro usuário se houver algum resultado, ou null se não houver
}

// Função para criar um novo usuário
async function createAluno(rm, turma, nome, ano) {
    const query = `INSERT INTO Aluno (RM, Turma, Nome, Ano) VALUES (@rm, @turma, @nome, @ano);`;  // Query SQL para inserir um novo registro
    const params = [
        { name: "rm", type: TYPES.Int, value: rm },  // Define o parâmetro @name
        { name: "turma", type: TYPES.NVarChar, value: turma },  // Define o parâmetro @email
        { name: "nome", type: TYPES.NVarChar, value: nome },  // Define o parâmetro @age, sendo nulo caso não seja fornecido
        { name: "ano", type: TYPES.Int, value: ano },  // Define o parâmetro @age, sendo nulo caso não seja fornecido
    ];
    await executeQuery(query, params);  // Executa a query com os parâmetros
}

// Função para atualizar um usuário existente
async function updateAluno(rm, turma, nome, ano) {
    const query = `UPDATE ALuno SET RM = @name, Turma = @turma, Nome = @nome, Ano = @ano WHERE RM = @rm;`;  // Query SQL para atualizar o registro
    const params = [
        { name: "rm", type: TYPES.Int, value: rm },  // Define o parâmetro @id
        { name: "turma", type: TYPES.NVarChar, value: turma },  // Define o parâmetro @name
        { name: "nome", type: TYPES.NVarChar, value: nome },  // Define o parâmetro @email
        { name: "ano", type: TYPES.Int, value: ano },  // Define o parâmetro @age
    ];
    await executeQuery(query, params);  // Executa a query com os parâmetros
}

// Exporta as funções para serem usadas nos controllers
module.exports = {
    getAllAlunos,
    getAlunoByRm,
    createAluno,
    updateAluno,
};