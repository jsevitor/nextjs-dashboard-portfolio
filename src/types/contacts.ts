/**
 * ContactsProps Type
 *
 * Tipagem para as propriedades do componente de contatos.
 *
 * ▸ **Responsabilidade**
 * - Definir os dados necessários para exibir informações de contato
 *
 * @typedef {Object} ContactsProps
 * @property {string} id - Identificador único do contato
 * @property {string} icon - Nome ou caminho do ícone representativo do contato
 * @property {string} name - Nome do tipo de contato (ex: Email, Telefone)
 * @property {string} user - Nome ou identificador do usuário para o contato
 * @property {string} link - URL ou link associado ao contato (ex: mailto:, tel:, url)
 *
 * @example
 *
 * const contact: ContactsProps = {
 *   id: "1",
 *   icon: "email-icon",
 *   name: "Email",
 *   user: "contato@example.com",
 *   link: "mailto:contato@example.com",
 * };
 */
export type ContactsProps = {
  id: string;
  icon: string;
  name: string;
  user: string;
  link: string;
};
