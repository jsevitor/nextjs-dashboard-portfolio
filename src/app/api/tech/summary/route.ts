import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

/**
 * GET Handler - Resumo de Techs
 *
 * Manipulador da requisição GET que retorna o número total de tecnologias (techs) cadastradas no banco de dados.
 *
 * ▸ **Responsabilidade**
 * - Contar o número total de registros na tabela `tech`
 * - Retornar esse total em formato JSON
 *
 * @returns {Promise<NextResponse>} Resposta JSON contendo o total de techs
 *
 * @example
 *
 * const response = await fetch("/api/tech/summary", { method: "GET" });
 * const data = await response.json();
 * // data = { total: 20 }
 */
export async function GET() {
  try {
    const total = await prisma.tech.count();

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
