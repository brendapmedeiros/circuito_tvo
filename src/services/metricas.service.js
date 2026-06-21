const prisma = require('../database/prisma')

// Trilhas mais vistas
async function getTrilhasMaisVistas(limit = 10) {
  const contagem = await prisma.eventos_usuarios.groupBy({
    by: ['entity_id'],
    where: { tipo_evento: 'view_trail', entity_tipo: 'trilha' },
    _count: { entity_id: true },
    orderBy: { _count: { entity_id: 'desc' } },
    take: limit,
  })

  if (contagem.length === 0) return []

  const trilhaIds = contagem.map((v) => v.entity_id)
  const trilhas = await prisma.trail.findMany({
    where: { id: { in: trilhaIds } },
  })

  const trilhaMap = Object.fromEntries(trilhas.map((t) => [t.id, t]))

  return contagem
    .filter((v) => trilhaMap[v.entity_id])
    .map((v) => ({
      trilha: trilhaMap[v.entity_id],
      total_visualizacoes: v._count.entity_id,
    }))
}

async function getEngajamentoEventos() {
  // total por tipo_evento
  const porTipoEvento = await prisma.eventos_usuarios.groupBy({
    by: ['tipo_evento'],
    _count: { tipo_evento: true },
    orderBy: { _count: { tipo_evento: 'desc' } },
  })

  // total por entity_tipo
  const porTipoEntidade = await prisma.eventos_usuarios.groupBy({
    by: ['entity_tipo'],
    _count: { entity_tipo: true },
    orderBy: { _count: { entity_tipo: 'desc' } },
  })

  const totalInteracoes = porTipoEvento.reduce((soma, linha) => soma + linha._count.tipo_evento, 0)

  return {
    total_interacoes: totalInteracoes,
    por_tipo_evento: porTipoEvento.map((linha) => ({
      tipo_evento: linha.tipo_evento,
      total: linha._count.tipo_evento,
    })),
    por_tipo_entidade: porTipoEntidade.map((linha) => ({
      entity_tipo: linha.entity_tipo,
      total: linha._count.entity_tipo,
    })),
  }
}

module.exports = { getTrilhasMaisVistas, getEngajamentoEventos }
