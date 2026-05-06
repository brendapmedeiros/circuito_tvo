// src/controllers/trail.controller.js
// Responsável por receber requests HTTP e retornar respostas para trilhas

const trailService = require('../services/trail.service')

async function getAll(req, res, next) {
  try {
    const trails = await trailService.findAll()
    res.json({ data: trails, count: trails.length })
  } catch (error) {
    next(error)
  }
}

async function getById(req, res, next) {
  try {
    const id = parseInt(req.params.id)
    const trail = await trailService.findById(id)
    res.json({ data: trail })
  } catch (error) {
    next(error)
  }
}

async function create(req, res, next) {
  try {
    const trail = await trailService.create(req.body)
    res.status(201).json({ data: trail, message: 'Trilha criada com sucesso' })
  } catch (error) {
    next(error)
  }
}

async function update(req, res, next) {
  try {
    const id = parseInt(req.params.id)
    const trail = await trailService.update(id, req.body)
    res.json({ data: trail, message: 'Trilha atualizada com sucesso' })
  } catch (error) {
    next(error)
  }
}

async function remove(req, res, next) {
  try {
    const id = parseInt(req.params.id)
    await trailService.remove(id)
    res.json({ message: 'Trilha removida com sucesso' })
  } catch (error) {
    next(error)
  }
}

module.exports = { getAll, getById, create, update, remove }
