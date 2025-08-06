import { create } from "zustand";
import { User } from "next-auth";

/**
 * useSessionStore Zustand Store
 *
 * Store para gerenciar o estado da sessão do usuário no frontend,
 * armazenando os dados do usuário autenticado e o status de autenticação.
 *
 * ▸ **Responsabilidade**
 * - Armazenar informações da sessão do usuário (`user` e `isAuthenticated`)
 * - Permitir atualizar os dados da sessão via `setSession`
 * - Permitir limpar os dados da sessão via `clearSession`
 *
 * @typedef {Object} SessionData
 * @property {User | null} user - Objeto do usuário autenticado ou `null` se não autenticado
 * @property {boolean} isAuthenticated - Flag indicando se o usuário está autenticado
 *
 * @typedef {Object} SessionStore
 * @property {SessionData} session - Dados atuais da sessão
 * @property {(data: SessionData) => void} setSession - Função para atualizar os dados da sessão
 * @property {() => void} clearSession - Função para limpar os dados da sessão (logout)
 *
 * @returns {SessionStore} Store Zustand para manipulação da sessão do usuário
 *
 * @example
 *
 * const { session, setSession, clearSession } = useSessionStore();
 *
 * setSession({ user: loggedUser, isAuthenticated: true });
 * clearSession();
 */

type SessionData = {
  user: User | null;
  isAuthenticated: boolean;
};

type SessionStore = {
  session: SessionData;
  setSession: (data: SessionData) => void;
  clearSession: () => void;
};

export const useSessionStore = create<SessionStore>((set) => ({
  session: {
    user: null,
    isAuthenticated: false,
  },
  setSession: (data) => set({ session: data }),
  clearSession: () =>
    set({
      session: {
        user: null,
        isAuthenticated: false,
      },
    }),
}));
