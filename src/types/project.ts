/**
 * ProjectProps Type
 *
 * Tipagem para as propriedades do componente Project.
 *
 * ▸ **Responsabilidade**
 * - Definir os dados necessários para exibir informações de um projeto
 *
 * @typedef {Object} ProjectProps
 * @property {string} id - Identificador único do projeto
 * @property {string} title - Título do projeto
 * @property {string} description - Descrição detalhada do projeto
 * @property {string} image - URL ou caminho da imagem representativa do projeto
 * @property {boolean} isFeatured - Indica se o projeto é destacado (featured)
 * @property {string} demoUrl - URL para a demonstração do projeto
 * @property {string} repoUrl - URL para o repositório do projeto
 * @property {string} [createdAt] - Data de criação do projeto (opcional)
 * @property {string} [updatedAt] - Data da última atualização do projeto (opcional)
 * @property {Array<{ tech: { id: string; name: string } }>} [projectTechs] - Lista de tecnologias usadas no projeto com detalhes (opcional)
 * @property {string[]} [techs] - Lista simplificada de nomes das tecnologias usadas (opcional)
 *
 * @example
 *
 * const project: ProjectProps = {
 *   id: "123",
 *   title: "Meu Projeto",
 *   description: "Descrição do projeto",
 *   image: "/images/project.png",
 *   isFeatured: true,
 *   demoUrl: "https://demo.projeto.com",
 *   repoUrl: "https://github.com/user/projeto",
 *   createdAt: "2023-01-01",
 *   updatedAt: "2023-05-01",
 *   projectTechs: [
 *     { tech: { id: "1", name: "React" } },
 *     { tech: { id: "2", name: "TypeScript" } }
 *   ],
 *   techs: ["React", "TypeScript"],
 * };
 */
export type ProjectProps = {
  id: string;
  title: string;
  description: string;
  image: string;
  isFeatured: boolean;
  demoUrl: string;
  repoUrl: string;
  createdAt?: string;
  updatedAt?: string;
  projectTechs?: {
    tech: {
      id: string;
      name: string;
    };
  }[];
  techs?: string[];
};
