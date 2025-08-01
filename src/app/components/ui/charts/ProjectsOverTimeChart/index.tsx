"use client";

import { useEffect, useState } from "react";
import { MoonLoader } from "react-spinners";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { projectsData } from "@/data/data";

/**
 * ProjectsOverTimeChart Component
 *
 * Componente responsável por exibir um gráfico de linha (line chart) que mostra a quantidade de projetos ao longo do tempo,
 * agrupados por mês. A quantidade de projetos é contada para cada mês com base na data de criação dos projetos.
 * Enquanto os dados estão sendo carregados, um indicador de carregamento é exibido. Caso não haja dados disponíveis,
 * uma mensagem é apresentada.
 *
 * ▸ **Responsabilidade**
 * - Contabilizar a quantidade de projetos criados a cada mês
 * - Exibir um gráfico de linha mostrando a evolução dos projetos ao longo do tempo
 * - Exibir um loader enquanto os dados são carregados
 * - Exibir uma mensagem caso não existam dados disponíveis
 *
 * @returns {JSX.Element} Componente que exibe um gráfico de linha com a quantidade de projetos por mês
 *
 * @example
 * ```tsx
 * <ProjectsOverTimeChart />
 * ```
 */
export function ProjectsOverTimeChart() {
  const [data, setData] = useState<{ month: string; count: number }[]>([]);
  const [loading, setLoading] = useState(false);

  /**
   * Função responsável por calcular a quantidade de projetos criados a cada mês.
   *
   * Itera sobre os dados dos projetos e agrupa-os por mês de criação, contabilizando
   * a quantidade de projetos em cada mês. O resultado é um array de objetos, cada
   * um contendo o mês e a quantidade de projetos correspondentes, ordenado por mês.
   *
   * @returns {Array<{month: string, count: number}>} Um array de objetos, onde cada
   * objeto representa um mês e a quantidade de projetos criados nesse mês.
   */
  const getProjectsOverTime = () => {
    const monthCount: { [key: string]: number } = {};

    projectsData.forEach((project) => {
      const createdAt = new Date(project.createdAt);
      const month = `${createdAt.getFullYear()}-${(createdAt.getMonth() + 1)
        .toString()
        .padStart(2, "0")}`;

      monthCount[month] = (monthCount[month] || 0) + 1;
    });

    const monthData = Object.keys(monthCount)
      .map((month) => ({
        month,
        count: monthCount[month],
      }))
      .sort((a, b) => (a.month > b.month ? 1 : -1));

    return monthData;
  };

  useEffect(() => {
    setLoading(true);

    try {
      const monthData = getProjectsOverTime();
      setData(monthData);
    } catch (err) {
      console.error("Erro ao contar projetos por mês:", err);
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

  if (!data.length)
    return <p className="text-muted">Nenhum dado encontrado.</p>;

  return (
    <div className="w-full h-[250px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
          <XAxis
            dataKey="month"
            stroke="var(--foreground)"
            tick={{ fill: "var(--foreground)" }}
            tickFormatter={(month) => {
              const [year, monthNumber] = month.split("-");
              return `${monthNumber}/${year}`;
            }}
          />
          <YAxis
            allowDecimals={false}
            stroke="var(--foreground)"
            tick={{ fill: "var(--foreground)" }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--background)",
              border: "none",
            }}
            labelStyle={{ color: "var(--foreground)" }}
            itemStyle={{ color: "var(--foreground)" }}
          />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#3266CC"
            strokeWidth={3}
            dot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
