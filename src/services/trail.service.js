// src/services/trail.service.js
// Lógica de negócio para trilhas

const prisma = require('../database/prisma')

const VALID_DIFFICULTIES = ['facil', 'moderado', 'dificil']

async function findAll() {
  return prisma.trail.findMany({
    orderBy: { createdAt: 'desc' },
  })
}

async function findById(id) {
  const trail = await prisma.trail.findUnique({ where: { id } })
  if (!trail) {
    const error = new Error(`Trilha com id ${id} não encontrada`)
    error.statusCode = 404
    throw error
  }
  return trail
}

async function create(data) {
  const { name, difficulty, distance, location, description } = data

  if (!name || !difficulty || !distance || !location) {
    const error = new Error('Campos obrigatórios: name, difficulty, distance, location')
    error.statusCode = 400
    throw error
  }

  if (!VALID_DIFFICULTIES.includes(difficulty)) {
    const error = new Error(`Dificuldade inválida. Use: ${VALID_DIFFICULTIES.join(', ')}`)
    error.statusCode = 400
    throw error
  }

  if (distance <= 0) {
    const error = new Error('A distância deve ser maior que 0')
    error.statusCode = 400
    throw error
  }

  return prisma.trail.create({ data: { name, difficulty, distance, location, description } })
}

async function update(id, data) {
  await findById(id) // garante que existe

  const { difficulty } = data
  if (difficulty && !VALID_DIFFICULTIES.includes(difficulty)) {
    const error = new Error(`Dificuldade inválida. Use: ${VALID_DIFFICULTIES.join(', ')}`)
    error.statusCode = 400
    throw error
  }

  return prisma.trail.update({ where: { id }, data })
}

async function remove(id) {
  await findById(id) // garante que existe
  await prisma.trail.delete({ where: { id } })
}

module.exports = { findAll, findById, create, update, remove }
