/**
 * AboutProps Type
 *
 * Tipagem para as propriedades do componente About.
 *
 * ▸ **Responsabilidade**
 * - Definir os dados necessários para exibir uma seção "Sobre"
 *
 * @typedef {Object} AboutProps
 * @property {string} id - Identificador único da seção
 * @property {string} location - Localização ou cidade relacionada à seção
 * @property {string} content - Texto ou descrição do conteúdo da seção
 * @property {string} image - URL ou caminho da imagem associada
 * @property {string} curriculum - URL ou texto do currículo relacionado
 *
 * @example
 *
 * const aboutData: AboutProps = {
 *   id: "1",
 *   location: "São Paulo",
 *   content: "Descrição sobre a pessoa ou empresa.",
 *   image: "/images/profile.jpg",
 *   curriculum: "/docs/curriculum.pdf",
 * };
 */
export type AboutProps = {
  id: string;
  location: string;
  content: string;
  image: string;
  curriculum: string;
};
