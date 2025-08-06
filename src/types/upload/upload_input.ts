/**
 * UploadInputProps Type
 *
 * Tipagem para as propriedades do componente UploadInput.
 *
 * ▸ **Responsabilidade**
 * - Definir o callback que será chamado quando o upload for concluído
 *
 * @typedef {Object} UploadInputProps
 * @property {(url: string) => void} onUploadComplete - Função chamada com a URL do arquivo após o upload ser concluído
 *
 * @example
 *
 * const uploadProps: UploadInputProps = {
 *   onUploadComplete: (url) => {
 *     console.log("Upload finalizado:", url);
 *   },
 * };
 */
export type UploadInputProps = {
  onUploadComplete: (url: string) => void;
};
