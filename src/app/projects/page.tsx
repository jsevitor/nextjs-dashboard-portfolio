"use client";

import Image from "next/image";
import UploadInput from "../components/upload/UploadInput";
import { useEffect, useState } from "react";
import { Layout, Modal } from "../components/layout";
import { ButtonUrl, ButtonVariant } from "../components/ui/buttons";
import { ProjectCardSkeleton } from "../components/ui/skeletons";
import { toast } from "sonner";
import { PageHeader } from "../components/layout/title/PageHeader";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { projectsData, techsData } from "@/data/data";

type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  isFeatured: boolean;
  demoUrl: string;
  repoUrl: string;
  createdAt?: string;
  updatedAt?: string;
  projectTechs?: {
    tech: {
      id: string;
      name: string;
    };
  }[];
  techs?: string[];
};

type Tech = {
  id: string;
  name: string;
};

export default function Projects() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [projects, setProjects] = useLocalStorage<Project[]>("projects", []);
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

  useEffect(() => {
    if (projects.length === 0) {
      setProjects(projectsData);
    }

    if (techs.length === 0) {
      setTechs(techsData);
    }

    setLoading(false);
  }, [projects]);

  const handleSubmit = async (
    e?: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    e?.preventDefault();

    if (
      !title ||
      !description ||
      !image ||
      !demoUrl ||
      !repoUrl ||
      !techIds.length
    ) {
      toast.error("Preencha todos os campos obrigatórios!");
      return;
    }

    const newProject: Project = {
      id: crypto.randomUUID(),
      title,
      description,
      image,
      projectTechs: techIds.map((id) => ({ tech: { id, name: "" } })),
      isFeatured,
      demoUrl,
      repoUrl,
    };

    setProjects([...projects, newProject]);
    toast.success("Projeto criado com sucesso!");
    setModalIsOpen(false);
    clearForm();
  };

  const clearForm = () => {
    setTitle("");
    setDescription("");
    setImage("");
    setDemoUrl("");
    setRepoUrl("");
    setTechIds([]);
    setIsFeatured(false);
  };

  const handleDelete = async (id: string) => {
    const toastId = toast.loading("Excluindo o projeto...");

    try {
      const updatedProjects = projects.filter((project) => project.id !== id);
      setProjects(updatedProjects);
      toast.success("Projeto deletado com sucesso!", { id: toastId });
    } catch (error) {
      console.error("Erro ao deletar projeto:", error);
      toast.error("Erro ao deletar projeto!");
    }
  };

  return (
    <Layout>
      <div className="flex justify-between w-full mt-4 mb-14">
        <PageHeader>Projetos</PageHeader>
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
                <div className="font-bold">
                  <p>{project.title}</p>
                </div>
                <div>
                  <p>{project.description}</p>
                </div>
                <div className="py-2 font-normal">
                  {project.techs && project.techs.join(", ")}
                </div>

                <div className="flex justify-center lg:justify-start gap-4 font-normal">
                  <ButtonUrl url={project.demoUrl} label="Demo" />
                  <ButtonUrl url={project.repoUrl} label="Repositório" />
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
                    // setTechIds( project.projectTechs.map(({ tech }) => tech.id));
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
