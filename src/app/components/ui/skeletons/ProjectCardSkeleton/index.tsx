/**
 * ProjectCardSkeleton Component
 *
 * Componente de esqueleto (skeleton loader) usado para indicar o carregamento de um projeto no formato de card.
 * Este componente exibe uma estrutura de placeholders com animação de pulso para simular o carregamento de um projeto,
 * enquanto os dados reais ainda não estão disponíveis.
 *
 * ▸ **Responsabilidade**
 * - Exibir um layout de esqueleto com placeholders enquanto os dados de um projeto estão sendo carregados
 * - Incluir animação de pulso para simular o carregamento dinâmico
 *
 * @returns {JSX.Element} Componente de esqueleto para carregar um card de projeto
 *
 * @example
 * ```tsx
 * <ProjectCardSkeleton />
 * ```
 */
export function ProjectCardSkeleton() {
  return (
    <div className="flex flex-col lg:flex-row gap-8 bg-gray-lighter shadow px-4 py-2 mb-4 rounded-md animate-pulse">
      <div className="bg-gray-medium w-[300px] h-[150px] rounded"></div>
      <div className="flex flex-col gap-2 w-full">
        <div className="bg-gray-medium h-5 w-1/3 rounded"></div>
        <div className="bg-gray-medium h-4 w-2/3 rounded"></div>
        <div className="bg-gray-medium h-4 w-1/2 rounded"></div>
        <div className="bg-gray-medium h-4 w-1/3 rounded"></div>
        <div className="bg-gray-medium h-4 w-1/4 rounded"></div>
      </div>
    </div>
  );
}
