// src/routes/trail.routes.js

const { Router } = require('express')
const trailController = require('../controllers/trail.controller')

const router = Router()

router.get('/', trailController.getAll)
router.get('/:id', trailController.getById)
router.post('/', trailController.create)
router.put('/:id', trailController.update)
router.delete('/:id', trailController.remove)

module.exports = router
