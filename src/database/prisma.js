// src/database/prisma.js

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['erro', 'aviso'] : ['erro'],
})

module.exports = prisma
