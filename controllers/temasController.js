const Temas = require('../models/temasModel');
exports.getAllTemas = (req, res) => {
    Temas.getAllTemas((err, temas) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(temas);
        }
    });
};

exports.createTema = (req, res) => {
Temas.createTema(req.body, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).json(result);
        }
    });
};

exports.updateTema= (req, res) => {
    Temas.updateTema(req.params.id, req.body, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else if (result.changes) {
            res.status(200).json(result);
        } else {
            res.status(404).send({ message: 'Tema não encontrado' });
        }
    });
};