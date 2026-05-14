// src/services/event.service.js
// Lógica de negócio para eventos

const prisma = require('../database/prisma')

async function findAll() {
  return prisma.event.findMany({
    orderBy: { date: 'asc' },
  })
}

async function findById(id) {
  const event = await prisma.event.findUnique({ where: { id } })
  if (!event) {
    const error = new Error(`Evento com id ${id} não encontrado`)
    error.statusCode = 404
    throw error
  }
  return event
}

async function create(data) {
  const { titulo, data, localizacao, descricao } = data

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

  return prisma.event.create({ data: { titulo, data: parsedDate, localizacao, descricao } })
}

async function update(id, data) {
  await findById(id)

  if (data.date) {
    const parsedDate = new Date(data.date)
    if (isNaN(parsedDate.getTime())) {
      const error = new Error('Formatoinválido.')
      error.statusCode = 400
      throw error
    }
    data.date = parsedDate
  }

  return prisma.event.update({ where: { id }, data })
}

async function remove(id) {
  await findById(id)
  await prisma.event.delete({ where: { id } })
}

module.exports = { findAll, findById, create, update, remove }
