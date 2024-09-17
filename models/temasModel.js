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

// Função para buscar todos os temas
function getAllTemas(callback) {
    const db = openDbConnection();
    db.all("SELECT * FROM Temas", [], (err, rows) => {
        db.close();
        callback(err, rows);
    });
}

// Função para criar um novo tema
function createTema(tema, callback) {
    const { Nome_tema } = tema;
    const db = openDbConnection();
    db.run("INSERT INTO Temas ( Nome_tema) VALUES (?)", [Nome_tema
        ], function (err) {
            db.close();
            callback(err, { id: this.lastID });
        }
    );
}

// Função para atualizar um tema existente
function updateTema(id, tema, callback) {
    const { Nome_tema } = cliente;
    const db = openDbConnection();
    db.run("UPDATE Temas SET Nome_tema = ?, WHERE Tema_id = ?",
        [Nome_tema, id], function (err) {
            db.close();
            callback(err, { changes: this.changes });
        });
}

module.exports = {
    getAllTemas,
    createTema,
    updateTema
};