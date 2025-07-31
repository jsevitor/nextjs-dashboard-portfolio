import { Sidebar } from "../Sidebar";
import { Footer } from "../Footer";

/**
 * Layout Component
 *
 * Componente responsável por estruturar o layout da aplicação, com uma barra lateral (`Sidebar`), conteúdo principal (`main`) e rodapé (`Footer`).
 * Organiza a disposição de `children` dentro da página e garante uma estrutura responsiva.
 * Exibe a barra lateral apenas em telas maiores (desktop), enquanto no mobile a estrutura se adapta.
 *
 * ▸ **Responsabilidade**
 * - Organizar a estrutura do layout com barra lateral, conteúdo e rodapé
 * - Exibir o conteúdo principal (`children`) em uma área centralizada
 * - Responsividade para adaptar-se a dispositivos móveis e desktop
 *
 * @param {Object} props Propriedades do componente
 * @param {React.ReactNode} props.children Conteúdo a ser renderizado dentro da área principal do layout
 *
 * @returns {JSX.Element} Componente de layout com barra lateral e rodapé
 *
 * @example
 * ```tsx
 * <Layout>
 *   <h1>Bem-vindo ao meu site!</h1>
 * </Layout>
 * ```
 */
export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col lg:flex-row w-full h-dvh lg:overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-y-auto min-h-dvh">
        <main className="flex-1 p-4 lg:p-8">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
