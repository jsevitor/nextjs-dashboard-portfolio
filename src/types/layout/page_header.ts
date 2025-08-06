/**
 * PageHeaderProps Type
 *
 * Tipagem para as propriedades do componente PageHeader.
 *
 * ▸ **Responsabilidade**
 * - Definir os tipos das props aceitas pelo componente PageHeader
 *
 * @typedef {Object} PageHeaderProps
 * @property {React.ReactNode} children - Conteúdo interno do cabeçalho da página, geralmente elementos React
 *
 * @example
 *
 * const headerProps: PageHeaderProps = {
 *   children: <h1>Título da Página</h1>,
 * };
 */
export type PageHeaderProps = {
  children: React.ReactNode;
};
