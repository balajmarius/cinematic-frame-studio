import { useState, useRef } from "react";
import { siteData } from "@/data/siteContent";
import { useReveal } from "@/hooks/useReveal";

export default function ServicesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  return (
    <section id="services" className="section-padding bg-background">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 items-start">
          {/* Service list */}
          <div>
            {siteData.services.map((service, i) => (
              <ServiceRow
                key={service.id}
                service={service}
                index={i}
                onHover={() => setHoveredIndex(i)}
                onLeave={() => setHoveredIndex(null)}
              />
            ))}
          </div>

          {/* Sticky image preview on the right */}
          <div
            ref={imageRef}
            className="hidden lg:block sticky top-32 aspect-[4/3] rounded-xl overflow-hidden bg-surface"
          >
            {siteData.services.map((service, i) => (
              <img
                key={service.id}
                src={service.thumbnail}
                alt={service.title}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                  hoveredIndex === i ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
            {hoveredIndex === null && (
              <img
                src={siteData.services[0].thumbnail}
                alt={siteData.services[0].title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceRow({
  service,
  index,
  onHover,
  onLeave,
}: {
  service: typeof siteData.services[0];
  index: number;
  onHover: () => void;
  onLeave: () => void;
}) {
  const ref = useReveal();

  return (
    <a
      ref={ref as unknown as React.RefObject<HTMLAnchorElement>}
      href={`/servicii/${service.slug}`}
      className="reveal group block border-b border-border py-8 first:pt-0 transition-colors duration-200"
      style={{ transitionDelay: `${index * 0.08}s` }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div className="flex items-baseline gap-6">
        <span className="text-sm font-medium text-muted-foreground tracking-widest font-display">
          0{index + 1}.
        </span>
        <h3 className="font-display text-3xl md:text-5xl font-bold text-foreground group-hover:text-gold transition-colors duration-300">
          {service.title}
        </h3>
      </div>
    </a>
  );
}
