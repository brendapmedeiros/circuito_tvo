// src/database/prisma.js
// Instância única do Prisma Client (singleton pattern)

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
})

module.exports = prisma
