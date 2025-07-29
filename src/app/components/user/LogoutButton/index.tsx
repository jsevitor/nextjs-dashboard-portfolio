"use client";

import { signOut } from "next-auth/react";

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
