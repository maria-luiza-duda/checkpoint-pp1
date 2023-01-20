const express = require('express');
const router = express.Router();
const categoria = require('../controller/Categoria');


//Categoria

router.post('/criar/categoria', categoria.create);
router.get('/listar/categoria/:page', categoria.findAll);
router.put('/atualizar/categoria/:id', categoria.update);


module.exports = router;