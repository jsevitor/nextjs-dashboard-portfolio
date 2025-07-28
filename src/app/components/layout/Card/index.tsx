type CardProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

export function Card({ children, className, style }: CardProps) {
  return (
    <section
      className={`bg-gray-lighter shadow p-4 rounded ${className}`}
      style={style}
    >
      {children}
    </section>
  );
}
