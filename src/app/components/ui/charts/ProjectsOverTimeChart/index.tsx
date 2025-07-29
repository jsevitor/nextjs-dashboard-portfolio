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

export function ProjectsOverTimeChart() {
  const [data, setData] = useState<{ month: string; count: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/analytics/projects-over-time");
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("Erro ao buscar dados do gráfico:", err);
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
    return <p className="text-muted">Nenhum dado encontrado.</p>;

  return (
    <div className="w-full h-[250px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
          <XAxis
            dataKey="day"
            stroke="var(--foreground)"
            tick={{ fill: "var(--foreground)" }}
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
