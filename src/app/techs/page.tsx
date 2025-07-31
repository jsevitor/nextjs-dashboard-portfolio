"use client";

import { useEffect, useState } from "react";
import { Layout, Modal } from "../components/layout";
import { ButtonVariant } from "../components/ui/buttons";
import { TechCardSkeleton } from "../components/ui/skeletons";
import { toast } from "sonner";
import { PageHeader } from "../components/layout/title/PageHeader";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { techsData } from "@/data/data";

type Techs = {
  id: string;
  name: string;
  projectTechs?: {
    tech: {
      id: string;
      name: string;
    };
  }[];
};

export default function Techs() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [techs, setTechs] = useLocalStorage<Techs[]>("techs", []);
  const [name, setName] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    if (techs.length === 0) {
      setTechs(techsData);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, []);

  const handleSubmit = async (
    e?: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    e?.preventDefault();

    const newTech: Techs = {
      id: editingId ?? crypto.randomUUID(),
      name,
      projectTechs: [],
    };

    const updated = editingId
      ? techs.map((tech) => (tech.id === editingId ? newTech : tech))
      : [...techs, newTech];

    setTechs(updated);
    setName("");
    setEditingId(null);
    setModalIsOpen(false);

    toast.success(
      editingId ? "Tech atualizado com sucesso!" : "Tech criado com sucesso!"
    );
  };

  const handleDelete = async (id: string) => {
    const updated = techs.filter((tech) => tech.id !== id);
    setTechs(updated);
    toast.success("Tech deletado!");
  };

  return (
    <Layout>
      <div className="flex justify-between w-full mt-4 mb-14">
        <PageHeader>Techs</PageHeader>
        <ButtonVariant variant="add" action={() => setModalIsOpen(true)} />
      </div>

      {loading
        ? Array(5)
            .fill(null)
            .map((_, i) => <TechCardSkeleton key={i} />)
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
