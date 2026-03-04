import { useRef, useState, useEffect } from "react";

interface PageHeroProps {
  title: string;
}

export default function PageHero({ title }: PageHeroProps) {
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
    <section ref={sectionRef} className="relative w-full h-screen min-h-[600px] overflow-hidden flex items-center justify-center">
      <img
        src="/images/page-hero.webp"
        alt=""
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-100 will-change-transform"
        style={{ transform: `scale(${scale})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent via-60% to-background" aria-hidden="true" />
      <h1 className="relative z-10 display-xl text-foreground text-center px-6 -mt-[150px]">{title}</h1>
    </section>
  );
}
