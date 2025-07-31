"use client";

import { useEffect, useState } from "react";
import { Layout, Modal } from "../components/layout";
import { ButtonVariant } from "../components/ui/buttons";
import { StackCardSkeleton } from "../components/ui/skeletons";
import { toast } from "sonner";
import { PageHeader } from "../components/layout/title/PageHeader";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { skills } from "@/data/data";
import { StacksProps } from "@/types/stacks";

/**
 * Stacks Component
 *
 * Componente responsável por exibir, adicionar, editar e remover stacks na interface de administração.
 * Utiliza `useLocalStorage` para persistência dos dados localmente no navegador.
 *
 * ▸ **Responsabilidade**
 * - Listar stacks (ícone e nome)
 * - Permitir criar e editar stacks via modal
 * - Armazenar dados em localStorage
 * - Exibir feedback via `toast`
 *
 * ▸ **Funcionalidades**
 * - Exibição de stacks com ícones
 * - Edição de stacks existentes
 * - Remoção de stacks individualmente
 * - Criação de novos stacks com formulário
 * - Skeleton enquanto carrega
 *
 * @returns {JSX.Element} Componente de gerenciamento de stacks
 *
 * @example
 * ```tsx
 * <Stacks />
 * ```
 */
export default function Stacks() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [stacks, setStacks] = useLocalStorage<StacksProps[]>("skills", []);
  const [icon, setIcon] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    if (!localStorage.getItem("skills") || skills.length === 0) {
      setStacks([]);
      setLoading(false);
    } else {
      setStacks(skills);
      setLoading(false);
    }
  }, []);

  /**
   * handleSubmit
   *
   * Função responsável por criar um nova stack ou atualizar um existente.
   * Valida e persiste os dados no `localStorage` através do hook `useLocalStorage`.
   * Se `editingId` estiver definido, deve atualizar uma stack existente, senão adiciona uma nova.
   * Exibe mensagem de sucesso com `toast`.
   *
   * @param {React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>} [e] - Evento do formulário ou clique do botão.
   *
   * @returns {Promise<void>}
   *
   */
  const handleSubmit = async (
    e?: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    e?.preventDefault();

    const newStack: StacksProps = {
      id: editingId ?? crypto.randomUUID(),
      name,
      icon,
    };

    const updated = editingId
      ? stacks.map((s) => (s.id === editingId ? newStack : s))
      : [...stacks, newStack];

    setStacks(updated);
    setName("");
    setIcon("");
    setEditingId(null);
    setModalIsOpen(false);

    toast.success(
      editingId ? "Stack atualizado com sucesso!" : "Stack criado com sucesso!"
    );
  };

  /**
   * handleDelete
   *
   * Remove uma stack da lista com base no ID fornecido.
   * Atualiza o estado e o armazenamento local, e exibe um `toast` de sucesso.
   *
   * @param {string} id - ID da stack a ser removida.
   *
   * @returns {Promise<void>}
   */
  const handleDelete = async (id: string) => {
    const updated = stacks.filter((s) => s.id !== id);
    setStacks(updated);
    toast.success("Stack deletado!");
  };

  return (
    <Layout>
      <div className="flex justify-between w-full mt-4 mb-14">
        <PageHeader>Stacks</PageHeader>
        <ButtonVariant variant="add" action={() => setModalIsOpen(true)} />
      </div>

      {loading
        ? Array(5)
            .fill(null)
            .map((_, i) => <StackCardSkeleton key={i} />)
        : stacks.map((stack) => (
            <div
              className="flex items-center gap-8 bg-gray-lighter shadow px-4 py-2 rounded-md mb-4 text-sm"
              key={stack.id}
            >
              <div className="flex items-center">
                <i className={`${stack.icon} text-3xl text-foreground`}></i>
              </div>

              <div className="flex items-center gap-8 w-full">
                <div>
                  <h2>{stack.name}</h2>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row gap-2 justify-center">
                <ButtonVariant
                  variant="edit"
                  action={() => {
                    setEditingId(stack.id);
                    setIcon(stack.icon);
                    setName(stack.name);
                    setModalIsOpen(true);
                  }}
                />
                <ButtonVariant
                  variant="delete"
                  action={() => handleDelete(stack.id)}
                />
              </div>
            </div>
          ))}

      <Modal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)}>
        <div className="pb-4 border-b border-GR flex-shrink-0">
          <h1 className="text-2xl font-light">Nova Stack</h1>
        </div>
        <form className="flex-1 overflow-y-auto my-4 flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <label>Icon</label>
            <input
              type="text"
              className="border border-foreground px-2 py-1 font-extralight rounded"
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>Nome</label>
            <input
              type="text"
              className="border border-foreground px-2 py-1 font-extralight rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </form>
        <div className="flex-shrink-0 pt-4 flex gap-4 justify-center border-t border-GR">
          <ButtonVariant variant="save" action={handleSubmit} />
          <ButtonVariant variant="close" action={() => setModalIsOpen(false)} />
        </div>
      </Modal>
    </Layout>
  );
}
