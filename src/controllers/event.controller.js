// src/controllers/event.controller.js

const eventService = require('../services/event.service')

async function getAll(req, res, next) {
  try {
    const events = await eventService.findAll()
    res.json({ data: events, count: events.length })
  } catch (error) {
    next(error)
  }
}

async function getById(req, res, next) {
  try {
    const id = parseInt(req.params.id)
    const event = await eventService.findById(id)
    res.json({ data: event })
  } catch (error) {
    next(error)
  }
}

async function create(req, res, next) {
  try {
    const event = await eventService.create(req.body)
    res.status(201).json({ data: event, message: 'Evento criado com sucesso' })
  } catch (error) {
    next(error)
  }
}

async function update(req, res, next) {
  try {
    const id = parseInt(req.params.id)
    const event = await eventService.update(id, req.body)
    res.json({ data: event, message: 'Evento atualizado com sucesso' })
  } catch (error) {
    next(error)
  }
}

async function remove(req, res, next) {
  try {
    const id = parseInt(req.params.id)
    await eventService.remove(id)
    res.json({ message: 'Evento removido com sucesso' })
  } catch (error) {
    next(error)
  }
}

module.exports = { getAll, getById, create, update, remove }
