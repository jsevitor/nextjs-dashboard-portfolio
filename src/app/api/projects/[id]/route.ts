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
  const { title, description, image, demoUrl, repoUrl, techs, isFeatured } =
    body;

  try {
    if (
      !title ||
      !description ||
      !image ||
      !demoUrl ||
      !repoUrl ||
      !techs?.length
    ) {
      return NextResponse.json({ error: "Dados incompletos" }, { status: 400 });
    }

    // Atualiza o projeto
    const updatedProject = await prisma.project.update({
      where: { id },
      data: {
        title,
        description,
        image,
        demoUrl,
        repoUrl,
        isFeatured: !!isFeatured,
        projectTechs: {
          deleteMany: {}, // Remove associações antigas
        },
      },
    });

    // Cria múltiplos ProjectTech com createMany
    await prisma.projectTech.createMany({
      data: techs.map((tech: { techId: string; ordem: number }) => ({
        projectId: updatedProject.id,
        techId: tech.techId,
        ordem: tech.ordem,
      })),
    });

    // Retorna o projeto atualizado com techs ordenadas
    const updatedProjectWithTechs = await prisma.project.findUnique({
      where: { id: updatedProject.id },
      include: {
        projectTechs: {
          orderBy: { ordem: "asc" },
          include: { tech: true },
        },
      },
    });

    return NextResponse.json(updatedProjectWithTechs);
  } catch (err) {
    console.error("Erro ao atualizar projeto:", err);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}

// DELETE: excluir projeto
export async function DELETE(req: NextRequest, context: RouteContext) {
  if (!(await isAuthorized(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const params = await context.params;
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  try {
    // Deleta techs relacionadas
    await prisma.projectTech.deleteMany({
      where: { projectId: id },
    });

    // Deleta o projeto
    await prisma.project.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Projeto excluído com sucesso" });
  } catch (err) {
    console.error("Erro ao excluir projeto:", err);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
