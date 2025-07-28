"use client";

import { useEffect, useState } from "react";
import { Card, Layout } from "./components/layout";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import { ProjectsOverTimeChart } from "./components/ui/charts/ProjectsOverTimeChart";
import { ProjectsByTechChart } from "./components/ui/charts/ProjectsByTechChart";
import { icons } from "lucide-react";
import { TechsMostUsed } from "./components/ui/charts/TechsMostUsed";

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

export default function Home() {
  const [totalProjects, setTotalProjects] = useState<number | null>(null);
  const [totalSkills, setTotalSkills] = useState<number | null>(null);
  const [totalTechs, setTotalTechs] = useState<number | null>(null);
  const [totalContacts, setTotalContacts] = useState<number | null>(null);
  const [lastUpdate, setLastUpdate] = useState<string | null>(null);
  const [lastProjects, setLastProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjectSummary = async () => {
      const res = await fetch("/api/projects/summary");
      const data = await res.json();
      setTotalProjects(data.total);
    };

    const fetchSkillSummary = async () => {
      const res = await fetch("/api/stacks/summary");
      const data = await res.json();
      setTotalSkills(data.total);
    };

    const fetchTechSummary = async () => {
      const res = await fetch("/api/tech/summary");
      const data = await res.json();
      setTotalTechs(data.total);
    };

    const fetchContactSummary = async () => {
      const res = await fetch("/api/contacts/summary");
      const data = await res.json();
      setTotalContacts(data.total);
    };

    const fetchLastProjects = async () => {
      const res = await fetch("/api/projects");
      const data = await res.json();
      setLastProjects(data.slice(0, 3));
    };

    const fetchLastUpdate = async () => {
      const res = await fetch("/api/meta/last-update");
      const data = await res.json();
      setLastUpdate(data.lastUpdate);
    };

    fetchProjectSummary();
    fetchSkillSummary();
    fetchTechSummary();
    fetchContactSummary();
    fetchLastProjects();
    fetchLastUpdate();
  }, []);

  const summaryInfos = [
    { title: "Projetos", value: totalProjects ?? "--", icon: "bi-briefcase" },
    { title: "Skills", value: totalSkills ?? "--", icon: "bi-stack" },
    { title: "Techs", value: totalTechs ?? "--", icon: "bi-code-slash" },
    { title: "Contatos", value: totalContacts ?? "--", icon: "bi-telephone" },
  ];

  return (
    <div>
      <Layout>
        <div className="border-l-2 flex flex-col md:flex-row md:justify-between md:items-end w-full mt-4 mb-14 px-4">
          <h1 className="text-3xl">Dashboard</h1>
          <div className="flex gap-2 text-sm text-gray-medium">
            <p className="text-sm font-light">Última atualização:</p>
            {lastUpdate
              ? format(new Date(lastUpdate), "dd 'de' MMMM 'às' HH:mm", {
                  locale: ptBR,
                })
              : "--"}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid grid-cols-2 gap-4">
              {summaryInfos.map((info) => (
                <Card
                  key={info.title}
                  className="text-highlight flex flex-col items-center md:items-start"
                >
                  <span className="flex items-center gap-4 text-xl mb-4">
                    <h2 className="font-bold ">{info.title}</h2>
                    <i className={info.icon}></i>
                  </span>
                  <span className="text-3xl font-bold">{info.value}</span>
                </Card>
              ))}
            </div>
            <div>
              <Card className="h-full">
                <h2 className="text-xl font-bold mb-4">Projetos Recentes</h2>
                {lastProjects.map((project) => (
                  <ul key={project.id} className="mb-4 pl-4 list-disc text-sm">
                    <li>
                      <span>{project.title}</span>
                    </li>
                  </ul>
                ))}
              </Card>
            </div>
          </div>
          <div className="">
            <Card>
              <h2 className="text-xl font-bold mb-4">
                Projetos ao Longo do Tempo
              </h2>
              <ProjectsOverTimeChart />
            </Card>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card>
              <h2 className="text-xl font-bold mb-4">
                Projetos por Tecnologia
              </h2>
              <ProjectsByTechChart />
            </Card>

            <Card>
              <h2 className="text-xl font-bold mb-4">
                Tecnologias Mais Usadas
              </h2>
              <TechsMostUsed />
            </Card>
          </div>
        </div>
      </Layout>
    </div>
  );
}
