const trackingService = require('../services/tracking.service')

async function registrar(req, res, next) {
  try {
    const userEvent = await trackingService.registrarEvento(req.body)
    res.status(201).json({ data: userEvent, message: 'Evento registrado.' })
  } catch (error) {
    next(error)
  }
}

module.exports = { registrar }
