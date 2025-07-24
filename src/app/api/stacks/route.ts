import { isAuthorized } from "@/lib/authorized";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const stacks = await prisma.skill.findMany();
    return new NextResponse(JSON.stringify(stacks), {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  } catch (error) {
    console.error("Erro ao buscar stacks:", error);
    return NextResponse.json(
      { error: "Erro ao buscar stacks" },
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
    const { icon, name } = body;

    if (!icon || !name) {
      return NextResponse.json({ error: "Dados incompletos" }, { status: 400 });
    }

    const stacks = await prisma.skill.create({
      data: { icon, name },
    });

    return NextResponse.json(stacks, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar stack:", error);
    return NextResponse.json({ error: "Erro ao criar stack" }, { status: 500 });
  }
}
