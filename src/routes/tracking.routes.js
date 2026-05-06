// src/routes/tracking.routes.js

const { Router } = require('express')
const trackingController = require('../controllers/tracking.controller')

const router = Router()

router.post('/', trackingController.register)

module.exports = router
