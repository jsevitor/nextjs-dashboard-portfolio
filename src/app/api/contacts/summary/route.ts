import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

/**
 * GET Handler - Total de Contatos
 *
 * Manipulador da requisição GET que retorna a contagem total de contatos registrados no sistema.
 *
 * ▸ **Responsabilidade**
 * - Consultar o banco de dados para contar quantos registros existem na tabela `contact`
 * - Retornar o valor total em formato JSON
 *
 * @returns {Promise<NextResponse>} Resposta JSON com a contagem total de contatos ou mensagem de erro
 *
 * @example
 *
 * const response = await fetch("/api/contacts/summary", { method: "GET" });
 * const data = await response.json();
 * // data = { total: 7 }
 */
export async function GET() {
  try {
    const total = await prisma.contact.count();

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
