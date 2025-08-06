import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

/**
 * GET Handler - Project Count by Day
 *
 * Manipulador da requisição GET que calcula a quantidade de projetos criados por dia.
 *
 * ▸ **Responsabilidade**
 * - Consultar as datas de criação de todos os projetos no banco de dados
 * - Agrupar e contar os projetos por dia (formato: YYYY-MM-DD)
 * - Retornar um array ordenado com a data e a contagem correspondente
 *
 * @returns {Promise<NextResponse>} Resposta JSON com a contagem diária de projetos ou mensagem de erro
 *
 * @example
 *
 * const response = await fetch("/api/projects/count-by-day", { method: "GET" });
 * const data = await response.json();
 * // data = [{ day: "2024-06-01", count: 2 }, { day: "2024-06-02", count: 5 }, ...]
 */
export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      select: {
        createdAt: true,
      },
    });

    const countByDay: Record<string, number> = {};

    for (const project of projects) {
      const date = new Date(project.createdAt);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
        2,
        "0"
      )}-${String(date.getDate()).padStart(2, "0")}`;

      countByDay[key] = (countByDay[key] || 0) + 1;
    }

    const result = Object.entries(countByDay)
      .map(([day, count]) => ({ day, count }))
      .sort((a, b) => a.day.localeCompare(b.day));

    return NextResponse.json(result);
  } catch (error) {
    console.error("Erro ao calcular projetos ao longo do tempo:", error);
    return NextResponse.json(
      { error: "Erro ao calcular projetos por dia." },
      { status: 500 }
    );
  }
}
