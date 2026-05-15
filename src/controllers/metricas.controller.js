const metricasService = require('../services/metricas.service')

async function getTrilhasMaisVistas(req, res, next) {
  try {
    const limit = parseInt(req.query.limit) || 10
    const data = await metricasService.getTrilhasMaisVistas(limit)
    res.json({ data })
  } catch (error) {
    next(error)
  }
}

async function getEngajamentoEventos(req, res, next) {
  try {
    const data = await metricasService.getEngajamentoEventos()
    res.json({ data })
  } catch (error) {
    next(error)
  }
}

module.exports = { getTrilhasMaisVistas, getEngajamentoEventos }
