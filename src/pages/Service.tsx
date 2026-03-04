import { useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { siteData } from "@/data/siteContent";
import { usePageMeta } from "@/hooks/usePageMeta";

export default function Service() {
  const { slug } = useParams();

  const service = siteData.services.find((s) => s.slug === slug);
  const currentIndex = siteData.services.findIndex((s) => s.slug === slug);

  usePageMeta({
    title: service?.title,
    description: service?.description,
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

  if (!service) return <Navigate to="/servicii" replace />;

  const paragraphs = service.description.split(". ").reduce<string[]>((acc, sentence, i, arr) => {
    // Group every 2 sentences into a paragraph
    const idx = Math.floor(i / 2);
    if (!acc[idx]) acc[idx] = "";
    acc[idx] += sentence + (i < arr.length - 1 ? ". " : "");
    return acc;
  }, []);

  return (
    <div className="bg-background text-foreground min-h-screen">
      <Navbar />
      <main id="main-content" className="pt-20">
        <section className="section-padding py-16 md:py-24 bg-background">
          <div className="container-wide">
            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12 lg:gap-20">
              {/* Sidebar — services list */}
              <nav className="hidden lg:block">
                <ul className="space-y-0">
                  {siteData.services.map((s, i) => (
                    <li key={s.id} className="relative group/nav">
                      <a
                        href={`/servicii/${s.slug}`}
                        className={`flex items-baseline gap-3 py-4 border-b border-border text-sm font-display font-semibold tracking-wide transition-colors duration-200 ${
                          s.slug === slug
                            ? "text-gold"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <span className="text-xs opacity-60">0{i + 1}.</span>
                        {s.title}
                      </a>
                      <div
                        className="absolute bottom-0 left-0 right-0 pointer-events-none transition-opacity duration-300 group-hover/nav:opacity-0"
                        style={{
                          height: "15%",
                          background: "linear-gradient(to top, hsl(var(--background)), transparent)",
                        }}
                      />
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Main content */}
              <div>
                {/* Mobile service nav */}
                <div className="flex flex-wrap gap-2 mb-10 lg:hidden">
                  {siteData.services.map((s, i) => (
                    <a
                      key={s.id}
                      href={`/servicii/${s.slug}`}
                      className={`text-xs px-3 py-1.5 rounded-sm border tracking-wide transition-colors duration-200 ${
                        s.slug === slug
                          ? "bg-gold text-background border-gold font-semibold"
                          : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                      }`}
                    >
                      {s.title}
                    </a>
                  ))}
                </div>

                <div className="reveal">
                  <h1 className="display-xl text-foreground mb-10">
                    {service.title}
                  </h1>

                  <div className="space-y-5 max-w-2xl mb-14">
                    {paragraphs.map((p, i) => (
                      <p key={i} className="text-lg text-muted-foreground leading-relaxed">
                        {p.trim()}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Image */}
                <div className="reveal rounded-xl overflow-hidden aspect-video bg-surface">
                  <img
                    src={service.thumbnail}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* CTA */}
                <div className="reveal mt-12">
                  <a href="/contact" className="btn-primary">
                    Solicită o ofertă
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
