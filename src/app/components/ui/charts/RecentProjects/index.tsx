import { projectsData } from "@/data/data";
import { useEffect, useState } from "react";
import { MoonLoader } from "react-spinners";

type Project = {
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

export function RecentProjects() {
  const [lastProjects, setLastProjects] = useState<Project[]>([]);
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
