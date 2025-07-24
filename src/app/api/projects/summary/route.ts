import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

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
