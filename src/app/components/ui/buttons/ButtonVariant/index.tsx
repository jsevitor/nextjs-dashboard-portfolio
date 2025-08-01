import { ButtonVariantProps } from "../../../../../types/ui/buttons";

/**
 * ButtonVariant Component
 *
 * Componente responsável por renderizar um botão com diferentes variantes estilísticas, como "salvar", "fechar", "adicionar", "editar" e "deletar".
 * O botão pode incluir um ícone e um rótulo personalizável. As variantes predefinidas controlam a aparência do botão, e o comportamento é customizado através das propriedades `action` e `label`.
 *
 * ▸ **Responsabilidade**
 * - Renderizar um botão com diferentes variantes de estilo
 * - Exibir ícones e rótulos personalizados com base na variante
 * - Executar uma ação personalizada ao ser clicado
 *
 * @param {ButtonVariantProps} props Propriedades do botão
 * @param {string} [props.variant="save"] Define a variante do botão, que altera o estilo e comportamento (ex: "save", "close", "add", "edit", "delete")
 * @param {Function} props.action Função que será chamada quando o botão for clicado
 * @param {string} [props.label] Texto a ser exibido dentro do botão, substituindo o rótulo padrão
 * @param {string} [props.icon] Classe do ícone a ser exibido dentro do botão, substituindo o ícone padrão
 * @param {string} [props.className] Classe CSS adicional para customização do estilo do botão
 *
 * @returns {JSX.Element} Componente de botão com variante personalizada
 *
 * @example
 * ```tsx
 * <ButtonVariant variant="add" label="Adicionar Item" action={() => console.log("Item adicionado")} />
 * <ButtonVariant variant="edit" icon="bi bi-pencil-square" action={() => console.log("Editar")} />
 * ```
 */
export function ButtonVariant({
  variant = "save",
  action,
  label,
  icon,
  className,
}: ButtonVariantProps) {
  const base = "px-4 py-1 rounded cursor-pointer";
  const variants = {
    save: "bg-highlight text-background hover:opacity-80 hover:text-white",
    close: "bg-red-600 text-background hover:opacity-80 hover:text-white",
    add: "bg-highlight text-background hover:opacity-80 hover:text-white flex items-center gap-2",
    edit: "border border-highlight text-highlight hover:bg-highlight hover:text-white flex items-center gap-2",
    delete:
      "border border-highlight text-highlight hover:bg-highlight hover:text-white flex items-center gap-2",
  };

  const defaultLabels: Record<typeof variant, string> = {
    save: "Salvar",
    close: "Fechar",
    add: "Adicionar",
    edit: "Editar",
    delete: "Deletar",
  };

  const defaultIcons: Record<typeof variant, string> = {
    save: "",
    close: "",
    add: "bi bi-plus-lg",
    edit: "bi bi-pencil-square",
    delete: "bi bi-trash",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      onClick={action}
    >
      {icon ?? defaultIcons[variant] ? (
        <i className={icon ?? defaultIcons[variant]}></i>
      ) : null}
      {label ?? defaultLabels[variant]}
    </button>
  );
}
