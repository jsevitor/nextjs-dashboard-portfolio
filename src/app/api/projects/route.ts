import { isAuthorized } from "@/lib/authorized";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      projectTechs: {
        orderBy: { ordem: "asc" },
        include: {
          tech: true,
        },
      },
    },
  });

  return new NextResponse(JSON.stringify(projects), {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

export async function POST(req: NextRequest) {
  if (!(await isAuthorized(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { title, description, image, demoUrl, repoUrl, techs, isFeatured } =
      body;

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

    // Cria o projeto
    const project = await prisma.project.create({
      data: {
        title,
        description,
        image,
        demoUrl,
        repoUrl,
        isFeatured: !!isFeatured,
      },
    });

    // Cria múltiplos ProjectTech com createMany
    await prisma.projectTech.createMany({
      data: techs.map((tech: { techId: string; ordem: number }) => ({
        projectId: project.id,
        techId: tech.techId,
        ordem: tech.ordem,
      })),
    });

    // Retorna o projeto com techs incluídas e ordenadas
    const projectWithTechs = await prisma.project.findUnique({
      where: { id: project.id },
      include: {
        projectTechs: {
          orderBy: { ordem: "asc" },
          include: { tech: true },
        },
      },
    });

    return NextResponse.json(projectWithTechs, { status: 201 });
  } catch (err) {
    console.error("Erro ao criar projeto:", err);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
