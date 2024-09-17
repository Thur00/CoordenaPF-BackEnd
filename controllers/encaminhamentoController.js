//encaminhamentoController.js
const Encaminhamento = require('../models/encaminhamentoModel');
// Controlador para obter todos os encaminhamento
exports.getAllEncaminhamento = (req, res) => {
    Encaminhamento.getAllEncaminhamento((err, encaminhamento
    
    ) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(encaminhamento
            
            );
        }
    });
};

// Controlador para criar um novo encaminhamento
exports.createEncaminhamento = (req, res) => {
    Encaminhamento.createEncaminhamento(req.body, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).json(result);
        }
    });
};

// Controlador para atualizar um encaminhamento existente
exports.updateEncaminhamento = (req, res) => {
    Encaminhamento.updateEncaminhamento(req.params.id, req.body, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else if (result.changes) {
            res.status(200).json(result);
        } else {
            res.status(404).send({ message: 'Encaminhamento não encontrado' });
        }
    });
};
