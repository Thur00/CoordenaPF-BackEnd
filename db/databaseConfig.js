// Importa os módulos Connection e Request do pacote 'tedious'
const { Connection, Request } = require("tedious");
// Configurações para conexão com o banco de dados SQL Server
const config = {
server: "localhost", // Endereço do servidor SQL Server
authentication: { // Configuração de autenticação
type: "default", // Tipo de autenticação (padrão)
options: { // Opções de autenticação
userName: "sa", // Nome de usuário para autenticação
password: "12345", // Senha do usuário
},
},
options: { // Opções adicionais de conexão
port: 1433, // Porta do servidor SQL Server
database: "G15", // Nome do banco de dados
encrypt: true, // Indica se a conexão deve ser criptografada
trustServerCertificate: true, // Necessário para conexões locais/de desenvolvimento
},
};
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
Request,
};