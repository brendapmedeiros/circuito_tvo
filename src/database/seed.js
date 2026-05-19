require('dotenv').config()
const prisma = require('./prisma')

async function seed() {
  console.log('Iniciando seeding do banco de dados...\n')

  // Limpa as tabelas (não alterar)
  await prisma.eventos_usuarios.deleteMany()
  await prisma.Trail.deleteMany()
  await prisma.eventos.deleteMany()
  await prisma.biodiversidade.deleteMany()

  // Trilhas
  const trilhas = await prisma.Trail.createMany({
    data: [
      {
        nome: 'Trilha da Pedra Riscada',
        dificuldade: 'moderado',
        distancia: 4.5,
        localizacao: 'Maricá, RJ',
        descricao: 'Trilha panorâmica com vista para a Lagoa de Maricá e o oceano Atlântico.',
      },
      {
        nome: 'Trilha do Morro do Silvado',
        dificuldade: 'dificil',
        distancia: 9.2,
        localizacao: 'Maricá, RJ',
        descricao: 'Trilha de longa distância com fauna nativa abundante. Recomendado guia.',
      },
      {
        nome: 'Circuito das Lagunas',
        dificuldade: 'facil',
        distancia: 2.0,
        localizacao: 'Araruama, RJ',
        descricao: 'Percurso tranquilo ideal para famílias, com aves migratórias na rota.',
      },
      {
        nome: 'Trilha da Restinga',
        dificuldade: 'facil',
        distancia: 3.1,
        localizacao: 'Saquarema, RJ',
        descricao: 'Vegetação de restinga preservada com espécies endêmicas da Mata Atlântica.',
      },
    ],
  })

  // Eventos
  const eventos = await prisma.eventos.createMany({
    data: [
      {
        titulo: 'Festival de Birdwatching - Costa do Sol',
        data: new Date('2025-07-15T08:00:00Z'),
        localizacao: 'Maricá, RJ',
        descricao: 'Observação de aves com guias especializados. Inscrições abertas.',
      
      },
      {
        titulo: 'Mutirão de Limpeza das Trilhas',
        data: new Date('2025-06-21T07:00:00Z'),
        localizacao: 'Região Serrana, RJ',
        descricao: 'Evento voluntário de manutenção e limpeza das trilhas ecológicas locais.',
       
      },
      {
        titulo: 'Seminário de Biodiversidade da Mata Atlântica',
        data: new Date('2025-08-10T09:00:00Z'),
        localizacao: 'Niterói, RJ',
        descricao: 'Palestras de pesquisadores sobre fauna e flora da Mata Atlântica fluminense.',
    
      },
    ],
  })

  // Biodiversidade
  const biodiversidade = await prisma.biodiversidade.createMany({
    data: [
      {
        nome: 'Sabiá-laranjeira',
        tipo: 'fauna',
        descricao: 'Ave símbolo do Brasil. Encontrada em áreas de mata e jardins. Canto melodioso.',
      },
      {
        nome: 'Mico-leão-dourado',
        tipo: 'fauna',
        descricao: 'Primata ameaçado de extinção, endêmico da Mata Atlântica fluminense.',
      },
      {
        nome: 'Bromélia imperial',
        tipo: 'flora',
        descricao: 'Planta típica da restinga e Mata Atlântica. Fornece habitat para pequenos animais.',
      },
      {
        nome: 'Ipê-amarelo',
        tipo: 'flora',
        descricao: 'Árvore símbolo do Brasil. Floresce entre julho e agosto, atraindo polinizadores.',
      },
      {
        nome: 'Jacaré-de-papo-amarelo',
        tipo: 'fauna',
        descricao: 'Réptil nativo encontrado nas lagunas costeiras do Rio de Janeiro. Ameaçado de extinção.',
      },
    ],
  })

  // Exemplo de tracking de eventos
  await prisma.eventos_usuarios.createMany({
    data: [
      { tipo_evento: 'view_trail', entity_id: 1, entity_tipo: 'trail' },
      { tipo_evento: 'view_trail', entity_id: 1, entity_tipo: 'trail' },
      { tipo_evento: 'view_trail', entity_id: 2, entity_tipo: 'trail' },
      { tipo_evento: 'view_trail', entity_id: 1, entity_tipo: 'trail' },
      { tipo_evento: 'click_event', entity_id: 1, entity_tipo: 'event' },
      { tipo_evento: 'click_event', entity_id: 2, entity_tipo: 'event' },
      { tipo_evento: 'click_event', entity_id: 1, entity_tipo: 'event' },
      { tipo_evento: 'view_biodiversity', entity_id: 1, entity_tipo: 'biodiversity' },
      { tipo_evento: 'view_biodiversity', entity_id: 2, entity_tipo: 'biodiversity' },
    ],
  })

  console.log(`Trilhas criadas: ${trilhas.count}`)
  console.log(` Eventos criados: ${eventos.count}`)
  console.log(` Espécies criadas: ${biodiversidade.count}`)
  console.log(` Eventos de tracking criados: 9`)
  console.log('\n Seeding concluído.')
}

seed()
  .catch((error) => {
    console.error('Erro no seeding:', error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
