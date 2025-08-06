import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

/**
 * GET Handler - Resumo de Projetos
 *
 * Manipulador da requisição GET que retorna um resumo dos projetos registrados no banco de dados.
 * Fornece o total de projetos e a data da última atualização realizada.
 *
 * ▸ **Responsabilidade**
 * - Contar o número total de registros na tabela `project`
 * - Obter a data de atualização mais recente entre os projetos
 * - Retornar esses dados em formato JSON
 *
 * @returns {Promise<NextResponse>} Resposta JSON contendo o total de projetos e a data da última atualização
 *
 * @example
 *
 * const response = await fetch("/api/project/summary", { method: "GET" });
 * const data = await response.json();
 * // data = { total: 15, lastUpdate: "2025-08-06T12:34:56.789Z" }
 */
export async function GET() {
  try {
    const total = await prisma.project.count();

    const lastProject = await prisma.project.findFirst({
      orderBy: { updatedAt: "desc" },
      select: { updatedAt: true },
    });

    return NextResponse.json({
      total,
      lastUpdate: lastProject?.updatedAt ?? null,
    });
  } catch (error) {
    console.error("Erro ao buscar resumo:", error);
    return NextResponse.json(
      { error: "Erro ao buscar dados" },
      { status: 500 }
    );
  }
}
