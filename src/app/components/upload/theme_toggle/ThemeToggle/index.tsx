import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("dark");

  const handleThemeToggle = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

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

  useEffect(() => {
    if (theme === "dark") {
      document.body.setAttribute("data-theme", "dark");
    } else {
      document.body.setAttribute("data-theme", "light");
    }
  }, [theme]);

  return (
    <div
      className="transition-all flex items-center justify-center gap-2 rounded cursor-pointer hover:bg-highlight h-6"
      onClick={handleThemeToggle}
    >
      <span className={theme === "light" ? "px-1" : "px-1"}>
        <i
          className={
            theme === "light" ? "bi bi-moon-stars-fill" : "bi bi-sun-fill"
          }
        ></i>
      </span>
    </div>
  );
}
