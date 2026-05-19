require('dotenv').config()
const prisma = require('./prisma')

async function seed() {
  console.log('Iniciando seed do banco de dados...\n')

  // Limpa as tabelas (não alterar)
  await prisma.eventos_usuarios.deleteMany()
  await prisma.trilhas.deleteMany()
  await prisma.eventos.deleteMany()
  await prisma.biodiversidade.deleteMany()

  // Trilhas
  const trails = await prisma.trilhas.createMany({
    data: [
      {
        name: 'Trilha da Pedra Riscada',
        difficulty: 'moderado',
        distance: 4.5,
        location: 'Maricá, RJ',
        description: 'Trilha panorâmica com vista para a Lagoa de Maricá e o oceano Atlântico.',
      },
      {
        name: 'Trilha do Morro do Silvado',
        difficulty: 'dificil',
        distance: 9.2,
        location: 'Maricá, RJ',
        description: 'Trilha de longa distância com fauna nativa abundante. Recomendado guia.',
      },
      {
        name: 'Circuito das Lagunas',
        difficulty: 'facil',
        distance: 2.0,
        location: 'Araruama, RJ',
        description: 'Percurso tranquilo ideal para famílias, com aves migratórias na rota.',
      },
      {
        name: 'Trilha da Restinga',
        difficulty: 'facil',
        distance: 3.1,
        location: 'Saquarema, RJ',
        description: 'Vegetação de restinga preservada com espécies endêmicas da Mata Atlântica.',
      },
    ],
  })

  // Eventos
  const events = await prisma.event.createMany({
    data: [
      {
        title: 'Festival de Birdwatching - Costa do Sol',
        date: new Date('2025-07-15T08:00:00Z'),
        location: 'Maricá, RJ',
        description: 'Observação de aves com guias especializados. Inscrições abertas.',
      },
      {
        title: 'Mutirão de Limpeza das Trilhas',
        date: new Date('2025-06-21T07:00:00Z'),
        location: 'Região Serrana, RJ',
        description: 'Evento voluntário de manutenção e limpeza das trilhas ecológicas locais.',
      },
      {
        title: 'Seminário de Biodiversidade da Mata Atlântica',
        date: new Date('2025-08-10T09:00:00Z'),
        location: 'Niterói, RJ',
        description: 'Palestras de pesquisadores sobre fauna e flora da Mata Atlântica fluminense.',
      },
    ],
  })

  // Biodiversidade
  const biodiversidade = await prisma.biodiversidade.createMany({
    data: [
      {
        name: 'Sabiá-laranjeira',
        type: 'fauna',
        description: 'Ave símbolo do Brasil. Encontrada em áreas de mata e jardins. Canto melodioso.',
      },
      {
        name: 'Mico-leão-dourado',
        type: 'fauna',
        description: 'Primata ameaçado de extinção, endêmico da Mata Atlântica fluminense.',
      },
      {
        name: 'Bromélia imperial',
        type: 'flora',
        description: 'Planta epífita típica da restinga e Mata Atlântica. Fornece habitat para pequenos animais.',
      },
      {
        name: 'Ipê-amarelo',
        type: 'flora',
        description: 'Árvore símbolo do Brasil. Floresce entre julho e agosto, atraindo polinizadores.',
      },
      {
        name: 'Jacaré-de-papo-amarelo',
        type: 'fauna',
        description: 'Réptil nativo encontrado nas lagunas costeiras do Rio de Janeiro. Ameaçado de extinção.',
      },
    ],
  })

  // Exemplo de tracking de eventos
  await prisma.userEvent.createMany({
    data: [
      { event_type: 'view_trail', entity_id: 1, entity_type: 'trail' },
      { event_type: 'view_trail', entity_id: 1, entity_type: 'trail' },
      { event_type: 'view_trail', entity_id: 2, entity_type: 'trail' },
      { event_type: 'view_trail', entity_id: 1, entity_type: 'trail' },
      { event_type: 'click_event', entity_id: 1, entity_type: 'event' },
      { event_type: 'click_event', entity_id: 2, entity_type: 'event' },
      { event_type: 'click_event', entity_id: 1, entity_type: 'event' },
      { event_type: 'view_biodiversity', entity_id: 1, entity_type: 'biodiversity' },
      { event_type: 'view_biodiversity', entity_id: 2, entity_type: 'biodiversity' },
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
