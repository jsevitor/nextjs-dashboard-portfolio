"use client";

import { COLORS } from "@/utils/colors";
import { useEffect, useState } from "react";
import { MoonLoader } from "react-spinners";
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";
import { projectsData } from "@/data/data"; // Importe os dados dos projetos

export function ProjectsByTechChart() {
  const [data, setData] = useState<{ tech: string; count: number }[]>([]);
  const [loading, setLoading] = useState(false);

  // Função para gerar o gráfico com base nos dados dos projetos
  const getTechCount = () => {
    const techCount: { [key: string]: number } = {};

    // Itera sobre todos os projetos
    projectsData.forEach((project) => {
      project.techs.forEach((tech) => {
        // Conta a ocorrência de cada tecnologia
        techCount[tech] = (techCount[tech] || 0) + 1;
      });
    });

    // Converte o objeto de contagem para um array de objetos
    const techData = Object.keys(techCount).map((tech) => ({
      tech,
      count: techCount[tech],
    }));

    return techData;
  };

  useEffect(() => {
    setLoading(true);

    try {
      // Simulando uma operação de fetch para os dados
      const techData = getTechCount();
      setData(techData);
    } catch (err) {
      console.error("Erro ao contar as tecnologias:", err);
    } finally {
      setLoading(false);
    }
  }, []); // O useEffect só rodará uma vez

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
