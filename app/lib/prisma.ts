import { PrismaClient } from "@prisma/client";



let prisma : PrismaClient;

const globalForPrisma = global as unknown as {
    prisma: PrismaClient | undefined
}

if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = new PrismaClient()
}

prisma = globalForPrisma.prisma

//シングルトンという考えかたに基づいた考えかた

export default prisma

