import NextAuth, { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

/**
 * NextAuth Configuration
 *
 * Configuração de autenticação para a aplicação utilizando o NextAuth.js.
 * Define os provedores de autenticação e as opções relacionadas à sessão e segurança.
 *
 * ▸ **Responsabilidade**
 * - Configurar e exportar os provedores de autenticação (GitHub e Google)
 * - Definir o uso de JWT como estratégia de sessão
 * - Garantir a segurança com o uso da variável de ambiente `NEXTAUTH_SECRET`
 * - Exportar a função `NextAuth` com as opções definidas
 *
 * @constant {AuthOptions} authOptions - Objeto de configuração contendo os provedores e estratégias de autenticação
 *
 * @returns {NextApiHandler} Manipulador de rota de autenticação configurado com NextAuth
 *
 * @example
 *
 * // Em uma rota de API do Next.js (ex: pages/api/auth/[...nextauth].ts)
 * export default NextAuth(authOptions);
 */
export const authOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
};

export default NextAuth(authOptions);
