"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      className="border border-border-light hover:bg-foreground hover:text-background rounded flex justify-center items-center gap-2 py-0.5 px-2 cursor-pointer text-sm"
      onClick={() => signOut()}
    >
      <i className="bi bi-box-arrow-right"></i>
      <span>Sair</span>
    </button>
  );
}
