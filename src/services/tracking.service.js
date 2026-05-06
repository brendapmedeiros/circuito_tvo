// src/services/tracking.service.js
// Lógica de negócio para tracking de eventos do usuário

const prisma = require('../database/prisma')

const VALID_ENTITY_TYPES = ['trail', 'event', 'biodiversity']

async function registerEvent(data) {
  const { event_type, entity_id, entity_type } = data

  if (!event_type || !entity_id || !entity_type) {
    const error = new Error('Campos obrigatórios: event_type, entity_id, entity_type')
    error.statusCode = 400
    throw error
  }

  if (!VALID_ENTITY_TYPES.includes(entity_type)) {
    const error = new Error(`entity_type inválido. Use: ${VALID_ENTITY_TYPES.join(', ')}`)
    error.statusCode = 400
    throw error
  }

  if (typeof entity_id !== 'number' || entity_id <= 0) {
    const error = new Error('entity_id deve ser um número inteiro positivo')
    error.statusCode = 400
    throw error
  }

  return prisma.userEvent.create({
    data: { event_type, entity_id, entity_type },
  })
}

module.exports = { registerEvent }
