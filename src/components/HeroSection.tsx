import { useRef, useEffect, useState } from "react";
import { ArrowDown } from "lucide-react";
import { siteData } from "@/data/siteContent";

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showPlayButton, setShowPlayButton] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const attemptAutoplay = async () => {
      try {
        video.muted = true;
        await video.play();
        setShowPlayButton(false);
      } catch {
        setShowPlayButton(true);
      }
    };

    attemptAutoplay();
  }, []);

  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden" aria-label="Video de prezentare PertuFilm">
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        src={siteData.hero.videoUrl}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      />

      {showPlayButton && (
        <button
          type="button"
          onClick={() => {
            videoRef.current?.play().then(() => setShowPlayButton(false)).catch(() => {});
          }}
          className="absolute z-20 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 btn-outline"
        >
          Redă video
        </button>
      )}

      {/* Cinematic vignette — solid at bottom so video fades into content */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent via-60% to-background" aria-hidden="true" />

      {/* Screen-reader heading */}
      <div className="sr-only">
        <h1>{siteData.name} — {siteData.hero.subheadline}</h1>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in" style={{ animationDelay: "1s", opacity: 0 }} aria-hidden="true">
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
