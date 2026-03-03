import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { siteData } from "@/data/siteContent";

const navLinks = [
  { label: "Proiecte", href: "#projects" },
  { label: "Servicii", href: "#services" },
  { label: "Despre noi", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background backdrop-blur-md border-b border-border"
          : "bg-background/80 backdrop-blur-sm"
      }`}
    >
      <div className="container-wide section-padding py-0 flex items-center justify-between h-20">
        {/* Logo — bigger, no filter */}
        <a href="#" className="flex items-center">
          <img
            src={siteData.logo}
            alt={siteData.name}
            className="h-12 object-contain"
          />
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium tracking-wide text-foreground/70 hover:text-foreground transition-colors duration-200 focus-visible:outline-none focus-visible:text-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden md:flex items-center">
          <a href="#contact" className="btn-primary">
            Hai să lucrăm
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 rounded-md text-foreground hover:bg-foreground/10 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Închide meniu" : "Deschide meniu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-background border-t border-border px-6 py-6 flex flex-col gap-5">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-base font-semibold text-foreground py-1"
            >
              {link.label}
            </a>
          ))}
          <div className="border-t border-border pt-5 mt-1">
            <a href="#contact" className="btn-primary w-fit">
              Hai să lucrăm
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
