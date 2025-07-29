export function Footer() {
  return (
    <footer className="flex flex-col items-center justify-center py-4 text-gray-medium text-xs">
      <span className="">© 2025 DASHBOARD PORTFÓLIO.</span>
      <span className="">Todos os direitos reservados.</span>
      <span className="">
        Desenvolvido por{" "}
        <a
          href="https://github.com/jsevitor"
          target="_blank"
          className="text-highlight hover:underline"
        >
          Vitor Oliveira
        </a>
        .
      </span>
    </footer>
  );
}
