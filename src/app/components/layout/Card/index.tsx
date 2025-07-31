import { CardProps } from "@/types/layout/card";

/**
 * Card Component
 *
 * Componente responsável por exibir um card estilizado.
 * Permite a inclusão de conteúdo dinâmico via `children`, além de poder personalizar sua classe CSS e estilo inline.
 *
 * ▸ **Responsabilidade**
 * - Exibir conteúdo dinâmico dentro de um card estilizado
 * - Permitir personalização de classes CSS
 * - Permitir personalização de estilo inline
 *
 * @param {CardProps} props Propriedades para personalizar o card
 * @param {React.ReactNode} props.children Conteúdo a ser exibido dentro do card
 * @param {string} [props.className] Classe CSS adicional para customização
 * @param {React.CSSProperties} [props.style] Estilos inline adicionais
 *
 * @returns {JSX.Element} Componente de exibição do card
 *
 * @example
 * ```tsx
 * <Card className="my-custom-class" style={{ padding: '20px' }}>
 *   <h1>Conteúdo do Card</h1>
 * </Card>
 * ```
 */
export function Card({ children, className, style }: CardProps) {
  return (
    <section
      className={`bg-gray-lighter shadow p-4 rounded ${className}`}
      style={style}
    >
      {children}
    </section>
  );
}
