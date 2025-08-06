import { PrismaClient } from "@/generated/prisma";

/**
 * Prisma Client Singleton
 *
 * Instância singleton do Prisma Client utilizada para evitar múltiplas conexões com o banco de dados
 * durante o desenvolvimento, especialmente com hot reload no Next.js.
 *
 * ▸ **Responsabilidade**
 * - Criar uma única instância do Prisma Client
 * - Armazenar a instância no escopo global em ambiente de desenvolvimento
 * - Evitar múltiplas conexões ao banco de dados causadas por recarregamentos do servidor
 *
 * @constant {PrismaClient} prisma - Instância única do Prisma Client configurada com logging de queries
 *
 * @example
 *
 * import { prisma } from "@/lib/prisma";
 * const users = await prisma.user.findMany();
 */

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
