// app/api/about/[id]/route.ts
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
  const { location, content, image, curriculum } = body;

  try {
    const about = await prisma.about.update({
      where: { id },
      data: { location, content, image, curriculum },
    });

    return NextResponse.json(about);
  } catch (error) {
    console.error("Erro ao atualizar about:", error);
    return NextResponse.json(
      { error: "Erro ao atualizar about" },
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
    await prisma.about.delete({ where: { id } });
    return NextResponse.json({ message: "Contato excluído com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar about:", error);
    return NextResponse.json(
      { error: "Erro ao deletar about" },
      { status: 500 }
    );
  }
}
