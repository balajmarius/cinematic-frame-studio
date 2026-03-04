import { useEffect, useRef } from "react";
import { useParams, Navigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";
import { siteData } from "@/data/siteContent";
import { usePageMeta } from "@/hooks/usePageMeta";

export default function Service() {
  const { slug } = useParams();
  const videoRef = useRef<HTMLVideoElement>(null);

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

  if (!service) return <Navigate to="/" replace />;

  const otherServices = siteData.services.filter((s) => s.slug !== slug);

  return (
    <div className="bg-background text-foreground min-h-screen">
      <Navbar />
      <PageHero title={service.title} />
      <main id="main-content">
        {/* Hero */}
        <section className="pt-16 pb-16 section-padding bg-background">
          <div className="container-wide">
            <div className="reveal">
              <a
                href="/servicii"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 mb-8"
              >
                <ArrowLeft size={14} />
                Toate serviciile
              </a>
              <h1 className="display-xl text-foreground max-w-3xl">
                {service.title}
              </h1>
            </div>
          </div>
        </section>

        {/* Video */}
        <section className="section-padding pt-0 bg-background">
          <div className="container-wide">
            <div className="reveal relative rounded-xl overflow-hidden aspect-video bg-surface">
              <video
                ref={videoRef}
                src={service.video}
                controls
                preload="metadata"
                poster={service.thumbnail}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Description */}
        <section className="section-padding pt-0 bg-background">
          <div className="container-wide max-w-3xl">
            <div className="reveal">
              <p className="text-lg text-muted-foreground leading-relaxed">
                {service.description}
              </p>
              <div className="mt-12">
                <a href="/contact" className="btn-primary">
                  Solicită o ofertă
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Other services */}
        <section className="section-padding bg-surface">
          <div className="container-wide">
            <div className="reveal mb-12">
              <span className="label-tag mb-4 block">Alte servicii</span>
              <div className="divider-line" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {otherServices.map((s, i) => (
                <a
                  key={s.id}
                  href={`/servicii/${s.slug}`}
                  className="reveal group card-surface"
                  style={{ transitionDelay: `${i * 0.08}s` }}
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={s.thumbnail}
                      alt={s.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-base font-bold text-foreground group-hover:text-gold transition-colors duration-200">
                      {s.title}
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
