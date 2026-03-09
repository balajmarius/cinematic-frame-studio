import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { siteData } from "@/data/siteContent";

const navLinks = [
  { label: "Proiecte", href: "/portofoliu" },
  { label: "Servicii", href: "/servicii" },
  { label: "Despre noi", href: "/despre-noi" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <nav
      aria-label="Navigare principală"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        menuOpen
          ? "bg-background"
          : scrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-border"
            : "bg-background/40 backdrop-blur-md"
      }`}
    >
      <div className="container-wide section-padding py-0 flex items-center justify-between h-20">
        <a href="/" className="flex items-center relative z-10">
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
                className="text-sm font-medium tracking-wide text-foreground/70 hover:text-foreground transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden md:flex items-center">
          <a href="/contact" className="btn-primary">
            Începe un proiect
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 rounded-md text-foreground hover:bg-foreground/10 transition-colors relative z-10"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Închide meniu" : "Deschide meniu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile fullscreen menu */}
      <div
        className={`md:hidden fixed inset-0 top-20 bg-background flex flex-col transition-all duration-300 ${
          menuOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        }`}
      >
        <div className="flex flex-col px-6 pt-8 gap-1 flex-1">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`text-2xl font-display font-bold text-foreground py-3 border-b border-border transition-all duration-300 ${
                menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: menuOpen ? `${i * 60}ms` : "0ms" }}
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="px-6 pb-10">
          <a
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="btn-primary w-full justify-center"
          >
            Începe un proiect
          </a>
        </div>
      </div>
    </nav>
  );
}
