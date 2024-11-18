// models/usuarioModel.js

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

// Função para criar um novo usuário
async function validaLogin(credenciais) {
  const { cpf, senha } = credenciais;

  const query = "SELECT * FROM Usuarios WHERE CPF = @cpf AND Senha = @senha;"; // Define a query SQL para obter todos os registros da tabela "Users"
  const params = [
    { name: "cpf", type: TYPES.NVarChar, value: cpf },
    { name: "senha", type: TYPES.NVarChar, value: senha },
  ]; // Define o parâmetro @id;
  const login = await executeQuery(query, params); // Executa a query usando a função executeQuery
  return login.length > 0 ? login[0] : null; // Retorna o primeiro usuário se houver algum resultado, ou null se não houver
}

// Exporta as funções para serem usadas nos controllers
module.exports = {
  validaLogin,
};
