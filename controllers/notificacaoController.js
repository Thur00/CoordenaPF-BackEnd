//notificacaoController.js
const Notificacao = require('../models/notificacaoModel');
// Controlador para obter todos os Notificaca
exports.getAllNotificacao = (req, res) => {
    Notificacao.getAllNotificacao((err, notificacao
    
    ) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(notificacao
            
            );
        }
    });
};

// Controlador para criar um novo cliente
exports.createNotificacao = (req, res) => {
    Notificacao.createNotificacao(req.body, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).json(result);
        }
    });
};

// Controlador para atualizar um cliente existente
exports.updateNotificacao = (req, res) => {
    Notificacao.updateNotificacao(req.params.id, req.body, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else if (result.changes) {
            res.status(200).json(result);
        } else {
            res.status(404).send({ message: 'Notificaçao não encontrado' });
        }
    });
};
