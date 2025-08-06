import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * GET Handler - Última Atualização Geral
 *
 * Manipulador da requisição GET que retorna a data da última atualização registrada
 * entre as tabelas `about`, `project`, `skill` e `contact`.
 *
 * ▸ **Responsabilidade**
 * - Buscar o registro mais recentemente atualizado em cada uma das tabelas mencionadas
 * - Comparar as datas de atualização e retornar a mais recente entre elas
 * - Retornar a data da última atualização em formato JSON
 *
 * @returns {Promise<NextResponse>} Resposta JSON contendo a data da última atualização geral
 *
 * @example
 *
 * const response = await fetch("/api/last-update", { method: "GET" });
 * const data = await response.json();
 * // data = { lastUpdate: "2025-08-06T12:34:56.789Z" }
 */
export async function GET() {
  const [latestAbout] = await prisma.about.findMany({
    orderBy: { updatedAt: "desc" },
    take: 1,
  });

  const [latestProject] = await prisma.project.findMany({
    orderBy: { updatedAt: "desc" },
    take: 1,
  });

  const [latestSkill] = await prisma.skill.findMany({
    orderBy: { updatedAt: "desc" },
    take: 1,
  });

  const [latestContact] = await prisma.contact.findMany({
    orderBy: { updatedAt: "desc" },
    take: 1,
  });

  const lastUpdate = [
    latestAbout?.updatedAt,
    latestProject?.updatedAt,
    latestSkill?.updatedAt,
    latestContact?.updatedAt,
  ]
    .filter(Boolean)
    .sort((a, b) => b!.getTime() - a!.getTime())[0];

  return NextResponse.json({ lastUpdate });
}
