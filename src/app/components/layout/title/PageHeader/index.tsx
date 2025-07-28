type PageHeaderProps = {
  children: React.ReactNode;
};

export function PageHeader({ children }: PageHeaderProps) {
  return (
    <h1 className="text-3xl font-bold text-highlight border-l-3 border-highlight pl-4">
      {children}
    </h1>
  );
}
