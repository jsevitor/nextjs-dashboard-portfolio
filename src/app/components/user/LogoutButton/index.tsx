"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      className="border border-highlight text-highlight hover:bg-highlight hover:text-background rounded flex justify-center items-center gap-2 h-6 px-2 cursor-pointer text-sm"
      onClick={() => signOut()}
    >
      <i className="bi bi-box-arrow-right"></i>
      <span>Sair</span>
    </button>
  );
}
