const { Router } = require('express')
const eventosController = require('../controllers/eventos.controller')

const router = Router()

router.get('/', eventosController.getAll)
router.get('/:id', eventosController.getById)
router.post('/', eventosController.create)
router.put('/:id', eventosController.update)
router.delete('/:id', eventosController.remove)

module.exports = router
