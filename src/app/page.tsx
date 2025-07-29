"use client";

import { useEffect, useState } from "react";
import { Card, Layout } from "./components/layout";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import { ProjectsOverTimeChart } from "./components/ui/charts/ProjectsOverTimeChart";
import { ProjectsByTechChart } from "./components/ui/charts/ProjectsByTechChart";
import { TechsMostUsed } from "./components/ui/charts/TechsMostUsed";
import { COLORS } from "@/utils/colors";
import { SectionTitle } from "./components/ui/title/SectionTitle";
import { PageHeader } from "./components/layout/title/PageHeader";
import { RecentProjects } from "./components/ui/charts/RecentProjects";

export default function Home() {
  const [totalProjects, setTotalProjects] = useState<number | null>(null);
  const [totalSkills, setTotalSkills] = useState<number | null>(null);
  const [totalTechs, setTotalTechs] = useState<number | null>(null);
  const [totalContacts, setTotalContacts] = useState<number | null>(null);
  const [lastUpdate, setLastUpdate] = useState<string | null>(null);

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

    const fetchLastUpdate = async () => {
      const res = await fetch("/api/meta/last-update");
      const data = await res.json();
      setLastUpdate(data.lastUpdate);
    };

    fetchProjectSummary();
    fetchSkillSummary();
    fetchTechSummary();
    fetchContactSummary();
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
        <div className="flex flex-col md:flex-row md:justify-between md:items-end w-full mt-4 mb-14">
          <PageHeader>Dashboard</PageHeader>
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
              {summaryInfos.map((info, index) => (
                <Card
                  key={info.title}
                  className="flex flex-col items-center md:items-start text-white"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
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
                <SectionTitle>Projetos Recentes</SectionTitle>
                <RecentProjects />
              </Card>
            </div>
          </div>
          <div className="">
            <Card>
              <SectionTitle>Projetos ao Longo do Tempo</SectionTitle>
              <ProjectsOverTimeChart />
            </Card>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card>
              <SectionTitle>Projetos por Tecnologia</SectionTitle>
              <ProjectsByTechChart />
            </Card>

            <Card>
              <SectionTitle>Tecnologias Mais Usadas</SectionTitle>
              <TechsMostUsed />
            </Card>
          </div>
        </div>
      </Layout>
    </div>
  );
}
