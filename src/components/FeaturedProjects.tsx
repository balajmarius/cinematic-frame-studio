import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { siteData } from "@/data/siteContent";
import { useReveal } from "@/hooks/useReveal";

const featured = siteData.projects.filter((p) => p.video).slice(0, 4);

export default function FeaturedProjects() {
  const ref = useReveal();

  return (
    <section className="section-padding bg-background">
      <div className="container-wide">
        <div ref={ref} className="reveal flex items-end justify-between gap-6 mb-14">
          <span className="label-tag">Proiecte selectate</span>
          <a
            href="/portofoliu"
            className="btn-outline shrink-0 group"
          >
            Vezi toate proiectele
            <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featured.map((project, i) => (
            <FeaturedCard
              key={project.id}
              project={project}
              delay={i * 0.08}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedCard({
  project,
  delay = 0,
}: {
  project: typeof siteData.projects[0];
  delay?: number;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const ref = useReveal();

  return (
    <a
      ref={ref as unknown as React.RefObject<HTMLAnchorElement>}
      href={`/portofoliu/${project.slug}`}
      className="reveal group relative block rounded-xl overflow-hidden bg-surface border border-border aspect-[3/4]"
      style={{ transitionDelay: `${delay}s` }}
      onMouseEnter={() => videoRef.current?.play().catch(() => {})}
      onMouseLeave={() => {
        if (videoRef.current) {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
        }
      }}
    >
      <img
        src={project.thumbnail}
        alt={project.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        loading="lazy"
      />
      {project.lowresVideo && (
        <video
          ref={videoRef}
          src={project.lowresVideo}
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Subtle gradient — only at bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" aria-hidden="true" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <span className="text-[10px] font-medium tracking-[0.15em] uppercase text-foreground/50 block mb-1.5">
          {project.client}
        </span>
        <h3 className="font-display font-bold text-sm text-foreground group-hover:text-gold transition-colors duration-200">
          {project.title}
        </h3>
      </div>
    </a>
  );
}
