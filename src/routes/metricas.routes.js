// src/routes/metrics.routes.js

const { Router } = require('express')
const metricasController = require('../controllers/metricas.controller')

const router = Router()

router.get('/trilhas-mais-vistas', metricasController.getTrilhasMaisVistas)
router.get('/events-engajamento', metricasController.getEngajamentoEventos)

module.exports = router
