const biodiversidadeService = require('../services/biodiversidade.service')

async function getAll(req, res, next) {
  try {
    const { type } = req.query
    const especies = await biodiversidadeService.findAll({ type })
    res.json({ data: especies, count: especies.length })
  } catch (error) {
    next(error)
  }
}

async function getById(req, res, next) {
  try {
    const id = parseInt(req.params.id)
    const especie = await biodiversidadeService.findById(id)
    res.json({ data: especie })
  } catch (error) {
    next(error)
  }
}

async function create(req, res, next) {
  try {
    const especie = await biodiversidadeService.create(req.body)
    res.status(201).json({ data: especie, message: 'Espécie cadastrada!' })
  } catch (error) {
    next(error)
  }
}

async function update(req, res, next) {
  try {
    const id = parseInt(req.params.id)
    const { nome, tipo, descricao, imagem } = req.body
    const especie = await biodiversidadeService.update(id, { nome, tipo, descricao, imagem })
    res.json({ data: especie, message: 'Espécie atualizada.' })
  } catch (error) {
    next(error)
  }
}

async function remove(req, res, next) {
  try {
    const id = parseInt(req.params.id)
    await biodiversidadeService.remove(id)
    res.json({ message: 'Espécie removida.' })
  } catch (error) {
    next(error)
  }
}

module.exports = { getAll, getById, create, update, remove }
