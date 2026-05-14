const prisma = require('../database/prisma')

const tiposValidos = ['fauna', 'flora']

async function findAll({ type } = {}) {
  const where = type ? { type } : {}
  return prisma.biodiversidade.findMany({
    where,
    orderBy: { nome: 'asc' },
  })
}

async function findById(id) {
  const species = await prisma.biodiversidade.findUnique({ where: { id } })
  if (!species) {
    const error = new Error(`Espécie com id ${id} não encontrada`)
    error.statusCode = 404
    throw error
  }
  return species
}

async function create(data) {
  const { nome, tipo, descricao } = data

  if (!nome || !tipo) {
    const error = new Error('Campos obrigatórios: nome, tipo')
    error.statusCode = 400
    throw error
  }

  if (!tiposValidos.includes(tipo)) {
    const error = new Error(`Tipo inválido. Use: ${tiposValidos.join(' ou ')}`)
    error.statusCode = 400
    throw error
  }

  return prisma.biodiversidade.create({ data: { nome, tipo, descricao } })
}

async function update(id, data) {
  await findById(id) 

  if (data.tipo && !tiposValidos.includes(data.tipo)) {
    const error = new Error(`Tipo inválido. Use: ${tiposValidos.join(' ou ')}`)
    error.statusCode = 400
    throw error
  }

  return prisma.biodiversidade.update({ where: { id }, data })
}

async function remove(id) {
  await findById(id)
  await prisma.biodiversidade.delete({ where: { id } })
}

module.exports = { findAll, findById, create, update, remove }
