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
                isAnyHovered={hoveredIndex !== null}
                isHovered={hoveredIndex === i}
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
  isAnyHovered,
  isHovered,
}: {
  service: typeof siteData.services[0];
  index: number;
  onHover: () => void;
  onLeave: () => void;
  isAnyHovered: boolean;
  isHovered: boolean;
}) {
  const ref = useReveal();

  return (
    <a
      ref={ref as unknown as React.RefObject<HTMLAnchorElement>}
      href={`/servicii/${service.slug}`}
      className="reveal group block"
      style={{ transitionDelay: `${index * 0.08}s` }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div
        className="overflow-hidden transition-all duration-500"
        style={{
          maxHeight: isHovered ? "160px" : isAnyHovered ? "60px" : "80px",
          paddingTop: isHovered ? "2rem" : "1rem",
          paddingBottom: isHovered ? "2rem" : "1rem",
          transition: "max-height 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), padding 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
      >
        <div
          style={{
            clipPath: isHovered ? "inset(0 0 0% 0)" : "inset(0 0 25% 0)",
            transition: "clip-path 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
        >
          <div className="flex items-baseline gap-6">
            <span className="text-sm font-medium text-muted-foreground tracking-widest font-display" style={{ position: "relative", top: "-15px" }}>
              0{index + 1}.
            </span>
            <h3
              className="font-display text-3xl md:text-5xl font-bold text-foreground group-hover:text-gold"
              style={{
                transition: "color 0.3s, transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                transform: isHovered ? "scale(1.15)" : "scale(1)",
                transformOrigin: "left center",
              }}
            >
              {service.title}
            </h3>
          </div>
        </div>
      </div>
      <div
        className="border-b border-border transition-opacity duration-500"
        style={{ opacity: isHovered ? 1 : 0.4 }}
      />
    </a>
  );
}
