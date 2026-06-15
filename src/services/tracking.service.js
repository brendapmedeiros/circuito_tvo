// src/services/tracking.service.js
// Tracking de eventos do usuário

const prisma = require('../database/prisma')

const TIPOS_ENTIDADE_VALIDOS = ['trail', 'eventos', 'biodiversidade']

async function registrarEvento(dados) {
  const { tipo_evento, entity_id, entity_tipo } = dados

  if (!tipo_evento || !entity_id || !entity_tipo) {
    const error = new Error('Campos obrigatórios: tipo_evento, entity_id, entity_tipo')
    error.statusCode = 400
    throw error
  }

  if (!TIPOS_ENTIDADE_VALIDOS.includes(entity_tipo)) {
    const error = new Error(`entity_tipo inválido. Use: ${TIPOS_ENTIDADE_VALIDOS.join(', ')}`)
    error.statusCode = 400
    throw error
  }

  if (typeof entity_id !== 'number' || entity_id <= 0) {
    const error = new Error('entity_id deve ser um número positivo')
    error.statusCode = 400
    throw error
  }

  return prisma.eventos_usuarios.create({
    data: { tipo_evento, entity_id, entity_tipo },
  })
}

async function listarUltimosEventos(limit = 20) {
  return prisma.eventos_usuarios.findMany({
    orderBy: { timestamp: 'desc' },
    take: limit,
  })
}

module.exports = { registrarEvento, listarUltimosEventos }