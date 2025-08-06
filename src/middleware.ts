import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

/**
 * Authentication Middleware
 *
 * Middleware para proteger rotas da aplicação Next.js, verificando se o usuário está autenticado.
 * Redireciona para a página de login caso o usuário não esteja autenticado e tente acessar rotas protegidas,
 * e redireciona para a página inicial se um usuário autenticado tentar acessar a página de login.
 *
 * ▸ **Responsabilidade**
 * - Verificar a presença de um token JWT válido na requisição
 * - Permitir acesso livre para rotas públicas (ex: "/login")
 * - Redirecionar usuários não autenticados para a página de login ao acessar rotas protegidas
 * - Redirecionar usuários autenticados que acessam a página de login para a página inicial
 *
 * @param {NextRequest} req - Objeto da requisição do Next.js no contexto do middleware
 * @returns {Promise<NextResponse>} Resposta com redirecionamento ou continuação da requisição
 *
 * @example
 *
 * export async function middleware(req: NextRequest) {
 *   // lógica de autenticação e redirecionamento
 * }
 *
 * export const config = {
 *   matcher: ["/((?!api|_next|static|favicon.ico).*)"],
 * };
 */
export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const isAuth = !!token;
  const path = req.nextUrl.pathname;

  const publicPaths = ["/login"];

  if (!isAuth && !publicPaths.includes(path)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isAuth && path === "/login") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|static|favicon.ico).*)"],
};
