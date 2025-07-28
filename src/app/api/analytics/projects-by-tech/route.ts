import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

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
