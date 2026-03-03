import { useReveal } from "@/hooks/useReveal";
import { siteData } from "@/data/siteContent";

export default function ClientsSection() {
  const ref = useReveal();
  // Duplicate for seamless scroll
  const doubled = [...siteData.clients, ...siteData.clients];

  return (
    <section className="py-20 bg-surface border-y border-border overflow-hidden">
      <div className="container-wide mb-12">
        <div ref={ref} className="reveal text-center">
          <span className="label-tag mb-3 block">Clienți de încredere</span>
          <p className="text-muted-foreground text-sm">
            Raiffeisen Bank, eMAG, Braun, Oral-B și mulți alții.
          </p>
        </div>
      </div>

      {/* Scrolling logos */}
      <div className="relative w-full">
        <div className="flex gap-12 w-max" style={{ animation: "scroll-x 30s linear infinite" }}>
          {doubled.map((client, i) => (
            <div
              key={`${client.name}-${i}`}
              className="flex items-center justify-center w-32 h-12 shrink-0 opacity-40 hover:opacity-80 transition-opacity duration-300"
            >
              <img
                src={client.logo}
                alt={client.name}
                className="max-w-full max-h-full object-contain"
                style={{ filter: "brightness(0) invert(1)" }}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
