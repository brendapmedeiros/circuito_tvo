// src/routes/biodiversidade.routes.js

const { Router } = require('express')
const biodiversityController = require('../controllers/biodiversidade.controller')

const router = Router()

router.get('/', biodiversityController.getAll)
router.get('/:id', biodiversityController.getById)
router.post('/', biodiversityController.create)
router.put('/:id', biodiversityController.update)
router.delete('/:id', biodiversityController.remove)

module.exports = router
