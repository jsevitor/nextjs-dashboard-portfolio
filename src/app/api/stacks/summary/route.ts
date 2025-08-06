import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

/**
 * GET Handler - Resumo de Stacks (Skills)
 *
 * Manipulador da requisição GET que retorna o número total de stacks (skills) cadastradas no banco de dados.
 *
 * ▸ **Responsabilidade**
 * - Contar o número total de registros na tabela `skill`
 * - Retornar esse total em formato JSON
 *
 * @returns {Promise<NextResponse>} Resposta JSON contendo o total de stacks
 *
 * @example
 *
 * const response = await fetch("/api/stack/summary", { method: "GET" });
 * const data = await response.json();
 * // data = { total: 12 }
 */
export async function GET() {
  try {
    const total = await prisma.skill.count();

    return NextResponse.json({
      total,
    });
  } catch (error) {
    console.error("Erro ao buscar resumo:", error);
    return NextResponse.json(
      { error: "Erro ao buscar dados" },
      { status: 500 }
    );
  }
}
