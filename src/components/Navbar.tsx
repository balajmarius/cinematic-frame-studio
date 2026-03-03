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
        scrolled ? "bg-background/95 backdrop-blur-md border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="container-wide section-padding py-0 flex items-center justify-between h-20">
        {/* Logo */}
        <a href="#" className="flex items-center">
          <img
            src={siteData.logo}
            alt={siteData.name}
            className="h-8 object-contain"
            style={{ filter: "brightness(0) invert(1)" }}
          />
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium tracking-wide text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-4">
          <a href="#contact" className="btn-primary">
            Hai să lucrăm
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Deschide meniu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-background/98 backdrop-blur-md border-t border-border px-6 py-6 flex flex-col gap-5">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-base font-medium text-foreground"
            >
              {link.label}
            </a>
          ))}
          <a href="#contact" className="btn-primary w-fit mt-2">
            Hai să lucrăm
          </a>
        </div>
      )}
    </nav>
  );
}
