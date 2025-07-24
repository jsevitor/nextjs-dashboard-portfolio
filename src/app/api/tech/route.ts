import { isAuthorized } from "@/lib/authorized";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const techs = await prisma.tech.findMany();
    return new NextResponse(JSON.stringify(techs), {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  } catch (error) {
    console.error("Erro ao buscar techs:", error);
    return NextResponse.json(
      { error: "Erro ao buscar techs" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  if (!(await isAuthorized(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await req.json();
    const { name } = body;

    if (!name) {
      return NextResponse.json(
        { error: "Nome da tecnologia é obrigatório." },
        { status: 400 }
      );
    }

    const tech = await prisma.tech.create({
      data: { name },
    });

    return NextResponse.json(tech, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar tech:", error);
    return NextResponse.json(
      { error: "Erro interno ao criar tecnologia." },
      { status: 500 }
    );
  }
}
