import { useEffect, useState } from "react";

/**
 * ThemeToggle Component
 *
 * Componente responsável por alternar dinamicamente entre os temas claro ("light") e escuro ("dark") da aplicação.
 * Utiliza `localStorage` para persistência da escolha do usuário e aplica o tema ao `document.body` por meio do atributo `data-theme`.
 *
 * ▸ **Responsabilidade**
 * - Permitir que o usuário alterne entre os modos claro e escuro
 * - Persistir a escolha do tema no armazenamento local (`localStorage`)
 * - Aplicar dinamicamente o tema ao carregar a página com base nas preferências do usuário ou do sistema
 *
 * @returns {JSX.Element} Botão interativo para alternar o tema da aplicação
 *
 * @example
 * ```tsx
 * <ThemeToggle />
 * ```
 */
export default function ThemeToggle() {
  const [theme, setTheme] = useState("dark");

  /**
   * handleThemeToggle
   *
   * Alterna o tema atual entre "light" e "dark", atualiza o estado interno,
   * salva a preferência no `localStorage` e reflete a alteração visual no componente.
   *
   * ▸ **Responsabilidade**
   * - Alternar entre temas claro e escuro
   * - Atualizar o valor persistido no `localStorage`
   */
  const handleThemeToggle = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  /**
   * useEffect (carregamento inicial)
   *
   * Efeito que executa no carregamento do componente para:
   * - Verificar se há um tema salvo no `localStorage`
   * - Caso não haja, definir o tema com base nas preferências do sistema operacional (media query)
   */
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      const prefersDarkScheme = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setTheme(prefersDarkScheme ? "dark" : "light");
    }
  }, []);

  /**
   * useEffect (aplicação do tema)
   *
   * Efeito que aplica o tema atual ao elemento `body` da página
   * por meio do atributo `data-theme`, que pode ser utilizado em CSS para alternar estilos.
   */
  useEffect(() => {
    if (theme === "dark") {
      document.body.setAttribute("data-theme", "dark");
    } else {
      document.body.setAttribute("data-theme", "light");
    }
  }, [theme]);

  return (
    <button
      className="transition-all flex items-center justify-center gap-2 text-foreground hover:bg-highlight hover:text-white text-xl px-2 py-1 w-full rounded-l"
      onClick={handleThemeToggle}
    >
      <span className={theme === "light" ? "px-1" : "px-1"}>
        <i
          className={
            theme === "light" ? "bi bi-moon-stars-fill" : "bi bi-sun-fill"
          }
        ></i>
      </span>
    </button>
  );
}
