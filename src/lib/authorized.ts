import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

/**
 * isAuthorized Utility
 *
 * Função utilitária usada para verificar se uma requisição possui um token JWT válido,
 * indicando se o usuário está autenticado via NextAuth.
 *
 * ▸ **Responsabilidade**
 * - Verificar a presença de um token JWT válido na requisição
 * - Utilizar o segredo definido em `NEXTAUTH_SECRET` para validar o token
 *
 * @param {NextRequest} req - Objeto da requisição do Next.js (middleware ou API)
 * @returns {Promise<boolean>} Retorna `true` se o token estiver presente e válido, caso contrário `false`
 *
 * @example
 *
 * const isAuth = await isAuthorized(request);
 * if (!isAuth) return NextResponse.redirect("/login");
 */
export async function isAuthorized(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  return !!token;
}
