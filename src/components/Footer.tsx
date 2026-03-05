import { siteData } from "@/data/siteContent";

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-border">
      <div className="container-wide section-padding py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <img
              src={siteData.logo}
              alt={siteData.name}
              className="h-[3.3rem] object-contain mb-3"
            />
            <p className="text-xs text-muted-foreground max-w-xs leading-relaxed">
              Producție video profesionistă în Timișoara.
              <br />
              Tu vii cu ideea, noi îi dăm formă și vizibilitate.
            </p>
          </div>

          <nav aria-label="Linkuri de navigare" className="flex flex-wrap gap-x-8 gap-y-3">
            {[
              { label: "Proiecte", href: "/portofoliu" },
              { label: "Servicii", href: "/servicii" },
              { label: "Despre noi", href: "/despre-noi" },
              { label: "Contact", href: "/contact" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {siteData.name}. Toate drepturile rezervate.
          </p>
          <p className="text-xs text-muted-foreground">
            Timișoara, România
          </p>
        </div>
      </div>
    </footer>
  );
}
