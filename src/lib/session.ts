import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

/**
 * getCurrentUser
 *
 * Função utilitária responsável por recuperar o usuário autenticado a partir da sessão do servidor
 * utilizando as configurações definidas no NextAuth.
 *
 * ▸ **Responsabilidade**
 * - Obter a sessão ativa no contexto do servidor
 * - Retornar os dados do usuário autenticado, se houver sessão válida
 *
 * @returns {Promise<DefaultUser | undefined>} Retorna o objeto `user` da sessão se autenticado, caso contrário `undefined`
 *
 * @example
 *
 * const user = await getCurrentUser();
 * if (user) {
 *   console.log("Usuário autenticado:", user.name);
 * }
 */
export async function getCurrentUser() {
  const session = await getServerSession(authOptions);
  return session?.user;
}
