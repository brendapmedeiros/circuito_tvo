# Circuito TVO — Terê Verde Online

> MVP Back-End desenvolvido para a disciplina de Desenvolvimento Web Back-End — UNIFESO, 2026/1

---

## Integrante

| Nome | RA |
|------|----|
| Brenda de Paula Medeiros | 06000808 |

---

## Situação-Problema

**Desafio 1 — Circuito Terê Verde (Teresópolis)**

Teresópolis é uma cidade turística localizado a 869 metros acima do nível do mar, conhecida por três unidades de conservação: o Parque Nacional da Serra dos Órgãos, o Parque Estadual dos Três Picos e o Parque Natural Municipal Montanhas de Teresópolis. Atrai visitantes em busca de trilhas, escaladas e contato com a biodiversidade da Mata Atlântica.

A proposta do **Circuito Terê Verde** é criar uma plataforma que centralize informações atualizadas sobre trilhas, biodiversidade, cachoeiras e eventos nos espaços protegidos da região, tornando-se uma ferramenta essencial para turistas que desejam explorar as belezas naturais da cidade de forma consciente.

---

## Descrição do MVP

O **Circuito TVO** é uma API REST com uma interface web simples para centralizar informações sobre ecoturismo e biodiversidade em Teresópolis. O sistema permite cadastrar e consultar trilhas, eventos ambientais e espécies de animais e plantas, além de registrar e analisar o comportamento dos usuários por um módulo de acompanhamento.

Na interface, os eventos podem ser pesquisados e filtrados por nome, categoria, local e período. Também há um painel de detalhes para cada evento e um mini dashboard com dados gerais da listagem.

**Stack:**
- Node.js + Express
- PostgreSQL (Supabase)
- Prisma ORM
- HTML, CSS e JavaScript
- Deploy no Railway

---

## Requisitos Funcionais

| ID | Requisito |
|----|-----------|
| RF01 | O sistema deve permitir cadastrar, listar, editar e excluir trilhas 
| RF02 | O sistema deve permitir cadastrar, listar, editar e excluir eventos ambientais 
| RF03 | O sistema deve permitir cadastrar, listar, editar e excluir espécies de animais e plantas 
| RF04 | O sistema deve registrar interações dos usuários com o conteúdo (acompanhamento) 
| RF05 | O sistema deve expor métricas de trilhas mais visualizadas 
| RF06 | O sistema deve expor métricas de engajamento por tipo de evento 
| RF07 | O sistema deve retornar respostas em formato JSON 
| RF08 | O sistema deve validar os dados de entrada e retornar mensagens de erro tratadas e em linguagem entendível 

---

## Requisitos Não-Funcionais

| ID | Requisito |
|----|-----------|
| RNF01 | A API deve ser organizada em camadas (routes, controllers, services) 
| RNF02 | O banco de dados deve ser relacional (PostgreSQL) 
| RNF03 | O acesso ao banco deve ser feito via ORM (Prisma) 
| RNF04 | As configurações sensíveis devem ser armazenadas em variáveis de ambiente (.env) 
| RNF05 | O código deve tratar erros de forma centralizada via middleware 
| RNF06 | A aplicação deve estar disponível em ambiente de nuvem (Railway) 
| RNF07 | O repositório deve estar versionado no GitHub 

---

## O que o MVP não faz

- Autenticação e controle de acesso de usuários
- Painel administrativo com interface gráfica própria
- Upload de imagens ou arquivos
- Sistema de avaliações ou comentários em trilhas
- Integração com APIs externas de mapas ou clima
- Aplicativo mobile
- Notificações por e-mail ou push
- Suporte a múltiplos idiomas

---

## Estrutura

