import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

/**
 * GET Handler - Tecnologias Mais Usadas
 *
 * Manipulador da requisição GET que retorna as tecnologias mais utilizadas em projetos.
 *
 * ▸ **Responsabilidade**
 * - Agrupar os registros da tabela `projectTech` por `techId` e contar as ocorrências
 * - Ordenar as tecnologias pela quantidade de uso (decrescente)
 * - Buscar o nome de cada tecnologia associada ao `techId`
 * - Retornar uma lista com o nome da tecnologia e a contagem de uso
 *
 * @returns {Promise<NextResponse>} Resposta JSON com as tecnologias mais usadas ou mensagem de erro
 *
 * @example
 *
 * const response = await fetch("/api/techs/most-used", { method: "GET" });
 * const data = await response.json();
 * // data = [{ name: "React", count: 12 }, { name: "Next.js", count: 8 }, ...]
 */
export async function GET() {
  try {
    const techsMaisUsadas = await prisma.projectTech.groupBy({
      by: ["techId"],
      _count: {
        techId: true,
      },
      orderBy: {
        _count: {
          techId: "desc",
        },
      },
    });

    const techsComNome = await Promise.all(
      techsMaisUsadas.map(async (item) => {
        const tech = await prisma.tech.findUnique({
          where: { id: item.techId },
        });

        return {
          name: tech?.name || "Desconhecida",
          count: item._count.techId,
        };
      })
    );

    return NextResponse.json(techsComNome, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar techs mais usadas:", error);
    return NextResponse.json(
      { error: "Erro interno ao buscar techs mais usadas." },
      { status: 500 }
    );
  }
}
