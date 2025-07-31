import { PageHeaderProps } from "@/types/layout/page_header";

/**
 * PageHeader Component
 *
 * Componente responsável por exibir um cabeçalho de página estilizado.
 * Permite incluir conteúdo dinâmico através de `children` e aplica estilos específicos, como destaque no texto e uma borda à esquerda.
 *
 * ▸ **Responsabilidade**
 * - Exibir o título da página ou seção com estilo destacado
 * - Personalização do conteúdo através do uso de `children`
 * - Aplicação de borda e estilo de texto específicos
 *
 * @param {PageHeaderProps} props Propriedades para customizar o cabeçalho
 * @param {React.ReactNode} props.children Conteúdo do cabeçalho, geralmente o título da página
 *
 * @returns {JSX.Element} Componente de cabeçalho da página
 *
 * @example
 * ```tsx
 * <PageHeader>Minha Página</PageHeader>
 * ```
 */
export function PageHeader({ children }: PageHeaderProps) {
  return (
    <h1 className="text-3xl font-bold text-highlight border-l-3 border-highlight pl-4">
      {children}
    </h1>
  );
}
