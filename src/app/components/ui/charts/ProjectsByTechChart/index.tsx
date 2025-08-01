"use client";

import { COLORS } from "@/utils/colors";
import { useEffect, useState } from "react";
import { MoonLoader } from "react-spinners";
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";
import { projectsData } from "@/data/data";

/**
 * ProjectsByTechChart Component
 *
 * Componente responsável por exibir um gráfico de pizza (pie chart) mostrando a distribuição de tecnologias nos projetos.
 * O gráfico é baseado nos dados de `projectsData`, que contém informações sobre os projetos e suas respectivas tecnologias.
 * Enquanto os dados estão sendo carregados, o componente exibe um loader. Se não houver dados disponíveis, uma mensagem é exibida.
 *
 * ▸ **Responsabilidade**
 * - Calcular a quantidade de vezes que cada tecnologia é usada nos projetos
 * - Exibir um gráfico de pizza com as tecnologias e suas porcentagens
 * - Exibir um indicador de carregamento enquanto os dados são processados
 * - Exibir uma mensagem quando não houver dados disponíveis
 *
 * @returns {JSX.Element} Componente que exibe o gráfico de pizza com a distribuição das tecnologias
 *
 * @example
 * ```tsx
 * <ProjectsByTechChart />
 * ```
 */
export function ProjectsByTechChart() {
  const [data, setData] = useState<{ tech: string; count: number }[]>([]);
  const [loading, setLoading] = useState(false);

  /**
   * Função responsável por calcular a quantidade de vezes que cada tecnologia
   * é usada nos projetos.
   *
   * @returns {Array<{tech: string, count: number}>} Um array com as tecnologias
   * e suas respectivas quantidades de uso nos projetos.
   */
  const getTechCount = () => {
    const techCount: { [key: string]: number } = {};

    projectsData.forEach((project) => {
      project.techs.forEach((tech) => {
        techCount[tech] = (techCount[tech] || 0) + 1;
      });
    });

    const techData = Object.keys(techCount).map((tech) => ({
      tech,
      count: techCount[tech],
    }));

    return techData;
  };

  useEffect(() => {
    setLoading(true);

    try {
      const techData = getTechCount();
      setData(techData);
    } catch (err) {
      console.error("Erro ao contar as tecnologias:", err);
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
    return <p className="text-muted">Nenhum dado disponível.</p>;

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            dataKey="count"
            nameKey="tech"
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={100}
            labelLine={false}
            label={({ tech, percent }) =>
              percent && percent > 0
                ? `${tech} (${(percent * 100).toFixed(0)}%)`
                : ""
            }
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--background)",
              border: "none",
            }}
            labelStyle={{ color: "var(--foreground)" }}
            itemStyle={{ color: "var(--foreground)" }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
