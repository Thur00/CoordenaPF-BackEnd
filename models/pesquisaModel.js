// models/pesquisaModel.js

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

async function getAlunoByRm(rm) {
  const query = "SELECT * FROM Ocorrencias WHERE RM = @rm;"; // Query SQL com um parâmetro para filtrar pelo ID
  const params = [{ name: "rm", type: TYPES.Int, value: rm }]; // Define o parâmetro @id para ser passado na query
  const alunos = await executeQuery(query, params); // Executa a query com os parâmetros
  return alunos.length > 0 ? alunos[0] : null; // Retorna o primeiro usuário se houver algum resultado, ou null se não houver
}
async function getAlunoByNome(nome_completo) {
  const query = "SELECT * FROM Ocorrencias WHERE nome_completo LIKE '%nome_aqui%';";
  const params = [
    { name: "nome_completo", type: TYPES.NVarChar, value: nome_completo },
  ];
  const alunos = await executeQuery(query, params);
  return alunos.length > 0 ? alunos[0] : null;
}
async function getAlunoByTema(tema) {
  const query = "SELECT * FROM Ocorrencias WHERE TEMA = @tema;";
  const params = [{ name: "tema", type: TYPES.NVarChar, value: tema }];
  const alunos = await executeQuery(query, params);
  return alunos.length > 0 ? alunos[0] : null;
}
async function getAlunoByData(datas) {
  const { data_inicial, data_final } = datas;

  const query =
    "SELECT * FROM Ocorrencias WHERE DATA BETWEEN '@data_inical' AND '@data_final'";
  const params = [
    { name: "data_inicial", type: TYPES.Date, value: data_inicial },
    { name: "data_final", type: TYPES.Date, value: data_final },
  ];
  const alunos = await executeQuery(query, params);
  return alunos.length > 0 ? alunos[0] : null;
}
async function getAlunoByStatus(status) {
  const query = "SELECT * FROM Ocorrencias WHERE STATUS = @status;";
  const params = [{ name: "status", type: TYPES.NVarChar, value: status }];
  const alunos = await executeQuery(query, params);
  return alunos.length > 0 ? alunos[0] : null;
}
async function getAlunoByUrgencia(urgencia) {
  const query = "SELECT * FROM Ocorrencias WHERE URGENCIA = @urgencia;";
  const params = [{ name: "urgencia", type: TYPES.NVarChar, value: urgencia }];
  const alunos = await executeQuery(query, params);
  return alunos.length > 0 ? alunos[0] : null;
}

// Exporta as funções para serem usadas nos controllers
module.exports = {
  getAlunoByRm,
  getAlunoByNome,
  getAlunoByTema,
  getAlunoByData,
  getAlunoByStatus,
  getAlunoByUrgencia,
};