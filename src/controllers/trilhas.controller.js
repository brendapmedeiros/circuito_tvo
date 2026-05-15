const trilhasService = require('../services/trilhas.service')

async function getAll(req, res, next) {
  try {
    const trails = await trilhasService.findAll()
    res.json({ data: trails, count: trails.length })
  } catch (error) {
    next(error)
  }
}

async function getById(req, res, next) {
  try {
    const id = parseInt(req.params.id)
    const trail = await trilhasService.findById(id)
    res.json({ data: trail })
  } catch (error) {
    next(error)
  }
}

async function create(req, res, next) {
  try {
    const trail = await trilhasService.create(req.body)
    res.status(201).json({ data: trail, message: 'Trilha criada!' })
  } catch (error) {
    next(error)
  }
}

async function update(req, res, next) {
  try {
    const id = parseInt(req.params.id)
    const trail = await trilhasService.update(id, req.body)
    res.json({ data: trail, message: 'Trilha atualizada.' })
  } catch (error) {
    next(error)
  }
}

async function remove(req, res, next) {
  try {
    const id = parseInt(req.params.id)
    await trilhasService.remove(id)
    res.json({ message: 'Trilha removida.' })
  } catch (error) {
    next(error)
  }
}

module.exports = { getAll, getById, create, update, remove }
