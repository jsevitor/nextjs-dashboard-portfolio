import NextAuth from "next-auth/next";
import { authOptions } from "@/lib/auth";

/**
 * Auth Handler - NextAuth
 *
 * Manipulador de requisições GET e POST para autenticação de usuários via NextAuth.
 *
 * ▸ **Responsabilidade**
 * - Inicializar o handler do NextAuth com as opções de autenticação definidas
 * - Expor os métodos `GET` e `POST` necessários para o funcionamento da API de autenticação
 *
 * @see https://next-auth.js.org/configuration/nextjs#route-handlers-app
 *
 * @returns {Promise<NextResponse>} Resposta da API de autenticação do NextAuth
 *
 * @example
 *
 * // NextAuth automaticamente lida com rotas /api/auth/signin, /signout, /callback etc.
 * // Portanto, nenhuma chamada direta é necessária, apenas a configuração.
 */
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
