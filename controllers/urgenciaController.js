//clienteController.js
const Urgencia = require('../models/urgenciaModel');
// Controlador para obter todos os clientes
exports.getAllUrgencias = (req, res) => {
    Urgencia.getAllUrgencias((err, Urgencia) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(Urgencia);
        }
    });
};

// Controlador para criar um novo Urgencia
exports.createUrgencia = (req, res) => {
    Urgencia.createUrgencia(req.body, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).json(result);
        }
    });
};
// Controlador para atualizar um cliente existente
exports.updateUrgencia = (req, res) => {
    Urgencia.updateUrgencia(req.params.id, req.body, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else if (result.changes) {
            res.status(200).json(result);
        } else {
            res.status(404).send({ message: 'Urgencia não encontrada' });
        }
    });
};