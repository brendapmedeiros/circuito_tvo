// src/routes/metrics.routes.js

const { Router } = require('express')
const metricsController = require('../controllers/metrics.controller')

const router = Router()

router.get('/most-viewed-trails', metricsController.getMostViewedTrails)
router.get('/events-engagement', metricsController.getEventsEngagement)

module.exports = router
