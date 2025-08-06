/**
 * ModalProps Type
 *
 * Tipagem para as propriedades do componente Modal.
 *
 * ▸ **Responsabilidade**
 * - Definir os tipos das props aceitas pelo componente Modal
 *
 * @typedef {Object} ModalProps
 * @property {boolean} isOpen - Indica se o modal está aberto (visível)
 * @property {() => void} onClose - Função callback chamada para fechar o modal
 * @property {React.ReactNode} children - Conteúdo interno do modal, geralmente elementos React
 *
 * @example
 *
 * const modalProps: ModalProps = {
 *   isOpen: true,
 *   onClose: () => setIsOpen(false),
 *   children: <p>Conteúdo do modal</p>,
 * };
 */
export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};
