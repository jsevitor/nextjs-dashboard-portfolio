import { isAuthorized } from "@/lib/authorized";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type RouteContext = {
  params: Promise<Record<string, string | string[]>>;
};

/**
 * PUT Handler - About
 *
 * Manipulador da requisição PUT para atualizar um registro existente da seção "About".
 *
 * ▸ **Responsabilidade**
 * - Verificar se o usuário está autorizado (via JWT)
 * - Extrair o `id` da URL e os novos dados do corpo da requisição
 * - Atualizar o registro correspondente no banco de dados
 * - Retornar o objeto atualizado ou mensagem de erro
 *
 * @param {NextRequest} req - Objeto da requisição contendo os dados atualizados
 * @param {RouteContext} context - Contexto contendo os parâmetros da rota, como o `id`
 * @returns {Promise<NextResponse>} Resposta com os dados atualizados ou erro interno
 *
 * @example
 *
 * const response = await fetch("/api/about/123", {
 *   method: "PUT",
 *   body: JSON.stringify({ location, content, image, curriculum }),
 * });
 */
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

/**
 * DELETE Handler - About
 *
 * Manipulador da requisição DELETE para remover um registro da seção "About" com base no `id`.
 *
 * ▸ **Responsabilidade**
 * - Verificar se o usuário está autorizado (via JWT)
 * - Extrair o `id` da URL
 * - Deletar o registro correspondente no banco de dados
 * - Retornar mensagem de sucesso ou erro interno
 *
 * @param {NextRequest} req - Objeto da requisição
 * @param {RouteContext} context - Contexto contendo os parâmetros da rota, como o `id`
 * @returns {Promise<NextResponse>} Resposta com mensagem de sucesso ou erro
 *
 * @example
 *
 * const response = await fetch("/api/about/123", { method: "DELETE" });
 */
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
