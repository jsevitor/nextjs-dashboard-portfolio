import { isAuthorized } from "@/lib/authorized";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

/**
 * GET Handler - About
 *
 * Manipulador da requisição GET para buscar os registros da seção "About" no banco de dados.
 *
 * ▸ **Responsabilidade**
 * - Recuperar todos os registros da tabela `about` ordenados pela data de criação (mais recentes primeiro)
 * - Retornar os dados em formato JSON com headers CORS apropriados
 *
 * @returns {Promise<NextResponse>} Resposta contendo os dados da seção "About" ou erro interno do servidor
 *
 * @example
 *
 * const response = await fetch("/api/about", { method: "GET" });
 */
export async function GET() {
  try {
    const about = await prisma.about.findMany({
      orderBy: { createdAt: "desc" },
    });
    return new NextResponse(JSON.stringify(about), {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  } catch (error) {
    console.error("Erro ao buscar about:", error);
    return NextResponse.json(
      { error: "Erro ao buscar about" },
      { status: 500 }
    );
  }
}

/**
 * POST Handler - About
 *
 * Manipulador da requisição POST para criação de um novo registro na seção "About".
 *
 * ▸ **Responsabilidade**
 * - Verificar se o usuário está autorizado (via JWT)
 * - Validar os dados recebidos no corpo da requisição
 * - Inserir um novo registro na tabela `about` com os dados fornecidos
 * - Retornar o objeto criado ou mensagens de erro em caso de falha
 *
 * @param {NextRequest} req - Objeto da requisição contendo os dados da nova entrada
 * @returns {Promise<NextResponse>} Resposta contendo o novo registro criado ou mensagens de erro
 *
 * @example
 *
 * const response = await fetch("/api/about", {
 *   method: "POST",
 *   body: JSON.stringify({ location, content, image, curriculum }),
 * });
 */
export async function POST(req: NextRequest) {
  if (!(await isAuthorized(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await req.json();
    const { location, content, image, curriculum } = body;

    if (!location || !content || !image || !curriculum) {
      return NextResponse.json({ error: "Dados incompletos" }, { status: 400 });
    }

    const about = await prisma.about.create({
      data: { location, content, image, curriculum },
    });

    return NextResponse.json(about, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar about:", error);
    return NextResponse.json({ error: "Erro ao criar about" }, { status: 500 });
  }
}
