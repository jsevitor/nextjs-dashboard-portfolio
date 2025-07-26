type UploadInputProps = {
  onUploadComplete: (url: string) => void;
};

export default function UploadInput({ onUploadComplete }: UploadInputProps) {
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
