// app.js
const express = require('express');
const app = express();
const port = 3000;

// Middleware para analisar o corpo das requisições em JSON
app.use(express.json());

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

// Iniciando o servidor na porta especificada
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});