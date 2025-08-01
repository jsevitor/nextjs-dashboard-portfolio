import { ButtonProps } from "../../../../../types/ui/buttons";

/**
 * ButtonUrl Component
 *
 * Componente responsável por renderizar um botão que, ao ser clicado, redireciona o usuário para uma URL externa.
 * O botão é estilizado com classes personalizáveis via `className` e exibe um texto fornecido através da propriedade `label`.
 * A URL para o redirecionamento é especificada pela propriedade `url`, e o link será aberto em uma nova aba.
 *
 * ▸ **Responsabilidade**
 * - Exibir um botão que redireciona para uma URL externa
 * - Personalização do estilo do botão via `className`
 * - Garantir que o link seja aberto em uma nova aba (via `target="_blank"`)
 *
 * @param {ButtonProps} props Propriedades do botão
 * @param {string} props.url URL para onde o botão irá redirecionar ao ser clicado
 * @param {string} props.label Texto a ser exibido dentro do botão
 * @param {string} [props.className] Classe CSS adicional para customização do estilo do botão
 *
 * @returns {JSX.Element} Componente de botão de URL
 *
 * @example
 * ```tsx
 * <ButtonUrl url="https://example.com" label="Visitar o site" />
 * ```
 */
export function ButtonUrl({ url, label, className }: ButtonProps) {
  return (
    <button
      type="submit"
      className={`px-4 py-1 bg-highlight text-background hover:text-white rounded hover:opacity-80 ${className}`}
    >
      <a href={url} target="_blank">
        {label}
      </a>
    </button>
  );
}
