"use client";

import { COLORS } from "@/utils/colors";
import { useEffect, useState } from "react";
import { MoonLoader } from "react-spinners";
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";

export function ProjectsByTechChart() {
  const [data, setData] = useState<{ tech: string; count: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/analytics/projects-by-tech");
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("Erro ao buscar dados de techs:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
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
