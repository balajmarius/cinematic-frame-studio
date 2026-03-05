import { useEffect, useRef, useState } from "react";
import { siteData } from "@/data/siteContent";
import { useReveal } from "@/hooks/useReveal";

export default function ServicesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!imageRef.current) return;

      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }

      frameRef.current = requestAnimationFrame(() => {
        const viewportCenterX = window.innerWidth / 2;
        const viewportCenterY = window.innerHeight / 2;
        const normalizedX = (event.clientX - viewportCenterX) / viewportCenterX;
        const normalizedY = (event.clientY - viewportCenterY) / viewportCenterY;

        const moveX = normalizedX * viewportCenterX * 0.3;
        const moveY = normalizedY * viewportCenterY * 0.3;
        const rotateZ = normalizedX * 15;

        imageRef.current!.style.transform = `translate3d(${moveX}px, ${moveY}px, 0) rotateZ(${rotateZ}deg)`;
      });
    };

    const resetPreview = () => {
      if (!imageRef.current) return;
      imageRef.current.style.transform = "translate3d(0, 0, 0) rotateZ(0deg)";
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", resetPreview);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", resetPreview);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return (
    <section id="services" className="section-padding bg-background">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-12 items-start">
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
          <div className="hidden lg:block sticky top-32 [perspective:1400px]">
            <div
              ref={imageRef}
              className={`relative -ml-[200px] aspect-[4/3] w-full max-w-[320px] rounded-xl overflow-hidden bg-surface will-change-transform transition-all duration-300 ease-out ${
                hoveredIndex !== null ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
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
            </div>
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
        <div className="flex h-full flex-col justify-between">
          <div
            style={{
              clipPath: isHovered ? "inset(0 0 0% 0)" : "inset(0 0 25% 0)",
              paddingTop: isHovered ? "0.2rem" : "0.5rem",
              paddingBottom: isHovered ? "0.65rem" : "0.2rem",
              transition: "clip-path 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), padding 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
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
          <div
            className="border-b border-border transition-opacity duration-500"
            style={{ opacity: isHovered ? 1 : 0.4 }}
          />
        </div>
      </div>
    </a>
  );
}
