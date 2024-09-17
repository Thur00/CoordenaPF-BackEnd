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
function getAllStatus(callback) {
    const db = openDbConnection();
    db.all("SELECT * FROM Status", [], (err, rows) => {
        db.close();
        callback(err, rows);
    });
}

// Função para criar um novo cliente
function createStatus(status, callback) {
    const { Categoria, Icone } = status;
    const db = openDbConnection();
    db.run("INSERT INTO Status (Categoria, Icone) VALUES (?, ?)", [Categoria, Icone], function (err) {
            db.close();
            callback(err, { id: this.lastID });
        }
    );
}

// Função para atualizar um cliente existente
function updateStatus(id, status, callback) {
    const { Categoria, Icone } = status;
    const db = openDbConnection();
    db.run("UPDATE Status SET Categoria = ?, Icone = ? WHERE Status_id = ?",
        [Categoria, Icone, id], function (err) {
            db.close();
            callback(err, { changes: this.changes });
        });
}

module.exports = {
    getAllStatus,
    createStatus,
    updateStatus,
};