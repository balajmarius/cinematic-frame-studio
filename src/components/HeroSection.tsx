import { useRef, useEffect } from "react";
import { ArrowDown, Play } from "lucide-react";
import { siteData } from "@/data/siteContent";

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <section className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background video */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        src={siteData.hero.videoUrl}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />

      {/* Cinematic overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/30 to-background/80" />
      <div className="absolute inset-0 bg-background/20" />

      {/* Content */}
      <div className="relative z-10 container-wide section-padding py-0 flex flex-col items-start justify-center max-w-5xl w-full">
        <div className="animate-fade-up" style={{ animationDelay: "0.2s", opacity: 0 }}>
          <span className="label-tag mb-6 block">
            {siteData.tagline} · Timișoara, România
          </span>
        </div>

        <h1
          className="display-xl text-foreground mb-6 max-w-3xl animate-fade-up"
          style={{ animationDelay: "0.4s", opacity: 0 }}
        >
          {siteData.hero.headline}
        </h1>

        <p
          className="text-lg text-muted-foreground mb-10 max-w-xl leading-relaxed animate-fade-up"
          style={{ animationDelay: "0.6s", opacity: 0 }}
        >
          {siteData.hero.subheadline}
        </p>

        <div
          className="flex flex-wrap gap-4 animate-fade-up"
          style={{ animationDelay: "0.8s", opacity: 0 }}
        >
          <a href="#projects" className="btn-primary gap-2">
            <Play size={14} fill="currentColor" />
            {siteData.hero.cta1}
          </a>
          <a href="#contact" className="btn-outline">
            {siteData.hero.cta2}
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in" style={{ animationDelay: "1.4s", opacity: 0 }}>
        <span className="label-tag">Scroll</span>
        <div className="w-px h-12 relative overflow-hidden bg-border">
          <div className="absolute inset-x-0 top-0 h-1/2 bg-gold animate-[scroll-indicator_1.8s_ease-in-out_infinite]" />
        </div>
        <ArrowDown size={14} className="text-muted-foreground" />
      </div>

      <style>{`
        @keyframes scroll-indicator {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
      `}</style>
    </section>
  );
}
