async function getAlunoByRm(rm) {
  const query = "SELECT * FROM Aluno WHERE RM = @rm;"; // Query SQL com um parâmetro para filtrar pelo ID
  const params = [{ name: "rm", type: TYPES.Int, value: rm }]; // Define o parâmetro @id para ser passado na query
  const alunos = await executeQuery(query, params); // Executa a query com os parâmetros
  return alunos.length > 0 ? alunos[0] : null; // Retorna o primeiro usuário se houver algum resultado, ou null se não houver
}
async function getAlunoByNome(nome_completo) {
  const query = "SELECT *FROM alunos WHERE nome_completo LIKE '%nome_aqui%';";
  const params = [
    { name: "nome_completo", type: TYPES.NVarChar, value: nome_completo },
  ];
  const alunos = await executeQuery(query, params);
  return alunos.length > 0 ? alunos[0] : null;
}
async function getAlunoByTema(tema) {
  const query = "SELECT * FROM Aluno WHERE TEMA = @tema;";
  const params = [{ name: "tema", type: TYPES.NVarChar, value: tema }];
  const alunos = await executeQuery(query, params);
  return alunos.length > 0 ? alunos[0] : null;
}
async function getAlunoByData(datas) {
  const { data_inicial, data_final } = datas;

  const query =
    "SELECT * FROM Aluno WHERE DATA BETWEEN '@data_inical' AND '@data_final'";
  const params = [
    { name: "data_inicial", type: TYPES.Date, value: data_inicial },
    { name: "data_final", type: TYPES.Date, value: data_final },
  ];
  const alunos = await executeQuery(query, params);
  return alunos.length > 0 ? alunos[0] : null;
}
async function getAlunoByStatus(status) {
  const query = "SELECT * FROM Aluno WHERE STATUS = @status;";
  const params = [{ name: "status", type: TYPES.NVarChar, value: status }];
  const alunos = await executeQuery(query, params);
  return alunos.length > 0 ? alunos[0] : null;
}
async function getAlunoByUrgencia(urgencia) {
  const query = "SELECT * FROM Aluno WHERE URGENCIA = @urgencia;";
  const params = [{ name: "urgencia", type: TYPES.NVarChar, value: urgencia }];
  const alunos = await executeQuery(query, params);
  return alunos.length > 0 ? alunos[0] : null;
}
