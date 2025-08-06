/**
 * SectionTitleProps Type
 *
 * Tipagem para as propriedades do componente SectionTitle.
 *
 * ▸ **Responsabilidade**
 * - Definir os tipos das props aceitas pelo componente SectionTitle
 *
 * @typedef {Object} SectionTitleProps
 * @property {React.ReactNode} children - Conteúdo interno do título da seção, geralmente elementos React
 *
 * @example
 *
 * const sectionTitleProps: SectionTitleProps = {
 *   children: <h2>Título da Seção</h2>,
 * };
 */
export type SectionTitleProps = {
  children: React.ReactNode;
};
