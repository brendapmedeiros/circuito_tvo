// src/server.js
// Ponto de entrada do servidor

const app = require('./app')
const prisma = require('./database/prisma')

const PORT = process.env.PORT || 3000

async function startServer() {
  try {
    // Testa a conexão com o banco antes de subir o servidor
    await prisma.$connect()
    console.log('✅ Banco de dados conectado')

    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando em http://localhost:${PORT}`)
      console.log(`📋 Health check: http://localhost:${PORT}/health`)
      console.log(`📌 Ambiente: ${process.env.NODE_ENV || 'development'}\n`)
    })
  } catch (error) {
    console.error('❌ Falha ao conectar ao banco de dados:', error.message)
    process.exit(1)
  }
}

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🔴 Encerrando servidor...')
  await prisma.$disconnect()
  process.exit(0)
})

startServer()
