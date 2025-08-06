/**
 * StacksProps Type
 *
 * Tipagem para as propriedades do componente Stack.
 *
 * ▸ **Responsabilidade**
 * - Definir os dados essenciais para exibir uma stack tecnológica
 *
 * @typedef {Object} StacksProps
 * @property {string} id - Identificador único da stack
 * @property {string} name - Nome da stack tecnológica
 * @property {string} icon - Nome ou caminho do ícone representativo da stack
 *
 * @example
 *
 * const stack: StacksProps = {
 *   id: "1",
 *   name: "React",
 *   icon: "react-icon",
 * };
 */
export type StacksProps = {
  id: string;
  name: string;
  icon: string;
};
