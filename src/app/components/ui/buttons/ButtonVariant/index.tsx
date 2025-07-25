import { ButtonVariantProps } from "../types";

export function ButtonVariant({
  variant = "save",
  action,
  label,
  icon,
  className,
}: ButtonVariantProps) {
  const base = "px-4 py-1 rounded cursor-pointer";
  const variants = {
    save: "bg-highlight text-background hover:opacity-80",
    close: "bg-red-600 text-background hover:opacity-80",
    add: "bg-highlight text-background hover:opacity-80 flex items-center gap-2",
    edit: "border border-highlight text-highlight hover:bg-highlight hover:text-background flex items-center gap-2",
    delete:
      "border border-highlight text-highlight hover:bg-highlight hover:text-background flex items-center gap-2",
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
