import { ButtonProps } from "../../../../../types/ui/buttons";

/**
 * ButtonHamburger Component
 *
 * Componente responsável por exibir um botão de hambúrguer, geralmente usado para abrir ou fechar um menu lateral em dispositivos móveis.
 * O ícone do botão é personalizável via a propriedade `icon`, e a ação que ocorre ao clicar é definida pela função `action`.
 *
 * ▸ **Responsabilidade**
 * - Exibir um botão com ícone de hambúrguer no layout mobile
 * - Executar uma ação personalizada ao ser clicado
 * - Estilização responsiva para ser exibido apenas em telas pequenas
 *
 * @param {ButtonProps} props Propriedades do botão
 * @param {Function} props.action Função que será chamada quando o botão for clicado
 * @param {string} props.icon Classe do ícone a ser exibido dentro do botão
 *
 * @returns {JSX.Element} Componente de botão de hambúrguer
 *
 * @example
 * ```tsx
 * <ButtonHamburger action={() => setIsOpen(!isOpen)} icon="bi bi-list" />
 * ```
 */
export function ButtonHamburger({ action, icon }: ButtonProps) {
  return (
    <button
      className="lg:hidden text-foreground text-3xl z-[60]"
      onClick={action}
    >
      <i className={icon}></i>
    </button>
  );
}
