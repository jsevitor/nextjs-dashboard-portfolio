"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { ButtonHamburger } from "../../ui/buttons";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import Link from "next/link";
import UserInfro from "../../user/UserInfo";
import ThemeToggle from "../../upload/theme_toggle/ThemeToggle";
import LogoutButton from "../../user/LogoutButton";

/**
 * Sidebar Component
 *
 * Componente responsável por exibir uma barra lateral de navegação, tanto para dispositivos móveis quanto para desktop.
 * Exibe um menu de navegação com links para diferentes páginas da aplicação, além de permitir alternar o tema e realizar o logout.
 * No modo mobile, exibe um menu de hambúrguer que pode ser aberto e fechado.
 *
 * ▸ **Responsabilidade**
 * - Exibir menu de navegação com links para diferentes páginas
 * - Exibir opção de alternância de tema e botão de logout
 * - Responsividade para adaptar-se ao layout móvel e desktop
 * - Bloquear o scroll da página quando o menu estiver aberto no mobile
 *
 * @returns {JSX.Element} Componente da barra lateral de navegação
 *
 * @example
 * ```tsx
 * <Sidebar />
 * ```
 */
export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  let menuIcon = "bi bi-list";

  if (isOpen) {
    menuIcon = "bi bi-x-lg";
  }

  useLockBodyScroll(isOpen);

  const menu = [
    { label: "Dashboard", href: "/", icon: "bi bi-house" },
    { label: "Sobre", href: "/about", icon: "bi bi-person" },
    { label: "Stacks", href: "/stacks", icon: "bi bi-stack" },
    { label: "Techs", href: "/techs", icon: "bi bi-code" },
    { label: "Projetos", href: "/projects", icon: "bi bi-briefcase" },
    { label: "Contato", href: "/contacts", icon: "bi bi-telephone" },
  ];

  const linkClasses = (href: string) =>
    `py-2 pl-2 rounded-sm rounded-r-none cursor-pointer font-extralight ${
      pathname === href
        ? "bg-highlight text-white font-semibold"
        : "hover:bg-highlight hover:text-white"
    }`;

  return (
    <div className="w-full lg:w-1/5 2xl:w-1/6 h-auto lg:h-screen bg-gray-lighter grid grid-cols-2 lg:grid-cols-1 lg:grid-rows-[auto_1fr_auto] border-b lg:border-r lg:border-b-0 border-gray-medium shadow-md py-4 pl-4">
      <div className="flex flex-col items-center gap-2 py-2 pr-4">
        <h1 className="font-bold text-2xl">DASHBOARD</h1>
        <h2 className="tracking-[0.5rem] text-sm  font-extralight">
          PORTFÓLIO
        </h2>
      </div>

      {/* Menu Desktop */}
      <nav className="py-4 2xl:mt-8 hidden lg:flex gap-12 items-center lg:items-start ">
        <ul className="flex flex-col gap-2 flex-1">
          {menu.map((item) => (
            <Link key={item.href} href={item.href}>
              <li
                className={`${linkClasses(
                  item.href
                )} flex gap-4 pl-4 items-center`}
              >
                <i className={`${item.icon} text-lg`}></i>
                <span>{item.label}</span>
              </li>
            </Link>
          ))}
        </ul>
      </nav>
      <div className="hidden lg:flex lg:flex-col lg:gap-4 pr-4">
        <UserInfro />
        <div className="flex justify-center ">
          <span className="w-1/3">
            <ThemeToggle />
          </span>
          <span className="w-1/3">
            <LogoutButton />
          </span>
        </div>
      </div>

      <div className="flex justify-end items-center pr-4">
        <ButtonHamburger action={() => setIsOpen(!isOpen)} icon={menuIcon} />
      </div>

      {/* Menu Mobile */}
      <nav
        className={`lg:hidden fixed top-0 left-0 w-full h-screen bg-background transition-transform duration-300 z-40 flex flex-col items-center justify-center gap-8 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <ul className="flex flex-col items-center gap-8 text-foreground text-2xl">
          {menu.map((item, idx) => (
            <li key={idx}>
              <Link href={item.href} onClick={() => setIsOpen(false)}>
                {item.label}
              </Link>
            </li>
          ))}
          <li className="flex justify-center w-full">
            <span className="w-full">
              <ThemeToggle />
            </span>
            <span className="w-full">
              <LogoutButton />
            </span>
          </li>
        </ul>
        <UserInfro />
      </nav>
    </div>
  );
}
