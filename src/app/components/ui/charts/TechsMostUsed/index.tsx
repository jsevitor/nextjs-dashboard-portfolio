import { projectsData } from "@/data/data";
import { COLORS } from "@/utils/colors";
import { useEffect, useState } from "react";
import { MoonLoader } from "react-spinners";

/**
 * TechsMostUsed Component
 *
 * Componente responsável por exibir as tecnologias mais utilizadas nos projetos, mostrando uma lista das tecnologias
 * e suas respectivas porcentagens de uso. O gráfico de barras é exibido com a largura proporcional à porcentagem de uso.
 * Enquanto os dados estão sendo carregados, um indicador de carregamento é exibido. Se não houver dados disponíveis,
 * uma mensagem é mostrada.
 *
 * ▸ **Responsabilidade**
 * - Contabilizar a quantidade de vezes que cada tecnologia é utilizada nos projetos
 * - Exibir as tecnologias mais usadas com a porcentagem de uso em forma de barras
 * - Exibir um loader enquanto os dados estão sendo processados
 * - Exibir uma mensagem de erro caso não haja dados disponíveis
 *
 * @returns {JSX.Element} Componente que exibe as tecnologias mais utilizadas com suas respectivas porcentagens de uso
 *
 * @example
 * ```tsx
 * <TechsMostUsed />
 * ```
 */
export function TechsMostUsed() {
  const [data, setData] = useState<{ name: string; count: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    try {
      const techCount: { [key: string]: number } = {};

      projectsData.forEach((project) => {
        project.techs.forEach((tech) => {
          techCount[tech] = (techCount[tech] || 0) + 1;
        });
      });

      const techsData = Object.keys(techCount)
        .map((tech) => ({
          name: tech,
          count: techCount[tech],
        }))
        .sort((a, b) => b.count - a.count);

      setData(techsData);
    } catch (err) {
      console.error("Erro ao processar dados de tecnologias:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const total = data.reduce((sum, tech) => sum + tech.count, 0);

  const techsComPorcentagem = total
    ? data
        .map((tech) => ({
          ...tech,
          percent: Math.round((tech.count / total) * 100),
        }))
        .slice(0, 8)
    : [];

  if (loading)
    return (
      <div className="flex justify-center items-center h-32 w-full">
        <MoonLoader color="var(--highlight)" />
      </div>
    );

  if (!data.length)
    return <p className="text-muted">Nenhum dado encontrado.</p>;

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
