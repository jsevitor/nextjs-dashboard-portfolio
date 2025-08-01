import { UploadInputProps } from "@/types/upload/upload_input";

/**
 * UploadInput Component
 *
 * Componente de input para upload de arquivos, responsável por enviar um arquivo selecionado para a API
 * e retornar a URL do arquivo salvo por meio da função de callback `onUploadComplete`.
 *
 * ▸ **Responsabilidade**
 * - Permitir que o usuário selecione um arquivo local
 * - Enviar o arquivo selecionado para a rota `/api/upload`
 * - Retornar a URL do arquivo salvo por meio do callback fornecido
 *
 * @param {UploadInputProps} props - Propriedades do componente, incluindo a função `onUploadComplete` para tratar a URL do arquivo enviado
 * @returns {JSX.Element} Elemento de input para upload de arquivos
 *
 * @example
 * ```tsx
 * <UploadInput onUploadComplete={(url) => console.log(url)} />
 * ```
 */
export default function UploadInput({ onUploadComplete }: UploadInputProps) {
  /**
   * handleUpload
   *
   * Função que trata a seleção e o envio do arquivo:
   * - Captura o primeiro arquivo selecionado pelo usuário
   * - Envia o arquivo para a API via `fetch` usando `FormData`
   * - Obtém a URL de resposta e chama `onUploadComplete` com essa URL
   *
   * ▸ **Responsabilidade**
   * - Processar e enviar o arquivo para o servidor
   * - Notificar o componente pai com a URL do arquivo salvo
   */
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    onUploadComplete(data.url);
    console.log("Arquivo salvo em:", data.url);
  };

  return (
    <input
      type="file"
      onChange={handleUpload}
      className="px-4 py-1 bg-gray-medium text-foreground rounded hover:bg-gray-lighter hover:text-foreground border border-foreground flex justify-center items-center gap-2 cursor-pointer"
    />
  );
}
