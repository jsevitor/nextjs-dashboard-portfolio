/**
 * ContactCardSkeleton Component
 *
 * Componente de esqueleto (skeleton loader) usado para indicar o carregamento de um card de contato.
 * Este componente exibe uma estrutura de placeholders com animação de pulso para simular o carregamento de informações de contato,
 * enquanto os dados reais ainda não estão disponíveis.
 *
 * ▸ **Responsabilidade**
 * - Exibir um layout de esqueleto com placeholders enquanto os dados de um contato estão sendo carregados
 * - Incluir animação de pulso para simular o carregamento dinâmico
 *
 * @returns {JSX.Element} Componente de esqueleto para carregar um card de contato
 *
 * @example
 * ```tsx
 * <ContactCardSkeleton />
 * ```
 */
export function AboutCardSkeleton() {
  return (
    <div className="flex flex-col lg:flex-row items-center gap-8 bg-gray-lighter shadow p-4 rounded mb-4 animate-pulse">
      <div className="bg-gray-medium w-64 h-52 rounded" />
      <div className="flex flex-col gap-4 w-full">
        <div className="bg-gray-medium h-6 w-1/3 rounded" />
        <div className="bg-gray-medium h-24 w-full rounded" />
      </div>
    </div>
  );
}
