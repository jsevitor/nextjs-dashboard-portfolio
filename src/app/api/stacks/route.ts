import { isAuthorized } from "@/lib/authorized";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

/**
 * GET Handler - Listar Stacks (Skills)
 *
 * Manipulador da requisição GET que retorna todas as stacks (skills) cadastradas no banco de dados.
 *
 * ▸ **Responsabilidade**
 * - Buscar todos os registros da tabela `skill`
 * - Retornar os dados em formato JSON com headers CORS apropriados
 *
 * @returns {Promise<NextResponse>} Resposta JSON contendo a lista de stacks
 *
 * @example
 *
 * const response = await fetch("/api/stack", { method: "GET" });
 * const data = await response.json();
 * // data = [{ id: "1", name: "React", icon: "⚛️" }, ...]
 */
export async function GET() {
  try {
    const stacks = await prisma.skill.findMany();
    return new NextResponse(JSON.stringify(stacks), {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  } catch (error) {
    console.error("Erro ao buscar stacks:", error);
    return NextResponse.json(
      { error: "Erro ao buscar stacks" },
      { status: 500 }
    );
  }
}

/**
 * POST Handler - Criar Stack (Skill)
 *
 * Manipulador da requisição POST que cria uma nova stack (skill) no banco de dados.
 *
 * ▸ **Responsabilidade**
 * - Verificar se a requisição é autorizada
 * - Validar os dados recebidos no corpo da requisição (`icon` e `name`)
 * - Criar um novo registro na tabela `skill`
 * - Retornar os dados da stack recém-criada
 *
 * @param {NextRequest} req - Objeto da requisição contendo os dados da nova stack
 *
 * @returns {Promise<NextResponse>} Resposta JSON contendo a stack criada ou erro apropriado
 *
 * @example
 *
 * const response = await fetch("/api/stack", {
 *   method: "POST",
 *   body: JSON.stringify({ icon: "🛠️", name: "Node.js" }),
 * });
 * const data = await response.json();
 * // data = { id: "123", icon: "🛠️", name: "Node.js" }
 */
export async function POST(req: NextRequest) {
  if (!(await isAuthorized(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await req.json();
    const { icon, name } = body;

    if (!icon || !name) {
      return NextResponse.json({ error: "Dados incompletos" }, { status: 400 });
    }

    const stacks = await prisma.skill.create({
      data: { icon, name },
    });

    return NextResponse.json(stacks, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar stack:", error);
    return NextResponse.json({ error: "Erro ao criar stack" }, { status: 500 });
  }
}
