const express = require("express");
const router = express.Router();
const pesquisaController = require("../controllers/pesquisaController");

router.get("/rm/:rm", pesquisaController.getAlunoByRm);
router.get("/nome/:nome", pesquisaController.getAlunoByNome);
router.get("/tema/:tema", pesquisaController.getAlunoByTema);
router.get("/di/:data_inicial/df/:data_final", pesquisaController.getAlunoByData);
router.get("/status/:status", pesquisaController.getAlunoByStatus);
router.get("/urgencia/:urgencia", pesquisaController.getAlunoByUrgencia);

module.exports = router;



