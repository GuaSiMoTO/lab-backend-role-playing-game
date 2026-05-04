const { Router } = require('express')
const validar = require('../middleware/validarCampos')
const control = require('../controllers/combateController')

const router = Router()

// BONUS: para el historial
router.get('/historial/:id', control.historial)

router.post('/', validar(['id1', 'id2']), control.simular)

module.exports = router