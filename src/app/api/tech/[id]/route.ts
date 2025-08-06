import { prisma } from "@/lib/prisma";
import { isAuthorized } from "@/lib/authorized";
import { NextRequest, NextResponse } from "next/server";

type RouteContext = {
  params: Promise<Record<string, string | string[]>>;
};

/**
 * PUT Handler - Atualizar Tech (Skill)
 *
 * Manipulador da requisição PUT que atualiza o nome de uma tech (stack/skill) existente no banco de dados.
 *
 * ▸ **Responsabilidade**
 * - Verificar se a requisição é autorizada
 * - Atualizar o campo `name` da tech especificada via ID
 * - Retornar a tech atualizada ou erro apropriado
 *
 * @param {NextRequest} req - Objeto da requisição contendo os dados atualizados da tech
 * @param {RouteContext} context - Contexto da rota com os parâmetros da URL
 *
 * @returns {Promise<NextResponse>} Resposta JSON contendo a tech atualizada ou erro apropriado
 *
 * @example
 *
 * const response = await fetch("/api/tech/123", {
 *   method: "PUT",
 *   body: JSON.stringify({ name: "Next.js" }),
 * });
 * const data = await response.json();
 * // data = { id: "123", name: "Next.js" }
 */
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

/**
 * DELETE Handler - Excluir Tech (Skill)
 *
 * Manipulador da requisição DELETE que remove uma tech (stack/skill) existente do banco de dados.
 *
 * ▸ **Responsabilidade**
 * - Verificar se a requisição é autorizada
 * - Deletar a tech correspondente ao ID fornecido
 * - Retornar mensagem de sucesso ou erro apropriado
 *
 * @param {NextRequest} req - Objeto da requisição
 * @param {RouteContext} context - Contexto da rota com os parâmetros da URL
 *
 * @returns {Promise<NextResponse>} Resposta JSON contendo mensagem de sucesso ou erro
 *
 * @example
 *
 * const response = await fetch("/api/tech/123", { method: "DELETE" });
 * const data = await response.json();
 * // data = { message: "Tech excluída com sucesso" }
 */
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
