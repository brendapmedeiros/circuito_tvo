// src/services/metricas.service.js

const prisma = require('../database/prisma')


 // Trilhas mais vistas
 
async function getTrilhasMaisVistas(limit = 10) {
  const viewCounts = await prisma.userEvent.groupBy({
    by: ['entity_id'],
    where: { tipo_evento: 'view_trail', entity_type: 'trail' },
    _count: { entity_id: true },
    orderBy: { _count: { entity_id: 'desc' } },
    take: limit,
  })

  if (viewCounts.length === 0) return []

  const trailIds = viewCounts.map((v) => v.entity_id)
  const trails = await prisma.trail.findMany({
    where: { id: { in: trailIds } },
  })

  const trailMap = Object.fromEntries(trails.map((t) => [t.id, t]))

  return viewCounts.map((v) => ({
    trail: trailMap[v.entity_id] || null,
    view_count: v._count.entity_id,
  }))
}

// Contagem de interações por tipo de evento e tipo de entidade

async function getEngajamentoEventos() {
  // Total por tipo_evento
  const byEventType = await prisma.userEvent.groupBy({
    by: ['tipo_evento'],
    _count: { tipo_evento: true },
    orderBy: { _count: { tipo_evento: 'desc' } },
  })

  // Total por entity_type
  const byEntityType = await prisma.userEvent.groupBy({
    by: ['entity_type'],
    _count: { entity_type: true },
    orderBy: { _count: { entity_type: 'desc' } },
  })

 // Total de interações
  const totalInteracoes = byEventType.reduce((sum, row) => sum + row._count.tempo_evento, 0)

  return {
    total_interacoes: totalInteracoes,
    by_event_type: byEventType.map((row) => ({
      tipo_evento: row.tempo_evento,
      count: row._count.tempo_evento,
    })),
    by_entity_type: byEntityType.map((row) => ({
      entity_type: row.entity_type,
      count: row._count.entity_type,
    })),
  }
}

module.exports = { getTrilhasMaisVistas, getEngajamentoEventos }
