"use client";

import { useEffect } from "react";
import ReactModal from "react-modal";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export function Modal({ isOpen, onClose, children }: ModalProps) {
  useEffect(() => {
    ReactModal.setAppElement(document.body);
  }, []);

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      overlayClassName="fixed inset-0 bg-[#0f0f0f80] flex items-center justify-center z-80"
      className="flex flex-col h-full bg-background lg:border lg:border-gray-medium p-6 rounded shadow-lg w-full mx-auto max-w-lg lg:max-h-3/4 text-sm"
      contentLabel="Modal"
    >
      {children}
    </ReactModal>
  );
}
