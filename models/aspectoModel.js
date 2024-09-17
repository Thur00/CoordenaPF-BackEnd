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
function getAllAspectos(callback) {
    const db = openDbConnection();
    db.all("SELECT * FROM Aspecto", [], (err, rows) => {
        db.close();
        callback(err, rows);
    });
} 
// Função para criar um novo cliente
function createAspecto(aspecto, callback) {
    const { nome } = aspecto;
    const db = openDbConnection();
    db.run("INSERT INTO Aspecto (Nome) VALUES (?)", [nome], function (err) {
            db.close();
            callback(err, { id: this.lastID });
        }
    );
}
// Função para atualizar um cliente existente
function updateAspecto(id, aspecto, callback) {
    const { nome } = aspecto;
    const db = openDbConnection();
    db.run("UPDATE Aspecto SET Nome = ? WHERE Aspecto_id = ?",
        [nome, id], function (err) {
            db.close();
            callback(err, { changes: this.changes });
        });
}
module.exports = {
    getAllAspectos,
    createAspecto,
    updateAspecto
};