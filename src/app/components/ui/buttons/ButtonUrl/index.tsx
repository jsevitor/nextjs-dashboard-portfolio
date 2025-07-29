import { ButtonProps } from "../types";

export function ButtonUrl({ url, label, className }: ButtonProps) {
  return (
    <button
      type="submit"
      className={`px-4 py-1 bg-highlight text-background hover:text-white rounded hover:opacity-80 ${className}`}
    >
      <a href={url} target="_blank">
        {label}
      </a>
    </button>
  );
}
