import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

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
