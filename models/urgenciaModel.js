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
async function getAllUrgencias() {
  const query = "SELECT * FROM Urgencia;"; // Define a query SQL para obter todos os registros da tabela "Users"
  return await executeQuery(query); // Executa a query usando a função executeQuery
}

// Função para criar um novo usuário
async function createUrgencia(urgencia) {
  const { tipo_urgencia, cor } = urgencia;
  console.log ("ooooo")

  const query = `INSERT INTO Urgencia (Tipo_urgencia, Cor) VALUES (@tipo_urgencia, @cor);`; // Query SQL para inserir um novo registro
  const params = [
    { name: "tipo_urgencia", type: TYPES.NVarChar, value: tipo_urgencia },
    { name: "cor", type: TYPES.NVarChar, value: cor },
  ];
console.log("cor = "+cor)

  await executeQuery(query, params); // Executa a query com os parâmetros
}

// Função para atualizar um usuário existente
async function updateUrgencia(id, urgencia) {
  const { Tipo_urgencia, Cor } = urgencia;

  const query = `UPDATE Urgencia SET Tipo_urgencia = @Tipo_urgencia, Cor = @Cor WHERE Urgencia_id = @id;`; // Query SQL para atualizar o registro
  const params = [
    { name: "id", type: TYPES.Int, value: id },
    { name: "Tipo_urgencia", type: TYPES.NVarChar, value: Tipo_urgencia },
    { name: "Cor", type: TYPES.NVarChar, value: Cor },
  ];
  await executeQuery(query, params); // Executa a query com os parâmetros
}

// Exporta as funções para serem usadas nos controllers
module.exports = {
  getAllUrgencias,
  createUrgencia,
  updateUrgencia,
};
