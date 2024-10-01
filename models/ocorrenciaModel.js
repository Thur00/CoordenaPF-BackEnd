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
async function getAllOcorrencias() {
  const query = "SELECT * FROM ocorrencias;"; // Define a query SQL para obter todos os registros da tabela "Users"
  return await executeQuery(query); // Executa a query usando a função executeQuery
}

// Função para criar um novo usuário
async function createOcorrencias(ocorrencias) {
  const {
    Criador,
    Data_ocorrencia,
    Hora,
    Iniciativa,
    Aspecto,
    Urgencia,
    Tema,
    Turma,
    Estudantes,
    Rm_aluno,
    Responsável,
    Descricao,
    Encaminhamento,
    Status,
  } = ocorrencias; // Extrai o categoria do Status do objeto passado como parâmetro

  const query = `INSERT INTO ocorrencias (Criador, Data_ocorrencia, Hora, Iniciativa, Aspecto, Urgencia, Tema, Turma, Estudantes, Rm_aluno, Responsável, Descricao, Encaminhamento, Status) VALUES (@Criador, @Data_ocorrencia, @Hora, @Iniciativa, @Aspecto, @Urgencia, @Tema, @Turma, @Estudantes, @Rm_aluno, @Responsável, @Descricao, @Encaminhamento, @Status);`; // Query SQL para inserir um novo registro
  const params = [
    { name: "Criador", type: TYPES.NVarChar, value: Criador }, // Define o parâmetro @name
    { name: "Data_ocorrencia", type: TYPES.Date, value: Data_ocorrencia },
    { name: "Hora", type: TYPES.Time, value: Hora },
    { name: "Iniciativa", type: TYPES.NVarChar, value: Iniciativa },
    { name: "Aspecto", type: TYPES.NVarChar, value: Aspecto },
    { name: "Urgencia", type: TYPES.NVarChar, value: Urgencia },
    { name: "Tema", type: TYPES.NVarChar, value: Tema },
    { name: "Turma", type: TYPES.NVarChar, value: Turma },
    { name: "Estudantes", type: TYPES.NVarChar, value: Estudantes },
    { name: "Rm_aluno", type: TYPES.Int, value: Rm_aluno },
    { name: "Responsável", type: TYPES.NVarChar, value: Responsável },
    { name: "Descricao", type: TYPES.NVarChar, value: Descricao },
    { name: "Encaminhamento", type: TYPES.NVarChar, value: Encaminhamento },
    { name: "Status", type: TYPES.NVarChar, value: Status },
  ];
  await executeQuery(query, params); // Executa a query com os parâmetros
}

// Função para atualizar um usuário existente
async function updateOcorrencias(id, ocorrencias) {
  const {
    Criador,
    Data_ocorrencia,
    Hora,
    Iniciativa,
    Aspecto,
    Urgencia,
    Tema,
    Turma,
    Estudantes,
    Rm_aluno,
    Responsável,
    Descricao,
    Encaminhamento,
    Status,
  } = ocorrencias; // Extrai o categoria do Status do objeto passado como parâmetro

  const query = `UPDATE ocorrencias SET Criador, Data_ocorrencia, Hora, Iniciativa, Aspecto, Urgencia, Tema, Turma, Estudantes, Rm_aluno, Responsável, Descricao, Encaminhamento, Status = @Criador, @Data_ocorrencia, @Hora, @Iniciativa, @Aspecto, @Urgencia, @Tema, @Turma, @Estudantes, @Rm_aluno, @Responsável, @Descricao, @Encaminhamento, @Status WHERE Ocorrencias_id = @id;`; // Query SQL para atualizar o registro
  const params = [
    { name: "Ocorrencia_id", type: TYPES.Int, value: id }, // Define o parâmetro @id
    { name: "Criador", type: TYPES.VarChar, value: Criador }, // Define o parâmetro @name
    { name: "Data_ocorrencia", type: TYPES.Date, value: Data_ocorrencia },
    { name: "Hora", type: TYPES.Time, value: Hora },
    { name: "Iniciativa", type: TYPES.VarChar, value: Iniciativa },
    { name: "Aspecto", type: TYPES.VarChar, value: Aspecto },
    { name: "Urgencia", type: TYPES.VarChar, value: Urgencia },
    { name: "Tema", type: TYPES.VarChar, value: Tema },
    { name: "Turma", type: TYPES.VarChar, value: Turma },
    { name: "Estudantes", type: TYPES.VarChar, value: Estudantes },
    { name: "Rm_aluno", type: TYPES.Int, value: Rm_aluno },
    { name: "Responsável", type: TYPES.VarChar, value: Responsável },
    { name: "Descricao", type: TYPES.VarChar, value: Descricao },
    { name: "Encaminhamento", type: TYPES.VarChar, value: Encaminhamento },
    { name: "Status", type: TYPES.VarChar, value: Status },
  ];
  await executeQuery(query, params); // Executa a query com os parâmetros
}

// Exporta as funções para serem usadas nos controllers
module.exports = {
  getAllOcorrencias,
  createOcorrencias,
  updateOcorrencias,
};
