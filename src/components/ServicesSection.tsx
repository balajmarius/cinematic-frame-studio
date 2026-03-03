import { useRef } from "react";
import { Play } from "lucide-react";
import { siteData } from "@/data/siteContent";
import { useReveal } from "@/hooks/useReveal";

export default function ServicesSection() {
  const ref = useReveal();

  return (
    <section id="services" className="section-padding bg-surface">
      <div className="container-wide">
        <div ref={ref} className="reveal mb-16">
          <span className="label-tag mb-4 block">Ce facem</span>
          <div className="divider-line mb-6" />
          <h2 className="display-lg text-foreground max-w-xl">
            Full-service video production.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {siteData.services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  service,
  index,
}: {
  service: typeof siteData.services[0];
  index: number;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const ref = useReveal();

  return (
    <div
      ref={ref}
      className="reveal group card-surface cursor-default overflow-hidden"
      style={{ transitionDelay: `${index * 0.1}s` }}
      onMouseEnter={() => videoRef.current?.play().catch(() => {})}
      onMouseLeave={() => {
        if (videoRef.current) {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
        }
      }}
    >
      {/* Image/Video thumbnail */}
      <div className="relative aspect-[16/9] overflow-hidden">
        <img
          src={service.thumbnail}
          alt={service.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <video
          ref={videoRef}
          src={service.video}
          muted
          loop
          playsInline
          preload="none"
          className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-gold/90 rounded-full p-2">
            <Play size={12} fill="currentColor" className="text-background ml-0.5" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <span className="text-xs font-medium text-gold tracking-widest uppercase block mb-3">
          0{index + 1}
        </span>
        <h3 className="font-display text-lg font-bold text-foreground mb-2 group-hover:text-gold transition-colors duration-200">
          {service.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{service.excerpt}</p>
      </div>
    </div>
  );
}
