import { useRef, useState, useEffect } from "react";

export default function PageHero() {
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
    <section ref={sectionRef} className="relative w-full h-[50vh] min-h-[300px] mt-[200px] overflow-hidden">
      <img
        src="/images/page-hero.webp"
        alt=""
        className="absolute inset-0 w-full h-full object-contain transition-transform duration-100 will-change-transform"
        style={{ transform: `scale(${scale})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent via-60% to-background" aria-hidden="true" />
    </section>
  );
}
