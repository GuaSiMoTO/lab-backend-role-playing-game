const { Router } = require('express');
const control = require('../controllers/personajeController');
const router = Router();

router.get('/', control.listar);
router.get('/:id', control.obtenerPorId);
router.post('/manual', control.crearManual);
// router.post('/aleatorio', control.crearAleatorio) //dejarlo para mañana
router.put('/:id', control.actualizar);
router.delete('/:id', control.eliminar);

module.exports = router;