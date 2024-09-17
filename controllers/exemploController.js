//clienteController.js
const Cliente = require('../models/cliente');
// Controlador para obter todos os clientes
exports.getAllClientes = (req, res) => {
    Cliente.getAllClientes((err, clientes) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(clientes);
        }
    });
};
// Controlador para obter um cliente pelo ID
exports.getClienteById = (req, res) => {
    Cliente.getClienteById(req.params.id, (err, cliente) => {
        if (err) {
            res.status(500).send(err);
        } else if (cliente) {
            res.json(cliente);
        } else {
            res.status(404).send({ message: 'Cliente não encontrado' });
        }
    });
};

// Controlador para criar um novo cliente
exports.createCliente = (req, res) => {
    Cliente.createCliente(req.body, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).json(result);
        }
    });
};
// Controlador para atualizar um cliente existente
exports.updateCliente = (req, res) => {
    Cliente.updateCliente(req.params.id, req.body, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else if (result.changes) {
            res.status(200).json(result);
        } else {
            res.status(404).send({ message: 'Cliente não encontrado' });
        }
    });
};
// Controlador para deletar um cliente
exports.deleteCliente = (req, res) => {
    Cliente.deleteCliente(req.params.id, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else if (result.changes) {
            res.status(200).json({ message: 'Cliente deletado com sucesso' });
        } else {
            res.status(404).send({ message: 'Cliente não encontrado' });
        }
    });
};