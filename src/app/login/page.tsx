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
    <div className="container mx-auto h-screen flex justify-center items-center">
      <div className="bg-highlight rounded-l-lg shadow-md lg:w-1/3 h-1/2 flex flex-col items-center justify-center gap-4 p-8 text-white">
        <h1 className="font-bold lg:text-4xl">DASHBOARD</h1>
        <h2 className="lg:tracking-[1.5rem] text-4xl lg:text-3xl text-center font-thin lg:ml-6">
          PORTFÓLIO
        </h2>
      </div>

      <div className="border border-gray-medium rounded-r-lg shadow-md lg:w-1/3 h-1/2 flex flex-col items-center justify-center gap-4 p-8">
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
