const { Router } = require('express')
const trackingController = require('../controllers/tracking.controller')

const router = Router()

router.post('/', trackingController.registrar)
router.get('/', trackingController.listar)

module.exports = router