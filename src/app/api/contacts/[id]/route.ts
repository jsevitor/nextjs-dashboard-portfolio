import { isAuthorized } from "@/lib/authorized";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type RouteContext = {
  params: Promise<Record<string, string | string[]>>;
};

/**
 * PUT Handler - Contato
 *
 * Manipulador da requisição PUT para atualizar um contato existente.
 *
 * ▸ **Responsabilidade**
 * - Verificar se o usuário está autorizado (via JWT)
 * - Extrair o `id` do contato via parâmetros de rota
 * - Atualizar os campos `icon`, `name`, `user` e `link` no banco de dados
 * - Retornar os dados atualizados ou mensagem de erro
 *
 * @param {NextRequest} req - Objeto da requisição contendo os dados atualizados do contato
 * @param {RouteContext} context - Contexto contendo os parâmetros da rota, como o `id`
 * @returns {Promise<NextResponse>} Resposta com o contato atualizado ou erro
 *
 * @example
 *
 * const response = await fetch("/api/contacts/123", {
 *   method: "PUT",
 *   body: JSON.stringify({ icon, name, user, link }),
 * });
 */
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

/**
 * DELETE Handler - Contato
 *
 * Manipulador da requisição DELETE para remover um contato existente.
 *
 * ▸ **Responsabilidade**
 * - Verificar se o usuário está autorizado (via JWT)
 * - Extrair o `id` do contato via parâmetros de rota
 * - Deletar o registro correspondente no banco de dados
 * - Retornar mensagem de sucesso ou mensagem de erro
 *
 * @param {NextRequest} req - Objeto da requisição
 * @param {RouteContext} context - Contexto contendo os parâmetros da rota, como o `id`
 * @returns {Promise<NextResponse>} Resposta com confirmação de exclusão ou erro
 *
 * @example
 *
 * const response = await fetch("/api/contacts/123", {
 *   method: "DELETE",
 * });
 */
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
