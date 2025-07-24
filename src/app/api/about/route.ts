import { isAuthorized } from "@/lib/authorized";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const about = await prisma.about.findMany({
      orderBy: { createdAt: "desc" },
    });
    return new NextResponse(JSON.stringify(about), {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  } catch (error) {
    console.error("Erro ao buscar about:", error);
    return NextResponse.json(
      { error: "Erro ao buscar about" },
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
    const { location, content, image, curriculum } = body;

    if (!location || !content || !image || !curriculum) {
      return NextResponse.json({ error: "Dados incompletos" }, { status: 400 });
    }

    const about = await prisma.about.create({
      data: { location, content, image, curriculum },
    });

    return NextResponse.json(about, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar about:", error);
    return NextResponse.json({ error: "Erro ao criar about" }, { status: 500 });
  }
}
