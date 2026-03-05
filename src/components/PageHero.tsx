import { useRef, useState, useEffect } from "react";

interface PageHeroProps {
  title: string;
  titleClassName?: string;
}

export default function PageHero({ title, titleClassName }: PageHeroProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const scrollY = window.scrollY;
      const sectionHeight = section.offsetHeight;
      const progress = Math.min(scrollY / sectionHeight, 1);
      setScale(1 + progress * 0.25);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex w-full min-h-[420px] h-[clamp(420px,72vh,920px)] items-center justify-center overflow-hidden"
    >
      <img
        src="/images/page-hero.webp"
        alt=""
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-100 will-change-transform"
        style={{ transform: `scale(${scale})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent via-60% to-background" aria-hidden="true" />
      <h1 className={`relative z-10 px-6 text-center text-foreground -translate-y-[18%] sm:-translate-y-[22%] md:-translate-y-[26%] display-xl ${titleClassName || ""}`}>
        {title}
      </h1>
    </section>
  );
}
