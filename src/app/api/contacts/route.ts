import { isAuthorized } from "@/lib/authorized";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

/**
 * GET Handler - Contatos
 *
 * Manipulador da requisição GET para listar todos os contatos cadastrados.
 *
 * ▸ **Responsabilidade**
 * - Buscar todos os registros da tabela `contact` ordenados pela data de criação (mais recentes primeiro)
 * - Retornar os contatos em formato JSON com headers CORS apropriados
 *
 * @returns {Promise<NextResponse>} Resposta JSON com a lista de contatos ou mensagem de erro
 *
 * @example
 *
 * const response = await fetch("/api/contacts", { method: "GET" });
 * const data = await response.json();
 * // data = [{ id: "...", name: "...", ... }, ...]
 */
export async function GET() {
  try {
    const contacts = await prisma.contact.findMany({
      orderBy: { createdAt: "desc" },
    });
    return new NextResponse(JSON.stringify(contacts), {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  } catch (error) {
    console.error("Erro ao buscar contatos:", error);
    return NextResponse.json(
      { error: "Erro ao buscar contatos" },
      { status: 500 }
    );
  }
}

/**
 * POST Handler - Contatos
 *
 * Manipulador da requisição POST para criar um novo contato.
 *
 * ▸ **Responsabilidade**
 * - Verificar se o usuário está autorizado (via JWT)
 * - Validar os dados recebidos no corpo da requisição (`icon`, `name`, `user`, `link`)
 * - Criar um novo registro na tabela `contact`
 * - Retornar o contato criado ou mensagem de erro
 *
 * @param {NextRequest} req - Objeto da requisição contendo os dados do novo contato
 * @returns {Promise<NextResponse>} Resposta JSON com o contato criado ou erro
 *
 * @example
 *
 * const response = await fetch("/api/contacts", {
 *   method: "POST",
 *   body: JSON.stringify({ icon: "bi-linkedin", name: "LinkedIn", user: "usuario", link: "https://..." }),
 * });
 */
export async function POST(req: NextRequest) {
  if (!(await isAuthorized(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { icon, name, user, link } = body;

    if (!icon || !name) {
      return NextResponse.json({ error: "Dados incompletos" }, { status: 400 });
    }

    const contact = await prisma.contact.create({
      data: { icon, name, user, link },
    });

    return NextResponse.json(contact, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar contato:", error);
    return NextResponse.json(
      { error: "Erro ao criar contato" },
      { status: 500 }
    );
  }
}
