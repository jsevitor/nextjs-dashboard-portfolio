import { isAuthorized } from "@/lib/authorized";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const contacts = await prisma.contact.findMany({
      orderBy: { createdAt: "desc" },
    });
    return new NextResponse(JSON.stringify(contacts), {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  } catch (error) {
    console.error("Erro ao buscar contatos:", error);
    return NextResponse.json(
      { error: "Erro ao buscar contatos" },
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
    const { icon, name, user, link } = body;

    if (!icon || !name) {
      return NextResponse.json({ error: "Dados incompletos" }, { status: 400 });
    }

    const contact = await prisma.contact.create({
      data: { icon, name, user, link },
    });

    return NextResponse.json(contact, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar contato:", error);
    return NextResponse.json(
      { error: "Erro ao criar contato" },
      { status: 500 }
    );
  }
}
