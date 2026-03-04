import { useEffect, useRef, useState, useCallback } from "react";
import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";
import { siteData } from "@/data/siteContent";
import { usePageMeta } from "@/hooks/usePageMeta";

function useCountUp(target: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const start = useCallback(() => setStarted(true), []);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { start(); observer.disconnect(); } },
      { threshold: 0.5 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [start]);

  useEffect(() => {
    if (!started) return;
    const steps = 60;
    const increment = target / steps;
    const interval = duration / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, interval);
    return () => clearInterval(timer);
  }, [started, target, duration]);

  return { count, ref };
}

export default function About() {
  usePageMeta({
    title: "Despre noi",
    description: "Avem peste 16 ani de experiență în producție și post-producție video. Studio de producție video în Timișoara.",
  });

  const { count, ref: counterRef } = useCountUp(16);

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
  }, []);

  return (
    <div className="bg-background text-foreground min-h-screen">
      <Navbar />
      <PageHero title="Despre noi" />
      <main id="main-content">
        <section className="section-padding bg-background">
          <div className="container-wide">
            <div className="reveal grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12 lg:gap-20 items-start">
              <div ref={counterRef} className="flex items-end gap-3">
                <span className="text-[7.2rem] lg:text-[9rem] font-display font-bold leading-none text-gold min-w-[180px] lg:min-w-[220px]">
                  {count}+
                </span>
                <span className="text-sm text-muted-foreground tracking-wide uppercase pb-2"
                  style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>
                  Experiență
                </span>
              </div>

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