```
circuito_tvo/
├── data/
│   └── seed.js                  # Dados de exemplo 
├── prisma/
│   └── schema.prisma            # Esquema do banco
├── publico/
│   └── index.html               # Front-end
├── src/
│   ├── controllers/             # Recebem as requisições
│   │   ├── biodiversidade.controller.js
│   │   ├── eventos.controller.js
│   │   ├── metricas.controller.js
│   │   ├── tracking.controller.js
│   │   └── trilhas.controller.js
│   ├── services/                # Lógica de negócio e validações
│   │   ├── biodiversidade.service.js
│   │   ├── eventos.service.js
│   │   ├── metricas.service.js
│   │   ├── tracking.service.js
│   │   └── trilhas.service.js
│   ├── routes/                  # Rotas 
│   │   ├── biodiversidade.routes.js
│   │   ├── eventos.routes.js
│   │   ├── metricas.routes.js
│   │   ├── tracking.routes.js
│   │   └── trilhas.routes.js
│   ├── database/
│   │   └── prisma.js            # Instância do Prisma Client
│   ├── middlewares/
│   │   └── errorHandler.js      # Tratamento de erros
│   ├── app.js                   # Configuração do Express
│   └── server.js                # Entrada do servidor
├── test/
│   └── exemplos.http            # Exemplos de requisições
├── .env.example                 # Modelo de variáveis de ambiente
├── package.json
└── README.md
```

---

##  Como executar localmente

### Pré-requisitos
- Node.js 18+
- PostgreSQL (ou conta no supabase para hoespedar)

### Passo a passo

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/circuito_tvo.git
cd circuito_tvo

# Instalar as dependências
npm install

# Configurar as variáveis
cp .env.example .env
# Incluir no .env a URL da sua base

# Execute as migrations
npx prisma migrate dev

# Dados de exemplo
node data/seed.js

# Inicie o servidor
npm run dev
```

Acesse em: **http://localhost:3000**

---

## Scripts principais

| Comando | Descrição |
|----------|-----------|
| `npm run dev` | Inicia o servidor com nodemon |
| `npm start` | Inicia o servidor com node |
| `npm run db:generate` | Gera o Prisma Client |
| `npm run db:migrate` | Executa migrations em ambiente local |
| `npm run db:push` | Sincroniza o schema com o banco |
| `npm run db:studio` | Abre o Prisma Studio |
| `npm run seed` | Recria os dados iniciais |
| `npm test` | Roda os testes de API |

---

## Deploy

A API está disponível em produção no Railway:

**https://circuitotvo-production.up.railway.app**

| Endpoint | Descrição |
|----------|-----------|
| `GET /health` | Valida se a API está no ar 
| `GET /trilhas` | Lista todas as trilhas 
| `GET /eventos` | Lista todos os eventos 
| `GET /biodiversidade` | Lista animais e plantas 
| `POST /tracking` | Registra interação do usuário 
| `GET /tracking` | Lista os últimos eventos de tracking registrados 
| `GET /metricas/trilhas-mais-vistas` | Trilhas mais acessadas 
| `GET /metricas/engajamento-eventos` | Engajamento por tipo de evento 

---

## Exemplos de Uso

Abra a pasta `test/exemplos.http` para exemplos das rotas.

**Criar uma trilha:**
```json
POST /trilhas
{
  "nome": "Trilha da Pedra do Sino",
  "dificuldade": "dificil",
  "distancia": 14.5,
  "localizacao": "Parque Nacional da Serra dos Órgãos, Teresópolis",
  "descricao": "Uma das trilhas mais desafiadoras da Serra dos Órgãos."
}
```

**Acompanhar métricas de acesso:**
```json
POST /tracking
{
  "tipo_evento": "view_trail",
  "entity_id": 1,
  "entity_tipo": "trilha"
}
```

---

## Testes

O projeto possui testes simples de API usando o test runner nativo do Node.js.

Para rodar:

```bash
npm test
```

Os testes verificam:

- health check da API;
- listagem de trilhas;
- carregamento das imagens das trilhas;
- métricas de trilhas mais vistas;
- métricas de engajamento.

---

## Melhorias futuras

- Adicionar autenticação para separar usuário comum e administrador.
- Criar upload real de imagens.
- Incluir campos próprios para categoria e organizador dos eventos.
- Adicionar paginação nas listagens.
- Melhorar filtros diretamente pela API.
- Criar testes para criação, edição e exclusão.

---

## Detalhamento

- Disciplina: Desenvolvimento Back-End
- Instituição: UNIFESO
- Semestre: 2026/1
- Situação-Problema: Desafio 1 — Circuito Terê Verde (Teresópolis)
