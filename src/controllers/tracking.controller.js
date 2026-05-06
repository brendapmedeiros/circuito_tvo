// src/controllers/tracking.controller.js

const trackingService = require('../services/tracking.service')

async function register(req, res, next) {
  try {
    const userEvent = await trackingService.registerEvent(req.body)
    res.status(201).json({ data: userEvent, message: 'Evento registrado com sucesso' })
  } catch (error) {
    next(error)
  }
}

module.exports = { register }
