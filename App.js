// app.js

// Importa o módulo "express" para criar o servidor
const express = require("express");

// Cria uma instância do Express, que será usada como a aplicação principal
const app = express();

// Importa o middleware "cors" para habilitar o compartilhamento de recursos entre diferentes origens (Cross-Origin Resource Sharing)
const cors = require('cors');

// Define a porta em que o servidor vai rodar. Primeiro tenta usar a variável de ambiente PORT, senão usa a porta 3001
const port = process.env.PORT || 3001;

// Carrega as variáveis de ambiente do arquivo .env
require("dotenv").config();

// Middleware do Express para interpretar o corpo das requisições como JSON
app.use(express.json());

// Middleware "cors" para permitir requisições de diferentes origens (evita problemas de CORS)
app.use(cors());

// Importando as rotas dos alunos
const alunoRoutes = require('./routes/alunoRoutes');

// Importando as rotas dos aspectos
const aspectoRoutes = require('./routes/aspectoRoutes');

// Importando as rotas dos encaminhamentos
const encaminhamentoRoutes = require('./routes/encaminhamentoRoutes');

// Importando as rotas dos status
const statusRoutes = require('./routes/statusRoutes');

// Importando as rotas dos temas
const temasRoutes = require('./routes/temasRoutes');

// Importando as rotas dos 
const urgenciaRoutes = require('./routes/urgenciaRoutes');

// Usando as rotas do cliente com o prefixo '/alunos'
app.use('/alunos', alunoRoutes);

// Usando as rotas do cliente com o prefixo '/aspectos'
app.use('/aspectos', aspectoRoutes);

// Usando as rotas do cliente com o prefixo '/encaminhamentos'
app.use('/encaminhamentos', encaminhamentoRoutes);

// Usando as rotas do cliente com o prefixo '/'status
app.use('/status', statusRoutes);

// Usando as rotas do cliente com o prefixo '/temas'
app.use('/temas', temasRoutes);

// Usando as rotas do cliente com o prefixo '/urgencias'
app.use('/urgencias', urgenciaRoutes);

// Inicia o servidor na porta definida e exibe uma mensagem no console
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});