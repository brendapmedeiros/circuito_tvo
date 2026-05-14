const { Router } = require('express')
const trilhasController = require('../controllers/trilhas.controller')

const router = Router()

router.get('/', trilhasController.getAll)
router.get('/:id', trilhasController.getById)
router.post('/', trilhasController.create)
router.put('/:id', trilhasController.update)
router.delete('/:id', trilhasController.remove)

module.exports = router
