import { COLORS } from "@/utils/colors";
import { useEffect, useState } from "react";

export function TechsMostUsed() {
  const [data, setData] = useState<{ name: string; count: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/analytics/techs-most-used");
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

  const total = data.reduce((sum, tech) => sum + tech.count, 0);

  const techsComPorcentagem = total
    ? data.map((tech) => ({
        ...tech,
        percent: Math.round((tech.count / total) * 100),
      }))
    : [];

  if (loading) return <p className="text-muted">Carregando gráfico...</p>;
  if (!data.length)
    return <p className="text-muted">Nenhum projeto encontrado.</p>;

  return (
    <>
      {techsComPorcentagem.map((tech, index) => (
        <div key={tech.name}>
          <div className="flex justify-between mb-1 text-sm">
            <span className="font-medium">{tech.name}</span>
            <span>{tech.percent}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-blue-600 h-3 rounded-full transition-all duration-300"
              style={{
                width: `${tech.percent}%`,
                backgroundColor: COLORS[index % COLORS.length],
              }}
            ></div>
          </div>
        </div>
      ))}
    </>
  );
}
