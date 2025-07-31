/**
 * Footer Component
 *
 * Componente responsável por exibir o rodapé da aplicação.
 * Contém informações de copyright, direitos reservados e créditos ao desenvolvedor.
 * Inclui um link para o perfil do desenvolvedor no GitHub.
 *
 * ▸ **Responsabilidade**
 * - Exibir informações de copyright e direitos reservados
 * - Exibir crédito ao desenvolvedor com link para o GitHub
 * - Estilização flexível e responsiva para se ajustar a diferentes tamanhos de tela
 *
 * @returns {JSX.Element} Componente de rodapé da aplicação
 *
 * @example
 * ```tsx
 * <Footer />
 * ```
 */
export function Footer() {
  return (
    <footer className="flex flex-col items-center justify-center py-4 text-gray-medium text-xs">
      <span className="">© 2025 DASHBOARD PORTFÓLIO.</span>
      <span className="">Todos os direitos reservados.</span>
      <span className="">
        Desenvolvido por{" "}
        <a
          href="https://github.com/jsevitor"
          target="_blank"
          className="text-highlight hover:underline"
        >
          Vitor Oliveira
        </a>
        .
      </span>
    </footer>
  );
}
