const { describe, it } = require('node:test')
const assert = require('node:assert/strict')

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000'

async function getJson(path) {
  const response = await fetch(`${BASE_URL}${path}`)
  const body = await response.json()

  return { response, body }
}

describe('API do Circuito TVO', () => {
  it('responde o health check', async () => {
    const { response, body } = await getJson('/health')

    assert.equal(response.status, 200)
    assert.equal(body.status, 'ok')
    assert.equal(body.projeto, 'circuito_tvo')
    assert.ok(body.timestamp)
  })

  it('lista trilhas com o formato esperado', async () => {
    const { response, body } = await getJson('/trilhas')

    assert.equal(response.status, 200)
    assert.ok(Array.isArray(body.data))
    assert.equal(body.count, body.data.length)

    const primeiraTrilha = body.data[0]

    assert.ok(primeiraTrilha.id)
    assert.ok(primeiraTrilha.nome)
    assert.ok(primeiraTrilha.dificuldade)
    assert.equal(typeof primeiraTrilha.distancia, 'number')
  })

  it('carrega as imagens informadas nas trilhas', async () => {
    const { body } = await getJson('/trilhas')
    const trilhasComImagem = body.data.filter((trilha) => trilha.imagem)

    assert.ok(trilhasComImagem.length > 0)

    for (const trilha of trilhasComImagem) {
      const response = await fetch(`${BASE_URL}/imagens/${trilha.imagem}`)

      assert.equal(
        response.status,
        200,
        `Imagem da trilha "${trilha.nome}" não carregou: ${trilha.imagem}`,
      )
    }
  })

  it('retorna métricas de trilhas mais vistas', async () => {
    const { response, body } = await getJson('/metricas/trilhas-mais-vistas')

    assert.equal(response.status, 200)
    assert.ok(Array.isArray(body.data))

    if (body.data.length > 0) {
      assert.ok('trilha' in body.data[0])
      assert.equal(typeof body.data[0].total_visualizacoes, 'number')
    }
  })

  it('retorna métricas de engajamento', async () => {
    const { response, body } = await getJson('/metricas/engajamento-eventos')

    assert.equal(response.status, 200)
    assert.equal(typeof body.data.total_interacoes, 'number')
    assert.ok(Array.isArray(body.data.por_tipo_evento))
    assert.ok(Array.isArray(body.data.por_tipo_entidade))
  })
})
