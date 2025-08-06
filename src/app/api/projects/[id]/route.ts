import { isAuthorized } from "@/lib/authorized";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type RouteContext = {
  params: Promise<Record<string, string | string[]>>;
};

/**
 * PUT Handler - Atualizar Projeto
 *
 * Manipulador da requisição PUT que atualiza um projeto existente no banco de dados,
 * incluindo seus dados principais e as tecnologias associadas.
 *
 * ▸ **Responsabilidade**
 * - Verificar se a requisição é autorizada
 * - Validar os dados recebidos
 * - Atualizar os dados do projeto no banco de dados
 * - Atualizar as tecnologias associadas ao projeto
 * - Retornar o projeto atualizado com suas tecnologias ordenadas
 *
 * @param {NextRequest} req - Objeto da requisição contendo os dados a serem atualizados
 * @param {RouteContext} context - Contexto da rota, contendo os parâmetros da URL
 *
 * @returns {Promise<NextResponse>} Resposta JSON contendo o projeto atualizado ou erro apropriado
 *
 * @example
 *
 * const response = await fetch("/api/project/123", {
 *   method: "PUT",
 *   body: JSON.stringify({
 *     title: "Novo título",
 *     description: "Nova descrição",
 *     image: "imagem.jpg",
 *     demoUrl: "https://demo.com",
 *     repoUrl: "https://github.com/repo",
 *     techs: [{ techId: "1", ordem: 1 }],
 *     isFeatured: true,
 *   }),
 * });
 * const data = await response.json();
 * // data = { id: "123", title: "Novo título", ..., projectTechs: [...] }
 */
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
          deleteMany: {},
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

/**
 * DELETE Handler - Excluir Projeto
 *
 * Manipulador da requisição DELETE que exclui um projeto existente no banco de dados
 * e remove suas associações com tecnologias.
 *
 * ▸ **Responsabilidade**
 * - Verificar se a requisição é autorizada
 * - Excluir todas as associações entre o projeto e suas tecnologias
 * - Excluir o projeto do banco de dados
 * - Retornar mensagem de sucesso ou erro apropriado
 *
 * @param {NextRequest} req - Objeto da requisição
 * @param {RouteContext} context - Contexto da rota, contendo os parâmetros da URL
 *
 * @returns {Promise<NextResponse>} Resposta JSON contendo mensagem de sucesso ou erro
 *
 * @example
 *
 * const response = await fetch("/api/project/123", { method: "DELETE" });
 * const data = await response.json();
 * // data = { message: "Projeto excluído com sucesso" }
 */
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
