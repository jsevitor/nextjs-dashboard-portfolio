import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

/**
 * GET Handler - Project Distribution by Tech
 *
 * Manipulador da requisição GET para obter a distribuição de tecnologias com base
 * na quantidade de projetos associados a cada uma.
 *
 * ▸ **Responsabilidade**
 * - Consultar todas as tecnologias no banco de dados incluindo seus relacionamentos com projetos
 * - Contabilizar quantos projetos estão associados a cada tecnologia
 * - Retornar um array com o nome da tecnologia e sua contagem de uso
 *
 * @returns {Promise<NextResponse>} Resposta JSON com a distribuição ou mensagem de erro
 *
 * @example
 *
 * const response = await fetch("/api/distribution", { method: "GET" });
 * const data = await response.json();
 * // data = [{ tech: "React", count: 5 }, { tech: "Next.js", count: 3 }, ...]
 */
export async function GET() {
  try {
    const data = await prisma.tech.findMany({
      include: {
        projectTechs: true,
      },
    });

    const distribution = data.map((tech) => ({
      tech: tech.name,
      count: tech.projectTechs.length,
    }));

    return NextResponse.json(distribution);
  } catch (error) {
    console.error("Erro ao gerar distribuição de projetos por tech:", error);
    return NextResponse.json(
      { error: "Erro ao gerar distribuição de projetos por tecnologia" },
      { status: 500 }
    );
  }
}
