const express = require("express");
const router = express.Router();
const pesquisaController = require("../controllers/pesquisaController");

router.get("/:rm", pesquisaController.getAlunoByRm);
router.get("/:nome_completo", pesquisaController.getAlunoByNome);
router.get("/:tema", pesquisaController.getAlunoByTema);
router.get("/:data_inicial/:data_final", pesquisaController.getAlunoByData);
router.get("/:status", pesquisaController.getAlunoByStatus);
router.get("/:urgencia", pesquisaController.getAlunoByUrgencia);

module.exports = router;



