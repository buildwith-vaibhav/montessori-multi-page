import { useEffect, useState, type ReactNode } from "react";

function usePath() {
  const [path, setPath] = useState(window.location.pathname);
  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);
  const navigate = (to: string) => {
    window.history.pushState({}, "", to);
    setPath(to);
  };
  return { path, navigate };
}

function Link({ to, children, className }: { to: string; children: ReactNode; className?: string }) {
  return (
    <a
      href={to}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        window.history.pushState({}, "", to);
        window.dispatchEvent(new PopStateEvent("popstate"));
      }}
    >
      {children}
    </a>
  );
}

const pages: Record<string, { title: string; body: string }> = {
  "/": {
    title: "Where independence begins",
    body: "An authentic Montessori school for children from 18 months to 12 years. Explore our programs, campus life, and admissions process.",
  },
  "/about": {
    title: "About our school",
    body: "We follow the child with prepared environments, mixed-age communities, and guides trained in Montessori practice.",
  },
  "/programs": {
    title: "Programs",
    body: "Toddler (18 mo–3), Primary (3–6), and Elementary (6–12). Each stage builds independence, concentration, and a love of learning.",
  },
  "/campus": {
    title: "Campus life",
    body: "Gardens, atelier, library, and outdoor work. A calm campus designed for focus and joy.",
  },
  "/admissions": {
    title: "Admissions",
    body: "Start with a tour. Then application, classroom visit, and enrollment — clear steps, no pressure.",
  },
  "/contact": {
    title: "Contact & news",
    body: "Email hello@montessori.example or book a tour. We share term updates and open-day dates here.",
  },
};

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/programs", label: "Programs" },
  { to: "/campus", label: "Campus" },
  { to: "/admissions", label: "Admissions" },
  { to: "/contact", label: "Contact" },
];

export default function App() {
  const { path } = usePath();
  const page = pages[path] || pages["/"];
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-forest/10 bg-ivory/95 sticky top-0 z-10">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-4">
          <Link to="/" className="font-display text-lg font-semibold text-forest">Montessori School</Link>
          <nav className="hidden gap-5 sm:flex">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} className={`text-sm ${path === n.to ? "font-semibold text-forest" : "text-ink/70 hover:text-forest"}`}>
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="mx-auto flex-1 max-w-5xl px-5 py-16">
        <p className="text-sm font-semibold uppercase tracking-widest text-sage">Multi-page prototype</p>
        <h1 className="mt-3 font-display text-4xl text-forest">{page.title}</h1>
        <p className="mt-5 max-w-2xl text-lg text-ink/75">{page.body}</p>
        <div className="mt-10 flex flex-wrap gap-3">
          {nav.filter((n) => n.to !== path).slice(0, 3).map((n) => (
            <Link key={n.to} to={n.to} className="rounded-full border border-forest/20 px-5 py-2 text-sm font-semibold text-forest hover:bg-forest hover:text-ivory">
              {n.label}
            </Link>
          ))}
        </div>
      </main>
      <footer className="border-t border-forest/10 py-8 text-center text-sm text-ink/50">
        © {new Date().getFullYear()} Montessori School · Multi-page demo
      </footer>
    </div>
  );
}
