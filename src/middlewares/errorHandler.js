// src/middlewares/errorHandler.js
// Middleware central de tratamento de erros

function errorHandler(error, req, res, next) {
  // Erros conhecidos (lançados pelos services)
  if (error.statusCode) {
    return res.status(error.statusCode).json({
      error: error.message,
    })
  }

  // Erros do Prisma (ex: violação de constraint, campo não encontrado)
  if (error.code) {
    if (error.code === 'P2002') {
      return res.status(409).json({ error: 'Registro duplicado' })
    }
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Registro não encontrado' })
    }
  }

  // Erro genérico (inesperado)
  console.error('[ERROR]', error)
  res.status(500).json({ error: 'Erro interno do servidor' })
}

module.exports = errorHandler
