"use client";

import Image from "next/image";
import UploadInput from "../components/upload/UploadInput";
import { useEffect, useState } from "react";
import { Layout, Modal } from "../components/layout";
import { ButtonUrl, ButtonVariant } from "../components/ui/buttons";
import { ProjectCardSkeleton } from "../components/ui/skeletons";
import { toast } from "sonner";

type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  projectTechs: {
    tech: {
      id: string;
      name: string;
    };
  }[];
  isFeatured: boolean;
  demoUrl: string;
  repoUrl: string;
};

type Tech = {
  id: string;
  name: string;
};

export default function About() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [techs, setTechs] = useState<Tech[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [demoUrl, setDemoUrl] = useState("");
  const [repoUrl, setRepoUrl] = useState("");
  const [techIds, setTechIds] = useState<string[]>([]);
  const [isFeatured, setIsFeatured] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/projects");
      if (!res.ok) throw new Error("Erro ao buscar projetos");
      const data = await res.json();
      setProjects(data);
    } catch (error) {
      console.error("Erro:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchTechs = async () => {
      try {
        const res = await fetch("/api/tech");
        if (!res.ok) throw new Error("Erro ao buscar tecnologias");
        const data = await res.json();
        setTechs(data);
      } catch (error) {
        console.error("Erro:", error);
      }
    };

    fetchProjects();
    fetchTechs();
  }, []);

  const handleSubmit = async (
    e?: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    e?.preventDefault();

    const payload = {
      title,
      description,
      image,
      demoUrl,
      repoUrl,
      isFeatured,
      techs: techIds.map((techId, index) => ({
        techId,
        ordem: index + 1,
      })),
    };

    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `/api/projects/${editingId}` : "/api/projects";

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Erro ao criar projeto");

      toast.success("Projeto salvo com sucesso!");
      const data = await response.json();
      console.log("Projeto criado com sucesso:", data);

      fetchProjects();

      if (editingId) {
        toast.success("Projeto atualizado com sucesso!");
      } else {
        toast.success("Projeto adicionado com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao enviar projeto:", error);
      toast.error("Erro ao enviar projeto!");
    } finally {
      setTitle("");
      setDescription("");
      setImage("");
      setDemoUrl("");
      setRepoUrl("");
      setTechIds([]);
      setIsFeatured(false);
      setEditingId(null);
      setModalIsOpen(false);
    }
  };

  const handleDelete = async (id: string) => {
    const toastId = toast.loading("Excluindo o projeto...");

    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Erro ao excluir projeto");

      fetchProjects();
      toast.success("Projeto deletado com sucesso!", { id: toastId });
    } catch (error) {
      console.error("Erro ao deletar projeto:", error);
      toast.error("Erro ao deletar projeto!");
    }
  };

  return (
    <Layout>
      <div className="border-l-2 border-foreground flex justify-between w-full mt-4 mb-14 px-4">
        <h1 className="text-3xl">Projetos</h1>
        <ButtonVariant variant="add" action={() => setModalIsOpen(true)} />
      </div>

      {loading
        ? Array(3)
            .fill(null)
            .map((_, i) => <ProjectCardSkeleton key={i} />)
        : projects.map((project) => (
            <div
              className="flex flex-col lg:flex-row items-center gap-8 bg-gray-lighter shadow p-4 lg:px-4 lg:py-2 mb-4 rounded-md text-sm"
              key={project.id}
            >
              <div className="border border-gray-medium rounded lg:w-[550px] lg:h-[200px]">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={550}
                  height={200}
                  className="w-full h-full object-cover rounded"
                />
              </div>

              <div className="flex flex-col justify-center gap-2 w-full font-extralight">
                <div className=" font-bold">
                  <p>{project.title}</p>
                </div>
                <div className="">
                  <p>{project.description}</p>
                </div>
                <div className="py-2 font-normal">
                  {project.projectTechs.map(({ tech }) => tech.name).join(", ")}
                </div>
                <div className="flex justify-center lg:justify-start gap-4 font-normal">
                  <ButtonUrl url={project.demoUrl} label="Demo" />
                  <ButtonUrl url={project.repoUrl} label="Repositório" />
                </div>
              </div>

              <div className="flex lg:flex-col gap-2 justify-center">
                <ButtonVariant
                  variant="edit"
                  action={() => {
                    setEditingId(project.id);
                    setTitle(project.title);
                    setDescription(project.description);
                    setImage(project.image);
                    setDemoUrl(project.demoUrl);
                    setRepoUrl(project.repoUrl);
                    setTechIds(project.projectTechs.map(({ tech }) => tech.id));
                    setIsFeatured(project.isFeatured || false);
                    setModalIsOpen(true);
                  }}
                />
                <ButtonVariant
                  variant="delete"
                  action={() => handleDelete(project.id)}
                />
              </div>
            </div>
          ))}

      <Modal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)}>
        <div className="pb-4 border-b border-gray-medium flex-shrink-0">
          <h1 className="text-2xl font-light">Novo Projeto</h1>
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
            <label>Título</label>
            <input
              type="text"
              className="border border-foreground px-2 py-1 font-extralight rounded"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>Descrição</label>
            <textarea
              className="w-full h-20 p-2 border border-foreground rounded resize-none font-extralight"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Escreva algo aqui..."
            />
          </div>
          <div className="flex gap-2">
            <input
              type="checkbox"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
            />
            <label>Destaque na home</label>
          </div>
          <div className="flex flex-col gap-2">
            <label>Tecnologias</label>
            <select
              multiple
              className="border border-foreground px-2 py-1 font-extralight rounded h-32"
              value={techIds}
              onChange={(e) =>
                setTechIds(
                  Array.from(e.target.selectedOptions, (option) => option.value)
                )
              }
            >
              {techs.map((tech) => (
                <option key={tech.id} value={tech.id}>
                  {tech.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label>Link Demo</label>
            <input
              type="text"
              className="border border-foreground px-2 py-1 font-extralight rounded"
              value={demoUrl}
              onChange={(e) => setDemoUrl(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>Link Repo</label>
            <input
              type="text"
              className="border border-foreground px-2 py-1 font-extralight rounded"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
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
