import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      select: {
        createdAt: true,
      },
    });

    // Agrupa os projetos por "Ano-Mês"
    const countByMonth: Record<string, number> = {};

    for (const project of projects) {
      const date = new Date(project.createdAt);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
        2,
        "0"
      )}`; // ex: 2025-07

      countByMonth[key] = (countByMonth[key] || 0) + 1;
    }

    // Transforma em array ordenado
    const result = Object.entries(countByMonth)
      .map(([month, count]) => ({ month, count }))
      .sort((a, b) => a.month.localeCompare(b.month));

    return NextResponse.json(result);
  } catch (error) {
    console.error("Erro ao calcular projetos ao longo do tempo:", error);
    return NextResponse.json(
      { error: "Erro ao calcular projetos por período." },
      { status: 500 }
    );
  }
}
