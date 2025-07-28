import { useEffect, useState } from "react";
import { MoonLoader } from "react-spinners";

type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  projectTechs: {
    tech: {
      id: string;
      name: string;
    };
  }[];
  demoUrl: string;
  repoUrl: string;
};

export function RecentProjects() {
  const [lastProjects, setLastProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLastProjects() {
      try {
        const res = await fetch("/api/projects");
        const data = await res.json();
        setLastProjects(data.slice(0, 5));
      } catch (error) {
        console.error("Erro:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchLastProjects();
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
