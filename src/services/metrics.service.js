// src/services/metrics.service.js
// Lógica de negócio para métricas e analytics

const prisma = require('../database/prisma')

/**
 * Retorna as trilhas mais visualizadas,
 * cruzando os dados de UserEvent com Trail.
 */
async function getMostViewedTrails(limit = 10) {
  // Agrupa os eventos do tipo "view_trail" por entity_id e conta
  const viewCounts = await prisma.userEvent.groupBy({
    by: ['entity_id'],
    where: { event_type: 'view_trail', entity_type: 'trail' },
    _count: { entity_id: true },
    orderBy: { _count: { entity_id: 'desc' } },
    take: limit,
  })

  if (viewCounts.length === 0) return []

  // Busca os dados completos das trilhas
  const trailIds = viewCounts.map((v) => v.entity_id)
  const trails = await prisma.trail.findMany({
    where: { id: { in: trailIds } },
  })

  // Monta o resultado enriquecido com a contagem de views
  const trailMap = Object.fromEntries(trails.map((t) => [t.id, t]))

  return viewCounts.map((v) => ({
    trail: trailMap[v.entity_id] || null,
    view_count: v._count.entity_id,
  }))
}

/**
 * Retorna a contagem de interações agrupada por event_type.
 * Inclui também o detalhamento por entity_type.
 */
async function getEventsEngagement() {
  // Total por event_type
  const byEventType = await prisma.userEvent.groupBy({
    by: ['event_type'],
    _count: { event_type: true },
    orderBy: { _count: { event_type: 'desc' } },
  })

  // Total por entity_type
  const byEntityType = await prisma.userEvent.groupBy({
    by: ['entity_type'],
    _count: { entity_type: true },
    orderBy: { _count: { entity_type: 'desc' } },
  })

  const totalInteractions = byEventType.reduce((sum, row) => sum + row._count.event_type, 0)

  return {
    total_interactions: totalInteractions,
    by_event_type: byEventType.map((row) => ({
      event_type: row.event_type,
      count: row._count.event_type,
    })),
    by_entity_type: byEntityType.map((row) => ({
      entity_type: row.entity_type,
      count: row._count.entity_type,
    })),
  }
}

module.exports = { getMostViewedTrails, getEventsEngagement }
