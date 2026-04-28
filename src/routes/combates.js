const { Router } = require('express');
const control = require('../controllers/combateController');
const router = Router();

//POST   combates   → Simula un combate (body: { id1, id2 })
router.post('/', control.simularCombate);

//GET  combates/historial     → Lista combates guardados (bonus)
//router.get('/historial', control.historial);


module.exports = router;