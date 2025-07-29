"use client";

import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { ButtonVariant } from "../components/ui/buttons";

export default function LoginPage() {
  const { data: session } = useSession();

  if (session) {
    return redirect("/");
  }

  return (
    <div className="container mx-auto h-screen flex flex-col lg:flex-row justify-center items-center">
      <div className="border border-highlight bg-highlight h-1/3 lg:h-1/2 rounded-t-lg lg:rounded-t-none lg:rounded-l-lg shadow-md lg:w-1/3 flex flex-col items-center justify-center gap-4 p-8 text-white">
        <h1 className="font-bold lg:text-4xl">DASHBOARD</h1>
        <h2 className="lg:tracking-[1.5rem] text-4xl lg:text-3xl text-center font-thin lg:ml-6">
          PORTFÓLIO
        </h2>
      </div>

      <div className="border border-gray-medium h-1/3 lg:h-1/2 rounded-b-lg lg:rounded-b-none lg:rounded-r-lg shadow-md lg:w-1/3 flex flex-col items-center justify-center gap-4 p-8">
        <h2 className="font-bold lg:text-2xl">LOGIN</h2>
        <ButtonVariant
          variant="save"
          action={() => signIn("github")}
          label="Entrar com GitHub"
          icon="bi bi-github"
          className="flex gap-2"
        />
        <ButtonVariant
          variant="save"
          action={() => signIn("google")}
          label="Entrar com Google"
          icon="bi bi-google"
          className="flex gap-2"
        />
      </div>
    </div>
  );
}
