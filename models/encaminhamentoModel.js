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

// Função para buscar todos os encaminhamentos
function getAllEncaminhamento(callback) {
    const db = openDbConnection();
    db.all("SELECT * FROM Encaminhamento", [], (err, rows) => {
        db.close();
        callback(err, rows);
    });
}

// Função para criar um novo encaminhamento
function createEncaminhamento(Encaminhamento, callback) {
    const { Nome_encaminhamento } = Encaminhamento;
    const db = openDbConnection();
    db.run("INSERT INTO Encaminhamento (Nome_encaminhamento) VALUES (?)", [Nome_encaminhamento
        ], function (err) {
            db.close();
            callback(err, { id: this.lastID });
        }
    );
}

// Função para atualizar um encaminhamento existente
function updateEncaminhamento(id, Encaminhamento, callback) {
    const { Nome_encaminhamento } = Encaminhamento;
    const db = openDbConnection();
    db.run("UPDATE Encaminhamento SET Nome_encaminhamento = ? WHERE Encaminhamento_id = ?",
        [Nome_encaminhamento, id], function (err) {
            db.close();
            callback(err, { changes: this.changes });
        });
}

module.exports = {
    getAllEncaminhamento,
    createEncaminhamento,
    updateEncaminhamento
};