/* Config do Express */

require('dotenv').config()

const express = require('express')
const cors = require('cors')
const path = require('path')

const trailRoutes = require('./routes/trilhas.routes')
const eventRoutes = require('./routes/eventos.routes')
const biodiversityRoutes = require('./routes/biodiversidade.routes')
const trackingRoutes = require('./routes/tracking.routes')
const metricsRoutes = require('./routes/metricas.routes')
const errorHandler = require('./middlewares/errorHandler')

const app = express()

/* Middleware */

app.use(cors())
app.use(express.json())

/* check saúde */
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    projeto: 'circuito_tvo',
    timestamp: new Date().toISOString(),
  })
})
app.use(express.static(path.join(__dirname, '../public')))
/* Rotas */
app.use('/trilhas', trailRoutes)
app.use('/eventos', eventRoutes)
app.use('/biodiversidade', biodiversityRoutes)
app.use('/tracking', trackingRoutes)
app.use('/metricas', metricsRoutes)

/* rota 404 */
app.use((req, res) => {
  res.status(404).json({ error: `Rota não encontrada: ${req.method} ${req.path}` })
})


app.use(errorHandler)

module.exports = app
