import { isAuthorized } from "@/lib/authorized";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

/**
 * GET Handler - Listar Techs
 *
 * Manipulador da requisição GET que retorna todas as tecnologias (techs) cadastradas no banco de dados.
 *
 * ▸ **Responsabilidade**
 * - Buscar todos os registros da tabela `tech`
 * - Retornar os dados em formato JSON com headers CORS apropriados
 *
 * @returns {Promise<NextResponse>} Resposta JSON contendo a lista de tecnologias
 *
 * @example
 *
 * const response = await fetch("/api/tech", { method: "GET" });
 * const data = await response.json();
 * // data = [{ id: "1", name: "TypeScript" }, ...]
 */
export async function GET() {
  try {
    const techs = await prisma.tech.findMany();
    return new NextResponse(JSON.stringify(techs), {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  } catch (error) {
    console.error("Erro ao buscar techs:", error);
    return NextResponse.json(
      { error: "Erro ao buscar techs" },
      { status: 500 }
    );
  }
}

/**
 * POST Handler - Criar Tech
 *
 * Manipulador da requisição POST que cria uma nova tecnologia (tech) no banco de dados.
 *
 * ▸ **Responsabilidade**
 * - Verificar se a requisição é autorizada
 * - Validar o campo `name` recebido no corpo da requisição
 * - Criar um novo registro na tabela `tech`
 * - Retornar os dados da tecnologia criada
 *
 * @param {NextRequest} req - Objeto da requisição contendo os dados da nova tecnologia
 *
 * @returns {Promise<NextResponse>} Resposta JSON contendo a tech criada ou erro apropriado
 *
 * @example
 *
 * const response = await fetch("/api/tech", {
 *   method: "POST",
 *   body: JSON.stringify({ name: "GraphQL" }),
 * });
 * const data = await response.json();
 * // data = { id: "abc123", name: "GraphQL" }
 */
export async function POST(req: NextRequest) {
  if (!(await isAuthorized(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await req.json();
    const { name } = body;

    if (!name) {
      return NextResponse.json(
        { error: "Nome da tecnologia é obrigatório." },
        { status: 400 }
      );
    }

    const tech = await prisma.tech.create({
      data: { name },
    });

    return NextResponse.json(tech, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar tech:", error);
    return NextResponse.json(
      { error: "Erro interno ao criar tecnologia." },
      { status: 500 }
    );
  }
}
