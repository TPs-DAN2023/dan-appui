import NavBar from "../NavBar/NavBar";

interface LayoutProps {
  children: any;
  className?: string;
}

export default function Layout({ children, className }: LayoutProps) {
  return (
    <section className={`h-screen flex flex-col ${className}`}>
      <header className="border border-b-blue-300">
        <NavBar />
      </header>

      <main className="flex overflow-x-hidden overflow-y-hidden flex-grow">
        {children}
      </main>
    </section>
  );
}
