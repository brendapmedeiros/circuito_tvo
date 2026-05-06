// src/app.js
// Configuração central do Express

require('dotenv').config()

const express = require('express')
const cors = require('cors')

const trailRoutes = require('./routes/trail.routes')
const eventRoutes = require('./routes/event.routes')
const biodiversityRoutes = require('./routes/biodiversity.routes')
const trackingRoutes = require('./routes/tracking.routes')
const metricsRoutes = require('./routes/metrics.routes')
const errorHandler = require('./middlewares/errorHandler')

const app = express()

// --- Middlewares globais ---
app.use(cors())
app.use(express.json())

// --- Rota de health check ---
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    project: 'circuito_tvo',
    timestamp: new Date().toISOString(),
  })
})

// --- Rotas da API ---
app.use('/trails', trailRoutes)
app.use('/events', eventRoutes)
app.use('/biodiversity', biodiversityRoutes)
app.use('/tracking', trackingRoutes)
app.use('/metrics', metricsRoutes)

// --- Rota 404 ---
app.use((req, res) => {
  res.status(404).json({ error: `Rota não encontrada: ${req.method} ${req.path}` })
})

// --- Middleware de erro (deve ser o último) ---
app.use(errorHandler)

module.exports = app
