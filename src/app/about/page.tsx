"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Layout, Modal } from "../components/layout";
import { ButtonUrl, ButtonVariant } from "../components/ui/buttons";
import UploadInput from "../components/upload/UploadInput";
import { AboutCardSkeleton } from "../components/ui/skeletons";
import { toast } from "sonner";
import { PageHeader } from "../components/layout/title/PageHeader";

type About = {
  id: string;
  location: string;
  content: string;
  image: string;
  curriculum: string;
};

export default function About() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [abouts, setAbouts] = useState<About[]>([]);
  const [location, setLocation] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [curriculum, setCurriculum] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchAbouts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/about");
      if (!res.ok) throw new Error("Erro ao buscar abouts");
      const data = await res.json();
      setAbouts(data);
      setLoading(false);
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  useEffect(() => {
    fetchAbouts();
  }, []);

  const handleSubmit = async (
    e?: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    e?.preventDefault();

    const payload = {
      location,
      content,
      image,
      curriculum,
    };

    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `/api/about/${editingId}` : "/api/about";

    if (!location || !content || !image || !curriculum) {
      console.error("Preencha todos os campos obrigatórios");
      toast.error("Preencha todos os campos obrigatórios!");
      return;
    }

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Erro ao criar about");

      const data = await response.json();
      console.log("About criado com sucesso:", data);

      setLocation("");
      setContent("");
      setImage(null);
      setCurriculum(null);
      setEditingId(null);
      setModalIsOpen(false);
      fetchAbouts();

      if (editingId) {
        toast.success("About atualizado com sucesso!");
      } else {
        toast.success("About criado com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao criar about:", error);
      toast.error("Erro ao criar about!");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/about/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Erro ao excluir sobre");

      fetchAbouts();
      toast.success("Sobre deletado com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar sobre:", error);
      toast.error("Erro ao deletar sobre!");
    }
  };

  return (
    <Layout>
      <div className="flex justify-between w-full mt-4 mb-14">
        <PageHeader>Sobre</PageHeader>
        <ButtonVariant variant="add" action={() => setModalIsOpen(true)} />
      </div>

      {loading ? (
        <AboutCardSkeleton />
      ) : (
        abouts.map((about) => (
          <div
            className="flex flex-col lg:flex-row items-center gap-8 bg-gray-lighter shadow p-4 lg:px-4 lg:py-2 rounded-md mb-4"
            key={about.id}
          >
            <div className="border border-gray-medium rounded w-[200px] h-[200px] shrink-0">
              <Image
                src={about.image}
                alt="Profile Picture"
                width={200}
                height={200}
                className="w-full h-full object-cover rounded"
              />
            </div>
            <div className="flex flex-col gap-2 flex-1 text-sm font-extralight">
              <div className="border-b border-gray-medium flex items-center justify-between p-2">
                <p>{about.location}</p>
                <ButtonUrl url={about.curriculum} label="Currículo" />
              </div>
              <div className="p-2">
                <p>{about.content}</p>
              </div>
            </div>

            <div className="flex lg:flex-col gap-2 justify-center">
              <ButtonVariant
                variant="edit"
                action={() => {
                  setEditingId(about.id);
                  setLocation(about.location);
                  setContent(about.content);
                  setImage(about.image);
                  setCurriculum(about.curriculum);
                  setModalIsOpen(true);
                }}
                label="Editar"
              />
              <ButtonVariant
                variant="delete"
                action={() => handleDelete(about.id)}
                label="Excluir"
              />
            </div>
          </div>
        ))
      )}

      <Modal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)}>
        <div className="pb-4 border-b border-gray-medium flex-shrink-0">
          <h1 className="text-2xl ">Editar Sobre</h1>
        </div>

        <form className="flex-1 overflow-y-auto my-4 flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <label>Imagem</label>
            <div className="flex gap-4">
              <UploadInput onUploadComplete={(url) => setImage(url)} />
              {image && (
                <div>
                  <Image
                    src={image}
                    alt="Preview"
                    width={20}
                    height={20}
                    className="w-20 h-20 object-cover"
                  />
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label>Localização</label>
            <input
              type="text"
              className="border border-foreground px-2 py-1 font-extralight rounded"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>Conteúdo</label>
            <textarea
              className="w-full h-40 p-2 border border-foreground rounded resize-none font-extralight"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Escreva algo aqui..."
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>Currículo</label>
            <div className="flex gap-4">
              <UploadInput onUploadComplete={(url) => setCurriculum(url)} />
            </div>
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
