import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

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
