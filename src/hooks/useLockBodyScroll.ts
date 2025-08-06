import { useEffect } from "react";

/**
 * useLockBodyScroll Hook
 *
 * Hook personalizado utilizado para bloquear ou liberar a rolagem da página com base em um estado booleano.
 * Útil em cenários como modais, menus laterais ou overlays onde se deseja impedir que o usuário interaja com o fundo da página.
 *
 * ▸ **Responsabilidade**
 * - Impedir a rolagem da página quando `active` for `true`
 * - Restaurar a rolagem normal da página quando `active` for `false` ou quando o componente for desmontado
 *
 * @param {boolean} active - Indica se a rolagem da página deve ser bloqueada (`true`) ou liberada (`false`)
 *
 * @example
 * ```tsx
 * useLockBodyScroll(isModalOpen);
 * ```
 */
export function useLockBodyScroll(active: boolean) {
  /**
   * useEffect
   *
   * Efeito que observa o valor de `active` e aplica ou remove a regra de overflow no `<body>`:
   * - Define `document.body.style.overflow = "hidden"` quando `active` é `true`
   * - Limpa o estilo ao desativar ou desmontar para evitar efeitos colaterais
   */
  useEffect(() => {
    if (active) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [active]);
}
