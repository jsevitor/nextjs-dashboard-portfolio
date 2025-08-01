import { SectionTitleProps } from "@/types/ui/section_title";

/**
 * SectionTitle Component
 *
 * Componente responsável por renderizar um título de seção com estilização destacada.
 * Utilizado para sinalizar visualmente o início de uma nova seção em interfaces de usuário.
 *
 * ▸ **Responsabilidade**
 * - Exibir o conteúdo passado como título de seção com estilo visual padronizado
 * - Fornecer hierarquia visual e semântica utilizando a tag `<h2>`
 *
 * @param {SectionTitleProps} props - Propriedades do componente, contendo o conteúdo do título
 * @returns {JSX.Element} Elemento de título de seção estilizado
 *
 * @example
 * ```tsx
 * <SectionTitle>Projetos em Destaque</SectionTitle>
 * ```
 */
export function SectionTitle({ children }: SectionTitleProps) {
  return <h2 className="text-xl font-bold mb-4 text-highlight">{children}</h2>;
}
