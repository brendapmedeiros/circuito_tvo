# Plataforma de Ecoturismo e Biodiversidade (MVP)

Solução digital desenvolvida para centralizar e disponibilizar informações sobre biodiversidade e ecoturismo, permitindo a consulta de **trilhas, eventos e condições de atrações naturais** em um único ambiente.

O projeto é estruturado como um **MVP com backend completo**, integrando uma **API REST**, banco de dados relacional e uma camada simplificada de **coleta de eventos para análise de uso**.

---

## Sobre o Projeto

A plataforma tem como objetivo resolver a **dispersão de informações sobre ambientes naturais**, oferecendo uma experiência organizada e acessível.

Além disso, o sistema foi projetado para **registrar interações dos usuários**, permitindo evolução futura orientada por dados e análise de comportamento.

---

## Funcionalidades

- Consulta de trilhas com informações detalhadas  
- Consulta de eventos ambientais  
- Consulta de dados de biodiversidade  
- API REST com operações de **CRUD (criação, leitura, atualização e remoção)**  
- Persistência em banco de dados relacional  
- Registro de eventos de interação do usuário (**tracking**)  

---

## Arquitetura

O sistema segue uma arquitetura em camadas:
Request → Routes → Controller → Service → Prisma (ORM) → PostgreSQL
↓
Error Handler


Componentes:

- **Frontend** para interação com o usuário  
- **Backend** responsável pela lógica de negócio e API  
- **Banco de dados relacional (PostgreSQL)**  
- **ORM (Prisma)** para acesso aos dados  
- **Middleware de erro** para tratamento centralizado  

---

## Camada de Dados (Tracking)

A aplicação registra eventos de uso de forma simplificada:

```sql
user_events
- id
- event_type
- entity_id
- entity_type
- timestamp

Esses dados permitem identificar conteúdos mais acessados, nível de engajamento e padrões de comportamento dos usuários.

## Estrutura do Projeto

circuito_tvo/
├── prisma/
│   └── schema.prisma
├── src/
│   ├── controllers/
│   ├── services/
│   ├── routes/
│   ├── database/
│   ├── middlewares/
│   ├── app.js
│   └── server.js
├── .env.example
├── .gitignore
└── package.json
Tecnologias Utilizadas
Frontend: HTML, CSS, JavaScript
Backend: Node.js + Express
Banco de dados: PostgreSQL
ORM: Prisma
Como Executar
1. Clonar o repositório
git clone https://github.com/seu-usuario/circuito_tvo.git
cd circuito_tvo
npm install
2. Configurar ambiente
cp .env.example .env

## Editar:

DATABASE_URL="postgresql://usuario:senha@localhost:5432/circuito_tvo"
PORT=3000
3. Criar banco e rodar migrations
npm run db:migrate
4. Popular dados
npm run seed
5. Rodar servidor
npm run dev

## Servidor disponível em:

http://localhost:3000
Endpoints Principais
Trilhas
GET /trails
GET /trails/:id
POST /trails
PUT /trails/:id
DELETE /trails/:id
Eventos
GET /events
GET /events/:id
POST /events
PUT /events/:id
DELETE /events/:id
Biodiversidade
GET /biodiversity
POST /biodiversity
Tracking
POST /tracking

**Exemplo:**

{
  "event_type": "view_trail",
  "entity_id": 1,
  "entity_type": "trail"
}

## Métricas

GET /metrics/most-viewed-trails
GET /metrics/events-engagement

## Objetivo

Desenvolver um MVP funcional que combine backend estruturado com coleta básica de dados, permitindo não apenas a consulta de informações, mas também a análise inicial de uso da aplicação.
O projeto integra, desde o início, uma abordagem orientada a dados, permitindo que decisões futuras sejam baseadas em métricas reais de uso.
