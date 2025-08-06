import { useState, useEffect } from "react";

/**
 * useLocalStorage Hook
 *
 * Hook personalizado para gerenciar estados sincronizados com o `localStorage` do navegador.
 * Permite armazenar e recuperar valores de forma persistente entre sessões de navegação.
 *
 * ▸ **Responsabilidade**
 * - Inicializar o estado com um valor salvo no `localStorage`, se disponível
 * - Atualizar automaticamente o `localStorage` sempre que o estado for modificado
 * - Garantir compatibilidade com ambientes onde `window` não está disponível (como SSR)
 *
 * @template T Tipo do valor a ser armazenado
 * @param {string} key - Chave usada para salvar e recuperar o valor no `localStorage`
 * @param {T} initialValue - Valor inicial a ser utilizado caso não exista valor salvo
 * @returns {[T, React.Dispatch<React.SetStateAction<T>>]} Tupla contendo o valor atual e a função para atualizá-lo
 *
 * @example
 * ```tsx
 * const [theme, setTheme] = useLocalStorage<string>("theme", "light");
 * ```
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);

  /**
   * useEffect (carregamento inicial)
   *
   * Efeito responsável por recuperar o valor do `localStorage` ao montar o componente.
   * Se houver valor armazenado para a chave fornecida, ele será usado para inicializar o estado.
   */
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const json = localStorage.getItem(key);
        if (json !== null) {
          setValue(JSON.parse(json));
        }
      } catch (err) {
        console.error("Erro ao carregar do localStorage", err);
      }
    }
  }, [key]);

  /**
   * useEffect (persistência de valor)
   *
   * Efeito responsável por salvar no `localStorage` sempre que o valor do estado ou a chave forem alterados.
   * Garante que as mudanças sejam persistidas para uso futuro.
   */
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (err) {
        console.error("Erro ao salvar no localStorage", err);
      }
    }
  }, [key, value]);

  return [value, setValue] as const;
}
