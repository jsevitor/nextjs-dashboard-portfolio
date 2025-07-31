import { useState, useEffect } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);

  useEffect(() => {
    // Verifica se estamos no cliente antes de acessar o localStorage
    if (typeof window !== "undefined") {
      try {
        const json = localStorage.getItem(key);
        if (json !== null) {
          setValue(JSON.parse(json)); // Atualiza o estado com o valor armazenado
        }
      } catch (err) {
        console.error("Erro ao carregar do localStorage", err);
      }
    }
  }, [key]); // O useEffect depende apenas da chave

  useEffect(() => {
    // Apenas salva no localStorage quando o valor mudar
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (err) {
        console.error("Erro ao salvar no localStorage", err);
      }
    }
  }, [key, value]); // O useEffect depende de key e value

  return [value, setValue] as const;
}
