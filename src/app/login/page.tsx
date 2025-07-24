"use client";

import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function LoginPage() {
  const { data: session } = useSession();

  if (session) {
    return redirect("/");
  }

  return (
    <div className="container mx-auto h-screen flex justify-center items-center">
      <div className="border border-foreground lg:w-1/2 h-1/2 flex flex-col items-center justify-center gap-4 p-8">
        <h1 className="lg:tracking-[1.5rem] text-4xl lg:text-[4rem] text-center font-thin lg:ml-6">
          PORTFÓLIO
        </h1>
        <h2 className="font-bold lg:text-2xl">LOGIN</h2>
        {/* <ButtonAction
          action={() => signIn("github")}
          icon="bi bi-github"
          label="Entrar com GitHub"
          className="py-2 mt-12"
        /> */}
        <button
          className={`px-4 bg-foreground text-background rounded hover:bg-gray-medium hover:text-foreground border border-foreground flex justify-center items-center gap-2 cursor-pointer py-2 mt-12`}
          onClick={() => signIn("github")}
        >
          <i className="bi bi-github"></i>
          <span>Entrar com GitHub</span>
        </button>
        <button
          className={`px-4 bg-foreground text-background rounded hover:bg-gray-medium hover:text-foreground border border-foreground flex justify-center items-center gap-2 cursor-pointer py-2 mt-12`}
          onClick={() => signIn("google")}
        >
          <i className="bi bi-github"></i>
          <span>Entrar com Google</span>
        </button>
      </div>
    </div>
  );
}
