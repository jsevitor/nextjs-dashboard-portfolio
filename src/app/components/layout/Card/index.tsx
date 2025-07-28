type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export function Card({ children, className }: CardProps) {
  return (
    <section className={`bg-gray-lighter shadow p-4 rounded ${className}`}>
      {children}
    </section>
  );
}
