const { Router } = require('express')
const metricasController = require('../controllers/metricas.controller')

const router = Router()

router.get('/trilhas-mais-vistas', metricasController.getTrilhasMaisVistas)
router.get('/engajamento-eventos', metricasController.getEngajamentoEventos)

module.exports = router
