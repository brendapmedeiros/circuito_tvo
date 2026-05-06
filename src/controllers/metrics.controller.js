// src/controllers/metrics.controller.js

const metricsService = require('../services/metrics.service')

async function getMostViewedTrails(req, res, next) {
  try {
    const limit = parseInt(req.query.limit) || 10
    const data = await metricsService.getMostViewedTrails(limit)
    res.json({ data })
  } catch (error) {
    next(error)
  }
}

async function getEventsEngagement(req, res, next) {
  try {
    const data = await metricsService.getEventsEngagement()
    res.json({ data })
  } catch (error) {
    next(error)
  }
}

module.exports = { getMostViewedTrails, getEventsEngagement }
