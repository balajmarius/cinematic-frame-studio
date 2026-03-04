import { useEffect, useRef } from "react";
import { useParams, Navigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";
import { siteData } from "@/data/siteContent";
import { usePageMeta } from "@/hooks/usePageMeta";

export default function Project() {
  const { slug } = useParams();
  const videoRef = useRef<HTMLVideoElement>(null);

  const project = siteData.projects.find((p) => p.slug === slug);

  usePageMeta({
    title: project ? `${project.title}${project.client ? ` — ${project.client}` : ""}` : "Proiect",
    description: project
      ? `Proiect video${project.client ? ` pentru ${project.client}` : ""}${project.year ? ` (${project.year})` : ""}. Producție PertuFilm Timișoara.`
      : undefined,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.08 }
    );
    const els = document.querySelectorAll(".reveal");
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [slug]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) return <Navigate to="/portofoliu" replace />;

  const hasCrew = Object.keys(project.crew).length > 0;
  const otherProjects = siteData.projects
    .filter((p) => p.slug !== slug)
    .slice(0, 4);

  return (
    <div className="bg-background text-foreground min-h-screen">
      <Navbar />
      <PageHero title={project.title} />
      <main id="main-content">
        {/* Hero */}
        <section className="pt-16 pb-16 section-padding bg-background">
          <div className="container-wide">
            <div className="reveal">
              <a
                href="/portofoliu"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 mb-8"
              >
                <ArrowLeft size={14} />
                Toate proiectele
              </a>
              <h1 className="display-xl text-foreground max-w-3xl">
                {project.title}
              </h1>

              {/* Meta row */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-6 text-sm text-muted-foreground">
                {project.client && (
                  <span>
                    <span className="text-foreground/40 mr-2">Client</span>
                    {project.client}
                  </span>
                )}
                {project.agency && (
                  <span>
                    <span className="text-foreground/40 mr-2">Agenție</span>
                    {project.agency}
                  </span>
                )}
                {project.year && (
                  <span>
                    <span className="text-foreground/40 mr-2">An</span>
                    {project.year}
                  </span>
                )}
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-foreground/10 text-foreground/60 uppercase tracking-wider">
                  {project.category}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Video / Thumbnail */}
        <section className="section-padding pt-0 bg-background">
          <div className="container-wide">
            <div className="reveal relative rounded-xl overflow-hidden aspect-video bg-surface">
              {project.video ? (
                <video
                  ref={videoRef}
                  src={project.video}
                  controls
                  preload="metadata"
                  poster={project.thumbnail}
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </div>
        </section>

        {/* Crew */}
        {hasCrew && (
          <section className="section-padding pt-0 bg-background">
            <div className="container-wide max-w-3xl">
              <div className="reveal">
                <span className="label-tag mb-4 block">Echipa</span>
                <div className="divider-line mb-8" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {Object.entries(project.crew).map(([role, members]) => (
                    <div key={role}>
                      <span className="text-xs text-muted-foreground uppercase tracking-wider block mb-1.5">
                        {role}
                      </span>
                      <p className="text-foreground text-sm">
                        {(members as string[]).join(", ")}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-12">
                  <a href="/contact" className="btn-primary">
                    Solicită o ofertă
                  </a>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Other projects */}
        <section className="section-padding bg-surface">
          <div className="container-wide">
            <div className="reveal mb-12">
              <span className="label-tag mb-4 block">Alte proiecte</span>
              <div className="divider-line" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {otherProjects.map((p, i) => (
                <a
                  key={p.id}
                  href={`/portofoliu/${p.slug}`}
                  className="reveal group card-surface"
                  style={{ transitionDelay: `${i * 0.08}s` }}
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={p.thumbnail}
                      alt={p.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-5">
                    <span className="text-[10px] font-medium tracking-[0.15em] uppercase text-gold block mb-1">
                      {p.client || p.category}
                    </span>
                    <h3 className="font-display text-base font-bold text-foreground group-hover:text-gold transition-colors duration-200">
                      {p.title}
                    </h3>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
