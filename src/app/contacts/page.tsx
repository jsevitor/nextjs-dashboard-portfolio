"use client";

import { useEffect, useState } from "react";
import { Layout, Modal } from "../components/layout";
import { ButtonVariant } from "../components/ui/buttons";
import { ContactCardSkeleton } from "../components/ui/skeletons";
import { toast } from "sonner";
import { PageHeader } from "../components/layout/title/PageHeader";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { contacts } from "@/data/data";

type Contacts = {
  id: string;
  icon: string;
  name: string;
  user: string;
  link: string;
};

export default function Contacts() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [contact, setContact] = useLocalStorage<Contacts[]>("contacts", []);
  const [icon, setIcon] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [user, setUser] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    if (!localStorage.getItem("contacts") || contact.length === 0) {
      setContact(contacts);
      setLoading(false);
    } else {
      setContact(contact);
      setLoading(false);
    }
  }, []);

  const handleSubmit = async (
    e?: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    e?.preventDefault();

    const newContact: Contacts = {
      id: editingId ?? crypto.randomUUID(),
      icon,
      name,
      user,
      link,
    };

    const updatedContacts = [...contact, newContact];
    setContact(updatedContacts);
    setIcon("");
    setName("");
    setUser("");
    setLink("");
    setEditingId(null);
    setModalIsOpen(false);

    toast.success(
      editingId
        ? "Contato atualizado com sucesso!"
        : "Contato criado com sucesso!"
    );
  };

  const handleDelete = async (id: string) => {
    const updated = contact.filter((contact) => contact.id !== id);
    setContact(updated);
    toast.success("Contato deletado!");
  };

  return (
    <Layout>
      <div className="flex justify-between w-full mt-4 mb-14">
        <PageHeader>Contatos</PageHeader>
        <ButtonVariant variant="add" action={() => setModalIsOpen(true)} />
      </div>

      {loading
        ? Array(5)
            .fill(null)
            .map((_, i) => <ContactCardSkeleton key={i} />)
        : contact.map((contact) => (
            <div
              className="flex flex-col lg:flex-row items-center gap-8 bg-gray-lighter shadow px-4 py-2 rounded-md mb-4"
              key={contact.id}
            >
              <div>
                <i className={`bi ${contact.icon} text-4xl`}></i>
              </div>

              <div className="flex items-center flex-wrap justify-center lg:grid lg:grid-cols-[120px_1fr_2fr] gap-4 flex-1">
                <h2 className="font-semibold">{contact.name}</h2>
                <p className="font-extralight">{contact.user}</p>
                <p className="font-extralight break-all">{contact.link}</p>
              </div>

              <div className="flex gap-2 justify-center">
                <ButtonVariant
                  variant="edit"
                  action={() => {
                    setEditingId(contact.id);
                    setIcon(contact.icon);
                    setName(contact.name);
                    setUser(contact.user);
                    setLink(contact.link);
                    setModalIsOpen(true);
                  }}
                />
                <ButtonVariant
                  variant="delete"
                  action={() => handleDelete(contact.id)}
                />
              </div>
            </div>
          ))}

      <Modal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)}>
        <div className="pb-4 border-b border-gray-medium flex-shrink-0">
          <h1 className="text-2xl font-light">Novo Contato</h1>
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
          <div className="flex flex-col gap-2">
            <label>User</label>
            <input
              type="text"
              className="border border-foreground px-2 py-1 font-extralight rounded"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>Link</label>
            <input
              type="text"
              className="border border-foreground px-2 py-1 font-extralight rounded"
              value={link}
              onChange={(e) => setLink(e.target.value)}
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
