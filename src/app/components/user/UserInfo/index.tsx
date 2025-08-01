import { useSessionStore } from "@/stores/sessionStore";
import Image from "next/image";

/**
 * UserInfro Component
 *
 * Componente responsável por exibir informações básicas do usuário autenticado, como avatar, nome e e-mail.
 * Os dados são recuperados do estado global via `useSessionStore`.
 *
 * ▸ **Responsabilidade**
 * - Exibir a imagem de perfil do usuário com formatação circular
 * - Mostrar o nome e o e-mail do usuário autenticado
 * - Utilizar dados armazenados no estado global da sessão
 *
 * @returns {JSX.Element} Bloco visual com as informações do usuário autenticado
 *
 * @example
 * ```tsx
 * <UserInfro />
 * ```
 */
export default function UserInfro() {
  /**
   * useSessionStore
   *
   * Hook personalizado utilizado para acessar o estado da sessão do usuário.
   * Retorna um objeto com dados como `user.name`, `user.email` e `user.image`.
   *
   * ▸ **Responsabilidade**
   * - Fornecer os dados atuais da sessão do usuário autenticado
   */
  const { user } = useSessionStore((state) => state.session);

  return (
    <div className="flex flex-col gap-4 items-center mt-12 lg:mt-0 pr-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center">
          <Image
            src={(user?.image as string) || "/blank_user.png"}
            alt={user?.name as string}
            width={40}
            height={40}
            className="rounded-full"
          />
        </div>
        <div className="flex flex-col justify-center ">
          <div className="text-xs">{user?.name}</div>
          <div className="font-extralight text-xs">{user?.email}</div>
        </div>
      </div>
    </div>
  );
}
