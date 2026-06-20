const eventosService = require('../services/eventos.service')

function validarId(id) {
  if (Number.isNaN(id)) {
    const error = new Error('ID inválido')
    error.statusCode = 400
    throw error
  }
}

async function getAll(req, res, next) {
  try {
    const eventos = await eventosService.findAll()
    res.json({ data: eventos, count: eventos.length })
  } catch (error) {
    next(error)
  }
}

async function getById(req, res, next) {
  try {
    const id = parseInt(req.params.id)
    validarId(id)
    const event = await eventosService.findById(id)
    res.json({ data: event })
  } catch (error) {
    next(error)
  }
}

async function create(req, res, next) {
  try {
    const event = await eventosService.create(req.body)
    res.status(201).json({ data: event, message: 'Evento criado!' })
  } catch (error) {
    next(error)
  }
}

async function update(req, res, next) {
  try {
    const id = parseInt(req.params.id)
    validarId(id)
    const { titulo, data, localizacao, descricao } = req.body
    const event = await eventosService.update(id, { titulo, data, localizacao, descricao })
    res.json({ data: event, message: 'Evento atualizado.' })
  } catch (error) {
    next(error)
  }
}

async function remove(req, res, next) {
  try {
    const id = parseInt(req.params.id)
    validarId(id)
    await eventosService.remove(id)
    res.json({ message: 'Evento removido.' })
  } catch (error) {
    next(error)
  }
}

module.exports = { getAll, getById, create, update, remove }
