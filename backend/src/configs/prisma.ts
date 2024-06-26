import { PrismaClient } from '@prisma/client'

let prismaOptions = {}

if (process.env.DEBUG) {
    prismaOptions = {log: ['query', 'info', 'warn', 'error']}
}

const prisma = new PrismaClient(prismaOptions)

export default prisma