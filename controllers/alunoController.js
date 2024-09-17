//clienteController.js
const Aluno = require('../models/alunoModel');
// Controlador para obter todos os clientes
exports.getAllAlunos = (req, res) => {
    Aluno.getAllAlunos((err, alunos) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(alunos);
        }
    });
};
// Controlador para obter um cliente pelo ID
exports.getAlunoByTurma = (req, res) => {
    Aluno.getAlunoByTurma(req.params.id, (err, aluno) => {
        if (err) {
            res.status(500).send(err);
        } else if (aluno) {
            res.json(aluno);
        } else {
            res.status(404).send({ message: 'Aluno não encontrado' });
        }
    });
};

// Controlador para criar um novo cliente
exports.createAluno = (req, res) => {
    Aluno.createAluno(req.body, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).json(result);
        }
    });
};
// Controlador para atualizar um cliente existente
exports.updateAluno = (req, res) => {
    Aluno.updateAluno(req.params.id, req.body, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else if (result.changes) {
            res.status(200).json(result);
        } else {
            res.status(404).send({ message: 'Aluno não encontrado' });
        }
    });
};