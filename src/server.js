const app = require('./app')
const prisma = require('./database/prisma')

const PORT = process.env.PORT || 3000

async function startServer() {
  try {
    await prisma.$connect()
    console.log('Banco conectado')

    app.listen(PORT, () => {
      console.log(` Servidor em http://localhost:${PORT}`)
      console.log(` Check saúde: http://localhost:${PORT}/health`)
      console.log(` Ambiente: ${process.env.NODE_ENV || 'development'}\n`)
    })
  } catch (error) {
    console.error('Não foi possível conectar ao banco de dados:', error.message)
    process.exit(1)
  }
}

// encerrametno
process.on('SIGINT', async () => {
  console.log('\n Encerrando servidor...')
  await prisma.$disconnect()
  process.exit(0)
})

startServer()
