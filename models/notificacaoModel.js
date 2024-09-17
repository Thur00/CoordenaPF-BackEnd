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

// Função para buscar todos os NOtificacao
function getAllNotificacao(callback) {
    const db = openDbConnection();
    db.all("SELECT * FROM Notificacao", [], (err, rows) => {
        db.close();
        callback(err, rows);
    });
}

// Função para criar um novo cliente
function createNotificacao(Notificacao, callback) {
    const { Cod_ocorrencia, Criador, Solicitado} = Notificacao;
    const db = openDbConnection();
    db.run("INSERT INTO Notificacao (Cod_ocorrencia, Criador, Solicitado) VALUES (?, ?, ? )", [Cod_ocorrencia,
         Criador, Solicitado], function (err) {
            db.close();
            callback(err, { id: this.lastID });
        }
    );
}

// Função para atualizar um cliente existente
function updateNotificacao(Notificacao_id, Notificacao, callback) {
    const { Cod_ocorrencia, Criador, Solicitado } = Notificacao;
    const db = openDbConnection();
    db.run("UPDATE Notificacao SET Cod_ocorrencia = ?, Criador = ?, Solicitado = ? WHERE Notificacao_id = ?",
        [Cod_ocorrencia, Criador, Solicitado, Notificacao_id], function (err) {
            db.close();
            callback(err, { changes: this.changes });
        });
}


module.exports = {
    getAllNotificacao,
    createNotificacao,
    updateNotificacao
};