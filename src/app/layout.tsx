import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import AuthSessionProvider from "@/components/SessionProvider";
import SessionInitializer from "@/components/SessionInitializer";
import "./globals.css";
import { Toaster } from "sonner";

/**
 * RootLayout Component
 *
 * Layout raiz da aplicação Next.js que configura o contexto de sessão, fontes globais,
 * metadados da página e estilos gerais.
 *
 * ▸ **Responsabilidade**
 * - Configurar a fonte Lexend global com pesos variados
 * - Definir metadados da aplicação (título e descrição)
 * - Obter a sessão do usuário no servidor usando NextAuth
 * - Envolver o conteúdo com o provedor de sessão e inicializador de sessão
 * - Incluir links para ícones externos (Bootstrap Icons, Devicons)
 * - Renderizar o componente Toaster para notificações
 *
 * @param {Readonly<{children: React.ReactNode}>} props - Props contendo os elementos filhos a serem renderizados
 * @returns {JSX.Element} Estrutura HTML principal da aplicação com contexto de autenticação e estilos globais
 *
 * @example
 *
 * <RootLayout>
 *   <App />
 * </RootLayout>
 */
const lexendSans = Lexend({
  variable: "--font-lexend-sans",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

/**
 * metadata Constant
 *
 * Objeto contendo metadados para a aplicação, utilizado pelo Next.js para SEO e configuração da página.
 *
 * @constant {Metadata} metadata
 */
export const metadata: Metadata = {
  title: "Portfólio Dashboard",
  description: "Dashboard para gerenciamento de portfólio.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.13.1/font/bootstrap-icons.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
        />
      </head>
      <body className={`${lexendSans.className} antialiased`}>
        <AuthSessionProvider>
          <SessionInitializer session={session} />
          {children}
        </AuthSessionProvider>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
