import { writeFile } from "fs-extra";
import { join } from "path";
import { NextResponse } from "next/server";

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
