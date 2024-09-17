// Função para buscar todos os clientes
function getAllAspecto(callback) {
    const db = openDbConnection();
    db.all("SELECT * FROM aspecto", [], (err, rows) => {
        db.close();
        callback(err, rows);
    });
} 
// Função para buscar um cliente por ID
function getAspectoById(id, callback) {
    const db = openDbConnection();
    db.get("SELECT * FROM aspecto WHERE id = ?", [id], (err, row) => {
        db.close();
        callback(err, row);
    });
}
// Função para criar um novo cliente
function createAspecto(aspecto, callback) {
    const { nome } = aspecto;
    const db = openDbConnection();
    db.run("INSERT INTO aspectos (Nome) VALUES (?)", [nome], function (err) {
            db.close();
            callback(err, { id: this.lastID });
        }
    );
}
// Função para atualizar um cliente existente
function updateAspecto(id, aspecto, callback) {
    const { nome } = aspecto;
    const db = openDbConnection();
    db.run("UPDATE aspecto SET Nome = ?",
        [Nome, id], function (err) {
            db.close();
            callback(err, { changes: this.changes });
        });
}
module.exports = {
    getAllAspecto,
    getAspectoById,
    createAspecto,
    updateAspecto
};