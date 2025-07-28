type SectionTitle = {
  children: React.ReactNode;
};

export function SectionTitle({ children }: SectionTitle) {
  return <h2 className="text-xl font-bold mb-4 text-highlight">{children}</h2>;
}
