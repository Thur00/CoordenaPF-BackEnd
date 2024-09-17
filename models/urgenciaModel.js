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
function getAllUrgencias(callback) {
    const db = openDbConnection();
    db.all("SELECT * FROM Urgencia", [], (err, rows) => {
        db.close();
        callback(err, rows);
    });
}

// Função para criar um novo cliente
function createUrgencia(Urgencia, callback) {
    const {tipo_urgencia, cor } = Urgencia;
    const db = openDbConnection();
    db.run("INSERT INTO Urgencia (tipo_urgencia, cor) VALUES (?, ?)", [tipo_urgencia, cor], function (err) {
            db.close();
            callback(err, { id: this.lastID });
        }
    );
}

// Função para atualizar um cliente existente
function updateUrgencia(urgencia_id, Urgencia, callback) {
    const { tipo_urgencia, cor } = Urgencia;
    const db = openDbConnection();
    db.run("UPDATE Urgencia SET tipo_urgencia = ?, cor = ? WHERE urgencia_id = ?",
        [tipo_urgencia, cor, urgencia_id], function (err) {
            db.close();
            callback(err, { changes: this.changes });
        });
}

module.exports = {
    getAllUrgencias,
    createUrgencia,
    updateUrgencia,
};