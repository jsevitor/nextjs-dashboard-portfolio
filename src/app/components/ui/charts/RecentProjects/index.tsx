import { projectsData } from "@/data/data";
import { ProjectProps } from "@/types/project";
import { useEffect, useState } from "react";
import { MoonLoader } from "react-spinners";

/**
 * RecentProjects Component
 *
 * Componente responsável por exibir os projetos mais recentes, com base na data de criação. Os projetos são ordenados
 * de forma decrescente, e apenas os 6 projetos mais recentes são exibidos. Enquanto os dados estão sendo carregados,
 * um indicador de carregamento é exibido. Caso não haja projetos disponíveis, uma mensagem é apresentada.
 *
 * ▸ **Responsabilidade**
 * - Ordenar os projetos com base na data de criação
 * - Exibir os 6 projetos mais recentes
 * - Exibir um loader enquanto os dados são carregados
 * - Exibir uma mensagem caso não existam projetos
 *
 * @returns {JSX.Element} Componente que exibe os 6 projetos mais recentes
 *
 * @example
 * ```tsx
 * <RecentProjects />
 * ```
 */
export function RecentProjects() {
  const [lastProjects, setLastProjects] = useState<ProjectProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const sortedProjects = projectsData
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        .slice(0, 6);

      setLastProjects(sortedProjects);
    } catch (error) {
      console.error("Erro:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-32 w-full">
        <MoonLoader color="var(--highlight)" />
      </div>
    );

  if (!lastProjects.length)
    return <p className="text-muted">Nenhum dado encontrado.</p>;

  return (
    <>
      {lastProjects.map((project) => (
        <ul key={project.id} className="mb-4 pl-4 list-disc text-sm">
          <li>
            <span>{project.title}</span>
          </li>
        </ul>
      ))}
    </>
  );
}
