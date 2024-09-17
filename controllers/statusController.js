//clienteController.js
const Status = require('../models/status');
// Controlador para obter todos os clientes
exports.getAllStatus= (req, res) => {
    Status.getAllStatus((err, status) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(status);
        }
    });
};

// Controlador para criar um novo cliente
exports.createStatus = (req, res) => {
    Cliente.createStatus(req.body, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).json(result);
        }
    });
};
// Controlador para atualizar um cliente existente
exports.updateStatus = (req, res) => {
    Cliente.updateStatus(req.params.id, req.body, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else if (result.changes) {
            res.status(200).json(result);
        } else {
            res.status(404).send({ message: 'Status não encontrado' });
        }
    });
};
