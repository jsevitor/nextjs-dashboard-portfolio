/**
 * ButtonProps Type
 *
 * Tipagem para as propriedades básicas do componente Button.
 *
 * ▸ **Responsabilidade**
 * - Definir os tipos das props aceitas pelo componente Button básico
 *
 * @typedef {Object} ButtonProps
 * @property {() => void} [action] - Função chamada ao clicar no botão
 * @property {string} [label] - Texto exibido no botão
 * @property {string} [icon] - Nome ou caminho do ícone exibido no botão
 * @property {string} [url] - URL para navegação ao clicar (se aplicável)
 * @property {string} [className] - Classe(s) CSS opcionais para estilização personalizada
 *
 * @example
 *
 * const btnProps: ButtonProps = {
 *   action: () => alert("Clicked"),
 *   label: "Salvar",
 *   icon: "save-icon",
 *   className: "btn-primary",
 * };
 */
export type ButtonProps = {
  action?: () => void;
  label?: string;
  icon?: string;
  url?: string;
  className?: string;
};

/**
 * ButtonVariantProps Type
 *
 * Extensão de ButtonProps que adiciona a propriedade `variant` para definir estilos e comportamentos específicos.
 *
 * ▸ **Responsabilidade**
 * - Permitir especificar variantes de botão pré-definidas para diferentes ações
 *
 * @typedef {ButtonProps & Object} ButtonVariantProps
 * @property {"save" | "close" | "add" | "edit" | "delete"} variant - Variante do botão que determina estilo e função
 *
 * @example
 *
 * const variantBtnProps: ButtonVariantProps = {
 *   variant: "save",
 *   label: "Salvar",
 *   action: () => console.log("Salvando..."),
 * };
 */
export type ButtonVariantProps = ButtonProps & {
  variant: "save" | "close" | "add" | "edit" | "delete";
};
