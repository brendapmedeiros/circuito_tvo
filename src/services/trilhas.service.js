const prisma = require('../database/prisma')

const dificuldadesValidas = ['facil', 'moderado', 'dificil']

async function findAll() {
  return prisma.trail.findMany({
    orderBy: { createdAt: 'desc' },
  })
}

async function findById(id) {
  const trail = await prisma.trail.findUnique({ where: { id } })
  if (!trail) {
    const error = new Error(`Trilha ${id} não encontrada`)
    error.statusCode = 404
    throw error
  }
  return trail
}

async function create(data) {
  const { nome, dificuldade, distancia, localizacao, descricao } = data

  if (!nome || !dificuldade || !distancia || !localizacao) {
    const error = new Error('Campos obrigatórios: nome, dificuldade, distancia, localizacao')
    error.statusCode = 400
    throw error
  }

  if (!dificuldadesValidas.includes(dificuldade)) {
    const error = new Error(`Nível de dificuldade inválido. Use: ${dificuldadesValidas.join(', ')}`)
    error.statusCode = 400
    throw error
  }

  if (distancia <= 0) {
    const error = new Error('A distância precisa ser maior que 0.')
    error.statusCode = 400
    throw error
  }

  return prisma.trail.create({ data: { nome, dificuldade, distancia, localizacao, descricao } })
}

async function update(id, data) {
  await findById(id)

  const { dificuldade } = data
  if (dificuldade && !dificuldadesValidas.includes(dificuldade)) {
    const error = new Error(`Nível de dificuldade inválido. Use: ${dificuldadesValidas.join(', ')}`)
    error.statusCode = 400
    throw error
  }

  return prisma.trail.update({ where: { id }, data })
}

async function remove(id) {
  await findById(id)
  await prisma.trail.delete({ where: { id } })
}

module.exports = { findAll, findById, create, update, remove }
