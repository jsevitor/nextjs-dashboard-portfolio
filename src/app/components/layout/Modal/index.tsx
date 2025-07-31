"use client";

import { ModalProps } from "@/types/layout/modal";
import { useEffect } from "react";
import ReactModal from "react-modal";

/**
 * Modal Component
 *
 * Componente responsável por exibir um modal (caixa de diálogo) sobrepondo o conteúdo da página.
 * Permite abrir e fechar o modal, personalizar o conteúdo dentro dele, e exibe uma camada de fundo semitransparente.
 * Utiliza a biblioteca `ReactModal` para o controle do modal.
 *
 * ▸ **Responsabilidade**
 * - Exibir um modal com conteúdo dinâmico
 * - Gerenciar o estado de abertura e fechamento do modal
 * - Personalizar o estilo do modal e do fundo
 * - Configuração da aplicação para que o modal funcione corretamente (usando `ReactModal.setAppElement`)
 *
 * @param {ModalProps} props Propriedades para customizar o comportamento e conteúdo do modal
 * @param {boolean} props.isOpen Determina se o modal está aberto ou fechado
 * @param {Function} props.onClose Função chamada para fechar o modal
 * @param {React.ReactNode} props.children Conteúdo do modal, que pode ser qualquer elemento JSX
 *
 * @returns {JSX.Element} Componente de modal
 *
 * @example
 * ```tsx
 * <Modal isOpen={isModalOpen} onClose={closeModal}>
 *   <h2>Conteúdo do Modal</h2>
 * </Modal>
 * ```
 */
export function Modal({ isOpen, onClose, children }: ModalProps) {
  useEffect(() => {
    ReactModal.setAppElement(document.body);
  }, []);

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      overlayClassName="fixed inset-0 bg-[#0f0f0f80] flex items-center justify-center z-80"
      className="flex flex-col h-full bg-background lg:border lg:border-gray-medium p-6 rounded shadow-lg w-full mx-auto max-w-lg md:max-h-9/10 lg:h-fit text-sm"
      contentLabel="Modal"
    >
      {children}
    </ReactModal>
  );
}
