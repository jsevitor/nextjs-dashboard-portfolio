"use client";

import { signOut } from "next-auth/react";

/**
 * LogoutButton Component
 *
 * Componente de botão utilizado para encerrar a sessão do usuário autenticado.
 * Integra-se ao `next-auth` para realizar o logout de forma segura e automática.
 *
 * ▸ **Responsabilidade**
 * - Encerrar a sessão do usuário atual utilizando `signOut` da biblioteca `next-auth`
 * - Fornecer um botão visual com ícone que represente a ação de logout
 *
 * @returns {JSX.Element} Botão que dispara o logout do usuário
 *
 * @example
 * ```tsx
 * <LogoutButton />
 * ```
 */
export default function LogoutButton() {
  return (
    <button
      className="text-foreground hover:bg-highlight hover:text-white rounded-r flex justify-center items-center gap-2 text-xl border-l border-gray-medium px-2 py-1 w-full"
      onClick={() => signOut()}
    >
      <i className="bi bi-box-arrow-right"></i>
    </button>
  );
}
