import { prisma } from "@/lib/prisma";
import { isAuthorized } from "@/lib/authorized";
import { NextRequest, NextResponse } from "next/server";

type RouteContext = {
  params: Promise<Record<string, string | string[]>>;
};

/**
 * PUT Handler - Atualizar Stack (Skill)
 *
 * Manipulador da requisição PUT que atualiza os dados de uma stack (skill) existente no banco de dados.
 *
 * ▸ **Responsabilidade**
 * - Verificar se a requisição é autorizada
 * - Atualizar os campos `icon` e `name` da stack especificada via ID
 * - Retornar a stack atualizada ou erro apropriado
 *
 * @param {NextRequest} req - Objeto da requisição contendo os novos dados da stack
 * @param {RouteContext} context - Contexto da rota com os parâmetros da URL
 *
 * @returns {Promise<NextResponse>} Resposta JSON contendo a stack atualizada ou erro apropriado
 *
 * @example
 *
 * const response = await fetch("/api/stack/123", {
 *   method: "PUT",
 *   body: JSON.stringify({ icon: "🔥", name: "Hot Tech" }),
 * });
 * const data = await response.json();
 * // data = { id: "123", icon: "🔥", name: "Hot Tech" }
 */
export async function PUT(req: NextRequest, context: RouteContext) {
  if (!(await isAuthorized(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const params = await context.params;
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const body = await req.json();
  const { icon, name } = body;

  try {
    const stacks = await prisma.skill.update({
      where: { id },
      data: { icon, name },
    });

    return NextResponse.json(stacks);
  } catch (error) {
    console.error("Erro ao atualizar stack:", error);
    return NextResponse.json(
      { error: "Erro ao atualizar stack" },
      { status: 500 }
    );
  }
}

/**
 * DELETE Handler - Excluir Stack (Skill)
 *
 * Manipulador da requisição DELETE que remove uma stack (skill) existente do banco de dados.
 *
 * ▸ **Responsabilidade**
 * - Verificar se a requisição é autorizada
 * - Deletar a stack correspondente ao ID fornecido
 * - Retornar mensagem de sucesso ou erro apropriado
 *
 * @param {NextRequest} req - Objeto da requisição
 * @param {RouteContext} context - Contexto da rota com os parâmetros da URL
 *
 * @returns {Promise<NextResponse>} Resposta JSON contendo mensagem de sucesso ou erro
 *
 * @example
 *
 * const response = await fetch("/api/stack/123", { method: "DELETE" });
 * const data = await response.json();
 * // data = { message: "Stack excluída com sucesso" }
 */
export async function DELETE(req: NextRequest, context: RouteContext) {
  if (!(await isAuthorized(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const params = await context.params;
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  try {
    await prisma.skill.delete({ where: { id } });
    return NextResponse.json({ message: "Stack excluída com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar stack:", error);
    return NextResponse.json(
      { error: "Erro ao deletar stack" },
      { status: 500 }
    );
  }
}
