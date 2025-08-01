/**
 * ContactCardSkeleton Component
 *
 * Componente de esqueleto (skeleton loader) utilizado para indicar o carregamento de um card de contato.
 * Este componente apresenta placeholders com animação de pulso que simulam visualmente os elementos de um card de contato
 * enquanto os dados reais ainda estão sendo recuperados.
 *
 * ▸ **Responsabilidade**
 * - Exibir uma estrutura visual de carregamento para dados de contato (como nome, e-mail e ações)
 * - Utilizar animação de pulso para representar um estado de carregamento ativo
 *
 * @returns {JSX.Element} Componente de esqueleto para carregamento de card de contato
 *
 * @example
 * ```tsx
 * <ContactCardSkeleton />
 * ```
 */
export function ContactCardSkeleton() {
  return (
    <div className="flex flex-col lg:flex-row items-center gap-8 bg-gray-lighter shadow px-4 py-2 rounded-md mb-4 animate-pulse">
      <div className="bg-gray-medium w-12 h-10 rounded-full" />

      <div className="flex items-center gap-8 w-full">
        <div className="bg-gray-medium h-4 w-24 rounded" />
        <div className="bg-gray-medium h-4 w-32 rounded" />
        <div className="bg-gray-medium h-4 w-40 rounded" />
      </div>

      <div className="flex gap-2 justify-center">
        <div className="bg-gray-medium h-8 w-20 rounded" />
        <div className="bg-gray-medium h-8 w-20 rounded" />
      </div>
    </div>
  );
}
