import { useRef, useEffect } from "react";
import { ArrowDown } from "lucide-react";
import { siteData } from "@/data/siteContent";

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden">
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

      {/* Subtle cinematic vignette only */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background/70" />

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in" style={{ animationDelay: "1s", opacity: 0 }}>
        <div className="w-px h-12 relative overflow-hidden bg-foreground/20">
          <div className="absolute inset-x-0 top-0 h-1/2 bg-gold animate-[scroll-indicator_1.8s_ease-in-out_infinite]" />
        </div>
        <ArrowDown size={13} className="text-foreground/40" />
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
