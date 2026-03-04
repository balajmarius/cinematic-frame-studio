import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
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
      <PageHero title="Despre noi" />
      <main id="main-content">
        <section className="section-padding bg-background">
          <div className="container-wide">
            <div className="reveal grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12 lg:gap-20 items-start">
              {/* Big stat on the left */}
              <div className="flex flex-col items-start">
                <span className="text-[8rem] lg:text-[10rem] font-display font-bold leading-none text-gold">
                  16+
                </span>
                <span className="text-sm text-muted-foreground tracking-wide uppercase mt-2">
                  Experiență
                </span>
              </div>

              {/* Body text on the right */}
              <div className="space-y-5">
                {siteData.about.body.split("\n\n").map((p, i) => (
                  <p key={i} className="text-muted-foreground leading-relaxed text-lg">
                    {p}
                  </p>
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
