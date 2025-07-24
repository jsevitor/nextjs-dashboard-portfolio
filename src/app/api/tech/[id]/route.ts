import { prisma } from "@/lib/prisma";
import { isAuthorized } from "@/lib/authorized";
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
  const { name } = body;

  try {
    const stacks = await prisma.skill.update({
      where: { id },
      data: { name },
    });

    return NextResponse.json(stacks);
  } catch (error) {
    console.error("Erro ao atualizar tech:", error);
    return NextResponse.json(
      { error: "Erro ao atualizar tech" },
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
    await prisma.skill.delete({ where: { id } });
    return NextResponse.json({ message: "Tech excluída com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar Tech:", error);
    return NextResponse.json(
      { error: "Erro ao deletar Tech" },
      { status: 500 }
    );
  }
}
