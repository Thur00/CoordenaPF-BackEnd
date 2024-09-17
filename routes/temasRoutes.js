const express = require('express');
const router = express.Router();
const temasController = require('../controllers/temasController');

router.get('/', temasController.getAllTemas);
router.post('/', temasController.createTema);
router.put('/:id', temasController.updateTema);
module.exports = router;