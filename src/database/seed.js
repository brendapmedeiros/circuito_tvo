require('dotenv').config()
const prisma = require('./prisma')

async function seed() {
  console.log('Iniciando seeding.\n')

  await prisma.eventos_usuarios.deleteMany()
  await prisma.trail.deleteMany()
  await prisma.eventos.deleteMany()
  await prisma.biodiversidade.deleteMany()

  // trilhas teresópolis
  const trilhas = await prisma.trail.createMany({
    data: [
      {
        nome: 'Trilha da Pedra do Sino',
        dificuldade: 'dificil',
        distancia: 11.0,
        localizacao: 'PARNASO — Sede Teresópolis, RJ',
        descricao: 'A trilha mais famosa do Parque Nacional da Serra dos Órgãos. Leva ao ponto culminante da Serra dos Órgãos, a 2.263 metros de altitude. Vista panorâmica para a Baía de Guanabara e o Rio de Janeiro. Duração média de 4 a 6 horas (só ida). Guia obrigatório.',
        imagem: 'pedra_do_sino.png',
      },
      {
        nome: 'Trilha do Cartão Postal',
        dificuldade: 'moderado',
        distancia: 1.2,
        localizacao: 'PARNASO — Sede Teresópolis, RJ',
        descricao: 'Trilha íngreme que leva a um mirante com vista do Dedo de Deus, pico de 1.692 metros e símbolo do alpinismo brasileiro. Subida de aproximadamente 50 minutos. Uma das mais fotografadas do parque.',
        imagem: 'dedo_de_deus.jpeg',
      },
      {
        nome: 'Trilha da Primavera',
        dificuldade: 'facil',
        distancia: 0.49,
        localizacao: 'PARNASO — Sede Teresópolis, RJ',
        descricao: 'Percurso leve de cerca de 20 minutos, ideal para todas as idades e famílias com crianças. Trilha bem sinalizada por dentro da Mata Atlântica preservada, com aves e plantas nativas ao longo do caminho.',
        imagem: 'trilha_primavera.jpg',
      },
      {
        nome: 'Trilha Suspensa',
        dificuldade: 'facil',
        distancia: 0.8,
        localizacao: 'PARNASO — Praça da Barragem, Teresópolis, RJ',
        descricao: 'Grande atração do parque, a trilha suspensa começa na Praça da Barragem. Acessível a cadeirantes e pessoas com mobilidade reduzida. Vista única sobre o dossel da Mata Atlântica.',
        imagem: 'trilha_suspensa.jpg',
      },
      {
        nome: 'Travessia Petrópolis–Teresópolis',
        dificuldade: 'dificil',
        distancia: 42.0,
        localizacao: 'PARNASO — Petrópolis a Teresópolis, RJ',
        descricao: 'A travessia mais procurada do PARNASO e uma das mais belas do Brasil. Cerca de 42 km atravessando a parte alta das montanhas, passando pelos Castelos do Açú, Pedra do Sino e Vale das Antas. Duração de 3 dias. Guia obrigatório.',
        imagem: 'travessia_petropolis.jpg',
      },
      {
        nome: 'Trilha Mozart Catão',
        dificuldade: 'moderado',
        distancia: 2.5,
        localizacao: 'PARNASO — Sede Teresópolis, RJ',
        descricao: 'Percurso na parte baixa do parque com vistas das formações rochosas da Serra. Indicada para caminhantes com alguma experiência. Passa por floresta montana com grande diversidade de bromélias e orquídeas epífitas.',
        imagem: 'trilha_mozart.jpg',
      },
    ],
  })

  // eventos
  const eventos = await prisma.eventos.createMany({
    data: [
      {
        titulo: 'Festival de Birdwatching da Serra dos Órgãos',
        data: new Date('2026-08-15T07:00:00Z'),
        localizacao: 'PARNASO — Sede Teresópolis, RJ',
        descricao: 'Observação de aves com guias especializados do parque. O PARNASO abriga 462 espécies de aves, sendo 142 endêmicas da Mata Atlântica. Atividade gratuita — inscrições na sede do parque.',
      },
      {
        titulo: 'Mutirão de Limpeza das Trilhas',
        data: new Date('2026-07-05T08:00:00Z'),
        localizacao: 'PARNASO — Sede Teresópolis, RJ',
        descricao: 'Evento voluntário anual de manutenção e conservação das trilhas. Organizado pelo ICMBio em parceria com grupos de montanhismo. Leve luvas, garrafa d\'água e roupa confortável.',
      },
      {
        titulo: 'Caminhada Noturna — Observação de Fauna',
        data: new Date('2026-07-19T22:00:00Z'),
        localizacao: 'PARNASO — Sede Teresópolis, RJ',
        descricao: 'Trilha noturna guiada para observação de anfíbios, mamíferos e aves noturnas da Mata Atlântica. Vagas limitadas — inscrição obrigatória na sede do parque.',
      },
      {
        titulo: 'Seminário de Conservação da Mata Atlântica',
        data: new Date('2026-09-10T09:00:00Z'),
        localizacao: 'UERJ — Campus Teresópolis, RJ',
        descricao: 'Evento acadêmico com pesquisadores do Jardim Botânico do Rio de Janeiro e do ICMBio. Apresentação do inventário florístico do PARNASO: 3.026 espécies catalogadas, o maior registro de flora em área protegida do Brasil.',
      },
      {
        titulo: 'Corrida das Montanhas de Teresópolis',
        data: new Date('2026-10-04T09:00:00Z'),
        localizacao: 'Centro de Teresópolis, RJ',
        descricao: 'Corridas com percursos de 10 km, 25 km e 42 km pelas trilhas da Serra dos Órgãos. Evento reconhecido pela CBTE. Abertura de inscrições prevista para agosto.',
      },
    ],
  })

  //biodiversidade
  const biodiversidade = await prisma.biodiversidade.createMany({
    data: [
      {
        nome: 'Tucano-de-bico-verde',
        tipo: 'fauna',
        descricao: 'Ramphastos dicolorus. Ave de médio porte com bico multicolorido, comum nas florestas da Serra dos Órgãos. Importante dispersor de sementes de palmeiras nativas. Ameaçado pelo tráfico de animais silvestres.',
       // imagem: 'tucano_bico_verde.jpg',
      },
      {
        nome: 'Mico-leão-dourado',
        tipo: 'fauna',
        descricao: 'Leontopithecus rosalia. Primata criticamente ameaçado, endêmico da Mata Atlântica fluminense. Símbolo da conservação brasileira. O PARNASO é uma das últimas áreas de ocorrência natural da espécie.',
       // imagem: 'mico_leao_dourado.jpg',
      },
      {
        nome: 'Jaguatirica',
        tipo: 'fauna',
        descricao: 'Leopardus pardalis. Maior predador do PARNASO. Pelagem com manchas pretas sobre fundo amarelado. Ativa principalmente à noite. Ameaçada pela perda de habitat e caça ilegal.',
       // imagem: 'jaguatirica.jpg',
      },
      {
        nome: 'Macaco-prego',
        tipo: 'fauna',
        descricao: 'Sapajus nigritus. Primata inteligente e social, frequentemente avistado pelos visitantes. Considerado espécie-chave para o equilíbrio da floresta pela dispersão de sementes.',
       // imagem: 'macaco_prego.jpg',
      },
      {
        nome: 'Perereca-da-serra',
        tipo: 'fauna',
        descricao: 'Espécie endêmica das partes altas da Serra dos Órgãos, restrita a altitudes acima de 1.200 metros. O PARNASO abriga 102 espécies de anfíbios, muitos endêmicos e sensíveis a variações climáticas.',
       // imagem: 'perereca_serra.jpg',
      },
      {
        nome: 'Orquídea-da-serra',
        tipo: 'flora',
        descricao: 'Família Orchidaceae. O PARNASO abriga centenas de espécies de orquídeas, muitas epífitas que crescem sobre rochas e troncos nas altitudes mais elevadas. Uma das maiores diversidades de orquídeas do Brasil.',
        //imagem: 'orquidea_serra.jpg',
      },
      {
        nome: 'Bromélia-imperial',
        tipo: 'flora',
        descricao: 'Alcantarea imperialis. Uma das maiores bromélias do Brasil, atingindo até 3 metros de diâmetro. Fornece água e abrigo para anfíbios, insetos e pequenos vertebrados. Vulnerável à extinção.',
        // imagem: 'bromeliacea_imperial.jpg',
      },
      {
        nome: 'Palmeira-jussara',
        tipo: 'flora',
        descricao: 'Euterpe edulis. Ameaçada pelo extrativismo ilegal do palmito. Fundamental para a fauna: seus frutos alimentam tucanos, macacos e outros animais. Presente nas florestas montanas do PARNASO.',
        // imagem: 'palmeira_jussara.jpg',
      },
      {
        nome: 'Araucária',
        tipo: 'flora',
        descricao: 'Araucaria angustifolia. Criticamente ameaçada de extinção, ocorre nas altitudes mais elevadas da Serra dos Órgãos. Seus pinhões são alimento fundamental para diversas espécies de aves e mamíferos.',
        // imagem: 'araucaria.jpg',
      },
    ],
  })

  // Tracking de exemplo
  await prisma.eventos_usuarios.createMany({
    data: [
      { tipo_evento: 'view_trail', entity_id: 1, entity_tipo: 'trail' },
      { tipo_evento: 'view_trail', entity_id: 1, entity_tipo: 'trail' },
      { tipo_evento: 'view_trail', entity_id: 2, entity_tipo: 'trail' },
      { tipo_evento: 'view_trail', entity_id: 3, entity_tipo: 'trail' },
      { tipo_evento: 'view_trail', entity_id: 1, entity_tipo: 'trail' },
      { tipo_evento: 'view_trail', entity_id: 5, entity_tipo: 'trail' },
      { tipo_evento: 'view_event', entity_id: 1, entity_tipo: 'evento' },
      { tipo_evento: 'view_event', entity_id: 2, entity_tipo: 'evento' },
      { tipo_evento: 'view_event', entity_id: 1, entity_tipo: 'evento' },
      { tipo_evento: 'view_biodiversity', entity_id: 1, entity_tipo: 'biodiversidade' },
      { tipo_evento: 'view_biodiversity', entity_id: 2, entity_tipo: 'biodiversidade' },
      { tipo_evento: 'view_biodiversity', entity_id: 3, entity_tipo: 'biodiversidade' },
    ],
  })

  console.log(`Trilhas criadas: ${trilhas.count}`)
  console.log(`Eventos criados: ${eventos.count}`)
  console.log(`Espécies criadas: ${biodiversidade.count}`)
  console.log(`Eventos de tracking criados: 12`)
  console.log('\nSeed concluído.')
}

seed()
  .catch((error) => {
    console.error('Erro no seeding:', error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })