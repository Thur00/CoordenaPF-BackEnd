// Importa os módulos Connection e Request do pacote 'tedious'
const { Connection } = require("tedious");
// Configurações para conexão com o banco de dados SQL Server
const config = require("../config/config");
// Função assíncrona para conectar ao banco de dados
async function connectDatabase() {
    return new Promise((resolve, reject) => {
        // Cria uma nova instância de conexão usando as configurações definidas
        const connection = new Connection(config);
        // Evento 'connect' é disparado quando a conexão é estabelecida
        connection.on("connect", (err) => {
            if (err) { // Se houver erro na conexão
                reject(err); // Rejeita a promessa com o erro
            } else { // Se a conexão for bem-sucedida
                console.log("Conexão com o banco de dados realizada com sucesso!"); // Exibe uma mensagem de sucesso na console
                resolve(connection); // Resolve a promessa com o objeto de conexão
            }
        });
        // Estabelece a conexão com o banco de dados
        connection.connect();
    });
}
// Exporta a função de conexão e o objeto Request para uso em outras partes do código
module.exports = {
    connectDatabase,
};