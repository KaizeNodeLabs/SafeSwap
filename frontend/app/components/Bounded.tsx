interface BoundedProps {
  children: React.ReactNode;
  title: string;
}

const Bounded = ({ children, title }: BoundedProps) => {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-8">{title}</h1>
      <div className="flex flex-wrap justify-center gap-8">{children}</div>
    </main>
  );
};

export default Bounded;
