/**
 * TechProps Type
 *
 * Tipagem para as propriedades básicas de uma tecnologia.
 *
 * ▸ **Responsabilidade**
 * - Definir os dados essenciais para representar uma tecnologia
 *
 * @typedef {Object} TechProps
 * @property {string} id - Identificador único da tecnologia
 * @property {string} name - Nome da tecnologia
 *
 * @example
 *
 * const tech: TechProps = {
 *   id: "1",
 *   name: "TypeScript",
 * };
 */
export type TechProps = {
  id: string;
  name: string;
};

/**
 * TechsProps Type
 *
 * Tipagem para as propriedades de uma tecnologia com possíveis associações a projetos.
 *
 * ▸ **Responsabilidade**
 * - Definir dados de tecnologia incluindo possíveis relacionamentos com projetos
 *
 * @typedef {Object} TechsProps
 * @property {string} id - Identificador único da tecnologia
 * @property {string} name - Nome da tecnologia
 * @property {Array<{ tech: { id: string; name: string } }>} [projectTechs] - Lista opcional de associações da tecnologia com projetos
 *
 * @example
 *
 * const techWithProjects: TechsProps = {
 *   id: "2",
 *   name: "React",
 *   projectTechs: [
 *     { tech: { id: "2", name: "React" } },
 *   ],
 * };
 */
export type TechsProps = {
  id: string;
  name: string;
  projectTechs?: {
    tech: {
      id: string;
      name: string;
    };
  }[];
};
