const { Router } = require('express')
const trackingController = require('../controllers/tracking.controller')

const router = Router()

router.post('/', trackingController.registrar)

module.exports = router
