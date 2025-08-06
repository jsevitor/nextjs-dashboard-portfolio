import { isAuthorized } from "@/lib/authorized";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

/**
 * GET Handler - Listar Projetos
 *
 * Manipulador da requisição GET que retorna todos os projetos cadastrados,
 * ordenados por data de criação (mais recentes primeiro) e com suas tecnologias associadas.
 *
 * ▸ **Responsabilidade**
 * - Buscar todos os registros da tabela `project`
 * - Incluir as tecnologias associadas (`projectTechs`) ordenadas por `ordem`
 * - Retornar os dados em formato JSON com headers CORS apropriados
 *
 * @returns {Promise<NextResponse>} Resposta JSON contendo a lista de projetos e tecnologias associadas
 *
 * @example
 *
 * const response = await fetch("/api/project", { method: "GET" });
 * const data = await response.json();
 * // data = [{ id: "1", title: "...", projectTechs: [...] }, ...]
 */
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

/**
 * POST Handler - Criar Projeto
 *
 * Manipulador da requisição POST que cria um novo projeto no banco de dados,
 * incluindo suas tecnologias associadas.
 *
 * ▸ **Responsabilidade**
 * - Verificar se a requisição é autorizada
 * - Validar os dados recebidos no corpo da requisição
 * - Criar um novo projeto na tabela `project`
 * - Criar múltiplas associações na tabela `projectTech` com as tecnologias informadas
 * - Retornar o projeto recém-criado com suas tecnologias associadas e ordenadas
 *
 * @param {NextRequest} req - Objeto da requisição contendo os dados do novo projeto
 *
 * @returns {Promise<NextResponse>} Resposta JSON contendo o projeto criado ou erro apropriado
 *
 * @example
 *
 * const response = await fetch("/api/project", {
 *   method: "POST",
 *   body: JSON.stringify({
 *     title: "Novo Projeto",
 *     description: "Descrição...",
 *     image: "url-da-imagem",
 *     demoUrl: "https://demo.com",
 *     repoUrl: "https://github.com/repo",
 *     techs: [{ techId: "1", ordem: 1 }],
 *     isFeatured: true
 *   }),
 * });
 * const data = await response.json();
 * // data = { id: "123", title: "Novo Projeto", ..., projectTechs: [...] }
 */
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
