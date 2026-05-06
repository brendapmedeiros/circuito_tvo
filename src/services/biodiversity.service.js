// src/services/biodiversity.service.js
// Lógica de negócio para biodiversidade

const prisma = require('../database/prisma')

const VALID_TYPES = ['fauna', 'flora']

async function findAll({ type } = {}) {
  const where = type ? { type } : {}
  return prisma.biodiversity.findMany({
    where,
    orderBy: { name: 'asc' },
  })
}

async function findById(id) {
  const species = await prisma.biodiversity.findUnique({ where: { id } })
  if (!species) {
    const error = new Error(`Espécie com id ${id} não encontrada`)
    error.statusCode = 404
    throw error
  }
  return species
}

async function create(data) {
  const { name, type, description } = data

  if (!name || !type) {
    const error = new Error('Campos obrigatórios: name, type')
    error.statusCode = 400
    throw error
  }

  if (!VALID_TYPES.includes(type)) {
    const error = new Error(`Tipo inválido. Use: ${VALID_TYPES.join(' ou ')}`)
    error.statusCode = 400
    throw error
  }

  return prisma.biodiversity.create({ data: { name, type, description } })
}

async function update(id, data) {
  await findById(id) // garante que existe

  if (data.type && !VALID_TYPES.includes(data.type)) {
    const error = new Error(`Tipo inválido. Use: ${VALID_TYPES.join(' ou ')}`)
    error.statusCode = 400
    throw error
  }

  return prisma.biodiversity.update({ where: { id }, data })
}

async function remove(id) {
  await findById(id) // garante que existe
  await prisma.biodiversity.delete({ where: { id } })
}

module.exports = { findAll, findById, create, update, remove }
