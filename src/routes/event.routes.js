// src/routes/event.routes.js

const { Router } = require('express')
const eventController = require('../controllers/event.controller')

const router = Router()

router.get('/', eventController.getAll)
router.get('/:id', eventController.getById)
router.post('/', eventController.create)
router.put('/:id', eventController.update)
router.delete('/:id', eventController.remove)

module.exports = router
