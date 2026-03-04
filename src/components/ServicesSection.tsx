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
          <div className="relative">
            {siteData.services.map((service, i) => (
              <ServiceRow
                key={service.id}
                service={service}
                index={i}
                isSecond={i === 1}
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
  isSecond,
  onHover,
  onLeave,
}: {
  service: typeof siteData.services[0];
  index: number;
  isSecond?: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  const ref = useReveal();
  const [hovered, setHovered] = useState(false);

  return (
    <a
      ref={ref as unknown as React.RefObject<HTMLAnchorElement>}
      href={`/servicii/${service.slug}`}
      className={`reveal group block first:pt-0 ${isSecond ? "relative z-10 -mt-[30%] rounded-xl bg-background" : ""}`}
      style={{ transitionDelay: `${index * 0.08}s` }}
      onMouseEnter={() => { setHovered(true); onHover(); }}
      onMouseLeave={() => { setHovered(false); onLeave(); }}
    >
      <div
        className="py-8"
        style={{
          clipPath: hovered ? "inset(0 0 0% 0)" : "inset(0 0 25% 0)",
          transition: "clip-path 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
      >
        <div className="flex items-baseline gap-6">
          <span className="text-sm font-medium text-muted-foreground tracking-widest font-display">
            0{index + 1}.
          </span>
          <h3
            className="font-display text-3xl md:text-5xl font-bold text-foreground group-hover:text-gold"
            style={{ transition: "color 0.3s" }}
          >
            {service.title}
          </h3>
        </div>
      </div>
      <div className="border-b border-border" />
    </a>
  );
}
