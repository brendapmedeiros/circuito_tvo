// src/controllers/biodiversity.controller.js

const biodiversityService = require('../services/biodiversity.service')

async function getAll(req, res, next) {
  try {
    // Suporte a filtro por tipo: GET /biodiversity?type=fauna
    const { type } = req.query
    const species = await biodiversityService.findAll({ type })
    res.json({ data: species, count: species.length })
  } catch (error) {
    next(error)
  }
}

async function getById(req, res, next) {
  try {
    const id = parseInt(req.params.id)
    const species = await biodiversityService.findById(id)
    res.json({ data: species })
  } catch (error) {
    next(error)
  }
}

async function create(req, res, next) {
  try {
    const species = await biodiversityService.create(req.body)
    res.status(201).json({ data: species, message: 'Espécie cadastrada com sucesso' })
  } catch (error) {
    next(error)
  }
}

async function update(req, res, next) {
  try {
    const id = parseInt(req.params.id)
    const species = await biodiversityService.update(id, req.body)
    res.json({ data: species, message: 'Espécie atualizada com sucesso' })
  } catch (error) {
    next(error)
  }
}

async function remove(req, res, next) {
  try {
    const id = parseInt(req.params.id)
    await biodiversityService.remove(id)
    res.json({ message: 'Espécie removida com sucesso' })
  } catch (error) {
    next(error)
  }
}

module.exports = { getAll, getById, create, update, remove }
