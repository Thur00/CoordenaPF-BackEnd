//cliente.js
const sqlite3 = require('sqlite3').verbose();
const dbPath = './db/database.db';
// Função para abrir conexão com o banco de dados
function openDbConnection() {
    let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            console.error('Erro ao abrir o banco de dados:', err.message);
        }
    });
    return db;
}
// Função para buscar todos os clientes
function getAllAlunos(callback) {
    const db = openDbConnection();
    db.all("SELECT * FROM Aluno", [], (err, rows) => {
        db.close();
        callback(err, rows);
    });
}
// Função para buscar um cliente por ID
function getAlunoByTurma(turma, callback) {
    const { turma, ano } = turma;
    const db = openDbConnection();
    db.get("SELECT * FROM Aluno WHERE Turma = ? AND Ano = ?", [turma, ano], (err, row) => {
        db.close(); 
        callback(err, row);
    });
}
// Função para criar um novo cliente
function createAluno(aluno, callback) {
    const { rm, turma, nome, ano } = aluno;
    const db = openDbConnection();
    db.run("INSERT INTO Aluno (rm, turma, nome, ano) VALUES (?, ?, ?, ?)", [ rm, turma, nome, ano], function (err) {
            db.close();
            callback(err, { id: this.lastID });
        }
    );
}

// Função para atualizar um cliente existente
function updateAluno(id, aluno, callback) {
    const { rm, turma, nome, ano } = aluno;
    const db = openDbConnection();
    db.run("UPDATE Aluno SET RM = ?, Turma = ?, Nome = ?, Ano = ? WHERE RM = ? AND Turma = ?",
        [rm, turma, nome, ano, id], function (err) {
            db.close();
            callback(err, { changes: this.changes });
        });
}

module.exports = {
    getAllAlunos,
    getAlunoByTurma,
    createAluno,
    updateAluno,
};