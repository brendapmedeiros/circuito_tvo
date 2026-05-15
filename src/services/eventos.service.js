const prisma = require('../database/prisma')

async function findAll() {
  return prisma.eventos.findMany({
    orderBy: { data: 'asc' },
  })
}

async function findById(id) {
  const event = await prisma.eventos.findUnique({ where: { id } })
  if (!event) {
    const error = new Error(`Evento ${id} não encontrado`)
    error.statusCode = 404
    throw error
  }
  return event
}

async function create(body) {
  const { titulo, data, localizacao, descricao } = body

  if (!titulo || !data || !localizacao) {
    const error = new Error('Campos obrigatórios: titulo, data, localizacao')
    error.statusCode = 400
    throw error
  }

  const parsedDate = new Date(data)
  if (isNaN(parsedDate.getTime())) {
    const error = new Error('Data inválida. Use formato ISO 8601 (ex: 2025-07-15T08:00:00Z)')
    error.statusCode = 400
    throw error
  }

  return prisma.eventos.create({ data: { titulo, data: parsedDate, localizacao, descricao } })
}

async function update(id, body) {
  await findById(id)

  if (body.data) {
    const parsedDate = new Date(body.data)
    if (isNaN(parsedDate.getTime())) {
      const error = new Error('Formato de data inválido.')
      error.statusCode = 400
      throw error
    }
    body.data = parsedDate
  }

  return prisma.eventos.update({ where: { id }, data: body })
}

async function remove(id) {
  await findById(id)
  await prisma.eventos.delete({ where: { id } })
}

module.exports = { findAll, findById, create, update, remove }