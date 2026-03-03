import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { siteData } from "@/data/siteContent";
import { usePageMeta } from "@/hooks/usePageMeta";

export default function About() {
  usePageMeta({
    title: "Despre noi",
    description: "Avem peste 16 ani de experiență în producție și post-producție video. Studio de producție video în Timișoara.",
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.08 }
    );

    const els = document.querySelectorAll(".reveal");
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-background text-foreground min-h-screen">
      <Navbar />
      <main id="main-content">
        {/* Hero */}
        <section className="pt-32 pb-16 section-padding bg-background">
          <div className="container-wide">
            <div className="reveal">
              <span className="label-tag mb-4 block">Despre noi</span>
              <div className="divider-line mb-8" />
              <h1 className="display-xl text-foreground max-w-3xl">
                {siteData.about.headline}
              </h1>
            </div>
          </div>
        </section>

        {/* Image */}
        <section className="section-padding pt-0 bg-background">
          <div className="container-wide">
            <div className="reveal relative rounded-2xl overflow-hidden aspect-[21/9]">
              <img
                src={siteData.about.image}
                alt="Studio PertuFilm"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
            </div>
          </div>
        </section>

        {/* Body + Stats */}
        <section className="section-padding pt-0 bg-background">
          <div className="container-wide">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <div className="reveal">
                <div className="space-y-4">
                  {siteData.about.body.split("\n\n").map((p, i) => (
                    <p key={i} className="text-muted-foreground leading-relaxed text-lg">
                      {p}
                    </p>
                  ))}
                </div>
                <div className="mt-10">
                  <a href="/#contact" className="btn-primary">
                    Lucrează cu noi
                  </a>
                </div>
              </div>

              <div className="reveal grid grid-cols-2 gap-6">
                {siteData.stats.map((stat) => (
                  <div key={stat.label} className="border-t border-border pt-6">
                    <div className="text-4xl font-display font-bold text-foreground mb-1">
                      {stat.value}
                    </div>
                    <div className="text-xs text-muted-foreground tracking-wide uppercase">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
