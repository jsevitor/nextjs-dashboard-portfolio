"use client";

import { useEffect, useState } from "react";
import { Layout, Modal } from "../components/layout";
import { ButtonVariant } from "../components/ui/buttons";
import { StackCardSkeleton } from "../components/ui/skeletons";
import { toast } from "sonner";
import { PageHeader } from "../components/layout/title/PageHeader";

type Stacks = {
  id: string;
  name: string;
  icon: string;
};

export default function Stacks() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [stacks, setStacks] = useState<Stacks[]>([]);
  const [icon, setIcon] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchStacks = async () => {
    try {
      const res = await fetch("/api/stacks");
      if (!res.ok) throw new Error("Erro ao buscar stacks");
      const data = await res.json();
      setStacks(data);
      setLoading(false);
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  useEffect(() => {
    fetchStacks();
  }, []);

  const handleSubmit = async (
    e?: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    e?.preventDefault();

    const payload = { icon, name };
    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `/api/stacks/${editingId}` : "/api/stacks";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Erro ao salvar stack");

      const data = await response.json();
      console.log("Stack salvo:", data);

      // limpa tudo
      setIcon("");
      setName("");
      setEditingId(null);
      setModalIsOpen(false);
      fetchStacks();

      if (editingId) {
        toast.success("Stack atualizado com sucesso!");
      } else {
        toast.success("Stack criado com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao salvar stack:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/stacks/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Erro ao excluir stack");

      fetchStacks();
      toast.success("Stack deletado com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar stack:", error);
      toast.error("Erro ao deletar stack!");
    }
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
