//clienteController.js
const Aspecto = require('../models/aspectoModel');
// Controlador para obter todos os clientes
exports.getAllAspectos = (req, res) => {
    Aspecto.getAllAspectos((err, aspectos) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(aspectos);
        }
    }); 
};

// Controlador para criar um novo cliente
exports.createAspecto = (req, res) => {
    Aspecto.createAspecto(req.body, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).json(result);
        }
    });
};
// Controlador para atualizar um cliente existente
exports.updateAspecto = (req, res) => {
   Aspecto.updateAspecto(req.params.id, req.body, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else if (result.changes) {
            res.status(200).json(result);
        } else {
            res.status(404).send({ message: 'Aspecto não encontrado' });
        }
    });
};

