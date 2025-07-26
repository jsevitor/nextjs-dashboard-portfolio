"use client";

import { useEffect, useState } from "react";
import { Layout, Modal } from "../components/layout";
import { ButtonVariant } from "../components/ui/buttons";

type Techs = {
  id: string;
  name: string;
  projectTechs: {
    tech: {
      id: string;
      name: string;
    };
  }[];
};

export default function Techs() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [techs, setTechs] = useState<Techs[]>([]);
  const [name, setName] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchTechs = async () => {
    try {
      const res = await fetch("/api/tech");
      if (!res.ok) throw new Error("Erro ao buscar techs");
      const data = await res.json();
      setTechs(data);
      setLoading(false);
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  useEffect(() => {
    fetchTechs();
  }, []);

  const handleSubmit = async (
    e?: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    e?.preventDefault();

    const payload = { name };
    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `/api/tech/${editingId}` : "/api/tech";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Erro ao salvar techs");

      const data = await response.json();
      console.log("Techs salvo:", data);

      setName("");
      setEditingId(null);
      fetchTechs();

      if (editingId) {
        // toast.success("Techs atualizado com sucesso!");
      } else {
        // toast.success("Techs criado com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao salvar techs:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/tech/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Erro ao excluir techs");

      fetchTechs();
      // toast.success("Techs deletado com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar techs:", error);
      // toast.error("Erro ao deletar techs!");
    }
  };

  return (
    <Layout>
      <div className="border-l-2 border-foreground flex justify-between w-full mt-4 mb-14 px-4">
        <h1 className="text-3xl">Techs</h1>
        <ButtonVariant variant="add" action={() => setModalIsOpen(true)} />
      </div>

      {loading
        ? Array(5)
            .fill(null)
            .map((_, i) => <div key={i} />)
        : techs.map((tech) => (
            <div
              className="flex items-center bg-gray-lighter shadow gap-8 px-4 py-2 rounded mb-4"
              key={tech.id}
            >
              <div className="flex items-center gap-8 w-full">
                <div className="">
                  <h2>{tech.name}</h2>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row gap-2 justify-center">
                <ButtonVariant
                  variant="edit"
                  action={() => {
                    setName(tech.name);
                    setEditingId(tech.id);
                    setModalIsOpen(true);
                  }}
                />
                <ButtonVariant
                  variant="delete"
                  action={() => handleDelete(tech.id)}
                />
              </div>
            </div>
          ))}

      <Modal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)}>
        <div className="pb-4 border-b border-gray-medium flex-shrink-0">
          <h1 className="text-2xl font-light">Incluir Tech</h1>
        </div>
        <form className="flex-1 overflow-y-auto my-4 flex flex-col gap-2">
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
        <div className="flex-shrink-0 pt-4 flex gap-4 justify-center border-t border-gray-medium">
          <ButtonVariant variant="save" action={handleSubmit} />
          <ButtonVariant variant="close" action={() => setModalIsOpen(false)} />
        </div>
      </Modal>
    </Layout>
  );
}
