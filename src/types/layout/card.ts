/**
 * CardProps Type
 *
 * Tipagem para as propriedades do componente Card.
 *
 * ▸ **Responsabilidade**
 * - Definir os tipos das props aceitas pelo componente Card
 *
 * @typedef {Object} CardProps
 * @property {React.ReactNode} children - Conteúdo interno do card, geralmente elementos React
 * @property {string} [className] - Classe(s) CSS opcionais para customização do estilo
 * @property {React.CSSProperties} [style] - Estilo inline opcional para customização adicional
 *
 * @example
 *
 * const cardProps: CardProps = {
 *   children: <p>Conteúdo do card</p>,
 *   className: "bg-white p-4",
 *   style: { borderRadius: "8px" },
 * };
 */
export type CardProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};
