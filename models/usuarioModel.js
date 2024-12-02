// models/usuarioModel.js

// Importa o Request e os tipos de dados (TYPES) do pacote "tedious" para criar e executar consultas SQL
const { Request, TYPES } = require("tedious");
const createConnection = require('../config/db')

// Importa a função que conecta ao banco de dados
const connectDatabase = require("../db/connection");
const { request } = require("express");

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
async function getAllUsuarios() {
  const query = "SELECT * FROM usuarios;"; // Define a query SQL para obter todos os registros da tabela "Users"
  return await executeQuery(query); // Executa a query usando a função executeQuery
}

// Função para criar um novo usuário
async function createUsuario(usuario) {
  const { nome, cargo, email, cpf } = usuario; // Extrai o categoria do Status do objeto passado como parâmetro

  const query = `INSERT INTO usuarios (Nome, Cargo, Email, CPF) VALUES (@nome, @cargo, @email, @cpf);`; // Query SQL para inserir um novo registro
  const params = [
    { name: "nome", type: TYPES.NVarChar, value: nome }, // Define o parâmetro @name
    { name: "cargo", type: TYPES.NVarChar, value: cargo },
    { name: "email", type: TYPES.NVarChar, value: email },
    { name: "cpf", type: TYPES.NVarChar, value: cpf },
  ];
  await executeQuery(query, params); // Executa a query com os parâmetros
}

// Função para atualizar um usuário existente
async function updateUsuario(id, usuario) {
  const { nome, cargo, email, cpf } = usuario; // Extrai o categoria do Status do objeto passado como parâmetro

  const query = `UPDATE usuarios SET Nome = @nome,  Cargo = @cargo, Email = @email, CPF = @cpf WHERE Login_id = @id;`; // Query SQL para atualizar o registro
  const params = [
    { name: "id", type: TYPES.Int, value: id }, // Define o parâmetro @id
    { name: "nome", type: TYPES.NVarChar, value: nome }, // Define o parâmetro @name
    { name: "cargo", type: TYPES.NVarChar, value: cargo },
    { name: "email", type: TYPES.NVarChar, value: email },
    { name: "cpf", type: TYPES.NVarChar, value: cpf },
  ];
  await executeQuery(query, params); // Executa a query com os parâmetros
}

// Função para criar um novo usuário
async function getByCpfSenha(usuario, callback) {
  const { senha, cpf } = usuario; // Extrai o categoria do Status do objeto passado como parâmetro

  const connection = createConnection();
  connection.on('connect', (err) => {
    if (err) return callback(err)


    const query = `SELECT COUNT(*) as count FROM usuarios WHERE CPF = @cpf AND Senha = @senha`; // Query SQL para inserir um novo registro
    const request = new Request(query, (err, rowCount) => {
      connection.close();
      if (err) return callback(err)
    })

    let isValid = false;
    request.on('row', (columns) => {
      const count = columns[0].value;
      isValid = count > 0;
    });

    request.on('requestCompleted', () => {
      callback(null, isValid ? "VALIDO" : "INVALIDO");
    })

    console.log("Callback: ",callback)

    request.addParameter('CPF',TYPES.NVarChar, cpf)
    request.addParameter('Senha',TYPES.NVarChar, senha)
    connection.execSql(request)
  })
connection.connect();
}


// Exporta as funções para serem usadas nos controllers
module.exports = {
  getAllUsuarios,
  createUsuario,
  updateUsuario,
  getByCpfSenha
};
