import { writeFile } from "fs-extra";
import { join } from "path";
import { NextResponse } from "next/server";

/**
 * POST Handler - Upload de Arquivo
 *
 * Manipulador da requisição POST que realiza o upload de um arquivo enviado via `multipart/form-data`
 * e o salva no diretório `/public/uploads`.
 *
 * ▸ **Responsabilidade**
 * - Validar se um arquivo foi enviado no campo `file`
 * - Converter o arquivo recebido para um buffer
 * - Salvar o arquivo no sistema de arquivos local (`/public/uploads`)
 * - Retornar a URL pública para acesso ao arquivo
 *
 * @param {Request} req - Objeto da requisição contendo o arquivo no corpo do formulário
 *
 * @returns {Promise<NextResponse>} Resposta JSON contendo a URL do arquivo salvo ou erro apropriado
 *
 * @example
 *
 * const formData = new FormData();
 * formData.append("file", selectedFile);
 *
 * const response = await fetch("/api/upload", {
 *   method: "POST",
 *   body: formData,
 * });
 * const data = await response.json();
 * // data = { url: "/uploads/arquivo.jpg" }
 */
export async function POST(req: Request) {
  const data = await req.formData();
  const file: File | null = data.get("file") as unknown as File;

  if (!file) {
    return NextResponse.json(
      { error: "Nenhum arquivo enviado." },
      { status: 400 }
    );
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const filename = file.name.replace(/\s+/g, "-");
  const path = join(process.cwd(), "public", "uploads", filename);

  try {
    await writeFile(path, buffer);
    return NextResponse.json({ url: `/uploads/${filename}` });
  } catch (err) {
    console.error("Erro ao salvar arquivo:", err);
    return NextResponse.json(
      { error: "Erro ao salvar arquivo." },
      { status: 500 }
    );
  }
}
