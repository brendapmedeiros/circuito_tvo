const trackingService = require('../services/tracking.service')

async function registrar(req, res, next) {
  try {
    const evento = await trackingService.registrarEvento(req.body)
    res.status(201).json({ data: evento, message: 'Evento registrado com sucesso' })
  } catch (error) {
    next(error)
  }
}

async function listar(req, res, next) {
  try {
    const limit = parseInt(req.query.limit) || 20
    const eventos = await trackingService.listarUltimosEventos(limit)
    res.json({ data: eventos, count: eventos.length })
  } catch (error) {
    next(error)
  }
}

module.exports = { registrar, listar }