/**
 * StackCardSkeleton Component
 *
 * Componente de esqueleto (skeleton loader) usado para indicar o carregamento de uma stack no formato de card.
 * Este componente exibe uma estrutura de placeholders com animação de pulso para simular o carregamento de uma stack,
 * enquanto os dados reais ainda não estão disponíveis.
 *
 * ▸ **Responsabilidade**
 * - Exibir um layout de esqueleto com placeholders enquanto os dados de uma stack estão sendo carregados
 * - Incluir animação de pulso para simular o carregamento dinâmico
 *
 * @returns {JSX.Element} Componente de esqueleto para carregar um card de stack
 *
 * @example
 * ```tsx
 * <StackCardSkeleton />
 * ```
 */
export function StackCardSkeleton() {
  return (
    <div className="flex items-center gap-8 bg-gray-lighter px-4 py-2 rounded-md mb-4 animate-pulse">
      <div className="bg-gray-medium w-12 h-10 rounded-full" />

      <div className="flex items-center gap-8 w-full">
        <div className="bg-gray-medium h-4 w-24 rounded" />
      </div>

      <div className="flex flex-col lg:flex-row gap-2 justify-center">
        <div className="bg-gray-medium h-8 w-20 rounded" />
        <div className="bg-gray-medium h-8 w-20 rounded" />
      </div>
    </div>
  );
}
