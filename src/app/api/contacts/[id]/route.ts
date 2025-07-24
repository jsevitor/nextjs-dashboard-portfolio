import { isAuthorized } from "@/lib/authorized";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type RouteContext = {
  params: Promise<Record<string, string | string[]>>;
};

export async function PUT(req: NextRequest, context: RouteContext) {
  if (!(await isAuthorized(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const params = await context.params;
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const body = await req.json();
  const { icon, name, user, link } = body;

  try {
    const contact = await prisma.contact.update({
      where: { id },
      data: { icon, name, user, link },
    });

    return NextResponse.json(contact);
  } catch (error) {
    console.error("Erro ao atualizar contato:", error);
    return NextResponse.json(
      { error: "Erro ao atualizar contato" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, context: RouteContext) {
  if (!(await isAuthorized(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const params = await context.params;
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  try {
    await prisma.contact.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Contato excluído com sucesso" });
  } catch (error) {
    console.error("Erro ao excluir contato:", error);
    return NextResponse.json(
      { error: "Erro ao excluir contato" },
      { status: 500 }
    );
  }
}
