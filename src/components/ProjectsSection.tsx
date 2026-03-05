import { useState, useRef } from "react";
import { siteData } from "@/data/siteContent";
import { useReveal } from "@/hooks/useReveal";

type Project = typeof siteData.projects[0];

function ProjectCard({ project }: { project: Project }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <a
      href={`/portofoliu/${project.slug}`}
      className="group relative block rounded-xl overflow-hidden bg-surface border border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      onMouseEnter={() => {
        if (videoRef.current) {
          videoRef.current.currentTime = project.previewStart ?? 0;
          videoRef.current.play().catch(() => {});
        }
      }}
      onMouseLeave={() => {
        if (videoRef.current) {
          videoRef.current.pause();
          videoRef.current.currentTime = project.previewStart ?? 0;
        }
      }}
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          src={project.thumbnail}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
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
            onLoadedMetadata={() => {
              if (videoRef.current) {
                videoRef.current.currentTime = project.previewStart ?? 0;
              }
            }}
          />
        )}
      </div>

      <div className="p-4">
        <p className="text-xs text-muted-foreground mb-1">{project.client || "Proiect personal"}</p>
        <h3 className="font-display font-semibold text-foreground group-hover:text-gold transition-colors duration-200">
          {project.title}
        </h3>
      </div>
    </a>
  );
}

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState(siteData.categories[0]);
  const [animating, setAnimating] = useState(false);
  const [displayedCategory, setDisplayedCategory] = useState(siteData.categories[0]);
  const ref = useReveal();

  const filtered = siteData.projects.filter((p) => p.category === displayedCategory.toLowerCase());

  const handleCategoryChange = (cat: string) => {
    if (cat === activeCategory) return;
    setActiveCategory(cat);
    setAnimating(true);

    setTimeout(() => {
      setDisplayedCategory(cat);
      setAnimating(false);
    }, 250);
  };

  return (
    <section id="projects" className="section-padding bg-background">
      <div className="container-wide">
        <div ref={ref} className="reveal mb-16">
          <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Filtrează proiecte după categorie">
              {siteData.categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  aria-pressed={activeCategory === cat}
                  className={`text-xs px-4 py-1.5 rounded-sm border tracking-wide uppercase transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                    activeCategory === cat
                      ? "bg-gold text-background border-gold font-semibold"
                      : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                  }`}
                >
                  {cat}
                </button>
              ))}
          </div>
        </div>

        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 transition-all duration-250 ${
            animating ? "opacity-0 translate-y-3" : "opacity-100 translate-y-0"
          }`}
        >
          {filtered.map((project, i) => (
            <div
              key={project.id}
              className="reveal visible"
              style={{ transitionDelay: animating ? "0s" : `${i * 0.05}s` }}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
