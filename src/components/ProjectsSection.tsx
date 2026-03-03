import { useState, useRef } from "react";
import { X, Play } from "lucide-react";
import { siteData } from "@/data/siteContent";
import { useReveal } from "@/hooks/useReveal";

type Project = typeof siteData.projects[0];

function VideoModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-surface rounded-xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-background/70 hover:bg-background rounded-full p-2 transition-colors"
        >
          <X size={18} className="text-foreground" />
        </button>

        {/* Video */}
        <video
          src={project.video}
          controls
          autoPlay
          className="w-full aspect-video bg-background"
        />

        {/* Info */}
        <div className="p-6">
          <div className="flex items-start justify-between gap-4 mb-3">
            <h3 className="text-xl font-display font-bold text-foreground">{project.title}</h3>
            <span className="label-tag shrink-0 pt-1">{project.client}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1 rounded-full border border-border text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    videoRef.current?.play().catch(() => {});
  };
  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      className="group relative cursor-pointer rounded-xl overflow-hidden bg-surface border border-border"
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={project.thumbnail}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        {/* Hover video */}
        <video
          ref={videoRef}
          src={project.lowresVideo}
          muted
          loop
          playsInline
          preload="none"
          className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-background/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="bg-gold rounded-full p-4 transform scale-75 group-hover:scale-100 transition-transform duration-300">
            <Play size={20} fill="currentColor" className="text-background ml-0.5" />
          </div>
        </div>
        {/* Category tag */}
        <span className="absolute top-3 left-3 text-xs font-medium px-2.5 py-1 rounded-full bg-background/70 backdrop-blur-sm text-foreground">
          {project.category}
        </span>
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-xs text-muted-foreground mb-1">{project.client}</p>
        <h3 className="font-display font-semibold text-foreground group-hover:text-gold transition-colors duration-200">
          {project.title}
        </h3>
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const ref = useReveal();

  const filtered =
    activeCategory === "All"
      ? siteData.projects
      : siteData.projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="section-padding bg-background">
      <div className="container-wide">
        <div ref={ref} className="reveal mb-16">
          <span className="label-tag mb-4 block">Portfolio</span>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="display-lg text-foreground max-w-lg">Our work speaks for itself.</h2>

            {/* Filters */}
            <div className="flex flex-wrap gap-2">
              {siteData.categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-sm px-4 py-2 rounded-full border transition-all duration-200 ${
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
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((project, i) => (
            <div
              key={project.id}
              className="reveal"
              style={{ transitionDelay: `${i * 0.07}s` }}
            >
              <ProjectCard project={project} onClick={() => setSelectedProject(project)} />
            </div>
          ))}
        </div>
      </div>

      {selectedProject && (
        <VideoModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </section>
  );
}
